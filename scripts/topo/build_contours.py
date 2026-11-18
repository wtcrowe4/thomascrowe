# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy", "pillow", "scikit-image", "scipy"]
# ///
"""Build simplified contour-line SVGs of Upstate SC for the site background.

Elevation: AWS Terrain Tiles (terrarium encoding), which are built from public
domain USGS 3DEP/NED and SRTM data in this area. Tiles are fetched once into a
local cache (not committed). Output: public/topo/<variant>.svg, stroke colour
left to CSS (currentColor) so one file serves light and dark themes.

  uv run scripts/topo/build_contours.py            # all variants
  uv run scripts/topo/build_contours.py upstate    # one variant
"""

from __future__ import annotations

import io
import math
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter
from skimage.measure import approximate_polygon, find_contours

ROOT = Path(__file__).resolve().parents[2]
CACHE = Path.home() / ".cache" / "thomascrowe-topo"
OUT = ROOT / "public" / "topo"
TILE_URL = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"

W, H = 1600, 1000  # output viewBox, 16:10

# name: (center lon, center lat, zoom, contour interval m, index every n, smoothing sigma px, simplify tol px)
VARIANTS = {
    "upstate": (-82.45, 34.82, 9, 50, 4, 4.0, 1.4),
    "greenville-county": (-82.40, 34.90, 10, 40, 5, 5.0, 1.4),
    "escarpment": (-82.72, 35.09, 12, 40, 5, 6.0, 1.4),
    "downtown-paris-mtn": (-82.39, 34.89, 13, 10, 5, 6.0, 1.4),
}


def lonlat_to_px(lon: float, lat: float, z: int) -> tuple[float, float]:
    n = 256 * 2**z
    x = (lon + 180) / 360 * n
    r = math.radians(lat)
    y = (1 - math.log(math.tan(r) + 1 / math.cos(r)) / math.pi) / 2 * n
    return x, y


def tile(z: int, x: int, y: int) -> np.ndarray:
    path = CACHE / f"{z}_{x}_{y}.png"
    if not path.exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        req = urllib.request.Request(TILE_URL.format(z=z, x=x, y=y), headers={"User-Agent": "topo-contour-builder"})
        with urllib.request.urlopen(req, timeout=30) as r:
            path.write_bytes(r.read())
    rgb = np.asarray(Image.open(io.BytesIO(path.read_bytes())).convert("RGB"), dtype=np.float64)
    return rgb[..., 0] * 256 + rgb[..., 1] + rgb[..., 2] / 256 - 32768


def dem(lon: float, lat: float, z: int) -> np.ndarray:
    """Elevation grid in mercator pixels at zoom z, W x H centred on lon/lat."""
    cx, cy = lonlat_to_px(lon, lat, z)
    x0, y0 = cx - W / 2, cy - H / 2
    tx0, ty0 = int(x0 // 256), int(y0 // 256)
    tx1, ty1 = int((x0 + W) // 256), int((y0 + H) // 256)
    rows = [np.hstack([tile(z, tx, ty) for tx in range(tx0, tx1 + 1)]) for ty in range(ty0, ty1 + 1)]
    big = np.vstack(rows)
    ox, oy = int(round(x0 - tx0 * 256)), int(round(y0 - ty0 * 256))
    return big[oy : oy + H, ox : ox + W]


def build(name: str) -> Path:
    lon, lat, z, step, every, sigma, tol = VARIANTS[name]
    e = gaussian_filter(dem(lon, lat, z), sigma)
    lo, hi = math.ceil(e.min() / step) * step, math.floor(e.max() / step) * step
    minor, index = [], []
    for level in np.arange(lo, hi + step, step):
        for c in find_contours(e, level):
            if len(c) < 40:
                continue  # drop specks
            for _ in range(2):  # Chaikin corner cutting: smooth, map-like curves
                q = 0.75 * c[:-1] + 0.25 * c[1:]
                r = 0.25 * c[:-1] + 0.75 * c[1:]
                c = np.empty((2 * len(q), 2)); c[0::2] = q; c[1::2] = r
            c = approximate_polygon(c, tol)
            pts = np.rint(c[:, ::-1]).astype(int)
            pts = pts[np.r_[True, np.any(np.diff(pts, axis=0) != 0, axis=1)]]
            rel = np.diff(pts, axis=0)
            d = f"M{pts[0][0]} {pts[0][1]}l" + " ".join(f"{dx} {dy}" for dx, dy in rel)
            (index if round(level / step) % every == 0 else minor).append(d)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice" '
        'fill="none" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round">'
        f'<path stroke-width="0.6" stroke-opacity="0.55" d="{"".join(minor)}"/>'
        f'<path stroke-width="1.1" d="{"".join(index)}"/>'
        "</svg>"
    )
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / f"{name}.svg"
    out.write_text(svg)
    print(f"{name}: z{z} {lo:.0f}-{hi:.0f} m every {step} m, {len(minor) + len(index)} lines, {len(svg) / 1024:.0f} KB")
    return out


if __name__ == "__main__":
    for n in sys.argv[1:] or VARIANTS:
        build(n)

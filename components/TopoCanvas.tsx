"use client";

import { useRef } from "react";

const LAT = 34.8526;
const LON = -82.394;
const ZOOM = 12;

function lonToX(lon: number, z: number) {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, z));
}

function latToY(lat: number, z: number) {
  const r = (lat * Math.PI) / 180;
  return Math.floor(
    ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) *
      Math.pow(2, z)
  );
}

const CX = lonToX(LON, ZOOM);
const CY = latToY(LAT, ZOOM);

interface TopoCanvasProps {
  cols?: number;
  rows?: number;
  tileOpacity?: number;
}

export function TopoCanvas({ cols = 5, rows = 3, tileOpacity = 0.16 }: TopoCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const halfCols = Math.floor(cols / 2);
  const halfRows = Math.floor(rows / 2);
  const tiles: { tx: number; ty: number; col: number; row: number }[] = [];
  for (let row = -halfRows; row <= halfRows; row++) {
    for (let col = -halfCols; col <= halfCols; col++) {
      tiles.push({ tx: CX + col, ty: CY + row, col, row });
    }
  }

  return (
    <>
      {/* Live map layer disabled for now while the custom topo canvas is rebuilt.
          The SVG topo accents below stay active so the hero still reads as topographic. */}
      {/*
      <div
        ref={containerRef}
        className="absolute inset-0 z-[1] overflow-hidden"
        style={{ opacity: tileOpacity, filter: "grayscale(0.4) contrast(1.3)" }}
      >
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-${(cols * 256) / 2}px, -${(rows * 256) / 2}px)`,
            width: cols * 256,
            height: rows * 256,
          }}
        >
          {tiles.map(({ tx, ty, col, row }) => (
            <img
              key={`${tx}-${ty}`}
              src={`https://tile.opentopomap.org/${ZOOM}/${tx}/${ty}.png`}
              alt=""
              width={256}
              height={256}
              style={{
                position: "absolute",
                left: (col + halfCols) * 256,
                top: (row + halfRows) * 256,
                display: "block",
              }}
            />
          ))}
        </div>
      </div>
      */}

      <TopoOverlaySVG />
    </>
  );
}

function TopoOverlaySVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="topoFade" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#03070f" />
        </radialGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect width="1280" height="720" fill="url(#topoFade)" />

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={"a" + i}
          cx={270}
          cy={585}
          rx={94 + i * 62}
          ry={(94 + i * 62) * 0.6}
          fill="none"
          stroke="#fb923c"
          strokeWidth={i % 5 === 0 ? 1.4 : 0.75}
          opacity={0.38 - i * 0.04}
        />
      ))}

      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={"b" + i}
          cx={1040}
          cy={185}
          rx={(68 + i * 54) * 1.08}
          ry={(68 + i * 54) * 0.66}
          fill="none"
          stroke="#fb923c"
          strokeWidth={i % 5 === 0 ? 1.4 : 0.75}
          opacity={0.34 - i * 0.04}
        />
      ))}

      <path
        d="M 0 510 Q 180 490 340 470 T 620 440 T 900 400 T 1280 370"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1"
        opacity="0.35"
        strokeDasharray="3 5"
      />

      <text x="255" y="390" fill="#fb923c" opacity="0.6" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">+340m</text>
      <text x="1068" y="330" fill="#fb923c" opacity="0.6" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">+182m</text>
      <text x="630" y="438" fill="#38bdf8" opacity="0.55" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2">REEDY RIVER</text>

      <g filter="url(#glowFilter)">
        <circle cx={640} cy={360} r={4} fill="#fb923c" opacity="0.9" />
        <circle cx={640} cy={360} r={10} fill="#fb923c" opacity="0.2" />
        <circle cx={640} cy={360} r={18} fill="#fb923c" opacity="0.08" />
        <line x1={640} y1={350} x2={640} y2={330} stroke="#fb923c" strokeWidth="1" opacity="0.6" />
        <line x1={635} y1={330} x2={650} y2={330} stroke="#fb923c" strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
}

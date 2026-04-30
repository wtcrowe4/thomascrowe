"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface NeuralNode extends THREE.Mesh {
  userData: {
    basePos: THREE.Vector3;
    phase: number;
    speed: number;
    pulsePhase: number;
  };
}

interface NeuralEdge extends THREE.Line {
  userData: { nodeA: number; nodeB: number };
}

interface NeuralParticle extends THREE.Mesh {
  userData: {
    t: number;
    speed: number;
    nodeA: NeuralNode;
    nodeB: NeuralNode;
  };
}

export function NeuralCanvas({ nodeCount = 80 }: { nodeCount?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrame = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const accentHex = (() => {
      const c = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim()
        .replace("#", "");
      return parseInt(c || "fb923c", 16);
    })();

    const nodes: NeuralNode[] = [];
    const edges: NeuralEdge[] = [];
    const particles: NeuralParticle[] = [];

    const nodeMat = new THREE.MeshBasicMaterial({ color: accentHex, transparent: true });
    for (let i = 0; i < nodeCount; i++) {
      const r = Math.random() < 0.2 ? 1.2 : Math.random() < 0.5 ? 0.6 : 0.35;
      const geo = new THREE.SphereGeometry(r, 8, 8);
      const mesh = new THREE.Mesh(geo, nodeMat.clone()) as NeuralNode;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 25 + Math.random() * 55;
      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi) - 10
      );
      mesh.userData = {
        basePos: mesh.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
        pulsePhase: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      nodes.push(mesh);
    }

    const lineMat = new THREE.LineBasicMaterial({
      color: accentHex,
      transparent: true,
      opacity: 0.12,
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 26) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position.clone(),
            nodes[j].position.clone(),
          ]);
          const line = new THREE.Line(geo, lineMat.clone()) as NeuralEdge;
          line.userData = { nodeA: i, nodeB: j };
          scene.add(line);
          edges.push(line);
        }
      }
    }

    const ptMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc });
    edges
      .filter(() => Math.random() < 0.12)
      .forEach((edge) => {
        const geo = new THREE.SphereGeometry(0.35, 4, 4);
        const pt = new THREE.Mesh(geo, ptMat.clone()) as NeuralParticle;
        pt.userData = {
          t: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
          nodeA: nodes[edge.userData.nodeA],
          nodeB: nodes[edge.userData.nodeB],
        };
        scene.add(pt);
        particles.push(pt);
      });

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    document.addEventListener("mousemove", onMouse);

    const onResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      animFrame = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      nodes.forEach((node) => {
        const d = node.userData;
        node.position.x = d.basePos.x + Math.sin(t * d.speed * 0.4 + d.phase) * 1.5;
        node.position.y = d.basePos.y + Math.cos(t * d.speed * 0.3 + d.phase) * 1.2;
        const pulse = 0.85 + 0.15 * Math.sin(t * 1.5 + d.pulsePhase);
        node.scale.setScalar(pulse);
        const mat = node.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.6 + 0.4 * Math.sin(t + d.pulsePhase);
        mat.transparent = true;
      });
      edges.forEach((edge) => {
        const pts = [
          nodes[edge.userData.nodeA].position,
          nodes[edge.userData.nodeB].position,
        ];
        edge.geometry.setFromPoints(pts);
        edge.geometry.attributes.position.needsUpdate = true;
      });
      particles.forEach((pt) => {
        pt.userData.t += pt.userData.speed;
        if (pt.userData.t > 1) pt.userData.t = 0;
        pt.position.lerpVectors(
          pt.userData.nodeA.position,
          pt.userData.nodeB.position,
          pt.userData.t
        );
      });
      camera.position.x += (mouseRef.current.x * 12 - camera.position.x) * 0.02;
      camera.position.y += (-mouseRef.current.y * 8 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [nodeCount]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1]" />;
}

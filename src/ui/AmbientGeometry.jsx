"use client";

import React, { useEffect, useRef } from "react";

const SHAPES = ["circle", "square", "triangle", "diamond"];
const NODE_ALPHA_BINS = 4;
const LINE_ALPHA_BINS = 6;

function buildShapeOffsets(shape, radius, rotation) {
  if (shape === "circle") return null;

  const rot = (angle) => {
    const cos = Math.cos(angle + rotation);
    const sin = Math.sin(angle + rotation);
    return [cos, sin];
  };

  switch (shape) {
    case "square": {
      const pts = [];
      const corners = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
      for (const [cx, cy] of corners) {
        const angle = Math.atan2(cy, cx);
        const [cos, sin] = rot(angle);
        const mag = radius * Math.SQRT2;
        pts.push([cos * mag, sin * mag]);
      }
      return pts;
    }
    case "triangle": {
      const angles = [
        -Math.PI / 2,
        (Math.PI * 2) / 3 - Math.PI / 2,
        (Math.PI * 4) / 3 - Math.PI / 2,
      ];
      return angles.map((a) => {
        const [cos, sin] = rot(a);
        return [cos * radius * 1.15, sin * radius * 1.15];
      });
    }
    case "diamond": {
      const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
      return angles.map((a) => {
        const [cos, sin] = rot(a);
        return [cos * radius * 1.2, sin * radius * 1.2];
      });
    }
    default:
      return null;
  }
}

export default function AmbientGeometry({ theme = "light" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationFrameRef = useRef(null);
  const nodesRef = useRef([]);
  const isVisibleRef = useRef(true);
  const timeRef = useRef(0);

  // Unique duotone scheme tied to this site's own brand palette:
  // nodes pick up the headline emerald green, connective lines pick up the
  // terracotta already used in the decorative background triangles, and the
  // cursor gets its own warm amber accent so the interaction point always
  // reads clearly against either color.
  const nodeColorBase =
    theme === "dark" ? "rgba(94, 234, 212," : "rgba(5, 150, 105,";
  const lineColorBase =
    theme === "dark" ? "rgba(255, 255, 255," : "rgba(196, 93, 62,";
  const accentColorBase =
    theme === "dark" ? "rgba(251, 191, 36," : "rgba(217, 119, 6,";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isMobile = false;
    let dpr = 1;
    let cachedRect = null;

    const MAX_NODES = 90;
    const MAX_SPEED = 2.6;
    const CURSOR_LINK_DIST = 175;
    const DAMPING = 0.992;
    const WANDER_RESPONSE = 0.06;
    const CONNECT_DIST = 150;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

    // Repulsion tuning: nodes now flee the cursor with a squared falloff, so
    // the effect stays gentle at the edge of the field but snaps sharply the
    // closer the cursor gets, making "mouse close -> node far" the dominant,
    // clearly-felt interaction instead of a subtle nudge.
    const REPULSE_RANGE_MULT = 190;
    const REPULSE_STRENGTH = 0.85;

    const nodeAlphaStrings = Array.from(
      { length: NODE_ALPHA_BINS + 1 },
      (_, i) =>
        `${nodeColorBase} ${((i / NODE_ALPHA_BINS) * 0.55).toFixed(3)})`,
    );
    const lineAlphaStrings = Array.from(
      { length: LINE_ALPHA_BINS + 1 },
      (_, i) =>
        `${lineColorBase} ${((i / LINE_ALPHA_BINS) * 0.32).toFixed(3)})`,
    );

    const createNode = (x, y, scatter = 0) => {
      const angle = Math.random() * Math.PI * 2;
      const z = 0.2 + Math.random() * 0.8;
      const baseSpeed = (0.5 + Math.random() * 0.7) * z;
      const radius = (0.9 + Math.random() * 2.6) * z;
      const shapeIndex = Math.floor(Math.random() * SHAPES.length);
      const shape = SHAPES[shapeIndex];
      const rotation = Math.random() * Math.PI * 2;

      const offsetX = scatter ? (Math.random() - 0.5) * scatter : 0;
      const offsetY = scatter ? (Math.random() - 0.5) * scatter : 0;

      const rawAlpha = Math.pow(z, 1.8);
      const bin = Math.min(
        NODE_ALPHA_BINS,
        Math.round(rawAlpha * NODE_ALPHA_BINS),
      );

      return {
        x: (x ?? Math.random() * width) + offsetX,
        y: (y ?? Math.random() * height) + offsetY,
        vx: Math.cos(angle) * baseSpeed,
        vy: Math.sin(angle) * baseSpeed,
        radius,
        baseSpeed,
        phase: Math.random() * Math.PI * 2,
        z,
        wanderAngle: angle,
        wanderSpeed: (Math.random() - 0.5) * 0.07,
        shape,
        shapeIndex,
        offsets: buildShapeOffsets(shape, radius, rotation),
        fillAlpha: bin,
      };
    };

    const initNodes = () => {
      isMobile = window.innerWidth < 768;
      const count = isMobile ? 16 : 60;
      const nodes = [];
      for (let i = 0; i < count; i++) nodes.push(createNode());
      nodesRef.current = nodes;
    };

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      cachedRect = containerRef.current.getBoundingClientRect();
      width = cachedRect.width;
      height = cachedRect.height;
      isMobile = window.innerWidth < 768;
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initNodes();
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    resizeCanvas();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      if (
        isMobile ||
        !cachedRect ||
        window.matchMedia("(pointer: coarse)").matches ||
        !window.matchMedia("(hover: hover)").matches
      )
        return;
      mouseRef.current = {
        x: e.clientX - cachedRect.left,
        y: e.clientY - cachedRect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const handleClick = (e) => {
      if (!cachedRect || isMobile) return;
      const x = e.clientX - cachedRect.left;
      const y = e.clientY - cachedRect.top;

      for (let i = 0; i < 3; i++) {
        nodesRef.current.push(createNode(x, y, 60));
        if (nodesRef.current.length > MAX_NODES) nodesRef.current.shift();
      }
    };

    const parentSection = containerRef.current?.parentElement;
    if (parentSection) {
      parentSection.addEventListener("mousemove", handleMouseMove);
      parentSection.addEventListener("mouseleave", handleMouseLeave);
      parentSection.addEventListener("click", handleClick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationFrameRef.current) animate();
      },
      { threshold: 0.05 },
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const nodePaths = Array.from(
      { length: SHAPES.length * (NODE_ALPHA_BINS + 1) },
      () => new Path2D(),
    );
    const linePaths = Array.from(
      { length: LINE_ALPHA_BINS + 1 },
      () => new Path2D(),
    );

    const animate = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = null;
        return;
      }

      timeRef.current += 0.02;
      ctx.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;
      const n = nodes.length;
      const mouse = mouseRef.current;
      const mouseActive = mouse.x > -9000;

      for (let i = 0; i < n; i++) {
        const node = nodes[i];

        node.wanderAngle +=
          node.wanderSpeed + Math.sin(timeRef.current + node.phase) * 0.008;
        const targetVx = Math.cos(node.wanderAngle) * node.baseSpeed;
        const targetVy = Math.sin(node.wanderAngle) * node.baseSpeed;
        node.vx += (targetVx - node.vx) * WANDER_RESPONSE;
        node.vy += (targetVy - node.vy) * WANDER_RESPONSE;

        if (!isMobile && mouseActive) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repulseDistance = REPULSE_RANGE_MULT * node.z;
          if (dist < repulseDistance && dist > 1) {
            const proximity = (repulseDistance - dist) / repulseDistance;
            // Squared falloff: barely noticeable far out, then a sharp
            // "scatter" as the cursor closes in.
            const force = proximity * proximity * REPULSE_STRENGTH * node.z;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        node.vx *= DAMPING;
        node.vy *= DAMPING;

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > MAX_SPEED) {
          node.vx = (node.vx / speed) * MAX_SPEED;
          node.vy = (node.vy / speed) * MAX_SPEED;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0) {
          node.x = 0;
          node.vx = Math.abs(node.vx);
          node.wanderAngle = Math.PI - node.wanderAngle;
        } else if (node.x >= width) {
          node.x = width;
          node.vx = -Math.abs(node.vx);
          node.wanderAngle = Math.PI - node.wanderAngle;
        }
        if (node.y <= 0) {
          node.y = 0;
          node.vy = Math.abs(node.vy);
          node.wanderAngle = -node.wanderAngle;
        } else if (node.y >= height) {
          node.y = height;
          node.vy = -Math.abs(node.vy);
          node.wanderAngle = -node.wanderAngle;
        }
      }

      const freshLinePaths = linePaths.map(() => new Path2D());
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DIST_SQ) {
            const distanceFactor = 1 - distSq / CONNECT_DIST_SQ;
            const avgZ = (n1.z + n2.z) * 0.5;
            const raw = distanceFactor * avgZ * avgZ;
            const bin = Math.min(
              LINE_ALPHA_BINS,
              Math.round(raw * LINE_ALPHA_BINS),
            );
            if (bin === 0) continue;
            freshLinePaths[bin].moveTo(n1.x, n1.y);
            freshLinePaths[bin].lineTo(n2.x, n2.y);
          }
        }
      }
      for (let b = 1; b <= LINE_ALPHA_BINS; b++) {
        ctx.strokeStyle = lineAlphaStrings[b];
        ctx.lineWidth = 0.4 + 0.9 * (b / LINE_ALPHA_BINS);
        ctx.stroke(freshLinePaths[b]);
      }

      const freshNodePaths = nodePaths.map(() => new Path2D());
      for (let i = 0; i < n; i++) {
        const node = nodes[i];
        const key = node.shapeIndex * (NODE_ALPHA_BINS + 1) + node.fillAlpha;
        const path = freshNodePaths[key];
        if (node.shape === "circle") {
          path.moveTo(node.x + node.radius, node.y);
          path.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        } else if (node.offsets) {
          const [first, ...rest] = node.offsets;
          path.moveTo(node.x + first[0], node.y + first[1]);
          for (const [ox, oy] of rest) path.lineTo(node.x + ox, node.y + oy);
          path.closePath();
        }
      }
      for (let s = 0; s < SHAPES.length; s++) {
        for (let b = 0; b <= NODE_ALPHA_BINS; b++) {
          if (b === 0) continue;
          const key = s * (NODE_ALPHA_BINS + 1) + b;
          ctx.fillStyle = nodeAlphaStrings[b];
          ctx.fill(freshNodePaths[key]);
        }
      }

      if (!isMobile && mouseActive) {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const node = nodes[i];
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = CURSOR_LINK_DIST * CURSOR_LINK_DIST;
          if (distSq < maxDistSq) {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
          }
        }
        ctx.strokeStyle = `${accentColorBase} 0.18)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        const glowPulse = 0.75 + Math.sin(timeRef.current * 2) * 0.25;
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          26,
        );
        gradient.addColorStop(
          0,
          `${accentColorBase} ${(0.45 * glowPulse).toFixed(3)})`,
        );
        gradient.addColorStop(1, `${accentColorBase} 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `${accentColorBase} 0.6)`;
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      observer.disconnect();
      if (parentSection) {
        parentSection.removeEventListener("mousemove", handleMouseMove);
        parentSection.removeEventListener("mouseleave", handleMouseLeave);
        parentSection.removeEventListener("click", handleClick);
      }
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [nodeColorBase, lineColorBase, accentColorBase]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}

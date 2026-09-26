import { useEffect, useRef } from "react";

export default function BackgroundAnimation({
  type = "bokeh",
  speed = 1,
  interactive = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking for interactive effect
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Initialize elements based on type
    let particles = [];
    let gridOffset = 0;

    const createParticles = () => {
      particles = [];
      const particleCount =
        type === "bokeh" ? 28 : type === "aperture" ? 35 : 18;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius:
            Math.random() *
              (type === "bokeh" ? 40 : type === "aperture" ? 14 : 120) +
            5,
          vx: (Math.random() - 0.5) * 0.4 * speed,
          vy: (Math.random() - 0.5) * 0.4 * speed,
          alpha: Math.random() * 0.35 + 0.05,
          color:
            Math.random() > 0.4
              ? "#1C8A54" // Emerald
              : Math.random() > 0.5
                ? "#0B2E22" // Deep Forest
                : "#82C39B", // Soft mint highlight
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.02 * speed,
          sides: Math.floor(Math.random() * 3) + 5, // Hexagons/Pentagons for camera apertures
        });
      }
    };

    createParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movement smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      /* MODE 1: BOKEH FLASH LIGHTS */
      if (type === "bokeh") {
        particles.forEach((p) => {
          p.x += p.vx * speed;
          p.y += p.vy * speed;

          if (p.x < -p.radius) p.x = width + p.radius;
          if (p.x > width + p.radius) p.x = -p.radius;
          if (p.y < -p.radius) p.y = height + p.radius;
          if (p.y > height + p.radius) p.y = -p.radius;

          // Parallax effect toward mouse cursor
          const dx = (mouse.x - width / 2) * 0.02;
          const dy = (mouse.y - height / 2) * 0.02;

          const gradient = ctx.createRadialGradient(
            p.x + dx,
            p.y + dy,
            0,
            p.x + dx,
            p.y + dy,
            p.radius,
          );
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, "transparent");

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x + dx, p.y + dy, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      } else if (type === "blobs") {
        /* MODE 2: SOFT GLOWING GRADIENT BLOBS */
        // Render large ambient glowing dynamic centers
        const time = Date.now() * 0.0005 * speed;

        const blob1X =
          width * 0.2 +
          Math.sin(time * 0.8) * 120 +
          (mouse.x - width / 2) * 0.05;
        const blob1Y =
          height * 0.3 +
          Math.cos(time * 0.6) * 100 +
          (mouse.y - height / 2) * 0.05;

        const blob2X =
          width * 0.8 +
          Math.cos(time * 0.7) * 140 -
          (mouse.x - width / 2) * 0.05;
        const blob2Y =
          height * 0.7 +
          Math.sin(time * 0.9) * 110 -
          (mouse.y - height / 2) * 0.05;

        // Blob 1: Green mist
        const grad1 = ctx.createRadialGradient(
          blob1X,
          blob1Y,
          10,
          blob1X,
          blob1Y,
          width * 0.45,
        );
        grad1.addColorStop(0, "rgba(28, 138, 84, 0.18)");
        grad1.addColorStop(1, "rgba(237, 243, 236, 0)");

        ctx.fillStyle = grad1;
        ctx.beginPath();
        ctx.arc(blob1X, blob1Y, width * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Blob 2: Dark green depth mist
        const grad2 = ctx.createRadialGradient(
          blob2X,
          blob2Y,
          10,
          blob2X,
          blob2Y,
          width * 0.5,
        );
        grad2.addColorStop(0, "rgba(11, 46, 34, 0.12)");
        grad2.addColorStop(1, "rgba(237, 243, 236, 0)");

        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.arc(blob2X, blob2Y, width * 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === "grid") {
        /* MODE 3: SUBTLE TECH MATRIX GRID LINES */
        gridOffset = (gridOffset + 0.3 * speed) % 40;

        ctx.strokeStyle = "rgba(28, 138, 84, 0.08)";
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Animated Horizontal lines
        for (let y = gridOffset; y < height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Mouse Spotlight
        const spotGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          250,
        );
        spotGrad.addColorStop(0, "rgba(28, 138, 84, 0.12)");
        spotGrad.addColorStop(1, "transparent");

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === "aperture") {
        /* MODE 4: APERTURE / CAMERA GEOMETRIC DUST */
        particles.forEach((p) => {
          p.x += p.vx * speed;
          p.y += p.vy * speed;
          p.rotation += p.vRot;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;

          // Polygon path for camera aperture blade feel
          ctx.beginPath();
          for (let i = 0; i < p.sides; i++) {
            const angle = (i * 2 * Math.PI) / p.sides;
            const px = p.radius * Math.cos(angle);
            const py = p.radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [type, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}

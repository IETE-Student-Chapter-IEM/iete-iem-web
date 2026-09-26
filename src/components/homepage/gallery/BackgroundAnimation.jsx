import { useEffect, useRef } from "react";

/**
 * Lightweight animated canvas background
 *
 * Types:
 * "constellation" | "bokeh" | "grid" | "supernova"
 */

export default function BackgroundAnimation({
  type = "constellation",
  speed = 1,
  interactive = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    let animationFrameId = null;
    let width = 0;
    let height = 0;

    let particles = [];
    let ripples = [];
    let gridOffset = 0;

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isHovered: false,
    };

    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      mouse.x = width / 2;
      mouse.y = height / 2;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;

      initElements();
    };

    const initElements = () => {
      const count =
        type === "constellation"
          ? 35
          : type === "supernova"
            ? 45
            : type === "bokeh"
              ? 14
              : 16;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,

        baseX: Math.random() * width,
        baseY: Math.random() * height,

        radius:
          type === "bokeh"
            ? Math.random() * 60 + 20
            : type === "supernova"
              ? Math.random() * 3 + 1
              : Math.random() * 10 + 4,

        vx: (Math.random() - 0.5) * 0.35 * speed,
        vy: (Math.random() - 0.5) * 0.35 * speed,

        alpha: Math.random() * 0.3 + 0.08,

        color:
          Math.random() > 0.45
            ? "#1C8A54"
            : Math.random() > 0.3
              ? "#0B2E22"
              : "#4ADE80",

        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015 * speed,

        sides: Math.floor(Math.random() * 3) + 5,

        pulseSpeed: Math.random() * 0.02 + 0.008,

        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 160 + 30,
      }));
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const handleMouseMove = (e) => {
      if (!interactive) return;

      const rect = canvas.getBoundingClientRect();

      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    const handleClick = (e) => {
      if (!interactive) return;

      const rect = canvas.getBoundingClientRect();

      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.35,
        alpha: 0.45,
      });

      // Prevent unbounded ripple memory
      if (ripples.length > 4) {
        ripples.shift();
      }
    };

    const render = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      if (interactive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      const time = timestamp * 0.001 * speed;

      /*
       * BOKEH
       */
      if (type === "bokeh") {
        particles.forEach((particle, index) => {
          particle.x += particle.vx * speed + Math.sin(time + index) * 0.15;

          particle.y += particle.vy * speed + Math.cos(time + index) * 0.15;

          if (particle.x < -particle.radius) {
            particle.x = width + particle.radius;
          }

          if (particle.x > width + particle.radius) {
            particle.x = -particle.radius;
          }

          if (particle.y < -particle.radius) {
            particle.y = height + particle.radius;
          }

          if (particle.y > height + particle.radius) {
            particle.y = -particle.radius;
          }

          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius,
          );

          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, "transparent");

          ctx.globalAlpha =
            particle.alpha * (0.8 + Math.sin(time * 2 + index) * 0.2);

          ctx.fillStyle = gradient;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      } else if (type === "constellation") {

      /*
       * CONSTELLATION
       */
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {
              const alpha = (1 - distance / 130) * 0.2;

              ctx.strokeStyle = `rgba(28,138,84,${alpha})`;
              ctx.lineWidth = 0.7;

              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        particles.forEach((particle) => {
          particle.x += particle.vx * speed;
          particle.y += particle.vy * speed;
          particle.rotation += particle.vRot;

          if (particle.x < -30) particle.x = width + 30;
          if (particle.x > width + 30) particle.x = -30;
          if (particle.y < -30) particle.y = height + 30;
          if (particle.y > height + 30) particle.y = -30;

          ctx.save();

          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);

          ctx.globalAlpha = particle.alpha;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;

          ctx.beginPath();

          for (let i = 0; i < particle.sides; i++) {
            const angle = (i * 2 * Math.PI) / particle.sides;

            const px = particle.radius * Math.cos(angle);
            const py = particle.radius * Math.sin(angle);

            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }

          ctx.closePath();
          ctx.stroke();

          ctx.restore();
        });

        ctx.globalAlpha = 1;
      } else if (type === "grid") {

      /*
       * GRID
       */
        gridOffset = (gridOffset + 0.3 * speed) % 40;

        const gridSize = 40;

        ctx.strokeStyle = "rgba(28,138,84,0.08)";
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = gridOffset; y <= height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (type === "supernova") {

      /*
       * SUPERNOVA
       */
        particles.forEach((particle) => {
          particle.angle += particle.pulseSpeed * speed;

          const targetX = mouse.isHovered
            ? mouse.x + Math.cos(particle.angle) * particle.distance
            : particle.baseX + Math.cos(particle.angle) * 60;

          const targetY = mouse.isHovered
            ? mouse.y + Math.sin(particle.angle) * particle.distance
            : particle.baseY + Math.sin(particle.angle) * 60;

          particle.x += (targetX - particle.x) * 0.05;

          particle.y += (targetY - particle.y) * 0.05;

          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      }

      /*
       * CLICK RIPPLES
       */
      if (interactive && ripples.length) {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const ripple = ripples[i];

          ripple.radius += 5 * speed;
          ripple.alpha *= 0.96;

          ctx.strokeStyle = `rgba(28,138,84,${ripple.alpha})`;
          ctx.lineWidth = 1.2;

          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.stroke();

          if (ripple.alpha < 0.01 || ripple.radius > ripple.maxRadius) {
            ripples.splice(i, 1);
          }
        }
      }

      ctx.globalAlpha = 1;

      if (!document.hidden) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    resizeCanvas();

    window.addEventListener("resize", handleResize);

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      window.addEventListener("mouseleave", handleMouseLeave);

      window.addEventListener("click", handleClick, { passive: true });
    }

    document.addEventListener("visibilitychange", handleVisibility);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("resize", handleResize);

      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);

        window.removeEventListener("mouseleave", handleMouseLeave);

        window.removeEventListener("click", handleClick);
      }

      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [type, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}

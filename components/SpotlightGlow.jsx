"use client";

import React, { useEffect, useRef } from "react";

/**
 * SpotlightGlow — Efeito Holofote / Lanterna Vermelha no Escuro
 *
 * Cria um gradiente radial vermelho difuso que segue o cursor do usuário,
 * simulando uma lanterna explorando a escuridão absoluta da página.
 *
 * Utiliza rAF (requestAnimationFrame) e CSS Custom Properties para performance
 * de 60 FPS cravados sem provocar re-renderizações no React.
 */
export default function SpotlightGlow() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let frameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updatePosition = () => {
      // Interpolação suave (lerp) para movimento fluido do holofote
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      el.style.setProperty("--x", `${currentX}px`);
      el.style.setProperty("--y", `${currentY}px`);

      frameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[40] hidden md:block"
      style={{
        background: `radial-gradient(650px circle at var(--x, 50vw) var(--y, 50vh), rgba(220, 38, 38, 0.12), transparent 75%)`,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}

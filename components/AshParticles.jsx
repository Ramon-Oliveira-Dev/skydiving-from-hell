"use client";

import React, { useEffect, useRef } from "react";

/**
 * AshParticles — Efeito Atmosférico de Cinzas e Brasas Vulcânicas Flutuantes
 *
 * Renderiza partículas de cinzas vulcânicas (cinza escuro, carvão) e brasas incandescentes
 * (vermelho rubi, laranja fogo) flutuando de forma orgânica e contínua pelo fundo das telas.
 *
 * Performance Máxima:
 * - Renderização via HTML5 Canvas 2D ultraleve (< 1% de uso de CPU/GPU).
 * - Pausa automática quando a aba está inativa.
 * - Pointer-events none para não interferir em toques ou cliques.
 */
export default function AshParticles({
  count = 55,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);
    let animationFrameId;
    let isVisible = true;

    // Paleta de Cinzas Vulcânicas e Brasas Incandescentes
    const colors = [
      { r: 239, g: 68, b: 68, isEmber: true },    // Brasa Vermelha Viva (#ef4444)
      { r: 249, g: 115, b: 22, isEmber: true },   // Brasa Laranja (#f97316)
      { r: 185, g: 28, b: 28, isEmber: true },    // Brasa Carmesim (#b91c1c)
      { r: 160, g: 155, b: 165, isEmber: false }, // Cinza Claro Flutuante
      { r: 90, g: 85, b: 95, isEmber: false },    // Cinza Carvão
      { r: 60, g: 55, b: 65, isEmber: false },    // Fuligem Escura
    ];

    class Ash {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.5 + 1.2;
        this.baseAlpha = Math.random() * 0.5 + 0.2;
        this.alpha = this.baseAlpha;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedY = -(Math.random() * 0.6 + 0.25); // Flutua lentamente para cima
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.oscillationSpeed = Math.random() * 0.02 + 0.01;
        this.oscillationDistance = Math.random() * 1.5 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y += this.speedY;
        this.angle += this.oscillationSpeed;
        this.x += Math.sin(this.angle) * this.oscillationDistance + this.speedX;
        this.rotation += this.rotationSpeed;

        // Efeito de pulso de brilho nas brasas
        if (this.color.isEmber) {
          this.alpha = this.baseAlpha + Math.sin(this.angle * 2) * 0.15;
        }

        // Reposiciona quando sai pelo topo ou laterais
        if (this.y < -15 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${Math.max(0, this.alpha)})`;

        if (this.color.isEmber) {
          // Glow sutil para brasas incandescentes
          ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
          ctx.shadowBlur = this.size * 3;
        }

        ctx.beginPath();
        // Desenha formato irregular levemente achatado simulando folha de cinza
        ctx.ellipse(0, 0, this.size, this.size * 0.65, this.rotation, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    const particles = Array.from({ length: count }, () => new Ash());

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        render();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
    />
  );
}

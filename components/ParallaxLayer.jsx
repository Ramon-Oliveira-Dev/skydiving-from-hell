"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxLayer — Componente GSAP para Profundidade de Câmera e Parallax
 *
 * Move elementos filhos em velocidades diferentes do scroll natural,
 * criando planos visuais profundos entre a transição de seções.
 *
 * Props:
 *   speed      — Fator de velocidade (-1.0 a 1.0).
 *                Valores negativos movem o elemento na direção oposta (flutuação).
 *                Valores positivos atrasam ou aceleram o elemento.
 *   yRange     — Deslocamento em pixels [start, end] ou número absoluto (padrão: 160px).
 *   xRange     — Deslocamento horizontal opcional em pixels.
 *   rotate     — Rotação opcional em graus [start, end].
 *   scale      — Escala opcional [start, end].
 *   opacity    — Opacidade opcional [start, end].
 *   scrub      — Suavização do scrub GSAP em segundos (padrão: 1).
 *   trigger    — Selector de trigger ou usa o elemento pai por padrão.
 *   className  — Classes Tailwind adicionais.
 */
export default function ParallaxLayer({
  children,
  speed = 0.25,
  yRange = null,
  xRange = null,
  rotate = null,
  scale = null,
  opacity = null,
  scrub = 1,
  start = "top bottom",
  end = "bottom top",
  className = "",
  style = {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se yRange for fornecido explicitamente, usa-o; caso contrário, calcula a partir de speed
    const calculatedY = yRange !== null
      ? (Array.isArray(yRange) ? yRange : [-yRange, yRange])
      : [-speed * 180, speed * 180];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.parentElement || el,
        start,
        end,
        scrub,
      },
    });

    const fromVars = {
      y: calculatedY[0],
      ease: "none",
    };

    const toVars = {
      y: calculatedY[1],
      ease: "none",
    };

    if (xRange && Array.isArray(xRange)) {
      fromVars.x = xRange[0];
      toVars.x = xRange[1];
    }

    if (rotate && Array.isArray(rotate)) {
      fromVars.rotation = rotate[0];
      toVars.rotation = rotate[1];
    }

    if (scale && Array.isArray(scale)) {
      fromVars.scale = scale[0];
      toVars.scale = scale[1];
    }

    if (opacity && Array.isArray(opacity)) {
      fromVars.opacity = opacity[0];
      toVars.opacity = opacity[1];
    }

    gsap.set(el, fromVars);
    tl.to(el, toVars);

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, [speed, yRange, xRange, rotate, scale, opacity, scrub, start, end]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

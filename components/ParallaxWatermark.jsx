"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxWatermark — Tipografia Monumental em Parallax de Fundo
 *
 * Exibe textos imponentes em outline/transparência de baixa opacidade
 * que deslizam suavemente pelo fundo durante a transição de rolagem.
 *
 * Props:
 *   text      — Texto da marca d'água (ex: "S.D.F.H.", "ORIGEM", "LINEUP")
 *   speed     — Velocidade de deslocamento vertical (padrão: 0.35)
 *   position  — "top-left" | "top-right" | "center" | "bottom-right" | "bottom-left"
 *   direction — "up" (sobe contra o scroll) | "down" (desce com o scroll)
 *   className — Classes adicionais
 */
export default function ParallaxWatermark({
  text = "S.D.F.H.",
  speed = 0.35,
  position = "center",
  direction = "up",
  className = "",
  size = "text-[14vw]",
}) {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const moveDistance = speed * 220 * (direction === "up" ? -1 : 1);

    const tween = gsap.fromTo(
      el,
      { y: -moveDistance * 0.6 },
      {
        y: moveDistance * 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, [speed, direction]);

  const positionClasses = {
    "center": "inset-0 flex items-center justify-center text-center",
    "top-left": "top-0 left-0 text-left pt-10 pl-6",
    "top-right": "top-0 right-0 text-right pt-10 pr-6",
    "bottom-left": "bottom-0 left-0 text-left pb-10 pl-6",
    "bottom-right": "bottom-0 right-0 text-right pb-10 pr-6",
  }[position] || "inset-0 flex items-center justify-center text-center";

  return (
    <div
      className={`absolute ${positionClasses} pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <span
        ref={textRef}
        className={`font-black uppercase tracking-tighter ${size} font-mono leading-none text-transparent opacity-[0.035] hover:opacity-[0.06] transition-opacity duration-700 whitespace-nowrap will-change-transform block`}
        style={{
          WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.4)",
          textShadow: "0 0 80px rgba(220, 38, 38, 0.15)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

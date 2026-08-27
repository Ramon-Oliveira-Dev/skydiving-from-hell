"use client";

import React, { useRef, useEffect, Children, cloneElement, isValidElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — Componente GSAP ScrollTrigger para Reveal Cinematográfico
 *
 * Cada elemento filho surge de baixo para cima (ou outra direção)
 * com desaceleração pesada (power4.out) quando entra no campo de visão.
 *
 * Props:
 *   direction  — 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'
 *   delay      — atraso em ms antes de iniciar (converte para segundos internamente)
 *   duration   — duração da animação em ms (converte para segundos internamente)
 *   threshold  — posição do trigger (ex: "top 90%" significa quando o topo do elemento
 *                atinge 90% da viewport)
 *   stagger    — atraso escalonado entre filhos diretos (em segundos)
 *   once       — se true, anima apenas uma vez (padrão: true)
 *   className  — classes CSS passadas ao wrapper
 */
export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 900,
  threshold = "top 92%",
  stagger = 0,
  once = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Calcula deslocamento — stagger mode usa y:100 para cascata pesada
    const isStaggerMode = stagger > 0;
    const fromVars = { opacity: 0 };

    switch (direction) {
      case "up":
        fromVars.y = isStaggerMode ? 100 : 50;
        break;
      case "down":
        fromVars.y = isStaggerMode ? -100 : -50;
        break;
      case "left":
        fromVars.x = 60;
        break;
      case "right":
        fromVars.x = -60;
        break;
      case "zoom":
        fromVars.scale = 0.88;
        break;
      case "fade":
      default:
        break;
    }

    const toVars = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: duration / 1000,
      delay: delay / 1000,
      ease: isStaggerMode ? "power3.out" : "power4.out",
      stagger: stagger,
      scrollTrigger: {
        trigger: el,
        start: threshold,
        toggleActions: once
          ? "play none none none"
          : "play reverse play reverse",
      },
    };

    // Resolução inteligente de alvos para stagger:
    //   - Sem stagger → anima o container inteiro
    //   - Com stagger + múltiplos filhos → anima os filhos diretos
    //   - Com stagger + 1 filho (grid wrapper) → atravessa e anima os netos (cards)
    let target = el;
    if (isStaggerMode) {
      if (el.children.length > 1) {
        target = el.children;
      } else if (el.children.length === 1 && el.children[0].children.length > 1) {
        target = el.children[0].children;
      }
    }

    // Define o estado inicial
    gsap.set(target, fromVars);

    // Anima para o estado final com ScrollTrigger
    const tween = gsap.to(target, toVars);

    return () => {
      tween.kill();
      // Limpa o ScrollTrigger associado
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, [direction, delay, duration, threshold, stagger, once]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}

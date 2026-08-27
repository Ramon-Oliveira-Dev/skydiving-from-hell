"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal - Componente de Animação Bidirecional Inteligente por Scroll
 *
 * Suporta animação bidirecional (ao rolar para baixo E ao rolar para cima).
 *
 * Ao rolar para BAIXO:
 *  - Entra vindo de baixo (translateY: 45px -> 0, opacity: 0 -> 1)
 *  - Sai subindo pelo topo (translateY: 0 -> -45px, opacity: 1 -> 0)
 *
 * Ao rolar para CIMA (Efeito Inverso):
 *  - Entra vindo de cima (translateY: -45px -> 0, opacity: 0 -> 1)
 *  - Sai caindo pelo fundo (translateY: 0 -> 45px, opacity: 1 -> 0)
 */
export default function ScrollReveal({
  children,
  className = "",
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'
  delay = 0, // em milissegundos
  duration = 700, // em milissegundos
  threshold = 0.12,
  once = false, // Padrão agora é false para permitir animação bidirecional ao rolar para cima
}) {
  const [status, setStatus] = useState("hidden-bottom"); // 'hidden-bottom' | 'visible' | 'hidden-top'
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus("visible");
          if (once) observer.unobserve(el);
        } else if (!once) {
          // Determina se o elemento saiu pelo topo ou pelo fundo da viewport
          if (entry.boundingClientRect.top < 0) {
            setStatus("hidden-top");
          } else {
            setStatus("hidden-bottom");
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  // Retorna a transformação de acordo com a posição (visível, acima da tela ou abaixo da tela)
  const getTransform = () => {
    if (status === "visible") {
      return "translate3d(0, 0, 0) scale(1)";
    }

    if (status === "hidden-top") {
      // Elemento está acima da área visível (saiu pelo topo)
      switch (direction) {
        case "up":
          return "translate3d(0, -45px, 0)";
        case "down":
          return "translate3d(0, 45px, 0)";
        case "left":
          return "translate3d(-45px, 0, 0)";
        case "right":
          return "translate3d(45px, 0, 0)";
        case "zoom":
          return "scale(0.92)";
        case "fade":
        default:
          return "translate3d(0, 0, 0)";
      }
    }

    // status === 'hidden-bottom' (Elemento está abaixo da área visível - entrou/saiu pelo fundo)
    switch (direction) {
      case "up":
        return "translate3d(0, 45px, 0)";
      case "down":
        return "translate3d(0, -45px, 0)";
      case "left":
        return "translate3d(45px, 0, 0)";
      case "right":
        return "translate3d(-45px, 0, 0)";
      case "zoom":
        return "scale(0.92)";
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: status === "visible" ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

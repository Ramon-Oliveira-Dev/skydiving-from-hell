"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll - Provedor de Rolagem Suave de Alta Performance (Lenis + GSAP ScrollTrigger)
 *
 * Aplica inércia ultra-suave na rolagem do mouse e touch, perfeitamente sincronizado a 60/120 FPS
 * com as timelines do GSAP ScrollTrigger, transições de âncoras e disparos de áudio.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: true,
      infinite: false,
    });

    // Disponibiliza instância globalmente para chamadas programáticas (ex: scrollTo)
    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    let hasTriggeredAudio = false;

    // Sincronização em tempo real do Lenis com o GSAP ScrollTrigger
    const handleScrollSync = () => {
      ScrollTrigger.update();

      if (!hasTriggeredAudio) {
        const audio = document.querySelector("audio");
        if (audio && audio.paused) {
          const promise = audio.play();
          if (promise !== undefined) {
            promise
              .then(() => {
                hasTriggeredAudio = true;
              })
              .catch(() => {});
          }
        }
      }
    };

    lenis.on("scroll", handleScrollSync);
    window.addEventListener("scroll", handleScrollSync, { passive: true });

    // Conecta o RAF do Lenis ao Ticker do GSAP (convertendo segundos para ms)
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Suaviza navegação em links com âncoras (#player, #lineup, #bio, etc.)
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -70,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      } else if (href === "#") {
        e.preventDefault();
        lenis.scrollTo(0, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Atualiza cálculos do ScrollTrigger quando a página carrega completamente
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete window.lenis;
      }
    };
  }, []);

  return <>{children}</>;
}


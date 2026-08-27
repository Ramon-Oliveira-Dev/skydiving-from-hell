"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll - Provedor de Rolagem Suave de Alta Performance (Lenis + GSAP)
 *
 * Aplica inércia ultra-suave na rolagem do mouse e touch, sincronizado a 60+ FPS
 * com as animações de ScrollTrigger e acionador de áudio no primeiro scroll.
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
      touchMultiplier: 1.5,
    });

    let hasTriggeredAudio = false;

    // Sincronização em tempo real do Lenis com o GSAP e reprodução de áudio no scroll
    lenis.on("scroll", (e) => {
      ScrollTrigger.update(e);

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
    });

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrollytelling — Sequência cinematográfica em duas fases
 *
 * FASE 1: Hero com vídeo em loop (hero_page.mp4 — logo em chamas)
 *   → Ocupa 100vh, rola normalmente revelando a Fase 2.
 *
 * FASE 2: Scrollytelling com vídeo de scrubbing (hero_page2_scroll.mp4)
 *   → Pinned pelo GSAP, timeline controlada pelo scroll.
 *   → Legenda 1: "A Origem" (Centro).
 *   → Legenda 2: "A Máquina Rítmica" (Canto inferior esquerdo).
 *   → Transição de fumaça e escurecimento para Manifesto & História.
 */
export default function HeroScrollytelling() {
  // ─── Refs ────────────────────────────────────────────────────────────────
  const phase2Ref = useRef(null);       // <section> da Fase 2 (trigger do pin)
  const video2Ref = useRef(null);       // <video> do scroll (hero_page2_scroll.mp4)
  const panel1Ref = useRef(null);       // Legenda "A Origem"
  const panel2Ref = useRef(null);       // Legenda "A Máquina Rítmica" (canto inferior esquerdo)
  const accent1Ref = useRef(null);      // Linha de acento painel 1
  const accent2Ref = useRef(null);      // Linha de acento painel 2
  const smokeOverlayRef = useRef(null); // Efeito de fumaça volumétrica
  const darkFadeRef = useRef(null);     // Efeito de escurecimento transicional

  // ─── GSAP & HIGH-PERFORMANCE VIDEO SCRUBBING ENGINE ─────────────────────
  useEffect(() => {
    const section      = phase2Ref.current;
    const video        = video2Ref.current;
    const panel1       = panel1Ref.current;
    const panel2       = panel2Ref.current;
    const accent1      = accent1Ref.current;
    const accent2      = accent2Ref.current;
    const smokeOverlay = smokeOverlayRef.current;
    const darkFade     = darkFadeRef.current;

    if (!section || !video) return;

    // Configurações críticas para scrubbing sem travamento
    video.muted       = true;
    video.playsInline = true;
    video.pause();

    const ctx = gsap.context(() => {
      // Estado inicial dos painéis
      gsap.set([panel1, panel2], { opacity: 0, pointerEvents: "none" });
      gsap.set([accent1, accent2], { scaleX: 0, transformOrigin: "left center" });
      gsap.set([smokeOverlay, darkFade], { opacity: 0 });

      let targetTime = 0;
      let isSeeking = false;

      const handleSeeking = () => {
        isSeeking = true;
      };

      const handleSeeked = () => {
        isSeeking = false;
        // Se o scroll avançou enquanto buscava o frame, atualiza para o targetTime mais recente
        if (video && Math.abs(video.currentTime - targetTime) > 0.04) {
          try {
            if (typeof video.fastSeek === "function") {
              video.fastSeek(targetTime);
            } else {
              video.currentTime = targetTime;
            }
          } catch (_) {}
        }
      };

      video.addEventListener("seeking", handleSeeking);
      video.addEventListener("seeked", handleSeeked);

      // Função que constrói a timeline quando os metadados do vídeo estiverem prontos
      const buildTimeline = () => {
        // Garante que a duração seja válida
        const videoDuration =
          video.duration && isFinite(video.duration) && video.duration > 0
            ? video.duration
            : 10;

        // Deixa 0.04s antes do fim absoluto para exibir o último frame nítido sem resetar
        const maxSeekTime = Math.max(0.1, videoDuration - 0.04);

        // Timeline sincronizada com o ScrollTrigger (Pinning + Smooth Scrub)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=5000",
            scrub: 0.3, // scrubbing amortecido para suavidade máxima
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              targetTime = self.progress * maxSeekTime;

              // Atualiza o frame do vídeo de forma não-bloqueante
              if (!isSeeking && video) {
                try {
                  if (typeof video.fastSeek === "function") {
                    video.fastSeek(targetTime);
                  } else {
                    video.currentTime = targetTime;
                  }
                } catch (_) {}
              }
            },
          },
        });

        // ── PAINEL 1: A ORIGEM (Centro: 0.5 até 2.5) ──────────────────────
        tl.fromTo(
          panel1,
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out", pointerEvents: "auto" },
          0.5
        );
        tl.to(
          accent1,
          { scaleX: 1, duration: 0.8, ease: "power2.out" },
          0.7
        );
        tl.to(
          accent1,
          { scaleX: 0, transformOrigin: "right center", duration: 0.4, ease: "power2.in" },
          2.6
        );
        tl.to(
          panel1,
          { opacity: 0, y: -30, scale: 0.98, duration: 0.8, ease: "power2.in", pointerEvents: "none" },
          2.6
        );

        // ── PAINEL 2: A MÁQUINA RÍTMICA (Canto Inferior Esquerdo: 3.8 até 6.5) ──
        tl.fromTo(
          panel2,
          { opacity: 0, x: -50, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power4.out", pointerEvents: "auto" },
          3.8
        );
        tl.to(
          accent2,
          { scaleX: 1, duration: 0.8, ease: "power2.out" },
          4.0
        );
        tl.to(
          accent2,
          { scaleX: 0, transformOrigin: "left center", duration: 0.4, ease: "power2.in" },
          6.4
        );
        tl.to(
          panel2,
          { opacity: 0, x: -30, y: 10, duration: 0.8, ease: "power2.in", pointerEvents: "none" },
          6.4
        );

        // ── TRANSIÇÃO FINAL: Fumaça Volumétrica e Escurecimento para Manifesto (8.5 até 10.0) ──
        tl.to(
          [smokeOverlay, darkFade],
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          8.5
        );
      };

      let hasBuilt = false;
      const handleMetadata = () => {
        if (hasBuilt) return;
        hasBuilt = true;
        buildTimeline();
      };

      if (video.readyState >= 1) {
        handleMetadata();
      } else {
        video.addEventListener("loadedmetadata", handleMetadata, { once: true });
        video.addEventListener("canplay", handleMetadata, { once: true });
      }

      return () => {
        video.removeEventListener("seeking", handleSeeking);
        video.removeEventListener("seeked", handleSeeked);
        video.removeEventListener("loadedmetadata", handleMetadata);
        video.removeEventListener("canplay", handleMetadata);
      };
    }, phase2Ref);

    return () => {
      ctx.revert();
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ================================================================
          FASE 1 — Hero Inicial (Loop Estático)
          Vídeo com logo em chamas central sem interferência de texto
         ================================================================ */}
      <section className="relative w-full h-[100svh] overflow-hidden overflow-x-hidden bg-black select-none flex items-center justify-center">

        {/* Video em loop — logo em chamas */}
        <video
          poster="/banner_sdfh_dark.png"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="hero__video absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
          style={{ filter: "contrast(1.1) brightness(0.95)" }}
        >
          <source src="/hero1-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/hero_page.mp4" media="(min-width: 768px)" type="video/mp4" />
          <source src="/hero_page.mp4" type="video/mp4" />
        </video>

        {/* UPGRADE VISUAL 1: Vignette / Gradiente Vertical */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/90" />

        {/* UPGRADE VISUAL 2: Scanlines CRT Sutis */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)",
          }}
        />

        {/* UPGRADE VISUAL 3: Indicador de Scroll na Base */}
        <div className="hero__titulo absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 sm:gap-3 pointer-events-none w-full px-4 text-center">
          <p className="text-zinc-300 text-[11px] sm:text-xs font-mono font-bold tracking-[0.35em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            ROLE PARA INICIAR A QUEDA
          </p>
          <div className="animate-bounce flex flex-col items-center gap-1">
            <div className="w-0.5 h-6 bg-gradient-to-b from-transparent to-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      {/* ================================================================
          FASE 2 — Scrollytelling Cinematográfico (hero_page2_scroll.mp4)
          Pinned pelo GSAP. Legendas cinematográficas sequenciais.
         ================================================================ */}
      <section
        ref={phase2Ref}
        className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden overflow-x-hidden bg-black select-none flex items-center justify-center"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <video
            ref={video2Ref}
            src="/hero_page2_scroll.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{ filter: "contrast(1.05) brightness(0.92)" }}
          >
            <source src="/hero_page2_scroll.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>

          {/* Gradientes de fusão Dark Cinematic */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-90 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black pointer-events-none z-10" />
        </div>

        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* ── PAINEL 1: A ORIGEM (Centro) ─────────────────────────────── */}
        <div
          ref={panel1Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-8 pointer-events-none"
        >
          <div className="max-w-2xl flex flex-col items-center">
            {/* Tag de contexto */}
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-red-500/90 mb-4 sm:mb-5 block drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]">
              // A ORIGEM
            </span>

            {/* Título principal */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[1.05] mb-4 sm:mb-5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              O Peso Brutal do{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-none">
                Metal Moderno
              </span>
            </h2>

            {/* Linha de acento animada */}
            <div
              ref={accent1Ref}
              className="w-20 sm:w-28 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-5 sm:mb-6 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
            />

            {/* Parágrafo */}
            <p className="font-mono text-xs sm:text-sm md:text-base text-zinc-300 font-bold max-w-xl leading-relaxed tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Riffs cortantes, afinações pesadas e a energia crua do underground capixaba.
            </p>
          </div>
        </div>

        {/* ── PAINEL 2: A MÁQUINA RÍTMICA (Canto Inferior Esquerdo da Tela) ──────── */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 z-20 flex flex-col items-start justify-end text-left p-6 sm:p-12 md:p-16 pb-12 sm:pb-16 md:pb-20 pointer-events-none"
        >
          <div className="max-w-xl flex flex-col items-start bg-gradient-to-tr from-black/85 via-black/40 to-transparent p-5 sm:p-8 rounded-2xl backdrop-blur-[2px] border border-white/5 shadow-2xl">
            {/* Tag de contexto */}
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-red-500/90 mb-3 sm:mb-4 block drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]">
              // IDENTIDADE SONORA
            </span>

            {/* Título principal */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.05] mb-3 sm:mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              A Máquina{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 drop-shadow-none">
                Rítmica
              </span>
            </h2>

            {/* Linha de acento animada */}
            <div
              ref={accent2Ref}
              className="w-20 sm:w-28 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 sm:mb-5 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
            />

            {/* Parágrafo */}
            <p className="font-mono text-xs sm:text-sm md:text-base text-zinc-300 font-bold max-w-lg leading-relaxed tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Velocidade, técnica e breakdowns devastadores que definem a essência de cada apresentação.
            </p>
          </div>
        </div>

        {/* ── TRANSIÇÃO CINEMATOGRÁFICA: Fumaça Volumétrica & Escurecimento ──── */}
        <div
          ref={smokeOverlayRef}
          className="absolute inset-0 z-30 pointer-events-none opacity-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at bottom, rgba(180, 20, 20, 0.25) 0%, rgba(20, 20, 25, 0.7) 40%, rgba(0, 0, 0, 0.95) 80%), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />

        <div
          ref={darkFadeRef}
          className="absolute inset-0 z-35 pointer-events-none bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950 opacity-0"
        />

      </section>
    </>
  );
}

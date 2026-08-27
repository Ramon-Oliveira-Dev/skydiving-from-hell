"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BotaoMagnetico from "./BotaoMagnetico";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrollytelling — Sequência cinematográfica em duas fases
 *
 * FASE 1: Hero com vídeo em loop (hero_page.mp4 — logo em chamas)
 *   → Ocupa 100vh, rola normalmente revelando a Fase 2.
 *
 * FASE 2: Scrollytelling com vídeo de scrubbing (hero_page2_scroll.mp4 — esqueleto)
 *   → Pinned pelo GSAP, timeline controlada pelo scroll.
 *   → Legendas cinematográficas surgem/somem sequencialmente SEM sobreposição.
 *   → O soldado só salta (final do vídeo) depois que a última legenda desaparece.
 */
export default function HeroScrollytelling() {
  // ─── Refs ────────────────────────────────────────────────────────────────
  const phase2Ref = useRef(null);   // <section> da Fase 2 (trigger do pin)
  const video2Ref = useRef(null);   // <video> do scroll (hero_page2_scroll.mp4)
  const panel1Ref = useRef(null);   // Legenda "A Origem"
  const panel2Ref = useRef(null);   // Legenda "A Máquina Rítmica"
  const panel3Ref = useRef(null);   // Legenda CTA
  const accent1Ref = useRef(null);  // Linha de acento painel 1
  const accent2Ref = useRef(null);  // Linha de acento painel 2

  // ─── GSAP & HIGH-PERFORMANCE VIDEO SCRUBBING ENGINE ─────────────────────
  useEffect(() => {
    const section = phase2Ref.current;
    const video   = video2Ref.current;
    const panel1  = panel1Ref.current;
    const panel2  = panel2Ref.current;
    const panel3  = panel3Ref.current;
    const accent1 = accent1Ref.current;
    const accent2 = accent2Ref.current;

    if (!section || !video) return;

    // Configurações críticas para scrubbing sem travamento
    video.muted       = true;
    video.playsInline = true;
    video.pause();

    const ctx = gsap.context(() => {
      // Estado inicial — tudo invisível e deslocado
      gsap.set([panel1, panel2, panel3], { opacity: 0, pointerEvents: "none" });
      gsap.set([accent1, accent2], { scaleX: 0, transformOrigin: "left center" });

      let targetTime = 0;
      let isSeeking = false;

      const handleSeeking = () => { isSeeking = true; };
      const handleSeeked = () => {
        isSeeking = false;
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

      // Função que constrói a timeline
      const buildTimeline = () => {
        const videoDuration =
          video.duration && isFinite(video.duration) && video.duration > 0
            ? video.duration
            : 10;

        // Deixa 0.04s antes do fim absoluto para exibir o último frame nítido
        const maxSeekTime = Math.max(0.1, videoDuration - 0.04);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=6000",         // Mais espaço = mais controle = mais cinema
            scrub: 0.4,            // Scrubbing amortecido para suavidade máxima
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              targetTime = self.progress * maxSeekTime;

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

        // ── LEGENDA 1: A ORIGEM ─────────────────────────────────────────
        tl.fromTo(
          panel1,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 1.2,
            ease: "power3.out",
            pointerEvents: "auto",
          },
          0.8
        );
        tl.to(
          accent1,
          { scaleX: 1, duration: 1.0, ease: "power2.out" },
          1.0
        );
        tl.to(
          accent1,
          { scaleX: 0, transformOrigin: "right center", duration: 0.5, ease: "power2.in" },
          3.2
        );
        tl.to(
          panel1,
          {
            opacity: 0, y: -30,
            duration: 0.8,
            ease: "power2.in",
            pointerEvents: "none",
          },
          3.2
        );

        // ── LEGENDA 2: A MÁQUINA RÍTMICA ────────────────────────────────
        tl.fromTo(
          panel2,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 1.2,
            ease: "power3.out",
            pointerEvents: "auto",
          },
          4.5
        );
        tl.to(
          accent2,
          { scaleX: 1, duration: 1.0, ease: "power2.out" },
          4.7
        );
        tl.to(
          accent2,
          { scaleX: 0, transformOrigin: "right center", duration: 0.5, ease: "power2.in" },
          6.8
        );
        tl.to(
          panel2,
          {
            opacity: 0, x: 40,
            duration: 0.7,
            ease: "power2.in",
            pointerEvents: "none",
          },
          6.8
        );

        // ── LEGENDA 3: CTA — ASSUMA O CONTROLE ──────────────────────────
        tl.fromTo(
          panel3,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            pointerEvents: "auto",
          },
          8.0
        );
      };

      // Inicializa timeline imediatamente
      buildTimeline();

      // Recalcula limites se metadados demorarem para carregar
      const handleMetadata = () => {
        ScrollTrigger.refresh();
      };
      video.addEventListener("loadedmetadata", handleMetadata, { once: true });
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

        {/* Video em loop — logo em chamas com poster LCP e preload metadata */}
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

        {/* UPGRADE VISUAL 3: Indicador de Scroll na Base — ÚNICO INDICADOR */}
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
          O soldado salta SOMENTE após a última legenda desaparecer.
         ================================================================ */}
      <section
        ref={phase2Ref}
        className="relative w-full h-[75vh] sm:h-[85vh] md:h-screen overflow-hidden overflow-x-hidden bg-black select-none flex items-center justify-center"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <video
            ref={video2Ref}
            src="/hero_page2_scroll.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="w-full h-full object-cover md:object-cover scale-105 sm:scale-100 transition-transform duration-700 select-none pointer-events-none"
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

        {/* ── LEGENDA 1: A ORIGEM (Estilo Subtítulo Cinematográfico) ──── */}
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
              className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-red-600 to-orange-500 mb-4 sm:mb-5 shadow-[0_0_12px_rgba(220,38,38,0.6)]"
            />

            {/* Subtítulo descritivo */}
            <p className="text-zinc-300 text-sm sm:text-lg md:text-xl leading-relaxed font-sans max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Forjado nas ruas de{" "}
              <strong className="text-white font-semibold">Vila Velha / ES</strong>, o S.D.F.H.
              nasceu da colisão entre guitarras de 8 cordas afinadas no abismo e uma
              produção que não pede licença.
            </p>
          </div>
        </div>

        {/* ── LEGENDA 2: A MÁQUINA RÍTMICA (Estilo Subtítulo Lateral) ── */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 z-20 flex flex-col justify-center items-start text-left px-6 sm:px-12 md:px-20 pointer-events-none"
        >
          <div className="max-w-md sm:max-w-lg lg:max-w-xl">
            {/* Tag de contexto */}
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-red-500/90 mb-3 sm:mb-4 block drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]">
              // A MÁQUINA RÍTMICA
            </span>

            {/* Título */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-[1.05] mb-3 sm:mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              Bumbos Duplos.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                Groove Distorcido.
              </span>
            </h2>

            {/* Linha de acento animada */}
            <div
              ref={accent2Ref}
              className="w-20 sm:w-28 h-[2px] bg-gradient-to-r from-red-600 to-orange-500 mb-3 sm:mb-4 shadow-[0_0_12px_rgba(220,38,38,0.6)]"
            />

            {/* Subtítulo */}
            <p className="text-zinc-300 text-sm sm:text-lg leading-relaxed font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              O coração da banda bate em{" "}
              <strong className="text-white font-semibold">blast beats avassaladores</strong> e
              síncopas que transformam cada breakdown em um colapso sonoro
              calculado. Nenhum compasso é desperdiçado.
            </p>
          </div>
        </div>

        {/* ── LEGENDA 3: CTA — ASSUMA O CONTROLE ─────────────────────── */}
        <div
          ref={panel3Ref}
          className="absolute bottom-20 left-0 right-0 z-20 flex flex-col items-center text-center px-6"
        >
          {/* Glow de fundo nos botões */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/20 blur-[100px] rounded-full pointer-events-none -z-10" />

          <span className="font-mono text-xs uppercase tracking-[0.4em] text-red-500/90 font-bold mb-6 block drop-shadow-md">
            // ASSUMA O CONTROLE
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-lg justify-center">
            
            {/* Botão Primário — Gradiente + Glow de Alta Conversão com Física Magnética */}
            <BotaoMagnetico as="a"
              href="https://spoti.fi/2JmeZmW"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-mono font-bold text-xs uppercase tracking-widest text-center shadow-[0_0_30px_rgba(239,68,68,0.55)] hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] transition-all duration-300 active:scale-95 hover:scale-105 border border-red-400/30 flex items-center justify-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Ouvir Singles</span>
              <span className="text-white/80 group-hover:translate-x-1 transition-transform">↗</span>
            </BotaoMagnetico>

            {/* Botão Secundário — Glassmorphism Premium */}
            <a
              href="#tour"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-red-500/60 text-white hover:text-white font-mono font-bold text-xs uppercase tracking-widest text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 active:scale-95 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Ver Agenda</span>
              <span className="text-red-500 group-hover:translate-x-1 transition-transform">↗</span>
            </a>

          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrollytelling — Sequencia cinematografica em duas fases
 *
 * FASE 1: Hero com video em loop (hero_page.mp4 — logo em chamas)
 *   → Ocupa 100vh, rola normalmente revelando a Fase 2.
 *
 * FASE 2: Scrollytelling com video de scrubbing (hero_page2_scroll.mp4 — esqueleto)
 *   → Pinned pelo GSAP, timeline controlada pelo scroll.
 *   → Tres paineis de texto surgem/somem em sincronia com o video.
 */
export default function HeroScrollytelling() {
  // ─── Refs ────────────────────────────────────────────────────────────────
  const phase2Ref = useRef(null);   // <section> da Fase 2 (trigger do pin)
  const video2Ref = useRef(null);   // <video> do scroll (hero_page2_scroll.mp4)
  const panel1Ref = useRef(null);   // Painel "A Origem"
  const panel2Ref = useRef(null);   // Painel "A Maquina Ritmica"
  const panel3Ref = useRef(null);   // Painel CTA

  // ─── GSAP & HIGH-PERFORMANCE VIDEO SCRUBBING ENGINE ─────────────────────
  useEffect(() => {
    const section = phase2Ref.current;
    const video   = video2Ref.current;
    const panel1  = panel1Ref.current;
    const panel2  = panel2Ref.current;
    const panel3  = panel3Ref.current;

    if (!section || !video) return;

    // Configurações críticas para scrubbing sem travamento
    video.muted       = true;
    video.playsInline = true;
    video.pause();

    const ctx = gsap.context(() => {
      // Estado inicial dos painéis
      gsap.set([panel1, panel2, panel3], { opacity: 0, pointerEvents: "none" });

      let targetTime = 0;
      let isSeeking = false;

      const handleSeeking = () => { isSeeking = true; };
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
        // Garante que a duração seja válida e calcula o limite seguro para evitar EOF freeze
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

        // ── SINCRONIA DOS PAINÉIS NARRATIVOS (0.0 até 1.0) ───────────────────
        
        // PAINEL 1: A Origem (Início da descida: 5% a 28%)
        tl.fromTo(
          panel1,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", pointerEvents: "auto" },
          0.5
        ).to(
          panel1,
          { opacity: 0, y: -30, duration: 1.0, ease: "power2.in", pointerEvents: "none" },
          2.5
        );

        // PAINEL 2: A Máquina Rítmica (Meio do vídeo / caminhada: 38% a 65%)
        tl.fromTo(
          panel2,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1.5, ease: "power2.out", pointerEvents: "auto" },
          4.0
        ).to(
          panel2,
          { opacity: 0, x: 50, duration: 1.0, ease: "power2.in", pointerEvents: "none" },
          6.5
        );

        // PAINEL 3: CTA & Decolagem (Final / Salto: 75% até 100% - PERMANECE)
        tl.fromTo(
          panel3,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.8,
            ease: "back.out(1.5)",
            pointerEvents: "auto",
          },
          7.6
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
      }
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
      <section className="relative w-screen h-screen overflow-hidden bg-black select-none">

        {/* Video em loop — logo em chamas (enquadramento mobile & desktop) */}
        <video
          src="/hero_page.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain sm:object-cover object-center z-0 pointer-events-none"
          style={{ filter: "contrast(1.1) brightness(0.95)" }}
        />

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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 sm:gap-3 pointer-events-none w-full px-4 text-center">
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
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      {/* ================================================================
          FASE 2 — Scrollytelling com scrubbing (hero_page2_scroll.mp4)
          Pinned pelo GSAP. Timeline controlada pelo scroll.
         ================================================================ */}
      <section
        ref={phase2Ref}
        className="relative w-screen h-screen overflow-hidden bg-black select-none"
      >
        {/* Video de scrubbing — esqueleto pulando do aviao (enquadramento mobile & desktop) */}
        <video
          ref={video2Ref}
          src="/hero_page2_scroll.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain sm:object-cover object-center z-0 pointer-events-none"
          style={{ filter: "contrast(1.05) brightness(0.92)" }}
        />

        {/* Overlay atmosferico */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-black/45" />
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* ── PAINEL 1: A ORIGEM (GLASSMORPHISM ELEGANTE) ─────────────── */}
        <div
          ref={panel1Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
        >
          <div className="bg-black/65 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] max-w-xl flex flex-col items-center">
            <span className="inline-block px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/30 font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-red-400 mb-4">
              // A ORIGEM
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-4">
              O Peso Brutal do{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                Metal Moderno
              </span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              Forjado nas ruas de{" "}
              <strong className="text-white">Vila Velha / ES</strong>, o S.D.F.H.
              nasceu da colisão entre guitarras de 8 cordas afinadas no abismo e uma
              produção que não pede licença.
            </p>
          </div>
        </div>

        {/* ── PAINEL 2: A MÁQUINA RÍTMICA (GLASSMORPHISM COMPACTO LATERAL) ── */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 z-20 flex flex-col justify-center items-start text-left px-6 sm:px-12 md:px-20 pointer-events-none"
        >
          <div className="bg-black/70 backdrop-blur-xl border border-white/10 border-l-4 border-l-red-600 rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_0_rgba(0,0,0,0.85)] max-w-md lg:max-w-lg pointer-events-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-red-400 mb-3">
              // A MÁQUINA RÍTMICA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight mb-3">
              Bumbos Duplos.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
                Groove Distorcido.
              </span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              O coração da banda bate em{" "}
              <strong className="text-white">blast beats avassaladores</strong> e
              síncopas que transformam cada breakdown em um colapso sonoro
              calculado. Nenhum compasso é desperdiçado.
            </p>
          </div>
        </div>

        {/* ── PAINEL 3: CTA (MODERN DARK CINEMATIC) ────────────────────── */}
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
            
            {/* Botão Primário — Gradiente + Glow de Alta Conversão */}
            <a
              href="https://spoti.fi/2JmeZmW"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-mono font-bold text-xs uppercase tracking-widest text-center shadow-[0_0_30px_rgba(239,68,68,0.55)] hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] transition-all duration-300 active:scale-95 hover:scale-105 border border-red-400/30 flex items-center justify-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Ouvir Singles</span>
              <span className="text-white/80 group-hover:translate-x-1 transition-transform">↗</span>
            </a>

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

        {/* Indicador discreto de progresso */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-zinc-600 text-[9px] tracking-widest font-mono uppercase pointer-events-none">
          <span>scroll</span>
          <div className="w-px h-4 bg-zinc-700 animate-pulse" />
        </div>
      </section>
    </>
  );
}

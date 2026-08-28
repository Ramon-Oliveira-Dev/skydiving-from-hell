"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypewriterTitle from "./ui/type-writer";
import Particles from "./ui/particles";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrollytelling — Hero Cinematográfico Dark Metal com Logotipo Oficial e Partículas WebGL (React Bits)
 *
 * ESTRUTURA:
 *   → Fundo: Partículas WebGL fluidas e interativas ao mouse/touch nas cores carmesim, dourado e âmbar.
 *   → Centro: Logotipo oficial branco "Skydiving From Hell" com glow volumétrico carmesim.
 *   → Cards Suavizados com Glassmorphism refinado e tipografia equilibrada.
 *   → Efeitos dos Cards:
 *       • Indicador inicial com Typewriter no rodapé.
 *       • Painel 1 ("A Origem"): Canto Superior Direito com transição suave, acento elegante e Typewriter.
 *       • Painel 2 ("A Máquina Rítmica"): Canto Inferior Esquerdo com proporções harmônicas e Typewriter.
 *       • Transição volumétrica de fumaça e fade escuro para o Manifesto.
 */
export default function HeroScrollytelling() {
  // ─── Refs ────────────────────────────────────────────────────────────────
  const phase2Ref = useRef(null);       // <section> do Hero Scrollytelling (trigger do pin)
  const logoRef = useRef(null);         // Logotipo oficial central
  const particlesRef = useRef(null);   // Container das partículas 3D
  const indicatorRef = useRef(null);   // Indicador inicial de rolagem
  const panel1Ref = useRef(null);       // Legenda "A Origem" (Canto Superior Direito)
  const panel2Ref = useRef(null);       // Legenda "A Máquina Rítmica" (Canto Inferior Esquerdo)
  const accent1Ref = useRef(null);      // Linha de acento painel 1
  const accent2Ref = useRef(null);      // Linha de acento painel 2
  const smokeOverlayRef = useRef(null); // Efeito de fumaça volumétrica
  const darkFadeRef = useRef(null);     // Efeito de escurecimento transicional

  // ─── GSAP SCROLLYTELLING ENGINE ──────────────────────────────────────────
  useEffect(() => {
    const section      = phase2Ref.current;
    const logo         = logoRef.current;
    const particles    = particlesRef.current;
    const indicator    = indicatorRef.current;
    const panel1       = panel1Ref.current;
    const panel2       = panel2Ref.current;
    const accent1      = accent1Ref.current;
    const accent2      = accent2Ref.current;
    const smokeOverlay = smokeOverlayRef.current;
    const darkFade     = darkFadeRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // Estado inicial dos painéis
      if (indicator) gsap.set(indicator, { opacity: 1, y: 0 });
      if (logo) gsap.set(logo, { opacity: 1, scale: 1, y: 0 });
      gsap.set([panel1, panel2], { opacity: 0, pointerEvents: "none" });
      gsap.set(accent1, { scaleX: 0, transformOrigin: "right center" });
      gsap.set(accent2, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([smokeOverlay, darkFade], { opacity: 0 });

      // Timeline sincronizada com o ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3600",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── REAÇÃO DAS PARTÍCULAS AO SCROLL ────────────────────────────────
      if (particles) {
        tl.fromTo(
          particles,
          { scale: 1, opacity: 0.95 },
          { scale: 1.25, opacity: 0.45, ease: "none" },
          0
        );
      }

      // ── LOGO OFICIAL CENTRAL: Mantém-se fixa e visível durante a exibição dos cards ─
      if (logo) {
        tl.to(
          logo,
          {
            opacity: 0,
            scale: 0.9,
            y: -25,
            duration: 1.2,
            ease: "power2.inOut",
          },
          7.2
        );
      }

      // ── INDICADOR DE SCROLL: Fade Out inicial ao começar a rolar ────────
      if (indicator) {
        tl.to(
          indicator,
          { opacity: 0, y: -20, duration: 0.3, ease: "power2.in", pointerEvents: "none" },
          0.02
        );
      }

      // ── PAINEL 1: A ORIGEM (Canto Superior Direito: 0.5 até 2.4) ────────
      tl.fromTo(
        panel1,
        { opacity: 0, x: 40, y: -15 },
        { opacity: 1, x: 0, y: 0, duration: 1.1, ease: "power3.out", pointerEvents: "auto" },
        0.5
      );
      tl.to(
        accent1,
        { scaleX: 1, duration: 0.7, ease: "power2.out" },
        0.7
      );
      tl.to(
        accent1,
        { scaleX: 0, transformOrigin: "left center", duration: 0.4, ease: "power2.in" },
        2.4
      );
      tl.to(
        panel1,
        { opacity: 0, x: 30, y: -10, duration: 0.7, ease: "power2.in", pointerEvents: "none" },
        2.4
      );

      // ── PAINEL 2: A MÁQUINA RÍTMICA (Canto Inferior Esquerdo: 3.6 até 6.4) ──
      tl.fromTo(
        panel2,
        { opacity: 0, x: -45, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power3.out", pointerEvents: "auto" },
        3.6
      );
      tl.to(
        accent2,
        { scaleX: 1, duration: 0.8, ease: "power2.out" },
        3.8
      );
      tl.to(
        accent2,
        { scaleX: 0, transformOrigin: "left center", duration: 0.4, ease: "power2.in" },
        6.4
      );
      tl.to(
        panel2,
        { opacity: 0, x: -30, y: 10, duration: 0.7, ease: "power2.in", pointerEvents: "none" },
        6.4
      );

      // ── TRANSIÇÃO FINAL: Fumaça Volumétrica e Escurecimento para Manifesto (8.5 até 10.0) ──
      tl.to(
        [smokeOverlay, darkFade],
        {
          opacity: 1,
          duration: 1.4,
          ease: "power2.inOut",
        },
        8.5
      );
    }, phase2Ref);

    return () => {
      ctx.revert();
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={phase2Ref}
      className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden overflow-x-hidden bg-black select-none flex items-center justify-center"
    >
      {/* ── PARTICLES SHADER PROCEDURAL (REACT BITS) ──────────────────── */}
      <div
        ref={particlesRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] xs:w-[460px] xs:h-[460px] sm:w-[680px] sm:h-[680px] md:w-[860px] md:h-[860px] lg:w-[1080px] lg:h-[1080px] max-w-[100vw] max-h-[100svh] aspect-square pointer-events-auto z-0 flex items-center justify-center will-change-transform"
      >
        <Particles
          particleCount={200}
          particleSpread={29}
          speed={1.06}
          particleColors={["#710202", "#96750f", "#934006"]}
          moveParticlesOnHover={true}
          particleHoverFactor={2.8}
          alphaParticles={true}
          particleBaseSize={120}
          sizeRandomness={1.7}
          cameraDistance={80}
          disableRotation={true}
        />
      </div>

      {/* ── LOGO OFICIAL CENTRAL (Skydiving From Hell) ──────────────── */}
      <div
        ref={logoRef}
        className="hero__logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center pointer-events-none px-3 sm:px-4 w-full max-w-5xl"
      >
        <div className="relative w-full max-w-[240px] xs:max-w-[300px] sm:max-w-[560px] md:max-w-[700px] lg:max-w-[840px] flex items-center justify-center filter drop-shadow-[0_0_35px_rgba(239,68,68,0.45)] hover:drop-shadow-[0_0_55px_rgba(239,68,68,0.8)] transition-all duration-500">
          <Image
            src="/logo branca Skydiving From Hell.png"
            alt="Skydiving From Hell — Logotipo Oficial"
            width={960}
            height={320}
            priority
            className="w-full h-auto object-contain max-h-[30vh] sm:max-h-[42vh] select-none"
          />
        </div>
      </div>

      {/* ── INDICADOR DE SCROLL SUAVIZADO ───────────────────────────── */}
      <div
        ref={indicatorRef}
        className="hero__titulo absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-none w-full px-3 sm:px-4 text-center"
      >
        <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.2)] flex items-center justify-center max-w-[90vw]">
          <TypewriterTitle
            sequences={[
              { text: "ROLE PARA INICIAR A QUEDA", deleteAfter: true, pauseAfter: 2600 },
              { text: "SKYDIVING FROM HELL // S.D.F.H.", deleteAfter: true, pauseAfter: 2000 },
              { text: "METAL MODERNO & 8 CORDAS", deleteAfter: true, pauseAfter: 2000 },
              { text: "VILA VELHA - ES // BRASIL", deleteAfter: true, pauseAfter: 2000 },
              { text: "PRÓXIMO SHOW: 05/10 • CORRERIA MUSIC BAR", deleteAfter: true, pauseAfter: 2500 },
            ]}
            typingSpeed={38}
            deleteSpeed={18}
            autoLoop={true}
            loopDelay={800}
            textClassName="text-zinc-300 text-[9px] xs:text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase truncate"
            cursorClassName="bg-red-500 h-[1em] w-[2px] shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          />
        </div>
        <div className="animate-bounce flex flex-col items-center gap-1">
          <div className="w-0.5 h-3 sm:h-5 bg-gradient-to-b from-transparent to-red-600/80 shadow-[0_0_6px_rgba(220,38,38,0.6)]" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500/90 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* ── PAINEL 1: A ORIGEM (Canto Superior Direito — Suavizado) ──── */}
      <div
        ref={panel1Ref}
        className="absolute inset-0 z-20 flex flex-col items-end justify-start text-right p-3 xs:p-5 sm:p-8 md:p-12 pt-14 xs:pt-16 sm:pt-20 md:pt-24 pointer-events-none"
      >
        <div className="w-full max-w-[88vw] xs:max-w-sm sm:max-w-lg flex flex-col items-end text-right bg-zinc-950/80 border border-white/[0.08] hover:border-red-500/30 p-3.5 xs:p-5 sm:p-7 rounded-2xl backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.7)] transition-all">
          {/* Tag de contexto */}
          <div className="mb-1.5 sm:mb-2.5 flex justify-end">
            <TypewriterTitle
              prefix="//"
              prefixClassName="text-red-500 font-mono font-medium text-[10px] sm:text-[11px]"
              sequences={[
                { text: "A ORIGEM", deleteAfter: true, pauseAfter: 3500 },
                { text: "S.D.F.H. // 2016", deleteAfter: true, pauseAfter: 2200 },
                { text: "ESPÍRITO SANTO", deleteAfter: true, pauseAfter: 2200 },
              ]}
              typingSpeed={40}
              deleteSpeed={20}
              autoLoop={true}
              loopDelay={1000}
              textClassName="font-mono text-[9px] xs:text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-red-400"
              cursorClassName="bg-red-500 h-[1em] w-[1.5px]"
            />
          </div>

          {/* Título principal suavizado */}
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase text-white tracking-tight leading-snug mb-1.5 sm:mb-2.5">
            O Peso Brutal do{" "}
            <TypewriterTitle
              sequences={[
                { text: "Metal Moderno", deleteAfter: true, pauseAfter: 3500 },
                { text: "Deathcore", deleteAfter: true, pauseAfter: 2500 },
                { text: "Sub-Grave 8 Cordas", deleteAfter: true, pauseAfter: 2500 },
                { text: "Underground", deleteAfter: true, pauseAfter: 2500 },
              ]}
              typingSpeed={45}
              deleteSpeed={25}
              autoLoop={true}
              loopDelay={1200}
              textClassName="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-none"
              cursorClassName="bg-orange-500 h-[1em] w-[2px] shadow-[0_0_8px_rgba(249,115,22,0.8)]"
            />
          </h2>

          {/* Linha de acento sutil */}
          <div
            ref={accent1Ref}
            className="w-10 sm:w-20 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-2 sm:mb-3 ml-auto opacity-80"
          />

          {/* Parágrafo com leitura natural e suave */}
          <div className="text-[11px] xs:text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed text-right max-w-md font-sans">
            <TypewriterTitle
              sequences={[
                { text: "Riffs cortantes, afinações pesadas e a energia crua do underground capixaba.", deleteAfter: true, pauseAfter: 4000 },
                { text: "Guitarras de 8 cordas em Drop E combinadas a vocais guturais viscerais.", deleteAfter: true, pauseAfter: 3500 },
                { text: "A evolução sonora do metal extremo moldada no litoral do Espírito Santo.", deleteAfter: true, pauseAfter: 3500 },
              ]}
              typingSpeed={25}
              deleteSpeed={12}
              autoLoop={true}
              loopDelay={1000}
              textClassName="text-zinc-300 text-right"
              cursorClassName="bg-red-500 h-[1em] w-[1.5px]"
            />
          </div>
        </div>
      </div>

      {/* ── PAINEL 2: A MÁQUINA RÍTMICA (Canto Inferior Esquerdo — Suavizado) ── */}
      <div
        ref={panel2Ref}
        className="absolute inset-0 z-20 flex flex-col items-start justify-end text-left p-3 xs:p-5 sm:p-8 md:p-12 pb-14 xs:pb-16 sm:pb-28 md:pb-36 pointer-events-none"
      >
        <div className="w-full max-w-[88vw] xs:max-w-md sm:max-w-xl flex flex-col items-start bg-zinc-950/80 border border-white/[0.08] hover:border-red-500/30 p-3.5 xs:p-5 sm:p-7 rounded-2xl backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.7)] transition-all">
          {/* Tag de contexto */}
          <div className="mb-1.5 sm:mb-2.5">
            <TypewriterTitle
              prefix="//"
              prefixClassName="text-red-500 font-mono font-medium text-[10px] sm:text-[11px]"
              sequences={[
                { text: "IDENTIDADE SONORA", deleteAfter: true, pauseAfter: 3500 },
                { text: "PRECISÃO CIRÚRGICA", deleteAfter: true, pauseAfter: 2200 },
                { text: "TEMPO & POLIRRITMIA", deleteAfter: true, pauseAfter: 2200 },
              ]}
              typingSpeed={40}
              deleteSpeed={20}
              autoLoop={true}
              loopDelay={1000}
              textClassName="font-mono text-[9px] xs:text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-red-400"
              cursorClassName="bg-red-500 h-[1em] w-[1.5px]"
            />
          </div>

          {/* Título principal suavizado */}
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase text-white tracking-tight leading-snug mb-1.5 sm:mb-2.5">
            A Máquina{" "}
            <TypewriterTitle
              sequences={[
                { text: "Rítmica", deleteAfter: true, pauseAfter: 3500 },
                { text: "Devastadora", deleteAfter: true, pauseAfter: 2500 },
                { text: "de Breakdowns", deleteAfter: true, pauseAfter: 2500 },
                { text: "Polirrítmica", deleteAfter: true, pauseAfter: 2500 },
              ]}
              typingSpeed={45}
              deleteSpeed={25}
              autoLoop={true}
              loopDelay={1200}
              textClassName="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-red-600 drop-shadow-none"
              cursorClassName="bg-red-500 h-[1em] w-[2px] shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            />
          </h2>

          {/* Linha de acento sutil */}
          <div
            ref={accent2Ref}
            className="w-14 sm:w-20 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 rounded-full mb-3 opacity-80"
          />

          {/* Parágrafo com leitura natural e suave */}
          <div className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-md font-sans">
            <TypewriterTitle
              sequences={[
                { text: "Velocidade, técnica e breakdowns devastadores que definem a essência de cada apresentação.", deleteAfter: true, pauseAfter: 4000 },
                { text: "Bumbos duplos fulminantes sincronizados com o peso esmagador das 8 cordas.", deleteAfter: true, pauseAfter: 3500 },
                { text: "Linhas de baixo com distorção Darkglass que fazem estremecer a estrutura.", deleteAfter: true, pauseAfter: 3500 },
              ]}
              typingSpeed={25}
              deleteSpeed={12}
              autoLoop={true}
              loopDelay={1000}
              textClassName="text-zinc-300"
              cursorClassName="bg-orange-500 h-[1em] w-[1.5px] shadow-[0_0_6px_rgba(249,115,22,0.7)]"
            />
          </div>
        </div>
      </div>

      {/* ── TRANSIÇÃO CINEMATOGRÁFICA: Fumaça Volumétrica & Escurecimento ──── */}
      <div
        ref={smokeOverlayRef}
        className="absolute inset-0 z-30 pointer-events-none opacity-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at bottom, rgba(180, 20, 20, 0.2) 0%, rgba(20, 20, 25, 0.6) 40%, rgba(0, 0, 0, 0.95) 80%), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        ref={darkFadeRef}
        className="absolute inset-0 z-35 pointer-events-none bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950 opacity-0"
      />
    </section>
  );
}

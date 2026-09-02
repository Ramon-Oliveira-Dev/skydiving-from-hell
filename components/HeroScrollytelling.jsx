"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypewriterTitle from "./ui/type-writer";
import Particles from "./ui/particles";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrollytelling — Hero Cinematográfico com Transição Ultra-Rápida e Sem Cards
 *
 * ARQUITETURA DE PERFORMANCE E TRANSIÇÃO DINÂMICA:
 * 1. Sem Cards: Visão 100% limpa e desimpedida do vídeo em tela cheia do início ao fim.
 * 2. Transição Ultra-Rápida (700px mobile / 1100px desktop): Elimina qualquer excesso de rolagem,
 *    conduzindo o usuário com agilidade máxima para a seção do player de música.
 * 3. Parallax de Profundidade no Scroll (Z-Scale 110-125%): Efeito de aproximação hiperbólica na entrada e saída.
 * 4. Particle Fade Zoom & Névoa Volumétrica: Partículas 3D aceleram e dissipam-se em sincronia com a onda de choque
 *    de fumaça escura antes de revelar o player "Unpatriot" emergindo do fundo do abismo.
 */

const TARGET_FRAME_COUNT = 72; // Amostragem de alta fidelidade
const VIDEO_2_DURATION = 9.95;  // Duração útil de hero_2.mp4

/**
 * Desenha a imagem/vídeo cobrindo todo o canvas com recorte proporcional idêntico ao `object-fit: cover`.
 */
function drawImageCover(ctx, img, canvasWidth, canvasHeight) {
  const imgWidth = img.videoWidth || img.width;
  const imgHeight = img.videoHeight || img.height;
  if (!imgWidth || !imgHeight || canvasWidth <= 0 || canvasHeight <= 0) return;

  const hRatio = canvasWidth / imgWidth;
  const vRatio = canvasHeight / imgHeight;
  const ratio = Math.max(hRatio, vRatio);

  const centerShiftX = (canvasWidth - imgWidth * ratio) / 2;
  const centerShiftY = (canvasHeight - imgHeight * ratio) / 2;

  ctx.drawImage(
    img,
    0,
    0,
    imgWidth,
    imgHeight,
    centerShiftX,
    centerShiftY,
    imgWidth * ratio,
    imgHeight * ratio
  );
}

export default function HeroScrollytelling() {
  // ─── Referências de DOM ──────────────────────────────────────────────────
  const phase2Ref = useRef(null);            // Container principal pinned via GSAP
  const hero1ContainerRef = useRef(null);    // Container de hero_1 (Parallax de recuo)
  const sheenRef = useRef(null);             // Onda de luz parallax intermediária
  const hero2ContainerRef = useRef(null);    // Container de hero_2 (Canvas GPU)
  const canvasRef = useRef(null);            // Canvas fullscreen
  const video1Ref = useRef(null);            // Tag video hero_1 (loop contínuo)
  const video2Ref = useRef(null);            // Tag video hero_2 (fonte para decodificação)

  const particlesRef = useRef(null);        // Partículas 3D WebGL
  const indicatorRef = useRef(null);        // Indicador inicial de rolagem
  const smokeBurstRef = useRef(null);        // Onda de choque e dissipação de fumaça (Zoom Parallax)
  const smokeOverlayRef = useRef(null);      // Fumaça volumétrica
  const darkFadeRef = useRef(null);          // Escurecimento de transição final

  // ─── Caches de Estado em Memória GPU ─────────────────────────────────────
  const framesCacheRef = useRef([]);
  const isExtractingRef = useRef(false);
  const lastProgressRef = useRef(0);

  // ─────────────────────────────────────────────────────────────────────────
  // 1. RENDERIZAÇÃO DE FRAMES EM CANVAS GPU
  // ─────────────────────────────────────────────────────────────────────────
  const renderHero2Frame = useCallback((progress) => {
    lastProgressRef.current = progress;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frames = framesCacheRef.current;
    const totalFrames = frames.length;

    if (totalFrames > 0) {
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * (totalFrames - 1)))
      );
      const bitmap = frames[frameIndex];
      if (bitmap) {
        drawImageCover(ctx, bitmap, canvas.width, canvas.height);
        return;
      }
    }

    // Fallback: se os frames ainda estiverem sendo amostrados, desenha do elemento <video>
    const v2 = video2Ref.current;
    if (v2 && v2.readyState >= 2) {
      const targetTime = progress * VIDEO_2_DURATION;
      if (!v2.seeking && Math.abs(v2.currentTime - targetTime) > 0.05) {
        v2.currentTime = targetTime;
      }
      drawImageCover(ctx, v2, canvas.width, canvas.height);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // 2. EXTRAÇÃO EM MEMÓRIA VRAM (ImageBitmap)
  // ─────────────────────────────────────────────────────────────────────────
  const extractFrames = useCallback(async (video) => {
    if (isExtractingRef.current || framesCacheRef.current.length >= TARGET_FRAME_COUNT) return;
    isExtractingRef.current = true;

    const duration = video.duration && !isNaN(video.duration) ? video.duration : VIDEO_2_DURATION;
    const step = duration / (TARGET_FRAME_COUNT - 1);
    const bitmaps = [];

    let offscreenCanvas = null;
    let offscreenCtx = null;
    if (typeof window !== "undefined") {
      offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = video.videoWidth || 720;
      offscreenCanvas.height = video.videoHeight || 1280;
      offscreenCtx = offscreenCanvas.getContext("2d", { alpha: false });
    }

    try {
      for (let i = 0; i < TARGET_FRAME_COUNT; i++) {
        const time = Math.min(i * step, duration - 0.05);

        await new Promise((resolve) => {
          const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            resolve();
          };
          video.addEventListener("seeked", onSeeked);
          video.currentTime = time;
        });

        let bitmap = null;
        if (window.createImageBitmap) {
          try {
            bitmap = await window.createImageBitmap(video);
          } catch {
            if (offscreenCtx && offscreenCanvas) {
              offscreenCtx.drawImage(video, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
              bitmap = await window.createImageBitmap(offscreenCanvas);
            }
          }
        }

        if (bitmap) {
          bitmaps.push(bitmap);
        }
      }

      framesCacheRef.current = bitmaps;
      renderHero2Frame(0);
      ScrollTrigger.refresh();
    } catch {
      // Fallback automático
    } finally {
      isExtractingRef.current = false;
      video.currentTime = 0;
      video.pause();
    }
  }, [renderHero2Frame]);

  // ─────────────────────────────────────────────────────────────────────────
  // 3. INICIALIZAÇÃO DOS VÍDEOS
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    if (v1) {
      v1.muted = true;
      v1.play().catch(() => {});
    }

    if (v2) {
      v2.muted = true;
      v2.pause();
      v2.currentTime = 0;

      const handleReady = () => {
        extractFrames(v2);
      };

      if (v2.readyState >= 2) {
        handleReady();
      } else {
        v2.addEventListener("loadeddata", handleReady, { once: true });
      }
    }

    return () => {
      framesCacheRef.current.forEach((bitmap) => {
        if (bitmap && typeof bitmap.close === "function") {
          bitmap.close();
        }
      });
      framesCacheRef.current = [];
    };
  }, [extractFrames]);

  // ─────────────────────────────────────────────────────────────────────────
  // 4. RESIZE DO CANVAS COM RETINA DPI
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        renderHero2Frame(lastProgressRef.current);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [renderHero2Frame]);

  // ─────────────────────────────────────────────────────────────────────────
  // 5. GSAP SCROLLTRIGGER (TRANSIÇÃO ULTRA-RÁPIDA DIRETA PARA O PLAYER)
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const section        = phase2Ref.current;
    const hero1Container = hero1ContainerRef.current;
    const sheen          = sheenRef.current;
    const hero2Container = hero2ContainerRef.current;
    const particles      = particlesRef.current;
    const indicator      = indicatorRef.current;
    const smokeBurst     = smokeBurstRef.current;
    const smokeOverlay   = smokeOverlayRef.current;
    const darkFade       = darkFadeRef.current;

    if (!section) return;

    const mm = gsap.matchMedia();

    // ─────────────────────────────────────────────────────────────────────────
    // CONFIGURAÇÃO RESPONSIVA E ÁGIL DA TIMELINE
    // ─────────────────────────────────────────────────────────────────────────
    const buildTimeline = (scrollDistance, scrubAmount) => {
      if (indicator) gsap.set(indicator, { opacity: 1, y: 0 });
      if (hero1Container) gsap.set(hero1Container, { yPercent: 0, scale: 1, opacity: 1 });
      if (sheen) gsap.set(sheen, { opacity: 0, yPercent: 20 });
      if (hero2Container) gsap.set(hero2Container, { opacity: 0, yPercent: 18, scale: 1.08 });
      if (smokeBurst) gsap.set(smokeBurst, { opacity: 0, scale: 0.45 });
      gsap.set([smokeOverlay, darkFade], { opacity: 0 });

      renderHero2Frame(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: scrubAmount,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── ETAPA 1: Indicador e Partículas (0.0 a 0.15) ──
      if (indicator) {
        tl.to(indicator, { opacity: 0, y: -20, duration: 0.12, ease: "power2.in" }, 0.01);
      }
      if (particles) {
        tl.to(particles, { scale: 1.15, opacity: 0.45, y: -25, ease: "none" }, 0);
      }

      // ── ETAPA 2: Transição Parallax Z-Scale entre Hero 1 e Hero 2 (0.02 a 0.35) ──
      if (hero1Container) {
        tl.to(
          hero1Container,
          {
            yPercent: -18,
            scale: 1.25, // Z-Scale 125%
            opacity: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          0.02
        );
      }

      if (sheen) {
        tl.fromTo(
          sheen,
          { opacity: 0, yPercent: 25 },
          { opacity: 0.65, yPercent: 0, duration: 0.2, ease: "power2.out" },
          0.08
        );
        tl.to(sheen, { opacity: 0, yPercent: -25, duration: 0.2, ease: "power2.in" }, 0.25);
      }

      if (hero2Container) {
        tl.fromTo(
          hero2Container,
          { opacity: 0, yPercent: 18, scale: 1.08 },
          { opacity: 1, yPercent: 0, scale: 1.0, duration: 0.35, ease: "power2.inOut" },
          0.02
        );
      }

      // ── ETAPA 3: REPRODUÇÃO ÁGIL DE HERO_2 (0.35 a 1.35) ────────
      const scrubObj = { progress: 0 };
      tl.to(
        scrubObj,
        {
          progress: 1,
          duration: 1.0,
          ease: "none",
          onUpdate: () => {
            renderHero2Frame(scrubObj.progress);
          },
        },
        0.35
      );

      if (hero2Container) {
        tl.to(hero2Container, { yPercent: -3, duration: 1.0, ease: "none" }, 0.35);
      }

      // ── ETAPA 4: TRANSIÇÃO PARALLAX Z-SCALE DE HERO 2 PARA A PRÓXIMA TELA (PLAYER) (1.35 a 1.70) ──
      // Aplica exatamente o mesmo efeito de transição de Hero 1 -> Hero 2 na saída para o player
      if (hero2Container) {
        tl.to(
          hero2Container,
          {
            yPercent: -18,
            scale: 1.25, // Z-Scale 125%
            opacity: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          1.35
        );
      }

      if (sheen) {
        tl.fromTo(
          sheen,
          { opacity: 0, yPercent: 25 },
          { opacity: 0.65, yPercent: 0, duration: 0.2, ease: "power2.out" },
          1.40
        );
        tl.to(sheen, { opacity: 0, yPercent: -25, duration: 0.2, ease: "power2.in" }, 1.55);
      }

      if (particles) {
        tl.to(
          particles,
          {
            scale: 1.35,
            opacity: 0,
            y: -35,
            duration: 0.35,
            ease: "power2.inOut",
          },
          1.35
        );
      }

      // Escurecimento suave final para conectar com o fundo da seção do player (#08070a)
      tl.to(smokeOverlay, { opacity: 1, duration: 0.25, ease: "power2.inOut" }, 1.45);
      tl.to(darkFade, { opacity: 1, duration: 0.25, ease: "power2.inOut" }, 1.50);
    };

    // Mobile (< 768px): 700px (1 swipe rápido)
    mm.add("(max-width: 767px)", () => {
      buildTimeline(700, 0.22);
    });

    // Tablet (768px - 1023px): 900px
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      buildTimeline(900, 0.28);
    });

    // Desktop (≥ 1024px): 1100px (rolagem imediata, sem arrasto)
    mm.add("(min-width: 1024px)", () => {
      buildTimeline(1100, 0.32);
    });

    return () => {
      mm.revert();
    };
  }, [renderHero2Frame]);

  return (
    <section
      id="hero"
      ref={phase2Ref}
      className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-black select-none flex items-center justify-center touch-pan-y"
      style={{ touchAction: "pan-y" }}
    >
      {/* ── ELEMENTO DE VÍDEO OFFSCREEN PARA HERO_2 (FONTE DE DECODIFICAÇÃO) ── */}
      <video
        ref={video2Ref}
        src="/hero_2.mp4"
        muted
        playsInline
        preload="auto"
        className="fixed -top-[9999px] -left-[9999px] pointer-events-none opacity-0 invisible"
      />

      {/* ── CAMADA 1: HERO 1 EM LOOP CONTÍNUO (RECUO PARALLAX) ─────────────── */}
      <div
        ref={hero1ContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 will-change-transform"
      >
        <video
          ref={video1Ref}
          src="/hero_1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-[1.08]"
        />
        {/* Vinheta cinematográfica */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/85 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>

      {/* ── CAMADA INTERMEDIÁRIA: ONDA DE LUZ/FOGO PARALLAX (SHEEN) ─────────── */}
      <div
        ref={sheenRef}
        className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-transparent via-red-600/30 to-transparent mix-blend-screen will-change-transform opacity-0"
      />

      {/* ── CAMADA 2: CANVAS FULLSCREEN DE HERO 2 (FRAME SCRUBBING GPU) ─────── */}
      <div
        ref={hero2ContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 will-change-transform overflow-hidden opacity-0"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Vinheta de contraste */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/75 via-transparent to-black/85" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>

      {/* ── CAMADA 3: PARTÍCULAS PROCEDURAIS WEBGL ─────────────────────────── */}
      <div
        ref={particlesRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] xs:w-[460px] xs:h-[460px] sm:w-[680px] sm:h-[680px] md:w-[860px] md:h-[860px] lg:w-[1080px] lg:h-[1080px] aspect-square pointer-events-none z-20 flex items-center justify-center opacity-70 will-change-transform"
      >
        <Particles
          particleCount={150}
          particleSpread={26}
          speed={0.95}
          particleColors={["#710202", "#96750f", "#934006"]}
          alphaParticles={true}
          particleBaseSize={110}
          sizeRandomness={1.6}
          cameraDistance={80}
          disableRotation={true}
        />
      </div>

      {/* ── INDICADOR DE SCROLL INICIAL ────────────────────────────────────── */}
      <div
        ref={indicatorRef}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none w-full px-4 text-center"
      >
        <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-red-500/40 shadow-[0_0_20px_rgba(220,38,38,0.3)] flex items-center justify-center max-w-[92vw]">
          <TypewriterTitle
            sequences={[
              { text: "ROLE PARA INICIAR A QUEDA", deleteAfter: true, pauseAfter: 2800 },
              { text: "SKYDIVING FROM HELL // S.D.F.H.", deleteAfter: true, pauseAfter: 2000 },
              { text: "METAL MODERNO & 8 CORDAS", deleteAfter: true, pauseAfter: 2000 },
              { text: "VILA VELHA - ES // BRASIL", deleteAfter: true, pauseAfter: 2000 },
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
          <div className="w-0.5 h-4 bg-gradient-to-b from-transparent to-red-600 shadow-[0_0_6px_rgba(220,38,38,0.6)]" />
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

      {/* ── ONDA DE CHOQUE & DISSIPAÇÃO VOLUMÉTRICA DE FUMAÇA (SMOKE BURST) ── */}
      <div
        ref={smokeBurstRef}
        className="absolute inset-0 z-35 pointer-events-none opacity-0 will-change-transform flex items-center justify-center overflow-hidden"
      >
        <div
          className="w-[140vmax] h-[140vmax] rounded-full filter blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(180, 20, 20, 0.45) 0%, rgba(50, 10, 10, 0.75) 35%, rgba(8, 7, 10, 0.98) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── TRANSIÇÃO FINAL: FUMAÇA VOLUMÉTRICA & ESCURECIMENTO ─────────────── */}
      <div
        ref={smokeOverlayRef}
        className="absolute inset-0 z-40 pointer-events-none opacity-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at bottom, rgba(180, 20, 20, 0.2) 0%, rgba(20, 20, 25, 0.6) 40%, rgba(0, 0, 0, 0.95) 80%), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        ref={darkFadeRef}
        className="absolute inset-0 z-45 pointer-events-none bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950 opacity-0"
      />
    </section>
  );
}

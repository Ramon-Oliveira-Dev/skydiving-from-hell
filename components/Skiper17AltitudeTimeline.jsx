"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Radio, Crosshair, ShieldAlert, Flame, Gauge, ArrowDownRight, Wind } from "lucide-react";
import TypewriterTitle from "./ui/type-writer";

/**
 * Skiper17AltitudeTimeline — Timeline de Queda Livre 3D (Skiper 17 Edition)
 * Skydiving From Hell (S.D.F.H.)
 *
 * Transforma o conceito da banda em um deck interativo 3D com pin e rotação GSAP,
 * mapeando os 5 estágios de altitude da estratosfera (15.000 FT) ao inferno (0 FT).
 */

const JUMP_STAGES = [
  {
    id: 1,
    altitude: "15.000 FT",
    altNum: 15000,
    code: "STAGE 01 // DROP ZONE",
    title: "Zona de Salto & Abertura",
    subtitle: "ESTRATOSFERA • AR RAREFEITO",
    desc: "O salto começa no topo do céu. Logo monumental, som inicial cortante e a contagem regressiva para o mergulho no abismo.",
    targetId: "hero",
    targetLabel: "IR PARA O TOPO",
    image: "/banner_sdfh_dark.png",
    speed: "240 KM/H",
    mach: "MACH 0.20",
    vsi: "-4.200 FT/MIN",
    qnh: "1013 HPA",
    icon: Radio,
    tagColor: "text-sky-400 border-sky-500/40 bg-sky-950/40",
    glowColor: "rgba(56, 189, 248, 0.25)",
    accentGradient: "from-sky-500 via-blue-600 to-indigo-700",
  },
  {
    id: 2,
    altitude: "11.000 FT",
    altNum: 11000,
    code: "STAGE 02 // TERMINAL VELOCITY",
    title: "Velocidade Terminal & 8 Cordas",
    subtitle: "DISCOGRAFIA • SUB-GRAVE DROP E",
    desc: "O som entra com força total. Guitarras de 8 cordas em afinação brutal rasgando o ar com Amethyst, Indigente, Unpatriot e Black Flag.",
    targetId: "player",
    targetLabel: "OUVIR OS SINGLES",
    image: "/cover_amethyst.jpg",
    speed: "340 KM/H",
    mach: "MACH 0.28",
    vsi: "-6.800 FT/MIN",
    qnh: "1008 HPA",
    icon: Crosshair,
    tagColor: "text-red-400 border-red-500/50 bg-red-950/40",
    glowColor: "rgba(239, 68, 68, 0.3)",
    accentGradient: "from-red-600 via-orange-600 to-amber-600",
  },
  {
    id: 3,
    altitude: "7.000 FT",
    altNum: 7000,
    code: "STAGE 03 // CLOUD TURBULENCE",
    title: "Camada de Nuvens & História",
    subtitle: "FORMAÇÃO • TRAJETÓRIA S.D.F.H.",
    desc: "Mergulho denso através das nuvens. Conexão direta com os músicos, a identidade sonora extrema e a história construída no litoral capixaba.",
    targetId: "bio",
    targetLabel: "CONHECER A HISTÓRIA",
    image: "/band_group.jpg",
    speed: "420 KM/H",
    mach: "MACH 0.34",
    vsi: "-8.400 FT/MIN",
    qnh: "1002 HPA",
    icon: ShieldAlert,
    tagColor: "text-orange-400 border-orange-500/50 bg-orange-950/40",
    glowColor: "rgba(249, 115, 22, 0.3)",
    accentGradient: "from-orange-500 via-red-600 to-rose-700",
  },
  {
    id: 4,
    altitude: "3.000 FT",
    altNum: 3000,
    code: "STAGE 04 // GROUND PROXIMITY",
    title: "Aproximação do Solo & Ao Vivo",
    subtitle: "RADAR LOCK • SHOWS & FESTIVAIS",
    desc: "O calor e a pressão do palco aumentam. Bumbos duplos fulminantes, energia visceral e a atmosfera devastadora das apresentações ao vivo.",
    targetId: "videos",
    targetLabel: "VER VÍDEOS & SHOWS",
    image: "/live_red_stage.jpg",
    speed: "510 KM/H",
    mach: "MACH 0.42",
    vsi: "-11.200 FT/MIN",
    qnh: "994 HPA",
    icon: Gauge,
    tagColor: "text-rose-400 border-rose-500/50 bg-rose-950/40",
    glowColor: "rgba(244, 63, 94, 0.35)",
    accentGradient: "from-rose-600 via-red-600 to-red-800",
  },
  {
    id: 5,
    altitude: "0 FT (GROUND ZERO)",
    altNum: 0,
    code: "STAGE 05 // THE HELL PIT",
    title: "Impacto Fatal & Merch Oficial",
    subtitle: "IMPACTO TOTAL • O MOSH PIT DEFINITIVO",
    desc: "Chegada violenta ao chão. Fechamento com o manifesto oficial da banda, produtos exclusivos da loja e conexões para o próximo show.",
    targetId: "merch",
    targetLabel: "ACESSAR A LOJA",
    image: "/band_live_color.jpg",
    speed: "0 KM/H",
    mach: "TOUCHDOWN",
    vsi: "0 FT/MIN",
    qnh: "980 HPA",
    icon: Flame,
    tagColor: "text-red-500 border-red-600/70 bg-red-950/60 animate-pulse",
    glowColor: "rgba(220, 38, 38, 0.45)",
    accentGradient: "from-red-600 via-red-700 to-black",
  },
];

export default function Skiper17AltitudeTimeline() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardRefs.current.filter(Boolean);
      const total = cards.length;
      if (!cards[0] || total === 0) return;

      // Card 0 começa visível e posicionado
      gsap.set(cards[0], { y: "0%", scale: 1, rotation: 0, opacity: 1 });

      // Cards subsequentes começam abaixo
      for (let i = 1; i < total; i++) {
        if (!cards[i]) continue;
        gsap.set(cards[i], { y: "115%", scale: 1, rotation: 0 });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${typeof window !== "undefined" ? window.innerHeight * (total - 0.5) : 3200}`,
          pin: pinRef.current,
          scrub: 0.6,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        const current = cards[i];
        const next = cards[i + 1];
        const rotateAngle = i % 2 === 0 ? 3.5 : -3.5;

        if (!current || !next) continue;

        // Efeito Skiper 17: o card atual escala para trás, rotaciona e ganha profundidade
        timeline.to(
          current,
          {
            scale: 0.85,
            rotation: rotateAngle,
            y: "-6%",
            opacity: 0.5,
            duration: 1,
            ease: "power1.inOut",
          },
          i
        );

        // O próximo card sobe e sobrepõe
        timeline.to(
          next,
          {
            y: "0%",
            duration: 1,
            ease: "power1.inOut",
          },
          i
        );
      }

      return () => {
        timeline.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === sectionRef.current) t.kill();
        });
      };
    },
    { scope: sectionRef }
  );

  const scrollToTarget = (targetId) => {
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="altitude-timeline"
      className="relative w-full bg-black text-white select-none overflow-hidden border-t border-red-500/20"
    >
      <div
        ref={pinRef}
        className="relative w-full min-h-[100svh] flex flex-col items-center justify-center py-8 sm:py-12 px-3 sm:px-6 lg:px-12"
      >
      {/* ── CABEÇALHO DA SEÇÃO DE TIMELINE ──────────────────────────── */}
      <div className="text-center z-10 mb-4 sm:mb-6 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          <Wind className="w-3 h-3 text-red-500 animate-pulse" />
          <span>PLANO DE VOO & ALTITUDE // S.D.F.H.</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
          A Jornada da{" "}
          <TypewriterTitle
            sequences={[
              { text: "Queda Livre", deleteAfter: true, pauseAfter: 3500 },
              { text: "Estratosfera ao Inferno", deleteAfter: true, pauseAfter: 2500 },
              { text: "15.000 Pés de Peso", deleteAfter: true, pauseAfter: 2500 },
            ]}
            typingSpeed={40}
            deleteSpeed={20}
            autoLoop={true}
            loopDelay={1000}
            textClassName="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-amber-400"
            cursorClassName="bg-red-500 h-[1em] w-[2px]"
          />
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-lg mx-auto mt-1">
          Role para navegar através das 5 camadas de altitude do salto.
        </p>
      </div>

      {/* ── SKIPER 17 CARD STACK CONTAINER ─────────────────────────── */}
      <div className="relative w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl h-[480px] xs:h-[520px] sm:h-[560px] md:h-[590px] flex items-center justify-center">
        {JUMP_STAGES.map((st, i) => {
          const Icon = st.icon;

          return (
            <div
              key={st.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/15 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] will-change-transform"
              style={{
                boxShadow: `0 20px 50px ${st.glowColor}, inset 0 0 20px rgba(0,0,0,0.9)`,
              }}
            >
              {/* Imagem de Fundo Temática com Gradiente */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={st.image}
                  alt={st.title}
                  fill
                  className="object-cover opacity-25 filter grayscale contrast-125"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${st.accentGradient}`} />
              </div>

              {/* ── TOP BAR DO CARD: Telemetria & Altitude Badge ────── */}
              <div className="relative z-10 flex items-start justify-between gap-3 border-b border-white/10 pb-3 sm:pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold tracking-widest border ${st.tagColor}`}>
                      {st.code}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-zinc-400 tracking-wider">
                    {st.subtitle}
                  </div>
                </div>

                {/* Mostrador Gigante de Altitude */}
                <div className="text-right">
                  <div className="text-[9px] font-mono text-zinc-400 tracking-widest">ALTITUDE</div>
                  <div className="text-xl sm:text-3xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                    {st.altitude}
                  </div>
                </div>
              </div>

              {/* ── CORPO DO CARD: Título e Narrativa do Salto ──────── */}
              <div className="relative z-10 my-auto py-2 sm:py-4">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 text-red-400">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                    {st.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans max-w-2xl">
                  {st.desc}
                </p>
              </div>

              {/* ── RODAPÉ TÁTICO & BOTÃO DE NAVEGAÇÃO ───────────────── */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Métricas Militares */}
                <div className="grid grid-cols-3 gap-2 font-mono text-[9px] sm:text-[10px] text-zinc-400">
                  <div className="bg-black/60 px-2 py-1 rounded border border-white/5">
                    <span className="block text-[8px] text-zinc-400">VEL</span>
                    <span className="font-bold text-zinc-200">{st.speed}</span>
                  </div>
                  <div className="bg-black/60 px-2 py-1 rounded border border-white/5">
                    <span className="block text-[8px] text-zinc-400">VSI</span>
                    <span className="font-bold text-red-400">{st.vsi}</span>
                  </div>
                  <div className="bg-black/60 px-2 py-1 rounded border border-white/5">
                    <span className="block text-[8px] text-zinc-400">QNH</span>
                    <span className="font-bold text-zinc-200">{st.qnh}</span>
                  </div>
                </div>

                {/* Botão de Salto / Teletransporte para a Seção */}
                <button
                  onClick={() => scrollToTarget(st.targetId)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 border border-red-500/30"
                >
                  <span>{st.targetLabel}</span>
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

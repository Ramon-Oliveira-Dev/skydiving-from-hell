"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";
import ParallaxWatermark from "./ParallaxWatermark";
import TypewriterTitle from "./ui/type-writer";

export default function BandBio() {
  return (
    <section
      id="bio"
      className="relative w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black overflow-hidden py-20 sm:py-32 md:py-48 px-4 sm:px-8 lg:px-16 border-t border-white/10 scroll-mt-20 min-h-0"
    >
      {/* Marca d'água Parallax Monumental */}
      <ParallaxWatermark text="MANIFESTO" speed={0.4} position="center" />

      {/* Iluminação de Palco em Parallax */}
      <ParallaxLayer speed={0.35} className="absolute top-1/2 left-1/4 -translate-y-1/2 pointer-events-none -z-10">
        <div className="w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-red-600/10 blur-[130px] rounded-full" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.3} className="absolute bottom-10 right-1/4 pointer-events-none -z-10">
        <div className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-orange-600/5 blur-[140px] rounded-full" />
      </ParallaxLayer>

      {/* Container Principal Fluido */}
      <div className="relative z-10 w-full">
        
        {/* Header da Seção */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-12 sm:mb-16 md:mb-24 text-center flex flex-col items-center justify-center">
            <div className="mb-2 sm:mb-3">
              <TypewriterTitle
                prefix="//"
                prefixClassName="text-red-500 font-mono font-medium text-[11px]"
                sequences={[
                  { text: "HISTÓRIA & MANIFESTO", deleteAfter: true, pauseAfter: 3500 },
                  { text: "VILA VELHA - ES // 2018", deleteAfter: true, pauseAfter: 2500 },
                  { text: "METAL MODERNO & 8 CORDAS", deleteAfter: true, pauseAfter: 2500 },
                  { text: "IDENTIDADE & FILOSOFIA", deleteAfter: true, pauseAfter: 2500 },
                ]}
                typingSpeed={38}
                deleteSpeed={18}
                autoLoop={true}
                loopDelay={1000}
                textClassName="font-mono text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold"
                cursorClassName="bg-red-500 h-[1em] w-[2px] shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
            </div>
            <h2 className="linha-mask text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight pb-2 leading-tight overflow-visible flex items-center justify-center">
              <TypewriterTitle
                sequences={[
                  { text: "Manifesto & História", deleteAfter: true, pauseAfter: 4000 },
                  { text: "A Queda Inevitável", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Peso, Técnica & Precisão", deleteAfter: true, pauseAfter: 2800 },
                  { text: "O Som do Caos Controlado", deleteAfter: true, pauseAfter: 2800 },
                ]}
                typingSpeed={42}
                deleteSpeed={20}
                autoLoop={true}
                loopDelay={1200}
                textClassName="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500 font-black tracking-tight"
                cursorClassName="bg-red-500 h-[1em] w-[3px] shadow-[0_0_12px_rgba(239,68,68,0.9)] ml-1"
              />
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
          </div>
        </ScrollReveal>

        {/* Layout de 2 Colunas Responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* COLUNA ESQUERDA — Manifesto & Reconhecimento */}
          <ScrollReveal direction="left" delay={150} className="h-full">
            <div className="group h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl hover:border-red-500/40 hover:shadow-[0_16px_48px_0_rgba(220,38,38,0.2)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between gap-6 sm:gap-8">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                    Manifesto Oficial
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-zinc-500 tracking-wider">
                    VILA VELHA / ES
                  </span>
                </div>

                {/* Manifesto em Destaque com Borda Lateral Sólida */}
                <blockquote className="border-l-4 border-red-600 pl-4 sm:pl-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  &ldquo;Baixo e bateria{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500">
                    feito um rolo compressor,
                  </span>{" "}
                  riffs pesados e um gutural que{" "}
                  <span className="text-red-500">não pede licença.</span>&rdquo;
                </blockquote>

                <p className="border-l-4 border-transparent pl-4 sm:pl-6 font-mono text-xs text-zinc-400 italic">
                  — Filosofia sonora Skydiving From Hell
                </p>
              </div>

              {/* Destaque 1º Lugar Garage Pub */}
              <div className="bg-gradient-to-br from-red-950/30 via-zinc-950/60 to-black/80 border border-red-500/30 rounded-xl p-5 sm:p-6 shadow-inner relative overflow-hidden group-hover:border-red-500/60 transition-colors duration-500">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-black uppercase tracking-widest mb-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-red-500 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                    <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                  <span>RECONHECIMENTO &bull; VOTO POPULAR</span>
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase text-white tracking-tight">
                  1º Lugar no Festival Garage Pub
                </h4>
                <p className="font-mono text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                  Serra / ES &bull; Consagração por voto popular que colocou o S.D.F.H. como uma das forças mais brutais do metal capixaba.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* COLUNA DIREITA — Biografia & Discografia */}
          <ScrollReveal direction="right" delay={300} className="h-full">
            <div className="group h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl hover:border-red-500/40 hover:shadow-[0_16px_48px_0_rgba(220,38,38,0.2)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between gap-6 sm:gap-8 text-zinc-300">
              <div className="space-y-5 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                <ScrollReveal direction="up" delay={0} duration={1200}>
                  <p>
                    A <strong className="text-white font-black">Skydiving From Hell (S.D.F.H.)</strong> surgiu em <strong className="text-white">2016</strong> nas ruas de Vila Velha / ES, moldada pela necessidade de produzir um metal moderno, pesado e sem concessões.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={200} duration={1200}>
                  <p>
                    Armados com guitarras de 8 cordas em afinações extremas, um baixo com ataque analógico rasgado e bumbos duplos ultrarrápidos, o quinteto entrega uma experiência audiovisual de impacto absoluto.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={400} duration={1200}>
                  <p className="text-zinc-400 text-xs sm:text-sm md:text-base">
                    Com 4 lançamentos oficiais de destaque — <strong className="text-white">Amethyst</strong>, <strong className="text-white">Indigente</strong>, <strong className="text-white">Unpatriot</strong> e <strong className="text-white">Black Flag</strong> —, a banda consolida sua trajetória autoral nos palcos.
                  </p>
                </ScrollReveal>
              </div>

              {/* Badges dos Singles Responsivos */}
              <ScrollReveal direction="up" delay={600} duration={1200}>
                <div className="pt-6 border-t border-white/10">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.3em] block mb-3 sm:mb-4 font-bold">
                    LANÇAMENTOS OFICIAIS
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                    {[
                      { name: "Amethyst", year: "2019" },
                      { name: "Indigente", year: "2020" },
                      { name: "Unpatriot", year: "2021" },
                      { name: "Black Flag", year: "2022" },
                    ].map((s) => (
                      <div
                        key={s.name}
                        className="bg-black/60 border border-white/10 hover:border-red-500/60 rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 hover:bg-red-950/20 shadow-md group/badge"
                      >
                        <div className="font-black text-xs uppercase text-white tracking-wider group-hover/badge:text-red-400 transition-colors">
                          {s.name}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500 mt-0.5">
                          {s.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

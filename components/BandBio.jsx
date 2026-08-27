"use client";

import React from "react";

export default function BandBio() {
  return (
    <section
      id="bio"
      className="relative w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black overflow-hidden py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/10 scroll-mt-20 min-h-0"
    >
      {/* Iluminação de Palco */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-orange-600/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Container Principal Fluido */}
      <div className="relative z-10 w-full">
        
        {/* Header da Seção */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-red-500/90 font-bold block mb-2 sm:mb-3">
            // 01. ORIGEM & IDENTIDADE
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500">
            História & Manifesto
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
        </div>

        {/* Layout de 2 Colunas Responsivo (Mobile: 1 coluna | Desktop: 2 colunas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* COLUNA ESQUERDA — Manifesto & Reconhecimento */}
          <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl hover:border-red-500/40 hover:shadow-[0_16px_48px_0_rgba(220,38,38,0.15)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between gap-6 sm:gap-8">
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
            <div className="bg-gradient-to-br from-red-950/30 via-zinc-950/60 to-black/80 border border-red-500/30 rounded-xl p-5 sm:p-6 shadow-inner relative overflow-hidden">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-black uppercase tracking-widest mb-1.5">
                <span>🏆</span> RECONHECIMENTO // VOTO POPULAR
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase text-white tracking-tight">
                1º Lugar no Festival Garage Pub
              </h4>
              <p className="font-mono text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                Serra / ES &bull; Consagração por voto popular que colocou o S.D.F.H. como uma das forças mais brutais do metal capixaba.
              </p>
            </div>
          </div>

          {/* COLUNA DIREITA — Biografia & Discografia */}
          <div className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl hover:border-red-500/40 hover:shadow-[0_16px_48px_0_rgba(220,38,38,0.15)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between gap-6 sm:gap-8 text-zinc-300">
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
              <p>
                A <strong className="text-white font-black">Skydiving From Hell (S.D.F.H.)</strong> surgiu em <strong className="text-white">2016</strong> nas ruas de Vila Velha / ES, moldada pela necessidade de produzir um metal moderno, pesado e sem concessões.
              </p>
              <p>
                Armados com guitarras de 8 cordas em afinações extremas, um baixo com ataque analógico rasgado e bumbos duplos ultrarrápidos, o quinteto entrega uma experiência audiovisual de impacto absoluto.
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base">
                Com 4 lançamentos oficiais de destaque — <strong className="text-white">Amethyst</strong>, <strong className="text-white">Indigente</strong>, <strong className="text-white">Unpatriot</strong> e <strong className="text-white">Black Flag</strong> —, a banda consolida sua trajetória autoral nos palcos.
              </p>
            </div>

            {/* Badges dos Singles Responsivos */}
            <div className="pt-6 border-t border-white/10">
              <span className="font-mono text-xs text-red-500/90 uppercase tracking-[0.3em] block mb-3 sm:mb-4 font-bold">
                // LANÇAMENTOS OFICIAIS
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
                    className="p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-xl text-center hover:border-red-500/50 hover:bg-red-600/10 hover:scale-105 transition-all duration-300"
                  >
                    <span className="block font-black text-white text-xs uppercase tracking-wide truncate">
                      {s.name}
                    </span>
                    <span className="font-mono text-[10px] text-red-500/90 font-bold">
                      {s.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

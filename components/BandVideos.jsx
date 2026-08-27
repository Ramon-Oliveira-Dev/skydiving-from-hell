"use client";

import React, { useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import TiltCard, { TiltLayer } from "./TiltCard";

// ─── Vídeo em Destaque (embed direto no topo) ───────────────────────────────
const FEATURED_VIDEO = {
  title: "Black Flag",
  type: "Single Oficial // 2022",
  youtubeId: "9ZuQmgSBIIw",
};

// ─── Videografia Completa (grid secundária) ──────────────────────────────────
const VIDEOS = [
  {
    title: "Amethyst",
    type: "Clipe Oficial",
    year: "2019",
    youtubeId: "H-cQ3nuXFkU",
    thumb: "/cover-amethyst.jpg",
  },
  {
    title: "Indigente",
    type: "Clipe Oficial",
    year: "2020",
    youtubeId: "4W_7LYmnb2Q",
    thumb: "/cover-indigente.jpg",
  },
  {
    title: "Unpatriot",
    type: "Clipe Oficial",
    year: "2021",
    youtubeId: "6CyESpQ7cyg",
    thumb: "/cover-unpatriot.jpg",
  },
  {
    title: "Living la Vida Loca",
    type: "Cover Oficial",
    year: "Cover",
    youtubeId: "__Sv0CQH_04",
    thumb: "/banner_sdfh_dark.png",
  },
];

export default function BandVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const closeModal = useCallback(() => setSelectedVideo(null), []);

  // Fechar com ESC + bloquear scroll do fundo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (selectedVideo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo, closeModal]);

  return (
    <section
      id="videos"
      className="relative w-full bg-zinc-950 border-t border-white/10 scroll-mt-20 overflow-hidden py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16"
    >
      {/* ── Iluminação Ambiente ──────────────────────────────────────────── */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-red-600/8 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-orange-600/6 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* ── Header da Seção ─────────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-10 sm:mb-14 md:mb-20 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-red-500/90 font-bold block mb-2 sm:mb-3">
              // AUDIOVISUAL & TRANSMISSÕES
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500">
              Vídeos & Clipes
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
          </div>
        </ScrollReveal>

        {/* ================================================================
            VÍDEO PRINCIPAL EM DESTAQUE — Embed Direto 16:9
           ================================================================ */}
        <ScrollReveal direction="up" delay={150}>
          <div className="mb-10 sm:mb-14 md:mb-20">
            {/* Label do Destaque */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-red-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                // LANÇAMENTO EM DESTAQUE
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-red-600/40 to-transparent" />
            </div>

            {/* Container aspect-video — padrão S.D.F.H. */}
            <div className="w-full max-w-4xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:border-red-900/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] transition-all duration-500 aspect-video relative group">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO.youtubeId}?rel=0&modestbranding=1`}
                title={`Skydiving From Hell — ${FEATURED_VIDEO.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Linha de glow inferior no hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            </div>

            {/* Metadados do Vídeo Principal */}
            <div className="w-full max-w-4xl mx-auto mt-3 sm:mt-4 flex items-center justify-between px-1">
              <div>
                <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                  {FEATURED_VIDEO.title}
                </h3>
                <span className="font-mono text-[10px] sm:text-xs text-red-400 uppercase tracking-widest">
                  {FEATURED_VIDEO.type}
                </span>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${FEATURED_VIDEO.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold text-zinc-400 hover:text-red-400 uppercase tracking-widest transition-colors flex items-center gap-1"
              >
                YouTube ↗
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================================
            GRID SECUNDÁRIA — 2 colunas no MD+
           ================================================================ */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold">
              // VIDEOGRAFIA COMPLETA
            </span>
            <div className="flex-1 h-px bg-white/5" />
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
              {VIDEOS.length} VÍDEOS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {VIDEOS.map((v, idx) => (
              <ScrollReveal key={v.youtubeId} direction="up" delay={idx * 120}>
                <TiltCard
                  onClick={() => setSelectedVideo(v.youtubeId)}
                  className="group cursor-pointer bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-red-500/40 hover:shadow-[0_12px_40px_rgba(220,38,38,0.2)] transition-all duration-400 flex flex-col h-full"
                >
                {/* Thumbnail com Play Button - aspect-video garante 16:9 fixo */}
                <div className="aspect-video relative w-full overflow-hidden bg-zinc-950">
                  {v.thumb && (
                    <img
                      src={v.thumb}
                      alt={v.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  )}

                  {/* Overlay escuro */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                  {/* Botão Play Central em 3D (30px Z) */}
                  <TiltLayer depth={30} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.7)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(239,68,68,1)] border border-red-400/40 transition-all duration-300">
                      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5">
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    </div>
                  </TiltLayer>

                  {/* Badge de Tipo em 3D (20px Z) */}
                  <TiltLayer depth={20} className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 pointer-events-none z-10">
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {v.type}
                    </div>
                  </TiltLayer>

                  {/* Ano em 3D (20px Z) */}
                  <TiltLayer depth={20} className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 pointer-events-none z-10">
                    <div className="bg-black/70 backdrop-blur-md border border-white/10 text-red-400 font-mono text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {v.year}
                    </div>
                  </TiltLayer>
                </div>

                {/* Info Rodapé do Card em 3D (15px Z) */}
                <TiltLayer depth={15} className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-black uppercase text-white tracking-tight group-hover:text-red-400 transition-colors">
                    {v.title}
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-red-600/20 border border-white/10 group-hover:border-red-500/50 flex items-center justify-center text-red-400 transition-all duration-300 flex-shrink-0 ml-3">
                    <span className="text-xs font-bold">▶</span>
                  </div>
                </TiltLayer>
              </TiltCard>
            </ScrollReveal>
          ))}
          </div>
        </div>

        {/* ── Link Canal YouTube ────────────────────────────────────────── */}
        <div className="text-center pt-8 sm:pt-12">
          <a
            href="https://www.youtube.com/@skydivingfromhell"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-red-600/15 border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Acessar Canal Oficial no YouTube ↗
          </a>
        </div>

      </div>

      {/* ================================================================
          LIGHTBOX MODAL — Clipes Secundários (16:9 aspect-video)
         ================================================================ */}
      {selectedVideo && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-10"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Container 16:9 responsivo com aspect-video */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-xl sm:rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_0_60px_rgba(220,38,38,0.35)] aspect-video bg-black"
          >
            {/* Botão Fechar */}
            <button
              onClick={closeModal}
              aria-label="Fechar vídeo"
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 w-9 h-9 rounded-full bg-black/80 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg font-bold text-sm"
            >
              ✕
            </button>

            {/* Iframe dentro do aspect-video — preenche 100% */}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Skydiving From Hell — Vídeo Oficial"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Dica de fechar */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-zinc-600 uppercase tracking-widest pointer-events-none">
            ESC ou clique fora para fechar
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}

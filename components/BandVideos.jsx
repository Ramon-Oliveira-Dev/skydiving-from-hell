"use client";

import React, { useState, useEffect, useCallback } from "react";

const VIDEOS = [
  {
    title: "Amethyst",
    type: "Clipe Oficial",
    youtubeId: "H-cQ3nuXFkU",
    thumb: "/cover-amethyst.jpg",
  },
  {
    title: "Indigente",
    type: "Clipe Oficial",
    youtubeId: "4W_7LYmnb2Q",
    thumb: "/cover-indigente.jpg",
  },
  {
    title: "Unpatriot",
    type: "Clipe Oficial",
    youtubeId: "6CyESpQ7cyg",
    thumb: "/cover-unpatriot.jpg",
  },
  {
    title: "Black Flag",
    type: "Clipe Oficial",
    youtubeId: "9ZuQmgSBIIw",
    thumb: "/cover-blackflag.jpg",
  },
  {
    title: "Living la Vida Loca",
    type: "Cover Oficial",
    youtubeId: "__Sv0CQH_04",
    thumb: "/banner_sdfh_dark.png",
  },
];

export default function BandVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const closeModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

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
      className="relative w-full bg-[url('/bg-placeholder.jpg')] bg-fixed bg-cover bg-center border-t border-white/10 scroll-mt-20 overflow-hidden py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 min-h-0"
    >
      {/* Overlay Escuro Profundo */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />

      {/* Iluminação Ambiente */}
      <div className="absolute top-1/3 left-1/3 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 w-full">
        
        {/* Header da Seção */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-red-500/90 font-bold block mb-2 sm:mb-3">
            // AUDIOVISUAL & TRANSMISSÕES
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500">
            Vídeos & Clipes
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
        </div>

        {/* Grid Adaptativo (Mobile: 1 | Tablet: 2 | Desktop: 3 colunas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {VIDEOS.map((v) => (
            <div
              key={v.title}
              onClick={() => setSelectedVideo(v.youtubeId)}
              className="group cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] hover:-translate-y-2 hover:border-red-500/50 hover:shadow-[0_16px_48px_0_rgba(220,38,38,0.25)] transition-all duration-500 flex flex-col justify-between"
            >
              {/* Thumbnail com Efeito de Play */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-950/80 rounded-t-2xl border-b border-white/10">
                {v.thumb ? (
                  <img
                    src={v.thumb}
                    alt={v.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-center p-4">
                    <span className="font-mono text-xs uppercase text-zinc-500 font-bold">
                      [ Transmissão Oficial ]
                    </span>
                  </div>
                )}

                {/* Badge de Tipo */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {v.type}
                </div>

                {/* Botão de Play com Brilho Vermelho no Hover */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.7)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(239,68,68,1)] border border-red-400/40 transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 sm:w-7 h-6 sm:h-7 ml-0.5">
                      <path d="M8 5v14l11-7L8 5z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Informações da Faixa */}
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-black uppercase text-white tracking-tight group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-zinc-200 group-hover:to-red-500 transition-all duration-300">
                    {v.title}
                  </h4>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-0.5 block">
                    Assistir na página
                  </span>
                </div>
                <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/5 group-hover:bg-red-600/20 border border-white/10 group-hover:border-red-500/50 flex items-center justify-center text-red-400 transition-colors flex-shrink-0 ml-2">
                  <span className="font-bold text-xs sm:text-sm">▶</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link para Canal Externo */}
        <div className="mt-10 sm:mt-14 text-center">
          <a
            href="https://www.youtube.com/@skydivingfromhell"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
          >
            Acessar Canal Oficial no YouTube ↗
          </a>
        </div>
      </div>

      {/* ================================================================
          MODAL CINEMATOGRÁFICO RESPONSIVO (LIGHTBOX YOUTUBE)
         ================================================================ */}
      {selectedVideo && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fadeIn"
        >
          {/* Container 16:9 Adaptativo */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_0_60px_rgba(220,38,38,0.35)] flex flex-col justify-center"
          >
            {/* Botão Fechar Modal */}
            <button
              onClick={closeModal}
              aria-label="Fechar vídeo"
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-black/80 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg text-base sm:text-lg font-bold"
            >
              ✕
            </button>

            {/* Iframe */}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Skydiving From Hell — Vídeo Oficial"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

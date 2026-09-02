"use client";

import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";
import TypewriterTitle from "./ui/type-writer";
import AshParticles from "./AshParticles";
import SocialButton, {
  WhatsappIcon,
  InstagramIcon,
  FacebookIcon,
} from "./ui/social-button";
import { Link as LinkIcon, Check } from "lucide-react";

// ─── Vídeo em Destaque (Topo) ────────────────────────────────────────────────
const FEATURED_VIDEO = {
  title: "Black Flag",
  type: "Single Oficial // 2022",
  youtubeId: "9ZuQmgSBIIw",
};

// ─── Videografia Completa (Grid de Vídeos com Embed Direto) ───────────────────
const VIDEOS = [
  {
    title: "Amethyst",
    type: "Clipe Oficial",
    year: "2019",
    youtubeId: "H-cQ3nuXFkU",
  },
  {
    title: "Indigente",
    type: "Clipe Oficial",
    year: "2020",
    youtubeId: "4W_7LYmnb2Q",
  },
  {
    title: "Unpatriot",
    type: "Clipe Oficial",
    year: "2021",
    youtubeId: "6CyESpQ7cyg",
  },
  {
    title: "Living la Vida Loca",
    type: "Cover Oficial",
    year: "Cover",
    youtubeId: "__Sv0CQH_04",
  },
];

export default function BandVideos() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyLink = async (video) => {
    const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // Fallback
    }
    setCopiedId(video.youtubeId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getShareItems = (video) => {
    const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    const text = `Assista ao clipe oficial "${video.title}" da banda Skydiving From Hell!`;

    return [
      {
        icon: WhatsappIcon,
        label: "Compartilhar no WhatsApp",
        colorHover: "hover:text-emerald-400 hover:bg-emerald-500/10",
        onClick: () => {
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(
              `${text}\n${url}`
            )}`,
            "_blank",
            "noopener,noreferrer"
          );
        },
      },
      {
        icon: InstagramIcon,
        label: "Enviar via Direct do Instagram",
        colorHover: "hover:text-pink-400 hover:bg-pink-500/10",
        onClick: async () => {
          try {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              await navigator.clipboard.writeText(`${text}\n${url}`);
            }
          } catch {}
          setCopiedId(video.youtubeId);
          setTimeout(() => setCopiedId(null), 2500);
          window.open(
            "https://www.instagram.com/direct/inbox/",
            "_blank",
            "noopener,noreferrer"
          );
        },
      },
      {
        icon: FacebookIcon,
        label: "Compartilhar no Facebook",
        colorHover: "hover:text-blue-400 hover:bg-blue-500/10",
        onClick: () => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`,
            "_blank",
            "noopener,noreferrer"
          );
        },
      },
      {
        icon: copiedId === video.youtubeId ? Check : LinkIcon,
        label:
          copiedId === video.youtubeId
            ? "Link Copiado!"
            : "Copiar link do vídeo",
        colorHover: "hover:text-red-400 hover:bg-red-500/10",
        onClick: () => handleCopyLink(video),
      },
    ];
  };

  return (
    <section
      id="videos"
      className="relative w-full bg-zinc-950 border-t border-white/10 scroll-mt-20 overflow-hidden py-20 sm:py-32 md:py-48 px-4 sm:px-8 lg:px-16"
    >
      {/* Efeito Atmosférico de Cinzas e Brasas em Movimento de Fundo */}
      <AshParticles count={40} />

      {/* ── Iluminação Ambiente em Parallax ──────────────────────────────── */}
      <ParallaxLayer
        speed={0.35}
        className="absolute top-1/3 left-1/4 pointer-events-none -z-10"
      >
        <div className="w-[400px] h-[400px] bg-red-600/8 blur-[160px] rounded-full" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={-0.3}
        className="absolute bottom-1/4 right-1/4 pointer-events-none -z-10"
      >
        <div className="w-[350px] h-[350px] bg-orange-600/6 blur-[160px] rounded-full" />
      </ParallaxLayer>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* ── Header da Seção ─────────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-12 sm:mb-16 md:mb-24 text-center flex flex-col items-center justify-center">
            <div className="mb-2 sm:mb-3">
              <TypewriterTitle
                prefix="//"
                prefixClassName="text-red-500 font-mono font-medium text-[11px]"
                sequences={[
                  { text: "VÍDEOS & CLIPES", deleteAfter: true, pauseAfter: 3500 },
                  { text: "PRODUÇÕES AUDIOVISUAIS", deleteAfter: true, pauseAfter: 2500 },
                  { text: "CANAL OFICIAL NO YOUTUBE", deleteAfter: true, pauseAfter: 2500 },
                  { text: "PERFORMANCES & CLIPES", deleteAfter: true, pauseAfter: 2500 },
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
                  { text: "Vídeos & Clipes", deleteAfter: true, pauseAfter: 4000 },
                  { text: "Assista Black Flag", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Assista Amethyst", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Assista Indigente", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Assista Unpatriot", deleteAfter: true, pauseAfter: 2800 },
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

        {/* ================================================================
            VÍDEO PRINCIPAL EM DESTAQUE — Black Flag Embed Direto 16:9
           ================================================================ */}
        <ScrollReveal direction="up" delay={150}>
          <div className="mb-14 sm:mb-18 md:mb-24">
            {/* Label do Destaque */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-red-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                LANÇAMENTO EM DESTAQUE
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-red-600/40 to-transparent" />
            </div>

            {/* Container aspect-video — padrão S.D.F.H. */}
            <div className="w-full max-w-4xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:border-red-900/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] transition-all duration-500 aspect-video relative group">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO.youtubeId}?rel=0&modestbranding=1`}
                title={`Skydiving From Hell — ${FEATURED_VIDEO.title}`}
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            </div>

            {/* Metadados e Botão Compartilhar com Kokonut SocialButton */}
            <div className="w-full max-w-4xl mx-auto mt-3.5 sm:mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <div>
                <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                  {FEATURED_VIDEO.title}
                </h3>
                <span className="font-mono text-[10px] sm:text-xs text-red-400 uppercase tracking-widest">
                  {FEATURED_VIDEO.type}
                </span>
              </div>

              <SocialButton
                label="Compartilhar"
                copied={copiedId === FEATURED_VIDEO.youtubeId}
                items={getShareItems(FEATURED_VIDEO)}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* ================================================================
            GRID DA VIDEOGRAFIA — Todos os vídeos com player direto e botão compartilhar
           ================================================================ */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
              VIDEOGRAFIA COMPLETA
            </span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              {VIDEOS.length} VÍDEOS
            </span>
          </div>

          <ScrollReveal
            direction="up"
            stagger={0.2}
            duration={1200}
            threshold="top 80%"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {VIDEOS.map((v) => (
                <div
                  key={v.youtubeId}
                  className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 hover:border-red-500/40 hover:shadow-[0_15px_45px_rgba(220,38,38,0.2)] transition-all duration-500 flex flex-col group"
                >
                  {/* Container 16:9 com Embed Direto do YouTube */}
                  <div className="aspect-video relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-zinc-900 border border-white/5 shadow-inner">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0&modestbranding=1`}
                      title={`Skydiving From Hell — ${v.title}`}
                      loading="lazy"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Metadados e Botão Compartilhar com Kokonut SocialButton */}
                  <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-black uppercase text-white tracking-tight group-hover:text-red-400 transition-colors">
                          {v.title}
                        </h4>
                        <span className="bg-white/5 border border-white/10 text-zinc-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {v.year}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs text-red-500 uppercase tracking-wider block mt-0.5">
                        {v.type}
                      </span>
                    </div>

                    <SocialButton
                      label="Compartilhar"
                      copied={copiedId === v.youtubeId}
                      items={getShareItems(v)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Link Canal YouTube ────────────────────────────────────────── */}
        <div className="text-center pt-8 sm:pt-12">
          <a
            href="https://www.youtube.com/@skydivingfromhell"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-red-600/15 border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-red-500"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Acessar Canal Oficial no YouTube ↗
          </a>
        </div>
      </div>
    </section>
  );
}

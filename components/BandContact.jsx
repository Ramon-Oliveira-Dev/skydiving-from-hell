"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";
import ParallaxWatermark from "./ParallaxWatermark";

// ─── SVG Icons (Monocromáticos e Táticos) ────────────────────────────────────
const ICONS = {
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.306c-.218.358-.684.47-1.042.252-2.855-1.745-6.448-2.14-10.68-1.173-.41.094-.817-.164-.911-.574-.094-.41.164-.817.574-.911 4.636-1.06 8.604-.613 11.807 1.346.358.218.47.684.252 1.06zm1.467-3.26c-.274.446-.856.59-1.302.316-3.269-2.008-8.252-2.59-12.12-1.415-.499.151-1.03-.133-1.181-.632-.151-.499.133-1.03.632-1.181 4.417-1.34 9.907-.692 13.655 1.61.446.274.59.856.316 1.302zm.127-3.41c-3.92-2.327-10.38-2.542-14.137-1.402-.6.182-1.236-.16-1.418-.76-.182-.6.16-1.236.76-1.418 4.316-1.31 11.443-1.06 15.957 1.62.538.32.715 1.018.396 1.556-.32.538-1.018.715-1.558.404z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

// ─── Dados de Streaming Oficial ─────────────────────────────────────────────
const STREAMING = [
  { name: "Spotify",  href: "https://spoti.fi/2JmeZmW",                   icon: ICONS.spotify },
  { name: "YT Music", href: "https://www.youtube.com/@skydivingfromhell", icon: ICONS.youtube },
];

// ─── Dados de Redes Sociais ─────────────────────────────────────────────────
const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/skydivingfromhell", icon: ICONS.instagram },
  { name: "YouTube",   href: "https://www.youtube.com/@skydivingfromhell", icon: ICONS.youtube   },
  { name: "Facebook",  href: "https://www.facebook.com/skydivingfromhell",  icon: ICONS.facebook  },
  { name: "TikTok",    href: "https://www.tiktok.com/@skydivingfromhell",   icon: ICONS.tiktok    },
];

export default function BandContact() {
  return (
    <section
      id="contato"
      className="relative py-20 sm:py-32 md:py-48 bg-zinc-950 border-t border-white/5 overflow-hidden scroll-mt-20"
    >
      {/* ─── Camada de Ruído Estático / Textura Industrial Overlaid ──────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Marca d'água Parallax Monumental */}
      <ParallaxWatermark text="S.D.F.H." speed={0.4} position="center" />

      {/* ─── Iluminação Ambiente em Parallax ───────────────────────────── */}
      <ParallaxLayer speed={0.35} className="absolute top-1/3 left-1/4 pointer-events-none -z-10">
        <div className="w-[400px] h-[400px] bg-red-600/8 blur-[120px] rounded-full" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.3} className="absolute bottom-0 right-1/4 pointer-events-none -z-10">
        <div className="w-[350px] h-[350px] bg-orange-600/5 blur-[100px] rounded-full" />
      </ParallaxLayer>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Header da Seção ───────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-12 sm:mb-16 md:mb-24 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold block mb-2 sm:mb-3">
              CONEXÃO & REDES SOCIAIS
            </span>
            <h2 className="linha-mask text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500 pb-2 leading-tight overflow-visible">
              <span className="inline-block pb-1">Booking & Contato</span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
          </div>
        </ScrollReveal>

        {/* ─── Grid 3 Colunas ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

          {/* ══════════════════════════════════════════════════════════════
              COLUNA 1: BOOKING & CONTATO DIRETO
             ══════════════════════════════════════════════════════════════ */}
          <ScrollReveal direction="up" delay={0}>
            <div className="space-y-4">
              <h3 className="text-red-700 text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                // 01. BOOKING & CONTATO
              </h3>

              {/* Card WhatsApp Direto (Dark Glassmorphism Monocromático) */}
              <a
                href="https://wa.me/5527997207037"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-4 rounded-lg bg-zinc-950/40 backdrop-blur-md border border-white/5 overflow-hidden transition-all duration-300 hover:bg-zinc-900/80 hover:border-red-900/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:-translate-y-1"
              >
                <span className="w-10 h-10 rounded-md bg-zinc-900/80 border border-white/10 text-zinc-400 group-hover:text-red-400 group-hover:border-red-600/50 group-hover:bg-red-950/30 transition-all flex items-center justify-center flex-shrink-0">
                  {ICONS.whatsapp}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block text-white font-black text-sm uppercase tracking-tight group-hover:text-red-400 transition-colors">
                    WhatsApp Direto
                  </span>
                  <span className="block font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    +55 (27) 99720-7037
                  </span>
                </div>
                <span className="text-zinc-600 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-auto font-mono text-sm font-bold flex-shrink-0">
                  ↗
                </span>
              </a>

              {/* Card E-mail Oficial (Dark Glassmorphism) */}
              <a
                href="mailto:sdfhband@gmail.com"
                className="group relative flex items-center gap-4 p-4 rounded-lg bg-zinc-950/40 backdrop-blur-md border border-white/5 overflow-hidden transition-all duration-300 hover:bg-zinc-900/80 hover:border-red-900/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:-translate-y-1"
              >
                <span className="w-10 h-10 rounded-md bg-zinc-900/80 border border-white/10 text-zinc-400 group-hover:text-red-400 group-hover:border-red-600/50 group-hover:bg-red-950/30 transition-all flex items-center justify-center flex-shrink-0">
                  {ICONS.mail}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block text-white font-black text-sm uppercase tracking-tight group-hover:text-red-400 transition-colors">
                    E-mail Oficial
                  </span>
                  <span className="block font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors break-all">
                    sdfhband@gmail.com
                  </span>
                </div>
                <span className="text-zinc-600 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-auto font-mono text-sm font-bold flex-shrink-0">
                  ↗
                </span>
              </a>
            </div>
          </ScrollReveal>

          {/* ══════════════════════════════════════════════════════════════
              COLUNA 2: STREAMING OFICIAL
             ══════════════════════════════════════════════════════════════ */}
          <ScrollReveal direction="up" delay={150}>
            <div className="space-y-4">
              <h3 className="text-red-700 text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                // 02. STREAMING OFICIAL
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {STREAMING.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 p-4 rounded-lg bg-zinc-950/40 backdrop-blur-md border border-white/5 overflow-hidden transition-all duration-300 hover:bg-zinc-900/80 hover:border-red-900/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:-translate-y-1"
                  >
                    <span className="w-10 h-10 rounded-md bg-zinc-900/80 border border-white/10 text-zinc-400 group-hover:text-red-400 group-hover:border-red-600/50 group-hover:bg-red-950/30 transition-all flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-mono font-bold tracking-wider text-xs text-zinc-400 group-hover:text-white transition-colors uppercase">
                      {item.name}
                    </span>
                    <span className="text-zinc-600 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-auto font-mono text-sm font-bold flex-shrink-0">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ══════════════════════════════════════════════════════════════
              COLUNA 3: REDES SOCIAIS
             ══════════════════════════════════════════════════════════════ */}
          <ScrollReveal direction="up" delay={300}>
            <div className="space-y-4">
              <h3 className="text-red-700 text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                // 03. REDES SOCIAIS
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {SOCIALS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 p-4 rounded-lg bg-zinc-950/40 backdrop-blur-md border border-white/5 overflow-hidden transition-all duration-300 hover:bg-zinc-900/80 hover:border-red-900/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:-translate-y-1"
                  >
                    <span className="w-10 h-10 rounded-md bg-zinc-900/80 border border-white/10 text-zinc-400 group-hover:text-red-400 group-hover:border-red-600/50 group-hover:bg-red-950/30 transition-all flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-mono font-bold tracking-wider text-xs text-zinc-400 group-hover:text-white transition-colors uppercase">
                      {item.name}
                    </span>
                    <span className="text-zinc-600 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ml-auto font-mono text-sm font-bold flex-shrink-0">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

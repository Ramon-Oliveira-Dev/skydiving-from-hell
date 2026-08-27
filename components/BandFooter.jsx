"use client";

import React from "react";

const ICONS = {
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.306c-.218.358-.684.47-1.042.252-2.855-1.745-6.448-2.14-10.68-1.173-.41.094-.817-.164-.911-.574-.094-.41.164-.817.574-.911 4.636-1.06 8.604-.613 11.807 1.346.358.218.47.684.252 1.06zm1.467-3.26c-.274.446-.856.59-1.302.316-3.269-2.008-8.252-2.59-12.12-1.415-.499.151-1.03-.133-1.181-.632-.151-.499.133-1.03.632-1.181 4.417-1.34 9.907-.692 13.655 1.61.446.274.59.856.316 1.302zm.127-3.41c-3.92-2.327-10.38-2.542-14.137-1.402-.6.182-1.236-.16-1.418-.76-.182-.6.16-1.236.76-1.418 4.316-1.31 11.443-1.06 15.957 1.62.538.32.715 1.018.396 1.556-.32.538-1.018.715-1.558.404z" />
    </svg>
  ),
  deezer: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M6.06 16.29H3.64v3.65h2.42v-3.65zm4.84-4.84H8.48v8.49h2.42v-8.49zm4.84-4.84h-2.42v13.33h2.42V6.61zm4.85-4.85h-2.42v18.18h2.42V1.76z" />
    </svg>
  ),
  bandcamp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M0 18.75l7.437-13.5h16.563l-7.438 13.5z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  applemusic: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.998 12c0 6.627-5.37 12-11.998 12C5.372 24 0 18.627 0 12 0 5.372 5.372 0 12 0c6.628 0 11.998 5.372 11.998 12zm-8.496-4.57c0-1.127-.798-1.748-2.023-1.84-2.316-.176-5.01 1.258-5.01 4.545 0 2.456 1.488 4.254 3.738 4.254 2.274 0 3.295-1.42 3.295-3.328v-3.631zm-3.08 5.365c-1.042 0-1.75-.826-1.75-2.091 0-1.298.784-2.229 1.93-2.229.839 0 1.24.475 1.24 1.348 0 1.583-.496 2.972-1.42 2.972z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
};

export default function BandFooter() {
  return (
    <footer className="relative w-full bg-black border-t border-zinc-800/80 overflow-hidden text-zinc-400 font-sans">
      
      {/* ─── Linha de Luz Superior (Glow Border Full-Width) ───────────── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent pointer-events-none" />
      
      {/* ─── Luz Ambiente Difusa ────────────────────────────────────────── */}
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-red-600/10 blur-[90px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-orange-600/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="w-full px-4 sm:px-8 lg:px-20 py-8 sm:py-12 md:py-16 relative z-10">
        
        {/* ─── Grid 4 Colunas Adaptativo ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          
          {/* ================================================================
              COLUNA 1: IDENTIDADE & MANIFESTO
             ================================================================ */}
          <div className="space-y-3 sm:space-y-4">
            <a href="#" className="inline-block group">
              <div className="h-10 sm:h-12 md:h-14 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo_cabecalho.png"
                  alt="Skydiving From Hell — S.D.F.H."
                  className="h-full w-auto object-contain filter drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(239,68,68,0.8)] transition-all duration-300"
                />
              </div>
            </a>
            
            <p className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest">
              SKYDIVING FROM HELL
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              Metal moderno forjado em Vila Velha / ES. Afinações extremas de 8 cordas, breakdowns devastadores e atitude sem concessões desde 2016.
            </p>
          </div>

          {/* ================================================================
              COLUNA 2: CONTATO & BOOKING
             ================================================================ */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-mono text-xs text-red-500 tracking-widest uppercase mb-2 sm:mb-4 flex items-center gap-2 font-bold">
              <span>//</span> CONTATO & BOOKING
            </h4>

            <ul className="space-y-2.5 sm:space-y-3 font-mono text-xs">
              <li>
                <span className="text-zinc-500 block uppercase text-[10px] mb-1">
                  Atendimento WhatsApp:
                </span>
                <a
                  href="https://wa.me/5527997207037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/50 text-zinc-200 hover:text-white font-bold transition-all duration-300 shadow-sm active:scale-95 text-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>+55 (27) 99720-7037</span>
                  <span className="text-red-500 group-hover:translate-x-0.5 transition-transform text-xs">↗</span>
                </a>
              </li>

              <li className="pt-0.5">
                <span className="text-zinc-500 block uppercase text-[10px] mb-0.5">
                  E-mail Oficial:
                </span>
                <a
                  href="mailto:sdfhband@gmail.com"
                  className="text-zinc-300 hover:text-white transition-colors underline-offset-4 hover:underline font-bold text-xs sm:text-sm break-all"
                >
                  sdfhband@gmail.com
                </a>
              </li>

              <li className="pt-0.5">
                <span className="text-zinc-500 block uppercase text-[10px] mb-0.5">
                  Origem:
                </span>
                <span className="text-zinc-400 text-xs">Vila Velha / ES — Brasil</span>
              </li>
            </ul>
          </div>

          {/* ================================================================
              COLUNA 3: STREAMING OFICIAL (COMPACTO NO MOBILE)
             ================================================================ */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-mono text-xs text-red-500 tracking-widest uppercase mb-2 sm:mb-4 flex items-center gap-2 font-bold">
              <span>//</span> STREAMING
            </h4>

            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-2.5 font-mono text-xs">
              {[
                { name: "SPOTIFY",       href: "https://spoti.fi/2JmeZmW",                   icon: ICONS.spotify    },
                { name: "DEEZER",        href: "https://www.deezer.com",                     icon: ICONS.deezer     },
                { name: "BANDCAMP",      href: "https://bandcamp.com",                       icon: ICONS.bandcamp   },
                { name: "YT MUSIC",      href: "https://www.youtube.com/@skydivingfromhell", icon: ICONS.youtube    },
                { name: "APPLE MUSIC",   href: "https://music.apple.com",                   icon: ICONS.applemusic },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 sm:gap-3 text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1 p-1 rounded-lg hover:bg-white/5"
                  >
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-red-500/50 group-hover:bg-red-600/20 group-hover:text-red-400 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-bold tracking-wider text-[11px] sm:text-xs truncate">{item.name}</span>
                    <span className="text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs font-bold ml-auto hidden sm:inline">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ================================================================
              COLUNA 4: REDES SOCIAIS (COMPACTO NO MOBILE)
             ================================================================ */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-mono text-xs text-red-500 tracking-widest uppercase mb-2 sm:mb-4 flex items-center gap-2 font-bold">
              <span>//</span> REDES SOCIAIS
            </h4>

            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-2.5 font-mono text-xs">
              {[
                { name: "INSTAGRAM",     href: "https://www.instagram.com/skydivingfromhell", icon: ICONS.instagram },
                { name: "YOUTUBE",       href: "https://www.youtube.com/@skydivingfromhell", icon: ICONS.youtube   },
                { name: "FACEBOOK",      href: "https://www.facebook.com/skydivingfromhell",  icon: ICONS.facebook  },
                { name: "TIKTOK",        href: "https://www.tiktok.com/@skydivingfromhell",   icon: ICONS.tiktok    },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 sm:gap-3 text-zinc-400 hover:text-white transition-all duration-300 hover:translate-x-1 p-1 rounded-lg hover:bg-white/5"
                  >
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-red-500/50 group-hover:bg-red-600/20 group-hover:text-red-400 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-bold tracking-wider text-[11px] sm:text-xs truncate">{item.name}</span>
                    <span className="text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs font-bold ml-auto hidden sm:inline">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ================================================================
            RODAPÉ INFERIOR (COPYRIGHT & LOCALIZAÇÃO)
           ================================================================ */}
        <div className="border-t border-zinc-900 mt-8 sm:mt-12 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-500 gap-2 sm:gap-4 text-center sm:text-left">
          <p>© 2026 Skydiving From Hell. Todos os direitos reservados.</p>
          <p className="uppercase tracking-widest text-zinc-400 font-bold">
            VILA VELHA &bull; ESPÍRITO SANTO &bull; BRASIL
          </p>
        </div>

      </div>
    </footer>
  );
}

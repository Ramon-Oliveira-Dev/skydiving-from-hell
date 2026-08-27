"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { id: "player",  label: "Som",      href: "#player" },
  { id: "bio",     label: "História", href: "#bio" },
  { id: "lineup",  label: "Lineup",   href: "#lineup" },
  { id: "videos",  label: "Vídeos",   href: "#videos" },
  { id: "tour",    label: "Agenda",   href: "#tour" },
  { id: "merch",   label: "Merch",    href: "#merch" },
  { id: "contato", label: "Contato",  href: "#contato" },
];

function IconSpotify({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.306c-.218.358-.684.47-1.042.252-2.855-1.745-6.448-2.14-10.68-1.173-.41.094-.817-.164-.911-.574-.094-.41.164-.817.574-.911 4.636-1.06 8.604-.613 11.807 1.346.358.218.47.684.252 1.06zm1.467-3.26c-.274.446-.856.59-1.302.316-3.269-2.008-8.252-2.59-12.12-1.415-.499.151-1.03-.133-1.181-.632-.151-.499.133-1.03.632-1.181 4.417-1.34 9.907-.692 13.655 1.61.446.274.59.856.316 1.302zm.127-3.41c-3.92-2.327-10.38-2.542-14.137-1.402-.6.182-1.236-.16-1.418-.76-.182-.6.16-1.236.76-1.418 4.316-1.31 11.443-1.06 15.957 1.62.538.32.715 1.018.396 1.556-.32.538-1.018.715-1.558.404z" />
    </svg>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ["player", "bio", "lineup", "videos", "tour", "merch", "contato"];
      const scrollPos = window.scrollY + 250;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Bloqueia rolagem quando menu mobile estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.7)] h-16 sm:h-20"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-md border-b border-white/5 h-16 sm:h-20 md:h-24"
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 h-full flex items-center justify-between">
        
        {/* LOGO DA BANDA */}
        <a
          href="#"
          onClick={closeMenu}
          aria-label="Página inicial Skydiving From Hell"
          className="flex items-center gap-3 group cursor-pointer relative"
        >
          <div className="relative h-11 sm:h-13 md:h-14 w-auto flex items-center overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo_cabecalho.png"
              alt="Logotipo oficial Skydiving From Hell (S.D.F.H.)"
              width={200}
              height={56}
              priority
              className="h-full w-auto object-contain filter drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(239,68,68,0.8)] transition-all duration-300"
            />
          </div>
        </a>

        {/* NAVEGAÇÃO DESKTOP (MD+) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {/* Container Pílula Glassmorphism */}
          <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full flex items-center gap-4 lg:gap-6 shadow-2xl">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 px-3 py-1 rounded-full ${
                    isActive
                      ? "text-red-500 bg-white/[0.05] font-bold shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          
          {/* Botão Spotify com Efeito Radioativo & Gradiente Imponente */}
          <a
            href="https://spoti.fi/2JmeZmW"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all flex items-center gap-2 border border-red-500/40 hover:scale-105 active:scale-95 group/spbtn"
          >
            <IconSpotify className="w-4 h-4 text-white animate-pulse filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] group-hover/spbtn:scale-110 transition-transform duration-300 flex-shrink-0" />
            <span>SPOTIFY</span>
          </a>
        </nav>

        {/* BOTÃO HAMBÚRGUER MOBILE (VISÍVEL < MD) */}
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
          className="md:hidden relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50 text-white hover:bg-white/10 transition-colors shadow-lg active:scale-95"
        >
          <span
            className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-2 bg-red-400" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-2 bg-red-400" : ""
            }`}
          />
        </button>
      </div>

      {/* OVERLAY DO MENU MOBILE (FULLSCREEN RESPONSIVO) */}
      <div
        id="mobile-navigation-menu"
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: "" } : {})}
        className={`fixed inset-0 h-screen w-screen bg-black/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-between p-6 sm:p-10 transition-all duration-500 ease-in-out z-40 overflow-y-auto ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-10"
        }`}
      >
        <div className="w-full flex justify-start pt-2">
          <div className="h-11 sm:h-13 w-auto flex items-center overflow-hidden rounded-lg">
            <Image
              src="/logo_cabecalho.png"
              alt="Logotipo oficial Skydiving From Hell"
              width={180}
              height={50}
              loading="lazy"
              className="h-full w-auto object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]"
            />
          </div>
        </div>

        <nav className="flex flex-col items-center gap-5 my-auto text-center py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-zinc-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-400 transition-all"
            >
              {link.label}
            </a>
          ))}
          
          <a
            href="https://spoti.fi/2JmeZmW"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(239,68,68,0.6)] flex items-center gap-2.5 active:scale-95 group/spmobile"
          >
            <IconSpotify className="w-5 h-5 text-white animate-pulse filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] flex-shrink-0" />
            <span>Ouvir no Spotify</span>
            <span className="text-white/80 group-hover/spmobile:translate-x-1 transition-transform">↗</span>
          </a>
        </nav>

        <div className="text-center font-mono text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase pb-4">
          Skydiving From Hell &bull; Vila Velha / ES
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MapPin, Clock, Gift, Sparkles, Disc, Share2, X, ExternalLink, Ticket } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";
import ParallaxWatermark from "./ParallaxWatermark";
import TypewriterTitle from "./ui/type-writer";
import { FEATURED_SHOW } from "../lib/band-data";

const ATTRACTION_ICONS = {
  tattoo: Sparkles,
  merch: Gift,
  disc: Disc,
};

export default function BandTour() {
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [copied, setCopied] = useState(false);

  const closeModal = useCallback(() => {
    setSelectedFlyer(null);
    setCopied(false);
  }, []);

  // Fechar modal com a tecla ESC e bloquear scroll do fundo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (selectedFlyer) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFlyer, closeModal]);

  // Função de Compartilhamento do Evento
  const handleShare = async () => {
    const shareData = {
      title: "Skydiving From Hell — Show Oficial",
      text: "Confira o show do Skydiving From Hell (S.D.F.H.) no Correria Music Bar!",
      url: window.location.href,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Compartilhamento cancelado pelo usuário
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareData.text}\n${shareData.url}`
      )}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="tour"
      className="relative w-full bg-[url('/bg-placeholder.jpg')] bg-fixed bg-cover bg-center border-t border-white/10 scroll-mt-20 overflow-hidden py-20 sm:py-32 md:py-48 px-4 sm:px-8 lg:px-16 min-h-0"
    >
      {/* Overlay Escuro Profundo */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />

      {/* Marca d'água Parallax Monumental */}
      <ParallaxWatermark text="AO VIVO" speed={0.4} position="center" />

      {/* Iluminação Ambiente em Parallax */}
      <ParallaxLayer speed={0.35} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
        <div className="w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-red-600/10 blur-[150px] rounded-full" />
      </ParallaxLayer>

      <div className="relative z-10 w-full">
        
        {/* Header da Seção */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-12 sm:mb-16 md:mb-24 text-center flex flex-col items-center justify-center">
            <div className="mb-2 sm:mb-3">
              <TypewriterTitle
                prefix="//"
                prefixClassName="text-red-500 font-mono font-medium text-[11px]"
                sequences={[
                  { text: "AGENDA DE SHOWS", deleteAfter: true, pauseAfter: 3500 },
                  { text: "TOUR & FESTIVAIS 2026", deleteAfter: true, pauseAfter: 2500 },
                  { text: "AO VIVO NO CORRERIA", deleteAfter: true, pauseAfter: 2500 },
                  { text: "INGRESSOS & INFORMAÇÕES", deleteAfter: true, pauseAfter: 2500 },
                ]}
                typingSpeed={38}
                deleteSpeed={18}
                autoLoop={true}
                loopDelay={1000}
                textClassName="font-mono text-xs uppercase tracking-[0.4em] text-red-500 font-bold"
                cursorClassName="bg-red-500 h-[1em] w-[2px] shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
            </div>
            <h2 className="linha-mask text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight pb-2 leading-tight overflow-visible flex items-center justify-center">
              <TypewriterTitle
                sequences={[
                  { text: "Datas & Festivais", deleteAfter: true, pauseAfter: 4000 },
                  { text: "05/10 • Correria Music Bar", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Espírito Santo • Brasil", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Garanta Seu Ingresso", deleteAfter: true, pauseAfter: 2800 },
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
            CARD PRINCIPAL EM 3 COLUNAS FLUIDAS (GRID LG:GRID-COLS-12)
           ================================================================ */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_8px_32px_0_rgba(220,38,38,0.2)] hover:border-red-500/40 hover:shadow-[0_16px_50px_rgba(220,38,38,0.25)] transition-all duration-500">
          
          {/* ============================================================
              COLUNA 1: CARTAZ OFICIAL IMPONENTE (LG:COL-SPAN-4)
             ============================================================ */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div
              onClick={() => setSelectedFlyer(FEATURED_SHOW.flyer)}
              className="w-full h-80 lg:h-[380px] rounded-2xl border-2 border-red-500/30 hover:border-red-500/80 shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:shadow-[0_0_45px_rgba(220,38,38,0.4)] cursor-pointer group/poster relative overflow-hidden bg-black/40 transition-all duration-500 hover:scale-[1.015]"
            >
              <Image
                src={FEATURED_SHOW.flyer}
                alt="Cartaz oficial do show Vila Velha Hardcore no Correria Music Bar"
                width={480}
                height={600}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-700"
              />

              {/* Badge Fixo no Topo do Cartaz */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-mono text-[10px] font-bold text-red-400 uppercase tracking-widest shadow-md">
                Cartaz Oficial
              </div>
            </div>
          </div>

          {/* ============================================================
              COLUNA 2: INFORMAÇÕES CENTRAIS & LINEUP (LG:COL-SPAN-5)
             ============================================================ */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4 py-2 w-full">
            
            {/* Status do Evento Centralizado */}
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
              <span className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-[0.25em] text-red-500/90">
                Próximo Show // Destaque Oficial
              </span>
            </div>

            {/* Título Maciço do Evento Centralizado */}
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-zinc-200 group-hover:to-red-500 transition-all duration-300">
                {FEATURED_SHOW.title}
              </h3>
              
              {/* Local Centralizado com Ícone MapPin */}
              <div className="flex items-center justify-center gap-2 text-zinc-300 text-sm sm:text-base font-mono mt-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{FEATURED_SHOW.place}</span>
              </div>
            </div>

            {/* Bloco de Data e Horário em Destaque Centralizado Simétrico */}
            <div className="flex flex-col items-center justify-center py-2 px-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
              <div className="font-mono text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500 tracking-tighter leading-none">
                {FEATURED_SHOW.date}
              </div>
              <div className="flex items-center justify-center gap-1.5 font-mono text-xs sm:text-sm text-red-400 font-bold tracking-wider mt-2">
                <Clock className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span>{FEATURED_SHOW.time}</span>
              </div>
            </div>

            {/* Lineup Centralizado */}
            <div className="space-y-2 pt-1 w-full flex flex-col items-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-bold block">
                // LINEUP DO EVENTO:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {FEATURED_SHOW.bands.map((band, idx) => (
                  <span
                    key={band}
                    className={`font-mono text-xs px-3 py-1.5 rounded-lg font-bold transition-transform duration-300 hover:scale-105 ${
                      idx === 0
                        ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                        : "bg-white/5 text-zinc-300 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {band}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ============================================================
              COLUNA 3: PAINEL DE AÇÕES E ATRAÇÕES DA DIREITA (LG:COL-SPAN-3)
             ============================================================ */}
          <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full gap-5 shadow-inner">
            
            {/* Topo do Painel: Entrada & Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-red-400" />
                  <span>ACESSO:</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-mono text-[10px] font-black uppercase tracking-widest shadow-md">
                  Entrada Franca
                </span>
              </div>

                {/* Lista de Atrações do Evento */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                    ATRAÇÕES EXTRAS:
                  </span>
                  <div className="flex flex-col gap-2">
                    {FEATURED_SHOW.attractions.map((attr) => {
                      const IconComp = ATTRACTION_ICONS[attr.type] || Sparkles;
                      return (
                        <div
                          key={attr.label}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-zinc-300 font-mono"
                        >
                          <IconComp className="w-3.5 h-3.5 text-red-500 flex-shrink-0" aria-hidden="true" />
                          <span>{attr.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
            </div>

            {/* Ações: Hierarquia de Botões */}
            <div className="space-y-3 pt-2">
              <a
                href={FEATURED_SHOW.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest active:scale-95 border border-red-500/40"
              >
                <span>Ver Local no Mapa</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleShare}
                className="w-full py-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white font-mono text-xs rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5 text-red-400" />
                <span>Compartilhar Show</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      </div>

      {/* ================================================================
          MODAL DE TELA CHEIA (LIGHTBOX CARTAZ DO SHOW)
         ================================================================ */}
      {selectedFlyer && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
        >
          {/* Botão Fechar no Canto Superior Direito */}
          <button
            onClick={closeModal}
            aria-label="Fechar Cartaz"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-black/80 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Container do Cartaz Centralizado */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-[85vh] flex flex-col items-center gap-4"
          >
            <Image
              src={selectedFlyer}
              alt="Cartaz Oficial Ampliado do show Vila Velha Hardcore"
              width={800}
              height={1000}
              loading="lazy"
              className="max-h-[72vh] w-auto max-w-[92vw] object-contain rounded-2xl border border-red-500/40 shadow-[0_0_60px_rgba(220,38,38,0.4)]"
            />

            {/* Ações no Modal: Compartilhar & Fechar */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
              <button
                onClick={handleShare}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95 flex items-center gap-2 border border-red-400/30"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartilhar Show</span>
              </button>
              
              <button
                onClick={closeModal}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";
import ParallaxWatermark from "./ParallaxWatermark";
import GradientCarousel from "./ui/gradient-carousel";
import TypewriterTitle from "./ui/type-writer";
import AshParticles from "./AshParticles";
import {
  X,
  ExternalLink,
  Sliders,
  Music,
  Radio,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { MEMBERS } from "../lib/band-data";

function IconInstagram({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function BandLineup() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const openMember = (member) => {
    if (typeof document !== "undefined" && document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedMember(member);
        setCurrentImgIndex(0);
        setIsPaused(false);
      });
    } else {
      setSelectedMember(member);
      setCurrentImgIndex(0);
      setIsPaused(false);
    }
  };

  const closeModal = useCallback(() => {
    if (typeof document !== "undefined" && document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedMember(null);
        setCurrentImgIndex(0);
        setIsPaused(false);
      });
    } else {
      setSelectedMember(null);
      setCurrentImgIndex(0);
      setIsPaused(false);
    }
  }, []);

  // Fechar com a tecla ESC e travar rolagem da página
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (selectedMember) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember, closeModal]);

  // Carrossel Automático de Fotos (3500ms com pausa no hover)
  useEffect(() => {
    if (
      !selectedMember ||
      !selectedMember.images ||
      selectedMember.images.length <= 1 ||
      isPaused
    )
      return;

    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % selectedMember.images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [selectedMember, isPaused]);

  // Ações Manuais do Carrossel
  const nextImage = (e) => {
    e.stopPropagation();
    if (!selectedMember?.images) return;
    setCurrentImgIndex((prev) => (prev + 1) % selectedMember.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (!selectedMember?.images) return;
    setCurrentImgIndex(
      (prev) => (prev - 1 + selectedMember.images.length) % selectedMember.images.length
    );
  };

  return (
    <section
      id="lineup"
      className="relative w-full bg-zinc-950 border-t border-white/10 scroll-mt-20 overflow-hidden py-16 sm:py-24 md:py-36 px-4 sm:px-8 lg:px-12"
    >
      {/* Efeito Atmosférico de Cinzas e Brasas em Movimento de Fundo */}
      <AshParticles count={40} />

      {/* Iluminação Ambiente em Parallax */}
      <ParallaxLayer speed={0.4} className="absolute top-1/4 left-1/4 pointer-events-none -z-10">
        <div className="w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 blur-[140px] rounded-full" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.35} className="absolute bottom-1/4 right-1/4 pointer-events-none -z-10">
        <div className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-orange-600/10 blur-[140px] rounded-full" />
      </ParallaxLayer>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header da Seção */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-6 sm:mb-10 text-center flex flex-col items-center justify-center">
            <div className="mb-2 sm:mb-3">
              <TypewriterTitle
                prefix="//"
                prefixClassName="text-red-500 font-mono font-medium text-[11px]"
                sequences={[
                  { text: "FORMAÇÃO OFICIAL", deleteAfter: true, pauseAfter: 3500 },
                  { text: "OS OPERADORES DO SOM", deleteAfter: true, pauseAfter: 2500 },
                  { text: "MÚSICOS & PERFORMANCE", deleteAfter: true, pauseAfter: 2500 },
                  { text: "LINEUP ATUAL // S.D.F.H.", deleteAfter: true, pauseAfter: 2500 },
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
                  { text: "Formação Oficial", deleteAfter: true, pauseAfter: 4000 },
                  { text: "Ramon • Bateria", deleteAfter: true, pauseAfter: 2600 },
                  { text: "Davi • Guitarra", deleteAfter: true, pauseAfter: 2600 },
                  { text: "Ingrid • Guitarra", deleteAfter: true, pauseAfter: 2600 },
                  { text: "Jeffão • Vocal", deleteAfter: true, pauseAfter: 2600 },
                  { text: "Trevas • Baixo", deleteAfter: true, pauseAfter: 2600 },
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
            GRADIENT CAROUSEL: CARROSSEL 3D COM GRADIENTES DINÂMICOS
           ================================================================ */}
        <ScrollReveal direction="up" delay={150}>
          <div className="w-full">
            <GradientCarousel
              items={MEMBERS}
              cardWidth={310}
              cardHeight={460}
              cardGap={36}
              maxRotationDegrees={22}
              maxDepthPx={130}
              minScale={0.88}
              gradientIntensity={0.35}
              autoplay={!selectedMember}
              autoplayInterval={3500}
              pauseOnHover={true}
              onCardClick={(member) => openMember(member)}
              renderCard={(member, idx, isActive) => {
                const hasIndividualPortrait =
                  member.id !== "trevas" &&
                  member.images &&
                  member.images[0] &&
                  !member.images[0].includes("band_group");

                return (
                  <div
                    className={`w-full h-full rounded-2xl overflow-hidden backdrop-blur-xl border flex flex-col justify-between transition-all duration-500 select-none ${
                      isActive
                        ? "bg-zinc-950/95 border-red-500/80 shadow-[0_20px_50px_rgba(220,38,38,0.4),_0_0_25px_rgba(220,38,38,0.2)]"
                        : "bg-zinc-950/80 border-white/10 opacity-70 hover:opacity-95 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                    }`}
                  >
                    <div>
                      {/* Foto do Integrante */}
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                        {hasIndividualPortrait ? (
                          <Image
                            src={member.images[0]}
                            alt={`Retrato oficial de ${member.name} — ${member.role}`}
                            width={320}
                            height={360}
                            priority={idx === 0}
                            loading={idx === 0 ? "eager" : "lazy"}
                            className={`w-full h-full object-cover object-top transition-all duration-700 ${
                              isActive
                                ? "scale-105 filter grayscale-0 brightness-105"
                                : "scale-100 filter grayscale brightness-90"
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-zinc-600 p-6 text-center">
                            <User className="w-16 h-16 opacity-40 mb-2" />
                            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                              RETRATO EM BREVE
                            </span>
                          </div>
                        )}

                        {/* Gradiente de Fusão na Base */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent pointer-events-none" />

                        {/* Badge de Cargo */}
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r ${member.tagColor} shadow-md`}
                          >
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Conteúdo do Card */}
                      <div className="p-4 sm:p-5 space-y-2 text-left">
                        <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                          {member.name}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                          {member.desc}
                        </p>
                      </div>
                    </div>

                    {/* CTA "Ver Dossiê" */}
                    <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                        <span className={isActive ? "text-red-400" : "text-zinc-300"}>
                          Ver dossiê
                        </span>
                        <span className="text-red-500">&rarr;</span>
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        S.D.F.H.
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* ================================================================
      {/* ================================================================
          MODAL DE DOSSIÊ COMPLETO EM TELA CHEIA (FULLSCREEN EXPERIÊNCIA TOTAL)
         ================================================================ */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Dossiê de ${selectedMember.name}`}
          className="fixed inset-0 z-[9999] w-screen h-[100dvh] bg-black/95 backdrop-blur-3xl flex flex-col overflow-y-auto overscroll-contain animate-fadeIn text-white"
        >
          {/* BARRA SUPERIOR FIXA (HEADER DO DOSSIÊ COM BOTÃO FECHAR) */}
          <div className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3">
              <Image
                src="/logo_cabecalho.png"
                alt="Logotipo oficial Skydiving From Hell"
                width={140}
                height={38}
                style={{ width: "auto" }}
                className="h-7 sm:h-8 object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              />
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 font-mono text-xs text-red-500 font-bold uppercase tracking-[0.25em]">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                <span>DOSSIÊ OFICIAL // {selectedMember.role}</span>
              </div>
            </div>

            {/* BOTÃO FECHAR PROEMINENTE */}
            <button
              onClick={closeModal}
              aria-label="Fechar Dossiê"
              className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(220,38,38,0.5)] cursor-pointer"
            >
              <span>Fechar</span>
              <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300 text-red-400 group-hover:text-white" />
            </button>
          </div>

          {/* CONTEÚDO PRINCIPAL DO INTEGRANTE EM TELA CHEIA */}
          <div className="flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* COLUNA ESQUERDA: CARROSSEL DE FOTOS EM ALTA RESOLUÇÃO */}
              <div className="lg:col-span-5 flex flex-col items-center gap-4 w-full">
                <div
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="w-full h-80 sm:h-96 lg:h-[500px] xl:h-[540px] rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-[0_0_50px_rgba(220,38,38,0.3)] bg-zinc-900 relative group/carousel select-none"
                >
                  {selectedMember.images && selectedMember.images.length > 0 ? (
                    <Image
                      key={currentImgIndex}
                      src={selectedMember.images[currentImgIndex]}
                      alt={`Foto de palco de ${selectedMember.name} (${
                        currentImgIndex + 1
                      } de ${selectedMember.images.length})`}
                      width={600}
                      height={600}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-opacity duration-700 animate-fadeIn"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-zinc-600">
                      <Music className="w-20 h-20 mb-3 opacity-40 text-red-500" />
                      <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                        FOTO OFICIAL EM ATUALIZAÇÃO
                      </span>
                    </div>
                  )}

                  {/* Badge de Cargo Fixo na Foto */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-wider text-white bg-gradient-to-r ${selectedMember.tagColor} shadow-lg`}
                    >
                      {selectedMember.role}
                    </span>
                  </div>

                  {/* Setas Manuais de Navegação */}
                  {selectedMember.images && selectedMember.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        aria-label="Foto Anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-lg active:scale-95 z-20 cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={nextImage}
                        aria-label="Próxima Foto"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-lg active:scale-95 z-20 cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Indicadores de Pontos (Dots) */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        {selectedMember.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImgIndex(idx);
                            }}
                            aria-label={`Ir para foto ${idx + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === currentImgIndex
                                ? "w-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                                : "w-2 bg-white/40 hover:bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Botão de Rede Social Instagram */}
                <a
                  href={selectedMember.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-red-600/40 border border-white/10 hover:border-red-500/40 text-zinc-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-95"
                >
                  <IconInstagram className="w-4 h-4 text-red-400" />
                  <span>Seguir {selectedMember.socials.handle}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>

              {/* COLUNA DIREITA: INFORMAÇÕES TÉCNICAS E TRAJETÓRIA */}
              <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                {/* Header do Dossiê */}
                <div className="border-b border-white/10 pb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                    <span className="font-mono text-xs text-red-500 uppercase tracking-[0.3em] font-bold">
                      DOSSIÊ DE INTEGRANTE OFICIAL
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                    {selectedMember.name}
                  </h3>
                  <p className="font-mono text-sm sm:text-base text-zinc-400 mt-1">
                    Operador Oficial &bull; {selectedMember.role}
                  </p>
                </div>

                {/* Seção 1: Trajetória */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    <span>TRAJETÓRIA NO METAL</span>
                  </span>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans bg-white/[0.02] p-4 sm:p-5 rounded-2xl border border-white/5">
                    {selectedMember.fullHistory}
                  </p>
                </div>

                {/* Seção 2: Setup Técnico */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-red-500" />
                    <span>SETUP & AFINAÇÃO</span>
                  </span>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 font-mono text-xs sm:text-sm text-zinc-200 shadow-inner">
                    {selectedMember.setup}
                  </div>
                </div>

                {/* Seção 3: Equipamentos */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-red-500" />
                    <span>EQUIPAMENTO OFICIAL</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedMember.equipment.map((item) => (
                      <div
                        key={item}
                        className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs text-zinc-300 flex items-center gap-2.5"
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÃO FECHAR INFERIOR (FACILITA FECHAR APÓS ROLAR ATÉ O FIM) */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                Skydiving From Hell &bull; Linha de Frente
              </div>
              <button
                onClick={closeModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Fechar Dossiê</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

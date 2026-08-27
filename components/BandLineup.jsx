"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";
import ParallaxWatermark from "./ParallaxWatermark";
import TiltCard, { TiltLayer } from "./TiltCard";
import {
  X,
  ExternalLink,
  Sliders,
  Music,
  Radio,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

import { MEMBERS } from "../lib/band-data";

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
      className="relative w-full bg-[url('/bg-placeholder.jpg')] bg-fixed bg-cover bg-center border-t border-white/10 scroll-mt-20 overflow-hidden py-20 sm:py-32 md:py-48 px-4 sm:px-8 lg:px-16 min-h-0"
    >
      {/* Overlay Escuro Profundo */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />

      {/* Marca d'água Parallax Monumental */}
      <ParallaxWatermark text="OPERADORES" speed={0.45} position="center" />

      {/* Iluminação Ambiente em Parallax */}
      <ParallaxLayer speed={0.4} className="absolute top-1/4 left-1/4 pointer-events-none -z-10">
        <div className="w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 blur-[140px] rounded-full" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.35} className="absolute bottom-1/4 right-1/4 pointer-events-none -z-10">
        <div className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-orange-600/10 blur-[140px] rounded-full" />
      </ParallaxLayer>

      <div className="relative z-10 w-full">
        
        {/* Header da Seção */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-12 sm:mb-16 md:mb-24 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold block mb-2 sm:mb-3">
              FORMAÇÃO OFICIAL
            </span>
            <h2 className="linha-mask text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500 pb-2 leading-tight overflow-visible">
              <span className="inline-block pb-1">Formação Oficial</span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" stagger={0.25} duration={1500} threshold="top 80%">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {MEMBERS.map((member) => {
            const hasIndividualPortrait = member.id !== "trevas" && member.images && member.images[0] && !member.images[0].includes("band_group");

            return (
              <TiltCard
                key={member.id}
                onClick={() => openMember(member)}
                data-ativo={selectedMember?.id === member.id ? "true" : "false"}
                className="card-membro group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-red-500/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(220,38,38,0.45),_0_0_20px_rgba(220,38,38,0.15)] cursor-pointer h-full"
              >
                <div>
                  {/* Foto / Visual do Integrante em 3D (20px Z) */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                    {hasIndividualPortrait ? (
                      <Image
                        src={member.images[0]}
                        alt={`Retrato oficial de ${member.name} — ${member.role}`}
                        width={320}
                        height={380}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="foto w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:brightness-110 group-hover:contrast-110"
                      />
                    ) : (
                      /* Fallback consistente de silhueta para Trevas (Tarefa 1.4) */
                      <div className="foto w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-zinc-600 group-hover:text-red-500 transition-colors relative p-6 text-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-20 h-20 opacity-30 group-hover:opacity-60 transition-opacity mb-2 text-zinc-500 group-hover:text-red-500"
                          aria-hidden="true"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                          RETRATO EM BREVE
                        </span>
                      </div>
                    )}

                    {/* Gradiente de Fusão na Base da Imagem */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                    {/* Overlay avermelhado agressivo no hover */}
                    <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/15 transition-colors duration-500 pointer-events-none mix-blend-overlay" />

                    {/* Badge de Função em 3D (25px Z) */}
                    <TiltLayer depth={25} className="absolute top-3 left-3 pointer-events-none z-10">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r ${member.tagColor} shadow-md`}
                      >
                        {member.role}
                      </span>
                    </TiltLayer>
                  </div>

                  {/* Conteúdo do Card em 3D (15px Z) */}
                  <TiltLayer depth={15} className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight group-hover:text-red-400 transition-colors">
                        {member.name}
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">
                      {member.desc}
                    </p>
                  </TiltLayer>
                </div>

                {/* Único CTA por Card em 3D (Tarefa 1.5) */}
                <TiltLayer depth={20} className="px-5 sm:px-6 pb-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-300 group-hover:text-white font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-1.5">
                    <span>Ver dossiê</span>
                    <span className="text-red-500 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    S.D.F.H.
                  </span>
                </TiltLayer>
              </TiltCard>
            );
          })}
        </div>
        </ScrollReveal>
      </div>

      {/* ================================================================
          MODAL DE DOSSIÊ COMPLETO EM TELA CHEIA (FULLSCREEN CAROUSEL)
         ================================================================ */}
      {selectedMember && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 w-screen h-screen bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto animate-fadeIn"
        >
          {/* Botão Fechar Flutuante Fixo no Canto Superior Direito */}
          <button
            onClick={closeModal}
            aria-label="Fechar Dossiê"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] w-12 h-12 rounded-full bg-black/90 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Container Interno Fluido de Alta Definição */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl xl:max-w-7xl bg-zinc-950/90 border border-red-500/30 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_0_90px_rgba(220,38,38,0.3)] my-auto max-h-[92vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* ============================================================
                  COLUNA ESQUERDA: CARROSSEL DE FOTOS AUTOMÁTICO
                 ============================================================ */}
              <div className="lg:col-span-5 flex flex-col items-center gap-4 w-full">
                
                <div
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="w-full h-80 sm:h-96 lg:h-[500px] xl:h-[540px] rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-[0_0_50px_rgba(220,38,38,0.25)] bg-zinc-900 relative group/carousel select-none"
                >
                  {/* Foto Atual com Transição Suave */}
                  {selectedMember.images && selectedMember.images.length > 0 ? (
                    <Image
                      key={currentImgIndex}
                      src={selectedMember.images[currentImgIndex]}
                      alt={`Foto de palco de ${selectedMember.name} (${currentImgIndex + 1} de ${selectedMember.images.length})`}
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
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-lg active:scale-95 z-20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={nextImage}
                        aria-label="Próxima Foto"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-lg active:scale-95 z-20"
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
                            className={`h-2 rounded-full transition-all duration-300 ${
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

                {/* Botão de Rede Social */}
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

              {/* ============================================================
                  COLUNA DIREITA: INFORMAÇÕES TÉCNICAS E TRAJETÓRIA
                 ============================================================ */}
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

                {/* Seção 1: Trajetória & História Completa */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    <span>TRAJETÓRIA NO METAL</span>
                  </span>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans bg-white/[0.02] p-4 sm:p-5 rounded-2xl border border-white/5">
                    {selectedMember.fullHistory}
                  </p>
                </div>

                {/* Seção 2: Setup Técnico & Afinação */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-red-500" />
                    <span>SETUP & AFINAÇÃO</span>
                  </span>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 font-mono text-xs sm:text-sm text-zinc-200 shadow-inner">
                    {selectedMember.setup}
                  </div>
                </div>

                {/* Seção 3: Equipamentos e Marcas Utilizadas */}
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
          </div>
        </div>
      )}
    </section>
  );
}

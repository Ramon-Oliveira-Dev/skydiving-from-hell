"use client";

import React, { useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
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

const MEMBERS = [
  {
    id: "jeffao",
    name: "Jeffão",
    role: "Vocal / Frontman",
    images: [
      "/member_jeffao.jpg",
      "/live_jeffao_ingrid.jpg",
      "/band_live_color.jpg",
    ],
    desc: "Liderando os palcos desde 2016. Vocais viscerais, presença intimidadora e guturais que comandam as multidões.",
    tagColor: "from-red-600 to-orange-600",
    fullHistory:
      "Fundador e voz da S.D.F.H., Jeffão transformou angústias urbanas e críticas sociais em linhas vocais devastadoras. Com técnicas de gutural profundo, false cord e vocal screams, comanda a banda com energia inesgotável em palcos de todo o Espírito Santo.",
    setup: "Vocal Dinâmico & Processamento de Efeitos em Tempo Real",
    equipment: [
      "Microfone Shure SM7B & Beta 58A",
      "Processador TC Helicon VoiceLive",
      "Transmissor Sem Fio Shure GLXD4+",
      "In-Ear KZ ZS10 Pro",
    ],
    socials: {
      instagram: "https://instagram.com/bigjeff.hates",
      handle: "@bigjeff.hates",
    },
  },
  {
    id: "ingrid",
    name: "Ingrid",
    role: "Guitarra 8 Cordas",
    images: [
      "/member_ingrid.jpg",
      "/live_jeffao_ingrid.jpg",
      "/band_live_bw.jpg",
    ],
    desc: "Arquiteta de riffs pesados, velocidade e precisão cirúrgica. Traz influências progressivas para o peso extremo.",
    tagColor: "from-purple-600 to-red-600",
    fullHistory:
      "Referência no metal moderno capixaba, Ingrid conduz a afinação estendida de 8 cordas com agressividade técnica e sofisticação harmônica. É a mente por trás de breakdowns assimétricos e timbres hiper-definidos gravados nos singles da banda.",
    setup: "Afinação Drop E / E Standard (8 Cordas)",
    equipment: [
      "Guitarra Ibanez RG8 8-String Custom",
      "Modelador Neural DSP Quad Cortex",
      "Captadores Fishman Fluence Modern",
      "Cordas D'Addario NYXL (.009 - .080)",
    ],
    socials: {
      instagram: "https://instagram.com/ingridguitar",
      handle: "@ingridguitar",
    },
  },
  {
    id: "davier",
    name: "Davier",
    role: "Guitarra 8 Cordas",
    images: [
      "/member_davier.jpg",
      "/live_red_stage.jpg",
      "/band_group.jpg",
    ],
    desc: "Harmonia pesada e parede sonora, modelando a atmosfera com distorções massivas e texturas industriais.",
    tagColor: "from-blue-600 to-cyan-600",
    fullHistory:
      "Davier constrói a muralha rítmica e a camada densa da S.D.F.H. Com domínio de timbres de alto ganho e passagens dinâmicas, sincroniza com precisão milimétrica cada palhetada aos bumbos da bateria.",
    setup: "Afinação Drop E / Double Drop (8 Cordas)",
    equipment: [
      "Guitarra Schecter Omen-8 Custom",
      "Line 6 Helix LT / Cab IRs Fortin",
      "Captadores Seymour Duncan Nazgûl/Sentient",
      "Cordas Ernie Ball Skinny Top Heavy Bottom 8",
    ],
    socials: {
      instagram: "https://instagram.com/davier.cirino",
      handle: "@davier.cirino",
    },
  },
  {
    id: "trevas",
    name: "Trevas",
    role: "Baixo / Groove",
    images: [
      "/band_group.jpg",
      "/live_red_stage.jpg",
      "/band_live_bw.jpg",
    ],
    desc: "Pilar do ritmo e sustentação sonora. Linhas distorcidas, ataque direto e o groove brutal que faz tremer o chão.",
    tagColor: "from-emerald-600 to-teal-600",
    fullHistory:
      "A espinha dorsal das frequências sub-graves da S.D.F.H. Trevas funde distorção Darkglass com ataque rítmico percussivo, garantindo que cada acorde de 8 cordas tenha impacto físico na plateia.",
    setup: "Afinação Drop E / F# (5 Cordas Super Low)",
    equipment: [
      "Baixo Dingwall NG3 5-String Multi-Scale",
      "Pré-amp Darkglass Microtubes B7K Ultra",
      "Compressor Darkglass Hyper Luminal",
      "In-Ear Shure SE215",
    ],
    socials: {
      instagram: "https://instagram.com/philserpa",
      handle: "@philserpa",
    },
  },
  {
    id: "ramon",
    name: "Ramon",
    role: "Bateria / Máquina Rítmica",
    images: [
      "/member_ramon.jpg",
      "/live_ramon_blue.jpg",
      "/live_ramon_bw.jpg",
    ],
    desc: "Máquina rítmica de alta precisão. Bumbos duplos avassaladores, blast beats velozes e dinamismo destrutivo.",
    tagColor: "from-amber-600 to-orange-600",
    fullHistory:
      "Baterista de técnica fulminante, Ramon é o motor propulsor da banda. Especialista em polirritmias, pedal duplo de alta velocidade e viradas métricas complexas que sustentam a identidade brutal da S.D.F.H.",
    setup: "Kit Custom Double Bass & Pratos Dark / Raw",
    equipment: [
      "Bateria Tama Superstar Hyper-Drive",
      "Pedais Duplos Trick Pro 1-V BigFoot",
      "Pratos Meinl Byzance Extra Dry & Dual",
      "Triggers Roland TM-2 & Baquetas ProMark 5B",
    ],
    socials: {
      instagram: "https://instagram.com/ramonlucasdedeoliveira",
      handle: "@ramonlucasdedeoliveira",
    },
  },
];

export default function BandLineup() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const openMember = (member) => {
    setSelectedMember(member);
    setCurrentImgIndex(0);
    setIsPaused(false);
  };

  const closeModal = useCallback(() => {
    setSelectedMember(null);
    setCurrentImgIndex(0);
    setIsPaused(false);
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
      className="relative w-full bg-[url('/bg-placeholder.jpg')] bg-fixed bg-cover bg-center border-t border-white/10 scroll-mt-20 overflow-hidden py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 min-h-0"
    >
      {/* Overlay Escuro Profundo */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />

      {/* Iluminação Ambiente */}
      <div className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 w-full">
        
        {/* Header da Seção */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-10 sm:mb-14 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-red-500/90 font-bold block mb-2 sm:mb-3">
              // 02. INTEGRANTES & DOSSIÊS
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500">
              Formação Oficial
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
          </div>
        </ScrollReveal>

        {/* Grid de Cards dos Integrantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {MEMBERS.map((member, idx) => (
            <ScrollReveal key={member.name} direction="up" delay={idx * 120}>
              <TiltCard
                  onClick={() => openMember(member)}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-red-500/60 transition-all duration-500 hover:shadow-[0_16px_40px_rgba(220,38,38,0.3)] cursor-pointer h-full"
                >
                  <div>
                    {/* Foto / Visual do Integrante em 3D (20px Z) */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-900">
                      {member.images && member.images[0] ? (
                        <img
                          src={member.images[0]}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-zinc-600 group-hover:text-red-500 transition-colors">
                          <Music className="w-14 h-14 mb-2 opacity-50" />
                          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">S.D.F.H. OPERADOR</span>
                        </div>
                      )}

                      {/* Gradiente de Fusão na Base da Imagem */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                      {/* Badge de Função em 3D (25px Z) */}
                      <TiltLayer depth={25} className="absolute top-3 left-3 pointer-events-none z-10">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r ${member.tagColor} shadow-md`}
                        >
                          {member.role}
                        </span>
                      </TiltLayer>

                      {/* Overlay ao Passar o Mouse em 3D (30px Z) */}
                      <TiltLayer depth={30} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 pointer-events-none z-10">
                        <span className="px-3.5 py-1.5 rounded-full bg-red-600 text-white font-mono text-[11px] font-black uppercase tracking-widest shadow-xl">
                          Ver Dossiê ▶
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

                  {/* Rodapé do Card com Ação em 3D (20px Z) */}
                  <TiltLayer depth={20} className="px-5 sm:px-6 pb-5 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                      Dossiê Oficial
                    </span>
                    <span className="text-xs font-mono font-bold text-red-500 group-hover:translate-x-1 transition-transform">
                      +
                    </span>
                  </TiltLayer>
                </TiltCard>
            </ScrollReveal>
          ))}
        </div>
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
                    <img
                      key={currentImgIndex}
                      src={selectedMember.images[currentImgIndex]}
                      alt={`${selectedMember.name} - Foto ${currentImgIndex + 1}`}
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
                      // DOSSIÊ DE INTEGRANTE OFICIAL
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

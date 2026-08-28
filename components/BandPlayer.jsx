"use client";

import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";
import ParallaxWatermark from "./ParallaxWatermark";
import TypewriterTitle from "./ui/type-writer";
import { BorderBeam } from "./ui/border-beam";
import Image from "next/image";

import React, { useRef, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
} from "lucide-react";
import { useAudio, formatTime } from "../context/AudioContext";

export default function BandPlayer() {
  const progressRef = useRef(null);

  const {
    TRACKS,
    currentIndex,
    setCurrentIndex,
    track,
    isPlaying,
    currentTime,
    duration,
    isShuffle,
    repeatMode,
    volume,
    setVolume,
    isMuted,
    togglePlay,
    handleNext,
    handlePrev,
    seekToPercent,
    toggleShuffle,
    toggleRepeat,
    toggleMute,
  } = useAudio();

  // Controle de Volume
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  // Seek na Barra de Progresso
  const handleSeek = useCallback(
    (e) => {
      const bar = progressRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      seekToPercent(percent);
    },
    [seekToPercent]
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVol = isMuted ? 0 : volume;

  return (
    <section
      id="player"
      className="relative w-full bg-[url('/bg-placeholder.jpg')] bg-fixed bg-cover bg-center border-t border-white/10 scroll-mt-20 overflow-hidden py-20 sm:py-32 md:py-48 px-4 sm:px-8 lg:px-16 min-h-0"
    >
      {/* Overlay de Fundo com Blur Atmosférico */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Marca d'água Parallax Monumental */}
      <ParallaxWatermark text="DISCOGRAFIA" speed={0.4} position="center" />

      {/* Luzes Gradientes de Fundo em Parallax (Glow Effect) */}
      <ParallaxLayer speed={0.45} className="absolute top-1/4 left-1/4 pointer-events-none -z-0">
        <div className="w-96 h-96 bg-red-600/15 rounded-full blur-3xl" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.35} className="absolute bottom-1/4 right-1/4 pointer-events-none -z-0">
        <div className="w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </ParallaxLayer>

      <div className="relative z-10 w-full">

        {/* Header da Seção com Efeito Dinâmico Typewriter */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-12 sm:mb-16 md:mb-24 text-center flex flex-col items-center justify-center">
            <div className="mb-2 sm:mb-3">
              <TypewriterTitle
                prefix="//"
                prefixClassName="text-red-500 font-mono font-medium text-[11px]"
                sequences={[
                  { text: "DISCOGRAFIA & PLAYER", deleteAfter: true, pauseAfter: 3500 },
                  { text: "STREAMING & SINGLES", deleteAfter: true, pauseAfter: 2500 },
                  { text: "ÁUDIO EM ALTA DEFINIÇÃO", deleteAfter: true, pauseAfter: 2500 },
                  { text: "S.D.F.H. OFFICIAL TRACKS", deleteAfter: true, pauseAfter: 2500 },
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
                  { text: "Discografia & Player", deleteAfter: true, pauseAfter: 4000 },
                  { text: "Ouvir Black Flag", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Ouvir Amethyst", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Ouvir Unpatriot", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Ouvir Indigente", deleteAfter: true, pauseAfter: 2800 },
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

        <ScrollReveal direction="up" delay={150}>
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-stretch">

          {/* ================================================================
              PLAYER PRINCIPAL (MODERN GLASSMORPHISM + BORDER BEAM)
             ================================================================ */}
          <div className="relative overflow-hidden flex-1 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(255,0,0,0.15)] rounded-2xl p-4 xs:p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-5 sm:gap-8 hover:border-red-500/30 transition-all duration-500">

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              
              {/* Capa do Single com Glow e Animação ao Tocar */}
              <div className="relative flex-shrink-0 group">
                <div
                  className={`relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
                    isPlaying
                      ? "ring-4 ring-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.5)] scale-102"
                      : "ring-1 ring-white/10"
                  }`}
                >
                  <Image
                    src={track.cover}
                    alt={`Capa oficial do single ${track.title} da banda Skydiving From Hell`}
                    width={224}
                    height={224}
                    priority
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay sutil na capa */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Equalizador animado sobre a capa */}
                {isPlaying && (
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-500/40 flex items-end gap-1 h-5 shadow-lg">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-red-500 to-orange-400 rounded-full"
                        style={{
                          height: "80%",
                          animation: `eqBounce 0.${4 + i}s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Informações da Faixa Atual */}
              <div className={`flex-1 text-center sm:text-left flex flex-col justify-center ${isPlaying ? "faixa-tocando" : ""}`}>
                <span className="font-mono text-[10px] xs:text-xs uppercase tracking-widest text-red-400 font-bold mb-1">
                  {track.tag}
                </span>
                <h3 className="titulo text-2xl xs:text-3xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-md transition-colors duration-300">
                  {track.title}
                </h3>
                <p className="text-xs xs:text-sm text-zinc-400 font-mono tracking-wider mt-1">
                  SKYDIVING FROM HELL
                </p>

                {/* Badges de Faixa e Modo de Reprodução com Hierarquia e Espaçamento Claros */}
                <div className="mt-3.5 sm:mt-5 flex flex-wrap gap-2 sm:gap-2.5 justify-center sm:justify-start items-center">
                  <span className="px-3 py-0.5 sm:px-3.5 sm:py-1 bg-white/5 border border-white/10 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-300 shadow-sm">
                    Faixa {track.number} de 0{TRACKS.length}
                  </span>
                  <span className="px-3 py-0.5 sm:px-3.5 sm:py-1 bg-red-950/60 border border-red-800/60 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold shadow-sm">
                    FLAC / HD
                  </span>
                  {isShuffle && (
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-red-600/20 border border-red-500/40 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold shadow-sm">
                      Shuffle Ativo
                    </span>
                  )}
                  {repeatMode !== "off" && (
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-orange-600/20 border border-orange-500/40 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold shadow-sm">
                      {repeatMode === "one" ? "Repetir Faixa" : "Repetir Tudo"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Barra de Progresso com Gradiente */}
            <div className="space-y-2">
              <div
                ref={progressRef}
                onClick={handleSeek}
                className="relative w-full h-2.5 bg-zinc-800/80 rounded-full cursor-pointer group overflow-hidden border border-white/5 hover:h-3 transition-all"
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-orange-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-zinc-400 px-1">
                <span>{formatTime(currentTime)}</span>
                <span>{track.durationStr || formatTime(duration)}</span>
              </div>
            </div>

            {/* ================================================================
                PAINEL INFERIOR: CONTROLES DE PLAYBACK & VOLUME
               ================================================================ */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-2">
              
              {/* Controles de Playback (Shuffle, Prev, Play/Pause, Next, Repeat) */}
              <div className="flex items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto">
                
                {/* Botão Shuffle (Aleatório) */}
                <button
                  onClick={toggleShuffle}
                  aria-label={isShuffle ? "Desativar Aleatório" : "Ativar Aleatório"}
                  title={isShuffle ? "Aleatório: Ligado" : "Aleatório: Desligado"}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 ${
                    isShuffle
                      ? "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Botão Faixa Anterior */}
                <button
                  onClick={handlePrev}
                  aria-label="Faixa Anterior"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 shadow-md"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Botão Play / Pause Principal */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  className="w-13 h-13 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] hover:scale-108 active:scale-95 transition-all duration-300 border border-red-400/40"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-7 sm:h-7" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-7 sm:h-7 ml-1" />
                  )}
                </button>

                {/* Botão Próxima Faixa */}
                <button
                  onClick={handleNext}
                  aria-label="Próxima Faixa"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 shadow-md"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Botão Repeat (Repetir) */}
                <button
                  onClick={toggleRepeat}
                  aria-label={`Modo de Repetição: ${repeatMode}`}
                  title={
                    repeatMode === "one"
                      ? "Repetir Faixa Atual"
                      : repeatMode === "all"
                      ? "Repetir Lista Completa"
                      : "Repetição Desativada"
                  }
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 relative ${
                    repeatMode !== "off"
                      ? "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {repeatMode === "one" ? (
                    <Repeat1 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                  ) : (
                    <Repeat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </button>

              </div>

              {/* Controle de Volume Deslizante */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md shadow-inner">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Desmutar" : "Mutar"}
                  className="text-zinc-400 hover:text-red-400 transition-colors"
                >
                  {currentVol === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-500" />
                  ) : currentVol < 0.5 ? (
                    <Volume1 className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={currentVol}
                  onChange={handleVolumeChange}
                  aria-label="Controle de Volume"
                  className="w-20 sm:w-28 h-1.5 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400 transition-all"
                />

                <span className="font-mono text-[10px] text-zinc-400 w-7 text-right">
                  {Math.round(currentVol * 100)}%
                </span>
              </div>

            </div>

            {/* BorderBeam Efeitos de Borda Laser Dinâmica (Magic UI) */}
            <BorderBeam
              duration={4}
              size={400}
              colorFrom="#ef4444"
              colorTo="#f97316"
              borderWidth={2.5}
            />
            <BorderBeam
              duration={4}
              delay={2}
              size={400}
              colorFrom="#dc2626"
              colorTo="#7f1d1d"
              borderWidth={2.5}
              reverse={true}
            />
          </div>

          {/* ================================================================
              TRACKLIST LATERAL GLASSMORPHISM + BORDER BEAM
             ================================================================ */}
          <div className="relative overflow-hidden lg:w-80 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(255,0,0,0.1)] rounded-2xl flex flex-col justify-between hover:border-red-500/30 transition-all duration-500">
            <div>
              <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
                  TRACKLIST
                </span>
                <span className="font-mono text-[10px] text-zinc-400 uppercase">
                  {TRACKS.length} FAIXAS
                </span>
              </div>

              <ul className="divide-y divide-white/5">
                {TRACKS.map((t, i) => {
                  const isActive = i === currentIndex;
                  return (
                    <li key={t.id}>
                      <button
                        onClick={() => {
                          setCurrentIndex(i);
                        }}
                        className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-red-600/20 to-transparent border-l-4 border-red-500 text-white"
                            : "hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {/* Miniatura da Capa */}
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow-sm relative">
                          <Image
                            src={t.cover}
                            alt={`Capa de ${t.title}`}
                            width={40}
                            height={40}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          {isActive && isPlaying && (
                            <div className="absolute inset-0 bg-red-600/40 flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`font-black uppercase tracking-tight truncate text-sm ${isActive ? "text-white" : "text-zinc-300"}`}>
                            {t.title}
                          </p>
                          <p className="font-mono text-[10px] text-zinc-500 uppercase truncate">
                            Single Oficial
                          </p>
                        </div>

                        <span className="font-mono text-xs text-zinc-500">
                          {t.number}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                STREAMING COMPLETO
              </span>
              <a
                href="https://spoti.fi/2JmeZmW"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold text-red-400 hover:text-orange-400 uppercase tracking-widest transition-colors flex items-center gap-1"
              >
                SPOTIFY ↗
              </a>
            </div>

            {/* BorderBeam Efeito de Borda Laser na Tracklist */}
            <BorderBeam
              duration={5}
              size={320}
              colorFrom="#ef4444"
              colorTo="#ea580c"
              borderWidth={2}
            />
            <BorderBeam
              duration={5}
              delay={2.5}
              size={320}
              colorFrom="#dc2626"
              colorTo="#7f1d1d"
              borderWidth={2}
              reverse={true}
            />
          </div>

        </div>
        </ScrollReveal>
      </div>
      <style>{`@keyframes eqBounce { from { transform: scaleY(0.2); } to { transform: scaleY(1); } }`}</style>
    </section>
  );
}

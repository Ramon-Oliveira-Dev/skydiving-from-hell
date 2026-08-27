"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
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
  ListMusic,
  ChevronDown,
  ChevronUp,
  X,
  Disc3,
  SlidersHorizontal,
} from "lucide-react";
import { useAudio, formatTime } from "../context/AudioContext";

export default function FloatingPlayer() {
  const {
    TRACKS,
    currentIndex,
    track,
    isPlaying,
    currentTime,
    duration,
    isShuffle,
    repeatMode,
    volume,
    setVolume,
    isMuted,
    playerMode,
    setPlayerMode,
    isQueueOpen,
    setIsQueueOpen,
    togglePlay,
    handleNext,
    handlePrev,
    selectTrack,
    seekToPercent,
    toggleShuffle,
    toggleRepeat,
    toggleMute,
  } = useAudio();

  const [pillVolumeOpen, setPillVolumeOpen] = useState(false);
  const progressBarRef = useRef(null);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVol = isMuted ? 0 : volume;

  const handleProgressBarClick = (e) => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    seekToPercent(percent);
  };

  /* ========================================================================
     1. ÍCONE NO CANTO DIREITO INFERIOR (QUANDO O PLAYER ESTÁ FECHADO/OCULTO)
     ======================================================================== */
  if (playerMode === "hidden") {
    return (
      <div className="fixed bottom-6 right-6 z-50 group animate-fadeIn">
        <button
          onClick={() => setPlayerMode("expanded")}
          aria-label="Abrir Player S.D.F.H."
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-zinc-950/90 border border-red-500/60 shadow-[0_0_30px_rgba(220,38,38,0.7)] backdrop-blur-xl hover:scale-110 active:scale-95 transition-all duration-300 group-hover:border-red-400"
        >
          {/* Anel de Pulso de Áudio */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border-2 border-red-500/80 animate-ping pointer-events-none opacity-60" />
          )}

          {/* Miniatura do Vinil Giratório */}
          <div className="w-10 h-10 rounded-full overflow-hidden relative shadow-inner">
            <Image
              src={track.cover}
              alt={track.title}
              width={40}
              height={40}
              className={`w-full h-full object-cover ${isPlaying ? "animate-spin" : ""}`}
              style={{ animationDuration: "5s" }}
            />
            <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-black border border-red-500" />
          </div>

          {/* Badge Indicador de Play */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_10px_rgba(220,38,38,0.9)]">
            {isPlaying ? (
              <span className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 bg-white h-full animate-pulse" />
                <span className="w-0.5 bg-white h-2/3 animate-bounce" />
                <span className="w-0.5 bg-white h-4/5 animate-pulse" />
              </span>
            ) : (
              <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
            )}
          </div>
        </button>

        {/* Tooltip Hover */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-zinc-900/95 border border-white/10 px-3 py-1.5 rounded-lg shadow-xl text-[11px] font-mono font-bold tracking-widest text-zinc-200 uppercase">
          Abrir Player S.D.F.H.
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ====================================================================
          2. FILA DE REPRODUÇÃO COM IMAGENS E VISUAL OTIMIZADO (DRAWER)
         ==================================================================== */}
      {isQueueOpen && (
        <div
          onClick={() => setIsQueueOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-zinc-950/95 border border-white/15 rounded-3xl p-5 sm:p-7 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] max-h-[85vh] overflow-y-auto mb-20 sm:mb-24 backdrop-blur-2xl"
          >
            {/* Header da Fila */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                  <ListMusic className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-widest block">
                    FILA DE REPRODUÇÃO ({TRACKS.length} FAIXAS)
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">
                    DISCOGRAFIA OFICIAL // S.D.F.H.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Botões de Shuffle e Repeat dentro da Fila */}
                <button
                  onClick={toggleShuffle}
                  title="Modo Aleatório"
                  className={`p-2 rounded-lg border transition-all ${
                    isShuffle
                      ? "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Shuffle className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={toggleRepeat}
                  title={`Repetição: ${repeatMode}`}
                  className={`p-2 rounded-lg border transition-all ${
                    repeatMode !== "off"
                      ? "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {repeatMode === "one" ? (
                    <Repeat1 className="w-3.5 h-3.5" />
                  ) : (
                    <Repeat className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={() => setIsQueueOpen(false)}
                  className="font-mono text-xs font-bold text-red-500 hover:text-white bg-red-600/10 hover:bg-red-600 border border-red-500/30 uppercase tracking-widest transition-all py-1.5 px-3.5 rounded-lg ml-2"
                >
                  FECHAR
                </button>
              </div>
            </div>

            {/* Lista dos 4 cards de faixas com imagens reais */}
            <div className="space-y-3">
              {TRACKS.map((t, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      selectTrack(idx);
                      setIsQueueOpen(false);
                    }}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 group ${
                      isActive
                        ? "bg-gradient-to-r from-red-950/50 via-zinc-900 to-zinc-950 border border-red-500/80 shadow-[0_0_30px_rgba(220,38,38,0.35)]"
                        : "bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      {/* Número da faixa */}
                      <span
                        className={`font-mono text-xs sm:text-sm font-black w-6 text-center ${
                          isActive ? "text-red-500" : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {t.number}
                      </span>

                      {/* Capa / Arte da Música */}
                      <div
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border ${
                          isActive ? "border-red-500 ring-2 ring-red-500/40" : "border-white/10"
                        }`}
                      >
                        <Image
                          src={t.cover}
                          alt={t.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {isActive && isPlaying && (
                          <div className="absolute inset-0 bg-red-600/30 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                          </div>
                        )}
                      </div>

                      {/* Títulos e Subtítulos */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p
                            className={`font-black text-sm sm:text-base uppercase tracking-tight truncate ${
                              isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" : "text-zinc-200 group-hover:text-red-400"
                            }`}
                          >
                            {t.title}
                          </p>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-red-600 text-white uppercase tracking-wider">
                              TOCANDO
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider truncate mt-0.5">
                          {t.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Duração e Equalizador */}
                    <div className="flex items-center gap-3.5 flex-shrink-0">
                      {isActive && isPlaying && (
                        <div className="flex items-end gap-1 h-4">
                          <span className="w-1 bg-red-500 h-full animate-pulse rounded-full" />
                          <span className="w-1 bg-red-500 h-2/3 animate-bounce rounded-full" />
                          <span className="w-1 bg-orange-400 h-4/5 animate-pulse rounded-full" />
                        </div>
                      )}
                      <span className="font-mono text-xs sm:text-sm font-bold text-zinc-400">
                        {t.durationStr}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          3. MODO EXPANDIDO: BARRA INFERIOR COMPLETA (DOCK PLAYER)
         ==================================================================== */}
      {playerMode === "expanded" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-12px_45px_rgba(0,0,0,0.9)] transition-all duration-300">
          
          {/* Barra de Progresso Superior Vermelha Interativa */}
          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            className="w-full h-1.5 bg-zinc-900 cursor-pointer relative group overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-red-700 via-red-500 to-orange-500 shadow-[0_0_12px_rgba(239,68,68,0.9)] transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
            
            {/* LADO ESQUERDO: Capa, Título da Faixa e Tempo */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 max-w-[42%] sm:max-w-[32%]">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 relative bg-zinc-900 shadow-md">
                <Image
                  src={track.cover}
                  alt={track.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-sm sm:text-base uppercase tracking-tight text-white truncate drop-shadow-sm">
                  {track.title}
                </h4>
                <div className="font-mono text-[11px] sm:text-xs text-red-400 flex items-center gap-1 font-bold mt-0.5">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-400">{track.durationStr || formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* CENTRO: Controles Principais (Shuffle, Prev, Play/Pause, Next, Repeat) */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Botão Shuffle */}
              <button
                onClick={toggleShuffle}
                aria-label="Modo Aleatório"
                title={isShuffle ? "Aleatório: Ligado" : "Aleatório: Desligado"}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-95 ${
                  isShuffle
                    ? "bg-red-600/25 border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Faixa Anterior */}
              <button
                onClick={handlePrev}
                aria-label="Faixa anterior"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              {/* Botão Play / Pause Central Vermelho com Glow Profundo */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-orange-500 text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.9)] hover:shadow-[0_0_40px_rgba(220,38,38,1)] hover:scale-108 active:scale-95 border border-red-400/40"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
                )}
              </button>

              {/* Próxima Faixa */}
              <button
                onClick={handleNext}
                aria-label="Próxima faixa"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              {/* Botão Repeat (Repetir Música / Álbum) */}
              <button
                onClick={toggleRepeat}
                aria-label={`Modo de Repetição: ${repeatMode}`}
                title={
                  repeatMode === "one"
                    ? "Repetindo Faixa Atual"
                    : repeatMode === "all"
                    ? "Repetindo Discografia Completa"
                    : "Repetição Desativada"
                }
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-95 relative ${
                  repeatMode !== "off"
                    ? "bg-red-600/25 border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {repeatMode === "one" ? (
                  <Repeat1 className="w-4 h-4 text-orange-400" />
                ) : (
                  <Repeat className="w-4 h-4" />
                )}
                {repeatMode === "all" && (
                  <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold bg-red-600 text-white rounded-full px-1">
                    ALL
                  </span>
                )}
              </button>

            </div>

            {/* LADO DIREITO: Volume Alinhado, Fila, Minimizar e Fechar */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Controle de Volume com Slider Integrado e Alinhado */}
              <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Desmutar" : "Mutar"}
                  className="text-zinc-400 hover:text-red-400 transition-colors"
                >
                  {isMuted || volume === 0 ? (
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
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  aria-label="Ajuste de volume"
                  className="w-20 lg:w-24 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400"
                />

                <span className="font-mono text-[10px] text-zinc-400 w-6 text-right">
                  {Math.round(currentVol * 100)}%
                </span>
              </div>

              {/* Botão Fila de Músicas */}
              <button
                onClick={() => setIsQueueOpen((prev) => !prev)}
                aria-label="Abrir fila de reprodução"
                title="Fila de Reprodução"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                  isQueueOpen
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.7)]"
                    : "bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/15"
                }`}
              >
                <ListMusic className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Botão Minimizar para Pílula (Chevron Down) */}
              <button
                onClick={() => setPlayerMode("minimized")}
                aria-label="Minimizar player"
                title="Minimizar para Pílula"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/15 flex items-center justify-center transition-all"
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Botão Fechar / Ocultar Totalmente (X) */}
              <button
                onClick={() => setPlayerMode("hidden")}
                aria-label="Ocultar player"
                title="Ocultar Player"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-red-400 hover:bg-white/15 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
          4. MODO MINIMIZADO: PÍLULA COM CONTROLES COMPLETOS (PREV, NEXT, VOL)
         ==================================================================== */}
      {playerMode === "minimized" && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-zinc-950/95 backdrop-blur-2xl border border-white/15 rounded-full p-2.5 pl-3.5 pr-3.5 flex items-center gap-3 sm:gap-4 shadow-[0_12px_45px_rgba(0,0,0,0.95),_0_0_30px_rgba(220,38,38,0.3)] hover:border-red-500/50 transition-all duration-300">
            
            {/* Vinil Giratório com a Capa da Faixa */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/25 flex-shrink-0 shadow-lg">
              <Image
                src={track.cover}
                alt={track.title}
                width={44}
                height={44}
                className={`w-full h-full object-cover ${isPlaying ? "animate-spin" : ""}`}
                style={{ animationDuration: "5s" }}
              />
              <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-black border border-red-500" />
            </div>

            {/* Informações da Faixa */}
            <div className="min-w-0 max-w-[100px] sm:max-w-[140px]">
              <p className="font-black text-xs sm:text-sm uppercase tracking-tight text-white truncate">
                {track.title}
              </p>
              <p className="font-mono text-[10px] text-red-400 font-bold">
                {formatTime(currentTime)} <span className="text-zinc-500">/</span> {track.durationStr}
              </p>
            </div>

            {/* Controles de Playback na Pílula */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              
              {/* Retroceder */}
              <button
                onClick={handlePrev}
                aria-label="Faixa anterior"
                className="w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors active:scale-95"
              >
                <SkipBack className="w-3.5 h-3.5 fill-current" />
              </button>

              {/* Botão Play / Pause Vermelho Circular */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-orange-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.8)] hover:scale-105 active:scale-95 transition-all flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              {/* Avançar */}
              <button
                onClick={handleNext}
                aria-label="Próxima faixa"
                className="w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors active:scale-95"
              >
                <SkipForward className="w-3.5 h-3.5 fill-current" />
              </button>

              {/* Volume / Mute com Slider na Pílula */}
              <div className="relative flex items-center">
                <button
                  onClick={() => setPillVolumeOpen((p) => !p)}
                  aria-label="Controle de volume"
                  className="w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>

                {pillVolumeOpen && (
                  <div className="absolute bottom-11 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/15 p-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-fadeIn z-50">
                    <button
                      onClick={toggleMute}
                      className="text-xs text-zinc-400 hover:text-red-400"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={currentVol}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-18 accent-red-600 cursor-pointer h-1.5 bg-zinc-700 rounded-lg"
                    />
                  </div>
                )}
              </div>

            </div>

            <div className="h-5 w-[1px] bg-white/15 flex-shrink-0" />

            {/* Ações: Fila, Expandir e Fechar */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Abrir Fila */}
              <button
                onClick={() => setIsQueueOpen(true)}
                aria-label="Abrir fila de reprodução"
                title="Fila de Músicas"
                className="w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ListMusic className="w-3.5 h-3.5" />
              </button>

              {/* Expandir para Barra Completa */}
              <button
                onClick={() => setPlayerMode("expanded")}
                aria-label="Expandir player"
                title="Expandir Barra Completa"
                className="w-8 h-8 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              {/* Ocultar Totalmente */}
              <button
                onClick={() => setPlayerMode("hidden")}
                aria-label="Fechar player"
                title="Ocultar Player"
                className="w-7 h-7 rounded-full text-zinc-500 hover:text-red-400 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

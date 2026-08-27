"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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

// Tracklist oficial com capas reais em /public
const TRACKS = [
  {
    id: 1,
    title: "Amethyst",
    src: "/amethyst.mp3",
    cover: "/cover-amethyst.jpg",
    accent: "text-purple-400",
    tag: "Single Oficial // 2019",
  },
  {
    id: 2,
    title: "Indigente",
    src: "/indigente.mp3",
    cover: "/cover-indigente.jpg",
    accent: "text-red-400",
    tag: "Single Oficial // 2020",
  },
  {
    id: 3,
    title: "Unpatriot",
    src: "/unpatriot.mp3",
    cover: "/cover-unpatriot.jpg",
    accent: "text-zinc-300",
    tag: "Single Oficial // 2021",
  },
  {
    id: 4,
    title: "Black Flag",
    src: "/black_flag.mp3",
    cover: "/cover-blackflag.jpg",
    accent: "text-orange-400",
    tag: "Single Oficial // 2022",
  },
];

function formatTime(s) {
  if (isNaN(s) || !s) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ":" + String(sec).padStart(2, "0");
}

export default function BandPlayer() {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Novos Estados: Shuffle, Repeat e Volume
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("all"); // 'off' | 'all' | 'one'
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const track = TRACKS[currentIndex];

  // Carregar e tocar faixa ao mudar de índice
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const shouldPlay = isPlaying;
    audio.src = track.src;
    audio.load();
    if (shouldPlay) {
      audio.play().catch(() => setIsPlaying(false));
    }
    setCurrentTime(0);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sincronizar Volume e Mute no elemento <audio>
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  }, []);

  // Obter índice aleatório diferente do atual para o Shuffle
  const getRandomIndex = useCallback(() => {
    if (TRACKS.length <= 1) return 0;
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * TRACKS.length);
    } while (nextIdx === currentIndex);
    return nextIdx;
  }, [currentIndex]);

  // Avançar faixa (com suporte a Shuffle e Repeat)
  const handleNext = useCallback(() => {
    if (isShuffle) {
      setCurrentIndex(getRandomIndex());
    } else {
      setCurrentIndex((prev) => (prev + 1) % TRACKS.length);
    }
    setIsPlaying(true);
  }, [isShuffle, getRandomIndex]);

  // Faixa anterior
  const handlePrev = useCallback(() => {
    if (isShuffle) {
      setCurrentIndex(getRandomIndex());
    } else {
      setCurrentIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    }
    setIsPlaying(true);
  }, [isShuffle, getRandomIndex]);

  // Fim da faixa: Lógica de Reprodução Contínua, Shuffle e Repeat
  const handleEnded = useCallback(() => {
    if (repeatMode === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else if (isShuffle) {
      setCurrentIndex(getRandomIndex());
      setIsPlaying(true);
    } else if (repeatMode === "all") {
      setCurrentIndex((prev) => (prev + 1) % TRACKS.length);
      setIsPlaying(true);
    } else if (repeatMode === "off") {
      if (currentIndex < TRACKS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [repeatMode, isShuffle, currentIndex, getRandomIndex]);

  // Play / Pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  // Alternar Shuffle
  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  // Alternar Repeat ('off' -> 'all' -> 'one' -> 'off')
  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  }, []);

  // Controle de Volume
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
    if (val === 0) setIsMuted(true);
  };

  // Mudo / Desmudo
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Seek na Barra de Progresso
  const handleSeek = useCallback((e) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !audio.duration) return;
    const rect = bar.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVol = isMuted ? 0 : volume;

  return (
    <section
      id="player"
      className="relative w-full bg-[url('/bg-placeholder.jpg')] bg-fixed bg-cover bg-center border-t border-white/10 scroll-mt-20 overflow-hidden py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 min-h-0"
    >
      {/* Overlay de Fundo com Blur Atmosférico */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Luzes Gradientes de Fundo (Glow Effect) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full">

        {/* Header da Seção com Texto em Gradiente */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-red-500 font-bold block mb-2 sm:mb-3">
            // STREAMING OFICIAL
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500">
            Discografia & Player
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-stretch">

          {/* ================================================================
              PLAYER PRINCIPAL (MODERN GLASSMORPHISM)
             ================================================================ */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(255,0,0,0.15)] rounded-2xl p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 sm:gap-8 hover:border-red-500/30 transition-all duration-500">

            <div className="flex flex-col sm:flex-row items-center gap-8">
              
              {/* Capa do Single com Glow e Animação ao Tocar */}
              <div className="relative flex-shrink-0 group">
                <div
                  className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
                    isPlaying
                      ? "ring-4 ring-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.5)] scale-102"
                      : "ring-1 ring-white/10"
                  }`}
                >
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay sutil na capa */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
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
              <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold mb-1">
                  {track.tag}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-md">
                  {track.title}
                </h3>
                <p className="text-sm text-zinc-400 font-mono tracking-wider mt-1">
                  SKYDIVING FROM HELL
                </p>

                {/* Badges de Faixa e Modo de Reprodução */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start items-center">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-zinc-300">
                    Faixa 0{currentIndex + 1} de 0{TRACKS.length}
                  </span>
                  <span className="px-3 py-1 bg-red-950/60 border border-red-800/60 rounded-full text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
                    FLAC / HD
                  </span>
                  {isShuffle && (
                    <span className="px-2.5 py-0.5 bg-red-600/20 border border-red-500/40 rounded-full text-[9px] font-mono uppercase tracking-widest text-red-400 font-bold">
                      Shuffle Ativo
                    </span>
                  )}
                  {repeatMode !== "off" && (
                    <span className="px-2.5 py-0.5 bg-orange-600/20 border border-orange-500/40 rounded-full text-[9px] font-mono uppercase tracking-widest text-orange-400 font-bold">
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
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* ================================================================
                PAINEL INFERIOR: CONTROLES DE PLAYBACK & VOLUME
               ================================================================ */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
              
              {/* Controles de Playback (Shuffle, Prev, Play/Pause, Next, Repeat) */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto">
                
                {/* Botão Shuffle (Aleatório) */}
                <button
                  onClick={toggleShuffle}
                  aria-label={isShuffle ? "Desativar Aleatório" : "Ativar Aleatório"}
                  title={isShuffle ? "Aleatório: Ligado" : "Aleatório: Desligado"}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 ${
                    isShuffle
                      ? "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                {/* Botão Faixa Anterior */}
                <button
                  onClick={handlePrev}
                  aria-label="Faixa Anterior"
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 shadow-md"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                {/* Botão Play / Pause Principal */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] hover:scale-108 active:scale-95 transition-all duration-300 border border-red-400/40"
                >
                  {isPlaying ? (
                    <Pause className="w-6 sm:w-7 h-6 sm:h-7" />
                  ) : (
                    <Play className="w-6 sm:w-7 h-6 sm:h-7 ml-1" />
                  )}
                </button>

                {/* Botão Próxima Faixa */}
                <button
                  onClick={handleNext}
                  aria-label="Próxima Faixa"
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 shadow-md"
                >
                  <SkipForward className="w-5 h-5" />
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
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 relative ${
                    repeatMode !== "off"
                      ? "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {repeatMode === "one" ? (
                    <Repeat1 className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Repeat className="w-4 h-4" />
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

            <audio
              ref={audioRef}
              controlsList="nodownload"
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
            />
          </div>

          {/* ================================================================
              TRACKLIST LATERAL GLASSMORPHISM
             ================================================================ */}
          <div className="lg:w-80 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(255,0,0,0.1)] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-red-500/30 transition-all duration-500">
            <div>
              <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-400 font-bold">
                  // TRACKLIST
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
                          setIsPlaying(true);
                        }}
                        className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-red-600/20 to-transparent border-l-4 border-red-500 text-white"
                            : "hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {/* Miniatura da Capa */}
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow-sm relative">
                          <img src={t.cover} alt={t.title} className="w-full h-full object-cover" />
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
                          0{i + 1}
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
          </div>

        </div>
      </div>
      <style>{`@keyframes eqBounce { from { transform: scaleY(0.2); } to { transform: scaleY(1); } }`}</style>
    </section>
  );
}

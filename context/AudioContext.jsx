"use client";

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

export const TRACKS = [
  {
    id: 1,
    number: "01",
    title: "AMETHYST",
    subtitle: "SINGLE DE ESTREIA",
    src: "/amethyst.mp3",
    cover: "/cover-amethyst.jpg",
    accent: "text-purple-400",
    tag: "Single de Estreia // 2019",
    durationStr: "5:22",
  },
  {
    id: 2,
    number: "02",
    title: "INDIGENTE",
    subtitle: "SINGLE OFICIAL",
    src: "/indigente.mp3",
    cover: "/cover-indigente.jpg",
    accent: "text-red-400",
    tag: "Single Oficial // 2020",
    durationStr: "3:50",
  },
  {
    id: 3,
    number: "03",
    title: "UNPATRIOT",
    subtitle: "SINGLE OFICIAL",
    src: "/unpatriot.mp3",
    cover: "/cover-unpatriot.jpg",
    accent: "text-zinc-300",
    tag: "Single Oficial // 2021",
    durationStr: "4:30",
  },
  {
    id: 4,
    number: "04",
    title: "BLACK FLAG",
    subtitle: "SINGLE OFICIAL",
    src: "/black_flag.mp3",
    cover: "/cover-blackflag.jpg",
    accent: "text-orange-400",
    tag: "Single Oficial // 2022",
    durationStr: "4:12",
  },
];

export function formatTime(s) {
  if (isNaN(s) || !s) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);

  // Começa por padrão em Unpatriot (índice 2)
  const initialIdx = TRACKS.findIndex((t) => t.title === "UNPATRIOT");
  const [currentIndex, setCurrentIndex] = useState(initialIdx !== -1 ? initialIdx : 2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Estados de reprodução
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("all"); // 'off' | 'all' | 'one'
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // Estado do Floating Player: 'hidden' (inicia oculto com ícone flutuante) | 'minimized' (pill) | 'expanded' (dock)
  const [playerMode, setPlayerMode] = useState("hidden");
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const track = TRACKS[currentIndex] || TRACKS[0];

  // Início da reprodução de Unpatriot na rolagem ou no primeiro gesto
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const unpatriotTrack = TRACKS[initialIdx !== -1 ? initialIdx : 2];
    if (!audio.src || !audio.src.includes(unpatriotTrack.src)) {
      audio.src = unpatriotTrack.src;
    }
    audio.load();

    let isStarted = false;

    const removeListeners = () => {
      window.removeEventListener("scroll", triggerAudio);
      window.removeEventListener("wheel", triggerAudio);
      window.removeEventListener("touchmove", triggerAudio);
      window.removeEventListener("touchstart", triggerAudio);
      window.removeEventListener("pointerdown", triggerAudio);
      window.removeEventListener("click", triggerAudio);
      window.removeEventListener("keydown", triggerAudio);
      document.removeEventListener("scroll", triggerAudio);
    };

    const triggerAudio = () => {
      if (isStarted || !audioRef.current) return;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isStarted = true;
            setIsPlaying(true);
            removeListeners();
          })
          .catch(() => {
            // Se o navegador rejeitar autoplay na rolagem pura, mantém os listeners
            // para ativar no primeiro clique ou toque
          });
      }
    };

    // Tenta tocar imediatamente
    triggerAudio();

    // Escuta rolagem, roda do mouse, toque, clique e teclado
    window.addEventListener("scroll", triggerAudio, { passive: true });
    window.addEventListener("wheel", triggerAudio, { passive: true });
    window.addEventListener("touchmove", triggerAudio, { passive: true });
    window.addEventListener("touchstart", triggerAudio, { passive: true });
    window.addEventListener("pointerdown", triggerAudio, { passive: true });
    window.addEventListener("click", triggerAudio, { passive: true });
    window.addEventListener("keydown", triggerAudio, { passive: true });
    document.addEventListener("scroll", triggerAudio, { passive: true });

    return () => {
      removeListeners();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mudança de faixa
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

  // Sincronização de volume
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

  const getRandomIndex = useCallback(() => {
    if (TRACKS.length <= 1) return 0;
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * TRACKS.length);
    } while (nextIdx === currentIndex);
    return nextIdx;
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (isShuffle) {
      setCurrentIndex(getRandomIndex());
    } else {
      setCurrentIndex((prev) => (prev + 1) % TRACKS.length);
    }
    setIsPlaying(true);
  }, [isShuffle, getRandomIndex]);

  const handlePrev = useCallback(() => {
    if (isShuffle) {
      setCurrentIndex(getRandomIndex());
    } else {
      setCurrentIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    }
    setIsPlaying(true);
  }, [isShuffle, getRandomIndex]);

  const handleEnded = useCallback(() => {
    if (repeatMode === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else if (isShuffle) {
      setCurrentIndex(getRandomIndex());
      setIsPlaying(true);
    } else {
      setCurrentIndex((prev) => (prev + 1) % TRACKS.length);
      setIsPlaying(true);
    }
  }, [repeatMode, isShuffle, getRandomIndex]);

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

  const selectTrack = useCallback((index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  }, []);

  const seekToPercent = useCallback(
    (percent) => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      audio.currentTime = (percent / 100) * audio.duration;
      setCurrentTime(audio.currentTime);
    },
    []
  );

  const toggleShuffle = useCallback(() => setIsShuffle((p) => !p), []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => (prev === "all" ? "one" : prev === "one" ? "off" : "all"));
  }, []);

  const toggleMute = useCallback(() => setIsMuted((p) => !p), []);

  const value = {
    TRACKS,
    currentIndex,
    setCurrentIndex,
    track,
    isPlaying,
    setIsPlaying,
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
  };

  return (
    <AudioContext.Provider value={value}>
      {/* Elemento de áudio global persistente */}
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio deve ser usado dentro de um AudioProvider");
  }
  return ctx;
}

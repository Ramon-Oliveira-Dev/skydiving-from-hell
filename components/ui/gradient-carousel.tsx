"use client";

/**
 * Gradient Carousel Component — React Bits Pro (@reactbits-starter/gradient-carousel-tw)
 * 3D interactive card carousel with dynamic background gradients, physics inertia, and smooth transitions.
 *
 * Adapted for Skydiving From Hell (S.D.F.H.)
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  name: string;
  role: string;
  images: string[];
  desc?: string;
  tagColor?: string;
  gradientColors?: [string, string]; // Cores para o glow dinâmico de fundo
  [key: string]: any;
}

export interface GradientCarouselProps {
  items: CarouselItem[];
  initialIndex?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardGap?: number;
  maxRotationDegrees?: number;
  maxDepthPx?: number;
  minScale?: number;
  dragSensitivity?: number;
  wheelSensitivity?: number;
  gradientSize?: number;
  gradientIntensity?: number;
  backgroundBlur?: number;
  enableKeyboard?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  onCardChange?: (index: number) => void;
  onCardClick?: (item: CarouselItem, index: number) => void;
  renderCard?: (item: CarouselItem, index: number, isActive: boolean) => React.ReactNode;
  className?: string;
}

export default function GradientCarousel({
  items = [],
  initialIndex = 0,
  cardWidth = 320,
  cardHeight = 440,
  cardGap = 32,
  maxRotationDegrees = 24,
  maxDepthPx = 120,
  minScale = 0.86,
  dragSensitivity = 1.0,
  wheelSensitivity = 0.6,
  gradientSize = 0.65,
  gradientIntensity = 0.45,
  backgroundBlur = 80,
  enableKeyboard = true,
  autoplay = true,
  autoplayInterval = 3500,
  pauseOnHover = true,
  onCardChange,
  onCardClick,
  renderCard,
  className = "",
}: GradientCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const total = items.length;

  const goToIndex = useCallback(
    (index: number) => {
      let target = index;
      if (target < 0) target = total - 1;
      if (target >= total) target = 0;
      setActiveIndex(target);
      onCardChange?.(target);
    },
    [total, onCardChange]
  );

  const nextCard = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex]);

  const prevCard = useCallback(() => {
    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);

  // Carrossel Automático (Autoplay)
  useEffect(() => {
    if (!autoplay || total <= 1 || (pauseOnHover && isHovered) || isDragging) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % total;
        onCardChange?.(next);
        return next;
      });
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [autoplay, total, pauseOnHover, isHovered, isDragging, autoplayInterval, onCardChange]);

  // Teclado (Setas Esquerda e Direita)
  useEffect(() => {
    if (!enableKeyboard) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === "ArrowRight") nextCard();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboard, prevCard, nextCard]);

  // Suporte a Mouse Wheel suave
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < 15 && Math.abs(e.deltaY) < 15) return;
    if (wheelTimeoutRef.current) return;

    if (e.deltaX > 20 || e.deltaY > 20) {
      nextCard();
    } else if (e.deltaX < -20 || e.deltaY < -20) {
      prevCard();
    }

    wheelTimeoutRef.current = setTimeout(() => {
      wheelTimeoutRef.current = null;
    }, 300);
  };

  // Gestos de Touch / Drag
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = (clientX - startX) * dragSensitivity;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60) {
      nextCard();
    } else if (dragOffset > 60) {
      prevCard();
    }
    setDragOffset(0);
  };

  // Cores de gradiente ativas para o fundo dinâmico
  const activeItem = items[activeIndex] || items[0];
  const primaryGlow = activeItem?.gradientColors?.[0] || "#dc2626";
  const secondaryGlow = activeItem?.gradientColors?.[1] || "#f97316";

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "relative w-full overflow-hidden flex flex-col items-center justify-center py-8 sm:py-12 select-none",
        className
      )}
      style={{ perspective: "1200px" }}
    >
      {/* ── GRADIENTE DINÂMICO DE FUNDO (Extração de Cores Reativa) ──── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
        <motion.div
          key={`glow-primary-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: gradientIntensity,
            scale: 1,
            backgroundColor: primaryGlow,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-[450px] sm:w-[600px] h-[350px] sm:h-[450px] rounded-full filter blur-[100px] -translate-x-1/4 -translate-y-10"
        />
        <motion.div
          key={`glow-secondary-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: gradientIntensity * 0.75,
            scale: 1,
            backgroundColor: secondaryGlow,
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="absolute w-[400px] sm:w-[500px] h-[300px] sm:h-[400px] rounded-full filter blur-[120px] translate-x-1/4 translate-y-10"
        />
      </div>

      {/* ── PALCO 3D DO CARROSSEL ──────────────────────────────────────── */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          height: cardHeight + 40,
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, idx) => {
          // Calcula a distância circular relativa ao card ativo
          let offset = idx - activeIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;
          const absOffset = Math.abs(offset);

          // Não renderiza itens muito distantes para otimização
          if (absOffset > 2 && total > 4) {
            return null;
          }

          // Cálculo das transformações 3D
          const translateX = offset * (cardWidth * 0.72 + cardGap) + (isDragging ? dragOffset * 0.4 : 0);
          const translateZ = -absOffset * maxDepthPx;
          const rotateY = -offset * maxRotationDegrees;
          const scale = Math.max(minScale, 1 - absOffset * 0.12);
          const opacity = Math.max(0.35, 1 - absOffset * 0.35);
          const zIndex = 20 - absOffset * 5;

          return (
            <motion.div
              key={item.id || idx}
              onClick={() => {
                if (isActive) {
                  onCardClick?.(item, idx);
                } else {
                  goToIndex(idx);
                }
              }}
              animate={{
                x: translateX,
                z: translateZ,
                rotateY: rotateY,
                scale: scale,
                opacity: opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
                mass: 0.8,
              }}
              style={{
                position: "absolute",
                width: cardWidth,
                height: cardHeight,
                zIndex: zIndex,
                transformStyle: "preserve-3d",
                cursor: isActive ? "pointer" : "pointer",
              }}
              className="will-change-transform"
            >
              {renderCard ? (
                renderCard(item, idx, isActive)
              ) : (
                <div
                  className={cn(
                    "w-full h-full rounded-2xl p-6 bg-zinc-950/90 border transition-all duration-300 backdrop-blur-xl shadow-2xl flex flex-col justify-between",
                    isActive
                      ? "border-red-500/70 shadow-[0_20px_50px_rgba(220,38,38,0.4)]"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  )}
                >
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── CONTROLES INFERIORES: SETAS & INDICADORES ─────────────────── */}
      <div className="flex items-center gap-6 mt-6 z-30">
        {/* Botão Anterior */}
        <button
          type="button"
          onClick={prevCard}
          aria-label="Integrante Anterior"
          className="w-11 h-11 rounded-full bg-black/80 hover:bg-red-600 border border-white/15 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)] active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicadores de Pontos (Dots) */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
          {items.map((item, i) => (
            <button
              key={`dot-${item.id || i}`}
              type="button"
              onClick={() => goToIndex(i)}
              aria-label={`Ir para ${item.name}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-7 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                  : "w-2 bg-white/30 hover:bg-white/70"
              )}
            />
          ))}
        </div>

        {/* Botão Próximo */}
        <button
          type="button"
          onClick={nextCard}
          aria-label="Próximo Integrante"
          className="w-11 h-11 rounded-full bg-black/80 hover:bg-red-600 border border-white/15 hover:border-red-500 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)] active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

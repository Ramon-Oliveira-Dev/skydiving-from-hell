"use client";

/**
 * ScrollStack Component — Skiper17 3D Stacking & Rotate Transitions Edition
 *
 * Implements the @skiper-ui/skiper17 effect across full-page section transitions:
 * - GSAP & Motion-powered 3D perspective stack
 * - Dynamic scroll-based scale down (1 -> 0.93)
 * - Alternating subtle 3D rotation (-1.2deg / +1.2deg)
 * - Progressive depth darkening & crimson rim lighting
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
}

export interface ScrollStackItemProps {
  children: React.ReactNode;
  index?: number;
  topOffset?: number;
  scaleStep?: number;
  rotateStep?: number;
  dimStep?: number;
  id?: string;
  className?: string;
}

export function ScrollStack({ children, className = "" }: ScrollStackProps) {
  const validChildren = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <div className={cn("relative w-full flex flex-col perspective-[1200px]", className)}>
      {validChildren.map((child, index) => {
        return (
          <ScrollStackItem
            index={index}
            key={(child as React.ReactElement).key || `stack-item-${index}`}
            {...((child as React.ReactElement).props as any)}
          >
            {((child as React.ReactElement).props as any)?.children || child}
          </ScrollStackItem>
        );
      })}
    </div>
  );
}

export function ScrollStackItem({
  children,
  index = 0,
  topOffset = 0,
  scaleStep = 0.07,
  rotateStep = 1.4,
  dimStep = 0.22,
  id,
  className = "",
}: ScrollStackItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Skiper17 dynamic transforms:
  // Alterna a rotação para criar o efeito realista de cartas empilhadas (Skiper17)
  const rotationDirection = index % 2 === 0 ? -1 : 1;
  const targetRotation = rotationDirection * rotateStep;

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - scaleStep]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, targetRotation]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 1.8]);
  const yShift = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, dimStep * 0.6, dimStep]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        position: "sticky",
        top: topOffset,
        zIndex: index + 1,
      }}
      className={cn(
        "w-full origin-top will-change-transform",
        className
      )}
    >
      <motion.div
        style={{
          scale,
          rotateZ,
          rotateX,
          y: yShift,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-t-[28px] sm:rounded-t-[38px] bg-black shadow-[0_-25px_60px_rgba(0,0,0,0.95),_0_0_30px_rgba(220,38,38,0.1)] border-t border-red-500/20 overflow-hidden"
      >
        {/* Camada de conteúdo da seção */}
        <div className="relative z-10 w-full">
          {children}
        </div>

        {/* Camada de escurecimento e profundidade 3D (Skiper17 Depth Overlay) */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-black/80 via-black/40 to-black/90 mix-blend-multiply"
        />
      </motion.div>
    </div>
  );
}

export default ScrollStack;

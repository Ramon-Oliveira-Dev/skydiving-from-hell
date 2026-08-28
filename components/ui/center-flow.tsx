"use client";

/**
 * Center Flow Component — React Bits Pro inspired
 * Radial flowing animation from center connecting a central hub to outer nodes.
 *
 * S.D.F.H. Dark Metal Edition
 */

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CenterFlowProps {
  items?: React.ReactNode[];
  centerContent?: React.ReactNode;
  centerSize?: number;
  nodeSize?: number;
  pulseDuration?: number;
  pulseInterval?: number;
  pulseLength?: number;
  lineWidth?: number;
  pulseWidth?: number;
  pulseSoftness?: number;
  lineColor?: string;
  pulseColor?: string;
  glowColor?: string;
  maxGlowIntensity?: number;
  borderRadius?: number;
  nodeDistance?: number;
  disableBlinking?: boolean;
  className?: string;
  renderNode?: (item: React.ReactNode, index: number, isActive: boolean) => React.ReactNode;
  onNodeClick?: (index: number) => void;
}

export default function CenterFlow({
  items = [],
  centerContent,
  centerSize = 140,
  nodeSize = 220,
  pulseDuration = 4,
  pulseInterval = 2,
  pulseLength = 0.35,
  lineWidth = 2,
  pulseWidth = 3,
  pulseSoftness = 8,
  lineColor = "rgba(220, 38, 38, 0.22)",
  pulseColor = "#ef4444",
  glowColor = "#dc2626",
  maxGlowIntensity = 28,
  borderRadius = 32,
  nodeDistance = 0.72,
  disableBlinking = false,
  className = "",
  renderNode,
  onNodeClick,
}: CenterFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 750 });
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Observa o redimensionamento do container para manter posições perfeitamente centralizadas
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth || 1000,
          height: clientHeight || 750,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const ro = new ResizeObserver(updateDimensions);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      ro.disconnect();
    };
  }, []);

  const totalNodes = items.length;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  // Raio responsivo calculado dinamicamente
  const radiusX = (dimensions.width / 2) * nodeDistance;
  const radiusY = (dimensions.height / 2) * nodeDistance;

  // Calcula a posição (x, y) de cada nó distribuído radialmente
  const nodePositions = items.map((_, i) => {
    // Inicia no topo e distribui no sentido horário
    const angle = (i / totalNodes) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + Math.cos(angle) * Math.min(radiusX, dimensions.width * 0.42);
    const y = centerY + Math.sin(angle) * Math.min(radiusY, dimensions.height * 0.42);
    return { x, y, angle };
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-[700px] lg:min-h-[820px] xl:min-h-[880px] overflow-hidden flex items-center justify-center select-none",
        className
      )}
    >
      {/* ── SVG DE CONEXÕES RADIAIS & PULSOS DE ENERGIA ─────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        width={dimensions.width}
        height={dimensions.height}
      >
        <defs>
          {/* Filtro de Glow para os Pulsos */}
          <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={pulseSoftness} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradiente Radial do Hub Central */}
          <radialGradient id="center-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.4" />
            <stop offset="60%" stopColor={glowColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Linhas de Conexão e Feixes de Energia */}
        {nodePositions.map((pos, idx) => {
          const isHovered = activeNode === idx;
          const currentLineColor = isHovered
            ? "rgba(239, 68, 68, 0.7)"
            : lineColor;
          const currentPulseColor = isHovered ? "#ff4500" : pulseColor;

          // Caminho direto do centro até o nó com curva sutil
          const pathD = `M ${centerX} ${centerY} L ${pos.x} ${pos.y}`;

          return (
            <g key={`flow-line-${idx}`}>
              {/* Linha de base estática / suave */}
              <path
                d={pathD}
                fill="none"
                stroke={currentLineColor}
                strokeWidth={isHovered ? lineWidth + 1.5 : lineWidth}
                strokeDasharray="4 4"
                className="transition-all duration-300"
              />

              {/* Pulso de Fluxo Animado em Movimento Radial */}
              <motion.path
                d={pathD}
                fill="none"
                stroke={currentPulseColor}
                strokeWidth={isHovered ? pulseWidth + 2 : pulseWidth}
                filter="url(#pulse-glow)"
                strokeLinecap="round"
                strokeDasharray="120 400"
                initial={{ strokeDashoffset: 520 }}
                animate={{
                  strokeDashoffset: [520, -520],
                }}
                transition={{
                  duration: isHovered ? pulseDuration * 0.5 : pulseDuration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: (idx * pulseInterval) % pulseDuration,
                }}
              />

              {/* Partícula de choque na extremidade do nó */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 4.5 : 3}
                fill={currentPulseColor}
                filter="url(#pulse-glow)"
                animate={{
                  scale: isHovered ? [1, 1.6, 1] : [0.8, 1.2, 0.8],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.3,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* ── NÓ CENTRAL (HUB COM LOGO DA S.D.F.H.) ───────────────────────── */}
      <motion.div
        className="absolute z-30 flex items-center justify-center pointer-events-auto cursor-pointer"
        style={{
          width: centerSize,
          height: centerSize,
          borderRadius,
        }}
        animate={
          disableBlinking
            ? {}
            : {
                boxShadow: [
                  `0 0 25px rgba(220, 38, 38, 0.35), inset 0 0 15px rgba(220, 38, 38, 0.2)`,
                  `0 0 ${maxGlowIntensity + 20}px ${glowColor}, inset 0 0 25px rgba(239, 68, 68, 0.4)`,
                  `0 0 25px rgba(220, 38, 38, 0.35), inset 0 0 15px rgba(220, 38, 38, 0.2)`,
                ],
                scale: [1, 1.03, 1],
              }
        }
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow de Fundo Atrás do Hub */}
        <div
          className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,_rgba(220,38,38,0.25)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none -z-10 animate-pulse"
          style={{ animationDuration: "3s" }}
        />

        {/* Container do Conteúdo Central com Glassmorphism */}
        <div
          className="w-full h-full overflow-hidden bg-black/90 backdrop-blur-xl border-2 border-red-500/50 shadow-2xl flex items-center justify-center p-3 relative group"
          style={{ borderRadius }}
        >
          {centerContent}

          {/* Efeito de scanline sutil interno */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
        </div>
      </motion.div>

      {/* ── NÓS EXTERNOS RADIAIS (INTEGRANTES DA BANDA) ──────────────────── */}
      {items.map((item, idx) => {
        const pos = nodePositions[idx] || { x: centerX, y: centerY };
        const isHovered = activeNode === idx;

        return (
          <div
            key={`node-wrapper-${idx}`}
            className="absolute z-20 transition-transform duration-300"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={() => setActiveNode(idx)}
            onMouseLeave={() => setActiveNode(null)}
            onClick={() => onNodeClick?.(idx)}
          >
            {renderNode ? (
              renderNode(item, idx, isHovered)
            ) : (
              <div
                className={cn(
                  "p-4 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-md shadow-xl transition-all duration-300",
                  isHovered && "border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)] scale-105"
                )}
                style={{ width: nodeSize }}
              >
                {item}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

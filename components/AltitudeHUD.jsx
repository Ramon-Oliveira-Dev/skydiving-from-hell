"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Compass, Radio, Gauge, Crosshair, AlertTriangle } from "lucide-react";

/**
 * AltitudeHUD — Cockpit Altimétrico & Telemetria Militar Dark Metal
 * Skydiving From Hell (S.D.F.H.)
 *
 * Mapeia dinamicamente a rolagem da página (0% a 100%) para uma queda livre de
 * 15.000 FT até 0 FT (Ground Zero / The Hell Pit).
 */

const ALTITUDE_STAGES = [
  {
    min: 13000,
    max: 15000,
    code: "STAGE 01",
    name: "DROP ZONE",
    desc: "Zona de Salto • Ar Rarefeito",
    color: "#38bdf8", // Cyan / Stratosphere
    accent: "border-sky-500/40 text-sky-400",
    bgGlow: "rgba(56, 189, 248, 0.15)",
    soundStatus: "INITIAL DESCENT",
  },
  {
    min: 9000,
    max: 12999,
    code: "STAGE 02",
    name: "TERMINAL VELOCITY",
    desc: "Velocidade Terminal • Som 8 Cordas",
    color: "#f87171", // Red
    accent: "border-red-500/50 text-red-400",
    bgGlow: "rgba(239, 68, 68, 0.18)",
    soundStatus: "8-STRING OVERDRIVE",
  },
  {
    min: 5000,
    max: 8999,
    code: "STAGE 03",
    name: "CLOUD TURBULENCE",
    desc: "Camada de Nuvens • Formação S.D.F.H.",
    color: "#fb923c", // Orange
    accent: "border-orange-500/50 text-orange-400",
    bgGlow: "rgba(249, 115, 22, 0.18)",
    soundStatus: "LINEUP ENGAGED",
  },
  {
    min: 1500,
    max: 4999,
    code: "STAGE 04",
    name: "GROUND PROXIMITY",
    desc: "Aproximação do Solo • Palco & Shows ES",
    color: "#ef4444", // Red Alert
    accent: "border-red-600/60 text-red-500",
    bgGlow: "rgba(220, 38, 38, 0.22)",
    soundStatus: "RADAR LOCK: LIVE STAGE",
  },
  {
    min: 0,
    max: 1499,
    code: "STAGE 05",
    name: "GROUND ZERO",
    desc: "Impacto Fatal • The Hell Pit & Merch",
    color: "#dc2626", // Blood Red / Hellfire
    accent: "border-red-600/80 text-red-400 animate-pulse",
    bgGlow: "rgba(220, 38, 38, 0.35)",
    soundStatus: "MOSH PIT OVERHEAT",
  },
];

export default function AltitudeHUD() {
  const [altitude, setAltitude] = useState(15000);
  const [speedKmh, setSpeedKmh] = useState(240);
  const [descentRate, setDescentRate] = useState(4800);
  const [stage, setStage] = useState(ALTITUDE_STAGES[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const velocityRef = useRef(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const currentScrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScrollY / docHeight));
      setScrollProgress(progress);

      // Mapeamento 15.000 FT ➔ 0 FT
      const currentAlt = Math.round(15000 * (1 - progress));
      setAltitude(currentAlt);

      // Determina o estágio atual
      const currentStage =
        ALTITUDE_STAGES.find((st) => currentAlt >= st.min && currentAlt <= st.max) ||
        ALTITUDE_STAGES[ALTITUDE_STAGES.length - 1];
      setStage(currentStage);

      // Cálculo de velocidade dinâmica com base na rolagem
      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current);
      const dy = Math.abs(currentScrollY - lastScrollY.current);
      const instantVelocity = (dy / dt) * 100;

      // Suavização da velocidade
      velocityRef.current = velocityRef.current * 0.85 + instantVelocity * 0.15;
      
      const baseSpeed = 220 + Math.min(480, Math.round(velocityRef.current * 1.8));
      const baseVSI = 3200 + Math.min(8400, Math.round(velocityRef.current * 28));

      setSpeedKmh(baseSpeed);
      setDescentRate(baseVSI);

      lastScrollY.current = currentScrollY;
      lastTime.current = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Timer suave para desaceleração natural da telemetria quando o usuário para de rolar
    const interval = setInterval(() => {
      velocityRef.current = Math.max(0, velocityRef.current * 0.7);
      const baseSpeed = 220 + Math.min(480, Math.round(velocityRef.current * 1.8));
      const baseVSI = 3200 + Math.min(8400, Math.round(velocityRef.current * 28));
      setSpeedKmh(baseSpeed);
      setDescentRate(baseVSI);
    }, 120);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const formattedAlt = altitude.toLocaleString("en-US");
  const machSpeed = (speedKmh / 1234.8).toFixed(2);

  return (
    <aside
      aria-label="Telemetria de altitude e queda livre"
      className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 font-mono select-none"
    >
      {/* ── HUD PRINCIPAL TÁTICO ─────────────────────────────────── */}
      <div
        className={`relative transition-all duration-300 rounded-xl bg-black/90 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.9)] overflow-hidden ${
          isExpanded ? "w-[290px] sm:w-[340px]" : "w-[240px] sm:w-[280px]"
        }`}
        style={{
          boxShadow: `0 0 25px ${stage.bgGlow}, inset 0 0 15px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Linha superior de status com scanline */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-950/90 border-b border-white/10 text-[10px] tracking-wider text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: stage.color }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: stage.color }}
              />
            </span>
            <span className="font-bold uppercase tracking-widest text-zinc-200">
              SDFH TELEMETRY
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[9px] text-zinc-400 hover:text-white transition-colors"
            title={isExpanded ? "Recolher telemetria" : "Expandir telemetria"}
          >
            <span>{isExpanded ? "MIN" : "FULL"}</span>
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>

        {/* Corpo principal do mostrador altimétrico */}
        <div className="p-3 sm:p-3.5 space-y-2">
          {/* Mostrador Digital de Pés (Altitude) */}
          <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-400 flex items-center gap-1">
                <Gauge className="w-3 h-3 text-red-500" />
                <span>ALTITUDE (QFE)</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                  {formattedAlt}
                </span>
                <span className="text-[11px] font-bold text-red-400">FT</span>
              </div>
            </div>

            {/* Estágio Atual Badge */}
            <div className="text-right">
              <div className="text-[8px] tracking-widest text-zinc-400">{stage.code}</div>
              <div
                className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border bg-black/60 ${stage.accent}`}
              >
                {stage.name}
              </div>
            </div>
          </div>

          {/* Barra de Progresso Vertical/Horizontal da Queda */}
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] text-zinc-400 tracking-wider">
              <span>15.000 FT (TOP)</span>
              <span className="text-red-400 font-bold">{(scrollProgress * 100).toFixed(0)}% QUEDA</span>
              <span>0 FT (PIT)</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/10 p-[1px]">
              <div
                className="h-full rounded-full transition-all duration-150 bg-gradient-to-r from-sky-500 via-orange-500 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>

          {/* Painel expandido de telemetria de voo */}
          {isExpanded && (
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] animate-fadeIn">
              <div className="bg-zinc-950/80 p-1.5 rounded border border-white/5">
                <span className="text-[8px] text-zinc-400 block tracking-widest">VELOCIDADE</span>
                <span className="font-bold text-zinc-200">{speedKmh} KM/H</span>
                <span className="text-[8px] text-red-400 block">MACH {machSpeed}</span>
              </div>

              <div className="bg-zinc-950/80 p-1.5 rounded border border-white/5">
                <span className="text-[8px] text-zinc-400 block tracking-widest">TAXA DESCIDA</span>
                <span className="font-bold text-orange-400">-{descentRate.toLocaleString()}</span>
                <span className="text-[8px] text-zinc-400 block">FT / MIN</span>
              </div>

              <div className="col-span-2 bg-zinc-950/80 p-1.5 rounded border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[8px] text-zinc-400 block tracking-widest">COORDENADAS</span>
                  <span className="text-[9px] font-bold text-zinc-300">20°19'S 40°17'W • VV/ES</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-zinc-400 block tracking-widest">AUDIO FEED</span>
                  <span className="text-[9px] font-bold text-red-400">{stage.soundStatus}</span>
                </div>
              </div>
            </div>
          )}

          {/* Rodapé tático rápido */}
          <div className="flex items-center justify-between text-[8px] text-zinc-400 pt-0.5">
            <span className="truncate">{stage.desc}</span>
            <span className="text-red-500 font-bold shrink-0 ml-1">S.D.F.H.</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

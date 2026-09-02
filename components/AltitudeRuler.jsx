"use client";

import React, { useState, useEffect } from "react";
import { Crosshair, Radio, ShieldAlert, Flame } from "lucide-react";

/**
 * AltitudeRuler — Régua Lateral de Queda & Timeline de Voo (S.D.F.H.)
 *
 * Exibe a linha guia vertical com marcadores fixos de altitude que mostram
 * a progressão do salto de paraquedas e permitem navegação tática rápida.
 */

const ALTITUDE_WAYPOINTS = [
  {
    targetId: "hero",
    altLabel: "15K",
    fullAlt: "15.000 FT",
    title: "DROP ZONE",
    desc: "Início do Salto • Ar Rarefeito",
    percent: 0,
    icon: Radio,
    color: "#38bdf8",
  },
  {
    targetId: "player",
    altLabel: "11K",
    fullAlt: "11.000 FT",
    title: "TERMINAL VELOCITY",
    desc: "Singles & 8 Cordas",
    percent: 0.22,
    icon: Crosshair,
    color: "#f87171",
  },
  {
    targetId: "bio",
    altLabel: "7K",
    fullAlt: "7.000 FT",
    title: "TURBULENCE",
    desc: "Biografia & Formação",
    percent: 0.48,
    icon: ShieldAlert,
    color: "#fb923c",
  },
  {
    targetId: "videos",
    altLabel: "3K",
    fullAlt: "3.000 FT",
    title: "PROXIMITY",
    desc: "Ao Vivo & Agenda ES",
    percent: 0.74,
    icon: Crosshair,
    color: "#ef4444",
  },
  {
    targetId: "merch",
    altLabel: "0 FT",
    fullAlt: "0 FT (GROUND ZERO)",
    title: "HELL PIT",
    desc: "Impacto no Chão • Loja & Pit",
    percent: 1,
    icon: Flame,
    color: "#dc2626",
  },
];

export default function AltitudeRuler() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredWaypoint, setHoveredWaypoint] = useState(null);
  const [activeWaypointId, setActiveWaypointId] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, window.scrollY / docHeight));
      setScrollProgress(progress);

      // Determina qual waypoint está mais próximo
      const sectionIds = ["player", "bio", "lineup", "videos", "tour", "merch", "contato"];
      const scrollPos = window.scrollY + 350;

      if (window.scrollY < 300) {
        setActiveWaypointId("hero");
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (id === "player") setActiveWaypointId("player");
            else if (id === "bio" || id === "lineup") setActiveWaypointId("bio");
            else if (id === "videos" || id === "tour") setActiveWaypointId("videos");
            else if (id === "merch" || id === "contato") setActiveWaypointId("merch");
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaypoint = (targetId) => {
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Régua de altitude de queda livre"
      className="fixed right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center select-none"
    >
      <div className="relative flex flex-col items-center py-4 px-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.8)]">
        {/* Rótulo superior "ALT" */}
        <span className="font-mono text-[9px] font-bold text-zinc-400 tracking-widest mb-2">
          ALT
        </span>

        {/* Linha vertical com trilho de medição */}
        <div className="relative w-0.5 h-64 sm:h-72 md:h-80 bg-zinc-800 rounded-full flex flex-col justify-between items-center my-1">
          {/* Trilha preenchida conforme a queda livre */}
          <div
            className="absolute top-0 w-full bg-gradient-to-b from-sky-500 via-orange-500 to-red-600 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.9)] transition-all duration-100"
            style={{ height: `${scrollProgress * 100}%` }}
          />

          {/* Cursor Dinâmico Laser de Queda (Jump Vector Crosshair) */}
          <div
            className="absolute -left-[9px] w-5 h-5 -translate-y-1/2 flex items-center justify-center transition-all duration-75 pointer-events-none z-30"
            style={{ top: `${scrollProgress * 100}%` }}
          >
            <div className="w-4 h-4 rounded-full bg-red-600 border border-white flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,1)] animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            {/* Linha laser de mira apontando para a esquerda */}
            <div className="absolute right-4 w-3 h-[1.5px] bg-red-500 shadow-[0_0_6px_rgba(239,68,68,1)]" />
          </div>

          {/* Marcadores / Waypoints interativos ao longo da régua */}
          {ALTITUDE_WAYPOINTS.map((wp) => {
            const isActive = activeWaypointId === wp.targetId;
            const Icon = wp.icon;

            return (
              <button
                key={wp.title}
                onClick={() => scrollToWaypoint(wp.targetId)}
                onMouseEnter={() => setHoveredWaypoint(wp)}
                onMouseLeave={() => setHoveredWaypoint(null)}
                aria-label={`Ir para altitude ${wp.fullAlt} - ${wp.title}`}
                className="relative z-20 group flex items-center justify-center w-6 h-6 rounded-full transition-transform focus:outline-none"
              >
                {/* Ponto / Nó do marcador */}
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "scale-125 bg-red-500 border border-white shadow-[0_0_10px_rgba(239,68,68,0.9)]"
                      : "bg-zinc-700 border border-white/20 hover:scale-110 hover:bg-zinc-400"
                  }`}
                  style={{
                    backgroundColor: isActive ? wp.color : undefined,
                  }}
                />

                {/* Tag de texto de altitude ao lado direito */}
                <span
                  className={`absolute left-8 font-mono text-[9px] tracking-wider uppercase font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "text-white drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] scale-105"
                      : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
                  style={{
                    color: isActive ? wp.color : undefined,
                  }}
                >
                  {wp.altLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Rótulo inferior "0 FT" */}
        <span className="font-mono text-[9px] font-bold text-red-500 tracking-widest mt-2 animate-pulse">
          PIT
        </span>
      </div>

      {/* ── TOOLTIP RADAR FLUTUANTE AO PASSAR O MOUSE ───────────────────── */}
      {hoveredWaypoint && (
        <div
          className="absolute right-14 top-1/2 -translate-y-1/2 w-48 p-2.5 rounded-lg bg-zinc-950/95 backdrop-blur-xl border border-red-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.95),_0_0_15px_rgba(220,38,38,0.3)] pointer-events-none font-mono text-left animate-fadeIn z-50"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5">
            <span className="text-[9px] font-bold text-red-400">
              {hoveredWaypoint.fullAlt}
            </span>
            <span className="text-[8px] text-zinc-400 tracking-widest uppercase">
              RADAR LOCK
            </span>
          </div>
          <div className="text-xs font-black uppercase text-white tracking-wider">
            {hoveredWaypoint.title}
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5 leading-snug">
            {hoveredWaypoint.desc}
          </div>
          <div className="mt-1.5 text-[8px] text-red-400 uppercase tracking-widest flex items-center gap-1">
            <span>CLIQUE PARA SALTAR</span>
            <span>➔</span>
          </div>
        </div>
      )}
    </aside>
  );
}

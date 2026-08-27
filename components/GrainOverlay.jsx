"use client";

import React from "react";

/**
 * GrainOverlay — Ruído & Grão Analógico (Film Grain Texture)
 *
 * Aplica uma camada estática de ruído analógico sobre toda a página.
 * Remove a sensação de "site limpo/plástico" e traz uma textura visceral de
 * fotografia analógica de show e horror punk/metal.
 *
 * 100% otimizado via SVG inline data-URI (zero requisições de rede, zero lag).
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

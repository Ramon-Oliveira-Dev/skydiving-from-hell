"use client";

import React from "react";
import Image from "next/image";

/**
 * BandFooter — Rodapé Minimalista Dark Cinematic
 *
 * Apenas 3 elementos:
 *   Esquerda / Topo:   Logo SDFH
 *   Centro:            Copyright
 *   Direita / Base:    Origem geográfica
 */
export default function BandFooter() {
  return (
    <footer className="relative bg-black py-8 sm:py-12 border-t border-white/10">

      {/* ─── Linha de Luz Superior (Glow Accent) ──────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">

          {/* ── Logo SDFH ─────────────────────────────────────────────── */}
          <a href="#" aria-label="Voltar ao topo" className="group flex-shrink-0">
            <div className="h-8 sm:h-10 w-auto flex items-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo_cabecalho.png"
                alt="Logotipo Skydiving From Hell"
                width={160}
                height={40}
                loading="lazy"
                className="h-full w-auto object-contain filter opacity-60 group-hover:opacity-100 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-all duration-300"
              />
            </div>
          </a>

          {/* ── Copyright ─────────────────────────────────────────────── */}
          <p className="text-zinc-600 text-xs sm:text-sm font-sans text-center order-last sm:order-none">
            © 2026 Skydiving From Hell. Todos os direitos reservados.
          </p>

          {/* ── Origem ────────────────────────────────────────────────── */}
          <p className="text-zinc-500 text-[11px] sm:text-xs tracking-[0.2em] font-semibold uppercase font-mono text-center sm:text-right flex-shrink-0">
            VILA VELHA &bull; ESPÍRITO SANTO &bull; BRASIL
          </p>

        </div>
      </div>
    </footer>
  );
}

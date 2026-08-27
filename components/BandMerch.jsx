"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import TiltCard, { TiltLayer } from "./TiltCard";

const PRODUCTS = [
  {
    id: "TSHIRT",
    title: "T-Shirt SDFH Oficial",
    price: "R$ 90,00",
    image: "/merch_tshirt.png",
    specs: "100% ALGODÃO HEAVY • SILK SCREEN",
    desc: "Camiseta oficial da banda com corte moderno, costuras reforçadas e estampa de altíssima durabilidade.",
  },
  {
    id: "REGATA",
    title: "Regata SDFH Metal",
    price: "R$ 80,00",
    image: "/merch_regata.png",
    specs: "CORTE CAVADO CONFORT • RESPIRÁVEL",
    desc: "Desenvolvida para o calor e a energia dos shows. Máxima liberdade de movimento e visual marcante.",
  },
  {
    id: "MOLETOM",
    title: "Moletom SDFH Heavyweight",
    price: "R$ 220,00",
    image: "/merch_moletom.png",
    specs: "FLANELADO 3 CABOS • CAPUZ FORRADO",
    desc: "Isolamento térmico pesado com bolso canguru, capuz forrado e estampas exclusivas na frente e costas.",
  },
];

export default function BandMerch() {
  return (
    <section
      id="merch"
      className="relative w-full bg-[url('/bg-placeholder.jpg')] bg-fixed bg-cover bg-center border-t border-white/10 scroll-mt-20 overflow-hidden py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 min-h-0"
    >
      {/* Overlay Escuro Profundo */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />

      {/* Iluminação Ambiente */}
      <div className="absolute top-1/3 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 w-full">
        
        {/* Header da Seção */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-red-500/90 font-bold block mb-2 sm:mb-3">
              // 04. MERCHANDISING & LOJA
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500">
              Equipamento Oficial
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
          </div>
        </ScrollReveal>

        {/* Grid Adaptativo (Mobile: 1 | Tablet: 2 | Desktop: 3 colunas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((prod, idx) => (
            <ScrollReveal key={prod.id} direction="up" delay={idx * 150}>
              <TiltCard
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] hover:border-red-500/50 hover:shadow-[0_18px_50px_0_rgba(220,38,38,0.25)] transition-all duration-500 flex flex-col justify-between h-full"
              >
              <div>
                {/* Imagem do Produto em 3D (25px Z) */}
                <div className="relative h-64 sm:h-80 w-full bg-black/40 p-5 sm:p-6 flex items-center justify-center border-b border-white/10 rounded-t-2xl overflow-hidden">
                  <TiltLayer depth={25} className="w-full h-full flex items-center justify-center pointer-events-none">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </TiltLayer>
                  <TiltLayer depth={30} className="absolute top-3 right-3 pointer-events-none z-10">
                    <div className="px-2.5 sm:px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full font-mono text-[9px] sm:text-[10px] text-red-500/90 font-bold uppercase tracking-wider">
                      {prod.specs}
                    </div>
                  </TiltLayer>
                </div>

                {/* Informações do Produto em 3D (15px Z) */}
                <TiltLayer depth={15} className="p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-zinc-200 group-hover:to-red-500 transition-all duration-300">
                      {prod.title}
                    </h3>
                    <span className="font-mono text-base sm:text-lg font-black text-red-500/90 flex-shrink-0">
                      {prod.price}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans mt-2">
                    {prod.desc}
                  </p>
                </TiltLayer>
              </div>

              {/* Botão de Compra em 3D (30px Z) */}
              <TiltLayer depth={30} className="p-5 sm:p-6 pt-0">
                <a
                  href={`https://wa.me/5527997207037?text=Ol%C3%A1,%20gostaria%20de%20adquirir%20o%20item:%20${encodeURIComponent(prod.title)}%20no%20valor%20de%20${encodeURIComponent(prod.price)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gradient-to-r from-red-600 via-red-500 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white w-full py-3.5 sm:py-4 rounded-xl uppercase font-bold tracking-widest font-mono text-xs shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:border-red-500 transition-all duration-300 active:scale-95 border border-red-400/30"
                >
                  Comprar via WhatsApp ?
                </a>
              </TiltLayer>
            </TiltCard>
          </ScrollReveal>
        ))}
        </div>

        {/* Rodapé da Loja */}
        <div className="mt-10 sm:mt-14 text-center font-mono text-xs text-zinc-500 tracking-wider">
          📦 ENVIAMOS PARA TODO O BRASIL &bull; ATENDIMENTO DIRETO VIA WHATSAPP
        </div>

      </div>
    </section>
  );
}

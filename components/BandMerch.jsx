"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import ParallaxLayer from "./ParallaxLayer";
import ParallaxWatermark from "./ParallaxWatermark";
import TypewriterTitle from "./ui/type-writer";
import TiltCard, { TiltLayer } from "./TiltCard";
import BotaoMagnetico from "./BotaoMagnetico";

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
      className="relative w-full bg-[url('/bg-placeholder.jpg')] bg-fixed bg-cover bg-center border-t border-white/10 scroll-mt-20 overflow-hidden py-20 sm:py-32 md:py-48 px-4 sm:px-8 lg:px-16 min-h-0"
    >
      {/* Overlay Escuro Profundo */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />

      {/* Marca d'água Parallax Monumental */}
      <ParallaxWatermark text="ARMAMENTO" speed={0.45} position="center" />

      {/* Iluminação Ambiente em Parallax */}
      <ParallaxLayer speed={0.4} className="absolute top-1/3 right-1/4 pointer-events-none -z-10">
        <div className="w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 blur-[140px] rounded-full" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.35} className="absolute bottom-10 left-10 pointer-events-none -z-10">
        <div className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-orange-600/10 blur-[140px] rounded-full" />
      </ParallaxLayer>

      <div className="relative z-10 w-full">
        
        {/* Header da Seção */}
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-12 sm:mb-16 md:mb-24 text-center flex flex-col items-center justify-center">
            <div className="mb-2 sm:mb-3">
              <TypewriterTitle
                prefix="//"
                prefixClassName="text-red-500 font-mono font-medium text-[11px]"
                sequences={[
                  { text: "EQUIPAMENTO OFICIAL", deleteAfter: true, pauseAfter: 3500 },
                  { text: "MERCHANDISING OFICIAL", deleteAfter: true, pauseAfter: 2500 },
                  { text: "ARTIGOS EXCLUSIVOS", deleteAfter: true, pauseAfter: 2500 },
                  { text: "ENCOMENDAS VIA WHATSAPP", deleteAfter: true, pauseAfter: 2500 },
                ]}
                typingSpeed={38}
                deleteSpeed={18}
                autoLoop={true}
                loopDelay={1000}
                textClassName="font-mono text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold"
                cursorClassName="bg-red-500 h-[1em] w-[2px] shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
            </div>
            <h2 className="linha-mask text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight pb-2 leading-tight overflow-visible flex items-center justify-center">
              <TypewriterTitle
                sequences={[
                  { text: "Artigos & Vestuário", deleteAfter: true, pauseAfter: 4000 },
                  { text: "T-Shirt SDFH Oficial", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Regata SDFH Metal", deleteAfter: true, pauseAfter: 2800 },
                  { text: "Moletom Heavyweight", deleteAfter: true, pauseAfter: 2800 },
                ]}
                typingSpeed={42}
                deleteSpeed={20}
                autoLoop={true}
                loopDelay={1200}
                textClassName="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-red-500 font-black tracking-tight"
                cursorClassName="bg-red-500 h-[1em] w-[3px] shadow-[0_0_12px_rgba(239,68,68,0.9)] ml-1"
              />
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
          </div>
        </ScrollReveal>

        {/* Grid Adaptativo (Mobile: 1 | Tablet: 2 | Desktop: 3 colunas) */}
        <ScrollReveal direction="up" stagger={0.3} duration={1500} threshold="top 80%">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((prod, idx) => (
              <TiltCard
                key={prod.id}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] hover:border-red-500/50 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(220,38,38,0.35),_0_0_20px_rgba(220,38,38,0.12)] transition-all duration-500 flex flex-col justify-between h-full"
              >
              <div>
                {/* Imagem do Produto em 3D (25px Z) */}
                <div className="relative h-64 sm:h-80 w-full bg-black/40 p-5 sm:p-6 flex items-center justify-center border-b border-white/10 rounded-t-2xl overflow-hidden">
                  <TiltLayer depth={25} className="w-full h-full flex items-center justify-center pointer-events-none">
                    <Image
                      src={prod.image}
                      alt={`Foto do produto oficial ${prod.title}`}
                      width={320}
                      height={320}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
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

              {/* Botão de Compra em 3D (30px Z) com Efeito Magnético */}
              <TiltLayer depth={30} className="p-5 sm:p-6 pt-0">
                <BotaoMagnetico
                  as="a"
                  href={`https://wa.me/5527997207037?text=Ol%C3%A1,%20gostaria%20de%20adquirir%20o%20item:%20${encodeURIComponent(prod.title)}%20no%20valor%20de%20${encodeURIComponent(prod.price)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-center bg-gradient-to-r from-red-600 via-red-500 to-orange-600 hover:from-red-500 hover:via-orange-500 hover:to-yellow-500 text-white w-full py-3.5 sm:py-4 rounded-xl uppercase font-bold tracking-widest font-mono text-xs shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8),_0_0_80px_rgba(239,68,68,0.3)] hover:scale-[1.03] hover:border-orange-400 transition-all duration-300 active:scale-95 border border-red-400/30"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-white flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Comprar via WhatsApp</span>
                </BotaoMagnetico>
              </TiltLayer>
            </TiltCard>
          ))}
        </div>
        </ScrollReveal>

        {/* Rodapé da Loja */}
        <div className="mt-10 sm:mt-14 text-center font-mono text-xs text-zinc-500 tracking-wider flex items-center justify-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-zinc-400"
            aria-hidden="true"
          >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
          <span>ENVIAMOS PARA TODO O BRASIL &bull; ATENDIMENTO DIRETO VIA WHATSAPP</span>
        </div>

      </div>
    </section>
  );
}

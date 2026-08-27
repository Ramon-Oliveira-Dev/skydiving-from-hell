import React from "react";

export default function HeroVideo() {
  return (
    <section className="relative w-full h-[75vh] sm:h-[85vh] md:h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Container do Vídeo com proporção controlada e fade nas bordas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <video 
          className="w-full h-full object-cover md:object-cover scale-105 sm:scale-100 transition-transform duration-700 select-none"
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
        >
          <source src="/hero_page2_scroll.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>

        {/* Camada de Gradiente Sombrio: Funde as bordas superiores e inferiores com o preto absoluto da página */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black pointer-events-none" />
      </div>

      {/* Conteúdo de Texto / CTAs da Hero (se houver por cima do vídeo) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Títulos ou botões de chamada para ação */}
      </div>
    </section>
  );
}

/**
 * Dados centrais oficiais da banda Skydiving From Hell (S.D.F.H.)
 * Fonte única da verdade para agenda, integrantes, singles e dados estruturados (JSON-LD).
 */

export interface Member {
  id: string;
  name: string;
  role: string;
  images: string[];
  desc: string;
  tagColor: string;
  fullHistory: string;
  setup: string;
  equipment: string[];
  socials: {
    instagram: string;
    handle: string;
  };
}

export interface ShowInfo {
  title: string;
  date: string; // Ex: "05/10"
  fullDateText: string;
  isoStartDate: string; // ISO 8601 para JSON-LD
  isoEndDate: string;
  time: string;
  place: string;
  venueName: string;
  address: string;
  flyer: string;
  bands: string[];
  maps: string;
  attractions: Array<{
    label: string;
    type: "tattoo" | "merch" | "disc";
  }>;
}

export const BAND_INFO = {
  name: "Skydiving From Hell",
  alternateName: "S.D.F.H.",
  genre: ["Metal", "Metal moderno"],
  foundingDate: "2016",
  city: "Vila Velha",
  state: "ES",
  country: "Brasil",
  location: "Vila Velha, ES, Brasil",
  url: "https://skydiving-from-hell.vercel.app",
  email: "sdfhband@gmail.com",
  phone: "+5527997207037",
  whatsappUrl: "https://wa.me/5527997207037",
  socials: {
    instagram: "https://www.instagram.com/skydivingfromhell",
    youtube: "https://www.youtube.com/@skydivingfromhell",
    facebook: "https://www.facebook.com/skydivingfromhell",
    tiktok: "https://www.tiktok.com/@skydivingfromhell",
    spotify: "https://spoti.fi/2JmeZmW",
  },
};

/**
 * Constante oficial do próximo show agendado
 * Usada simultaneamente pelo card de Agenda (BandTour) e pelo JSON-LD (MusicEvent)
 */
export const FEATURED_SHOW: ShowInfo = {
  title: "Vila Velha Hardcore",
  date: "05/10", // 05 de Outubro de 2026 (conforme cartaz oficial arte_show_05_10_26.jpeg)
  fullDateText: "05 de Outubro de 2026",
  isoStartDate: "2026-10-05T16:00:00-03:00",
  isoEndDate: "2026-10-05T21:00:00-03:00",
  time: "16:00H ÀS 21:00H",
  place: "Correria Music Bar • Praia de Itaparica / ES",
  venueName: "Correria Music Bar",
  address: "Praia de Itaparica, Vila Velha, ES, Brasil",
  flyer: "/arte_show_05_10_26.jpeg",
  bands: ["S.D.F.H.", "Lítígio", "Doggbite", "Gritos", "Srta Karen"],
  maps: "https://maps.google.com/?q=Correria+Music+Bar+Vila+Velha",
  attractions: [
    { label: "Sorteio de Tattoo", type: "tattoo" },
    { label: "Camisas Oficiais", type: "merch" },
    { label: "CDs & Adesivos", type: "disc" },
  ],
};

export const MEMBERS: Member[] = [
  {
    id: "jeffao",
    name: "Jeffão",
    role: "Vocal / Frontman",
    images: [
      "/member_jeffao.jpg",
      "/live_jeffao_ingrid.jpg",
      "/band_live_color.jpg",
    ],
    desc: "Liderando os palcos desde 2016. Vocais viscerais, presença intimidadora e guturais que comandam as multidões.",
    tagColor: "from-red-600 to-orange-600",
    fullHistory:
      "Fundador e voz da S.D.F.H., Jeffão transformou angústias urbanas e críticas sociais em linhas vocais devastadoras. Com técnicas de gutural profundo, false cord e vocal screams, comanda a banda com energia inesgotável em palcos de todo o Espírito Santo.",
    setup: "Vocal Dinâmico & Processamento de Efeitos em Tempo Real",
    equipment: [
      "Microfone Shure SM7B & Beta 58A",
      "Processador TC Helicon VoiceLive",
      "Transmissor Sem Fio Shure GLXD4+",
      "In-Ear KZ ZS10 Pro",
    ],
    socials: {
      instagram: "https://instagram.com/bigjeff.hates",
      handle: "@bigjeff.hates",
    },
  },
  {
    id: "ingrid",
    name: "Ingrid",
    role: "Guitarra 8 Cordas",
    images: [
      "/member_ingrid.jpg",
      "/live_jeffao_ingrid.jpg",
      "/band_live_bw.jpg",
    ],
    desc: "Arquiteta de riffs pesados, velocidade e precisão cirúrgica. Traz influências progressivas para o peso extremo.",
    tagColor: "from-purple-600 to-red-600",
    fullHistory:
      "Referência no metal moderno capixaba, Ingrid conduz a afinação estendida de 8 cordas com agressividade técnica e sofisticação harmônica. É a mente por trás de breakdowns assimétricos e timbres hiper-definidos gravados nos singles da banda.",
    setup: "Afinação Drop E / E Standard (8 Cordas)",
    equipment: [
      "Guitarra Ibanez RG8 8-String Custom",
      "Modelador Neural DSP Quad Cortex",
      "Captadores Fishman Fluence Modern",
      "Cordas D'Addario NYXL (.009 - .080)",
    ],
    socials: {
      instagram: "https://instagram.com/ingridguitar",
      handle: "@ingridguitar",
    },
  },
  {
    id: "davier",
    name: "Davier",
    role: "Guitarra 8 Cordas",
    images: [
      "/member_davier.jpg",
      "/live_red_stage.jpg",
      "/band_group.jpg",
    ],
    desc: "Harmonia pesada e parede sonora, modelando a atmosfera com distorções massivas e texturas industriais.",
    tagColor: "from-blue-600 to-cyan-600",
    fullHistory:
      "Davier constrói a muralha rítmica e a camada densa da S.D.F.H. Com domínio de timbres de alto ganho e passagens dinâmicas, sincroniza com precisão milimétrica cada palhetada aos bumbos da bateria.",
    setup: "Afinação Drop E / Double Drop (8 Cordas)",
    equipment: [
      "Guitarra Schecter Omen-8 Custom",
      "Line 6 Helix LT / Cab IRs Fortin",
      "Captadores Seymour Duncan Nazgûl/Sentient",
      "Cordas Ernie Ball Skinny Top Heavy Bottom 8",
    ],
    socials: {
      instagram: "https://instagram.com/davier.cirino",
      handle: "@davier.cirino",
    },
  },
  {
    id: "trevas",
    name: "Trevas",
    role: "Baixo / Groove",
    // Não há retrato individual disponível ainda; usa fallback com silhueta no card
    images: [
      "/band_group.jpg",
      "/live_red_stage.jpg",
      "/band_live_bw.jpg",
    ],
    desc: "Pilar do ritmo e sustentação sonora. Linhas distorcidas, ataque direto e o groove brutal que faz tremer o chão.",
    tagColor: "from-emerald-600 to-teal-600",
    fullHistory:
      "A espinha dorsal das frequências sub-graves da S.D.F.H. Trevas funde distorção Darkglass com ataque rítmico percussivo, garantindo que cada acorde de 8 cordas tenha impacto físico na plateia.",
    setup: "Afinação Drop E / F# (5 Cordas Super Low)",
    equipment: [
      "Baixo Dingwall NG3 5-String Multi-Scale",
      "Pré-amp Darkglass Microtubes B7K Ultra",
      "Compressor Darkglass Hyper Luminal",
      "In-Ear Shure SE215",
    ],
    socials: {
      instagram: "https://instagram.com/philserpa",
      handle: "@philserpa",
    },
  },
  {
    id: "ramon",
    name: "Ramon",
    role: "Bateria / Máquina Rítmica",
    images: [
      "/member_ramon.jpg",
      "/live_ramon_blue.jpg",
      "/live_ramon_bw.jpg",
    ],
    desc: "Máquina rítmica de alta precisão. Bumbos duplos avassaladores, blast beats velozes e dinamismo destrutivo.",
    tagColor: "from-amber-600 to-orange-600",
    fullHistory:
      "Baterista de técnica fulminante, Ramon é o motor propulsor da banda. Especialista em polirritmias, pedal duplo de alta velocidade e viradas métricas complexas que sustentam a identidade brutal da S.D.F.H.",
    setup: "Kit Custom Double Bass & Pratos Dark / Raw",
    equipment: [
      "Bateria Tama Superstar Hyper-Drive",
      "Pedais Duplos Trick Pro 1-V BigFoot",
      "Pratos Meinl Byzance Extra Dry & Dual",
      "Triggers Roland TM-2 & Baquetas ProMark 5B",
    ],
    socials: {
      instagram: "https://instagram.com/ramonlucasdedeoliveira",
      handle: "@ramonlucasdedeoliveira",
    },
  },
];

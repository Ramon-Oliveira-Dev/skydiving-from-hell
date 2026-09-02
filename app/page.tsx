import Header from "../components/Header";
import HeroScrollytelling from "../components/HeroScrollytelling";
import BandPlayer from "../components/BandPlayer";
import BandBio from "../components/BandBio";
import BandLineup from "../components/BandLineup";
import BandVideos from "../components/BandVideos";
import BandTour from "../components/BandTour";
import BandMerch from "../components/BandMerch";
import BandFooter from "../components/BandFooter";
import BandContact from "../components/BandContact";
import GrainOverlay from "../components/GrainOverlay";
import SpotlightGlow from "../components/SpotlightGlow";
import FloatingPlayer from "../components/FloatingPlayer";
import { AudioProvider } from "../context/AudioContext";
import { ScrollStack } from "../components/ui/scroll-stack";

export default function Home() {
  return (
    <AudioProvider>
      <main className="bg-black text-white font-sans min-h-screen w-full overflow-x-clip relative touch-pan-y">
        <GrainOverlay />
        <SpotlightGlow />
        <Header />
        <HeroScrollytelling />

        {/* ── TRANSIÇÃO STACKING 3D ENTRE AS SEÇÕES (SCROLL STACK) ──────── */}
        <ScrollStack>
          <BandPlayer />
          <BandBio />
          <BandLineup />
          <BandVideos />
          <BandTour />
          <BandMerch />
          <BandContact />
          <BandFooter />
        </ScrollStack>

        <FloatingPlayer />
      </main>
    </AudioProvider>
  );
}

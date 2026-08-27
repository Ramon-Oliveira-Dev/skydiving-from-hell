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

export default function Home() {
  return (
    <AudioProvider>
      <main className="bg-black text-white font-sans min-h-screen w-full overflow-x-hidden relative">
        <GrainOverlay />
        <SpotlightGlow />
        <Header />
        <HeroScrollytelling />
        <BandPlayer />
        <BandBio />
        <BandLineup />
        <BandVideos />
        <BandTour />
        <BandMerch />
        <BandContact />
        <BandFooter />
        <FloatingPlayer />
      </main>
    </AudioProvider>
  );
}

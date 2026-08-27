import Header from "../components/Header";
import HeroScrollytelling from "../components/HeroScrollytelling";
import BandPlayer from "../components/BandPlayer";
import BandBio from "../components/BandBio";
import BandLineup from "../components/BandLineup";
import BandVideos from "../components/BandVideos";
import BandTour from "../components/BandTour";
import BandMerch from "../components/BandMerch";
import BandFooter from "../components/BandFooter";

export default function Home() {
  return (
    <main className="bg-black text-white font-sans min-h-screen w-full overflow-x-hidden">
      <Header />
      <HeroScrollytelling />
      <BandPlayer />
      <BandBio />
      <BandLineup />
      <BandVideos />
      <BandTour />
      <BandMerch />
      <BandFooter />
    </main>
  );
}

import { Hero } from "../components/Hero/Hero";
import { TrendingSection } from "../components/Trending/TrendingSection";
import { NewReleaseSection } from "../components/NewRelease/NewReleaseSection";

export const Home = () => {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Hero />
      <div className="space-y-4">
        <TrendingSection />
        <NewReleaseSection />
      </div>
    </main>
  );
};

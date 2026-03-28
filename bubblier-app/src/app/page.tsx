import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BubbleTeaScroll from "@/components/BubbleTeaScroll";
import CafeSection from "@/components/CafeSection";

export default function Home() {
  return (
    <main className="relative bg-brand-dark">
      {/* Fixed navbar */}
      <Navbar />

      {/* Hero — Clean typographic opening */}
      <HeroSection />

      {/* Scroll-linked canvas animation — the core experience */}
      <BubbleTeaScroll />

      {/* Content sections — dark premium UI */}
      <CafeSection />
    </main>
  );
}

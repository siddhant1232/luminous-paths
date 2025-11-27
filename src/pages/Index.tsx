import { BackgroundPaths } from "@/components/ui/background-paths";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";
import DemoOne from "@/components/Dockitem";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <BackgroundPaths />
      </div>

      {/* Scrollable sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <ContactSection />
      </main>

      {/* 🔹 Dock: fixed bottom center over everything */}
      <DemoOne />
    </div>
  );
};

export default Index;

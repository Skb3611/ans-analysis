import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import WhyUseThis from "@/components/landing/WhyUseThis";
import DemoPreview from "@/components/landing/DemoPreview";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorks />
      <Features />
      <WhyUseThis />
      <DemoPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;

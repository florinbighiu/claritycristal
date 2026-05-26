"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PacksSection } from "@/components/PacksSection";
import { PricingSection } from "@/components/PricingSection";
import { ValuesSection } from "@/components/ValuesSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  useScrollReveal();

  return (
    <main>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-lg font-semibold"
      >
        Saltar al contenido principal
      </a>

      <NavBar />

      <div id="main-content">
        <HeroSection />
        <ServicesSection />
        <BeforeAfterSlider />
        <PacksSection />
        <PricingSection />
        <ValuesSection />
        <FaqSection />
        <ContactSection />
      </div>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import { LanguageProvider } from "@/context/LanguageContext";

const Index = () => {
  useEffect(() => {
    // Observer for animation effects
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            // Cast the Element to HTMLElement to access style property
            (entry.target as HTMLElement).style.opacity = "1";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-120px 0px 0px 0px", // Match the -120px offset used in NavBar
      }
    );

    document.querySelectorAll("section").forEach((section) => {
      section.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition",
        "duration-700",
        "ease-out"
      );
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll("section").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </LanguageProvider>
  );
};

export default Index;

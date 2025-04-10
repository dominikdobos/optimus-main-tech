import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative h-[90vh] flex items-center bg-optimusDarkGray"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-white">
        <div
          className="max-w-3xl animate-fade-in opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Ipari berendezések professzionális karbantartása
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Az <span className="font-bold">Optimus Main Tech Kft.</span>{" "}
            szakértő megoldásokat kínál az ipari berendezések üzemvitelszerű és
            nagy karbantartásának teljes folyamatára, hogy üzeme folyamatosan és
            hatékonyan működhessen.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white text-lg hover:bg-white/20 hover:text-white"
              >
                Lépjen kapcsolatba velünk
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

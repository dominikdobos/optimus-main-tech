import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-optimusBlue to-optimusGreen bg-clip-text text-transparent">
            Optimus Main Tech
          </h1>
        </div>

        <div className="hidden lg:flex space-x-8">
          <a
            href="#home"
            className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300 hover:underline hover:underline-offset-8 hover:decoration-2"
          >
            Kezdőlap
          </a>
          <a
            href="#services"
            className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300 hover:underline hover:underline-offset-8 hover:decoration-2"
          >
            Szolgáltatások
          </a>
          <a
            href="#about"
            className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300 hover:underline hover:underline-offset-8 hover:decoration-2"
          >
            Rólunk
          </a>
          <a
            href="#contact"
            className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300 hover:underline hover:underline-offset-8 hover:decoration-2"
          >
            Kapcsolat
          </a>
        </div>

        <div className="hidden lg:block">
          <a href="#contact">
            <Button className="btn-primary-gradient hover:shadow-xl hover:bg-black transition duration-400">
              Lépj kapcsolatba!
            </Button>
          </a>
        </div>

        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-optimusDarkGray"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white px-4 py-5 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <a
              href="#home"
              className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300"
              onClick={toggleMenu}
            >
              Kezdőlap
            </a>
            <a
              href="#services"
              className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300"
              onClick={toggleMenu}
            >
              Szolgáltatások
            </a>
            <a
              href="#about"
              className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300"
              onClick={toggleMenu}
            >
              Rólunk
            </a>
            <a
              href="#contact"
              className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300"
              onClick={toggleMenu}
            >
              Kapcsolat
            </a>
            <a href="#contact">
              <Button className="btn-primary-gradient w-full">
                Lépj kapcsolatba!
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

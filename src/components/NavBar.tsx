
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

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
        
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300">
            Kezdőlap
          </a>
          <a href="#services" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300">
            Szolgáltatások
          </a>
          <a href="#about" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300">
            Rólunk
          </a>
          <a href="#testimonials" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300">
            Ügyfélvélemények
          </a>
          <a href="#contact" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300">
            Kapcsolat
          </a>
        </div>
        
        <div className="hidden md:block">
          <Button className="btn-primary-gradient">
            Ingyenes konzultáció
          </Button>
        </div>
        
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-optimusDarkGray">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-5 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <a href="#home" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300" onClick={toggleMenu}>
              Kezdőlap
            </a>
            <a href="#services" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300" onClick={toggleMenu}>
              Szolgáltatások
            </a>
            <a href="#about" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300" onClick={toggleMenu}>
              Rólunk
            </a>
            <a href="#testimonials" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300" onClick={toggleMenu}>
              Ügyfélvélemények
            </a>
            <a href="#contact" className="text-optimusDarkGray hover:text-optimusBlue font-medium transition duration-300" onClick={toggleMenu}>
              Kapcsolat
            </a>
            <Button className="btn-primary-gradient w-full">
              Ingyenes konzultáció
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

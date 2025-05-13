import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const navItems = [
  { label: "Kezdőlap", to: "home" },
  { label: "Szolgáltatások", to: "services" },
  { label: "Rólunk", to: "about" },
  { label: "Kapcsolat", to: "contact" },
];

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-optimusBlue to-optimusGreen bg-clip-text text-transparent">
            Optimus Main Tech Kft.
          </h1>
        </div>

        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              activeClass="active"
              className="text-optimusDarkGray text-lg font-medium cursor-pointer transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-[30%] after:origin-left after:scale-x-0 after:bg-optimusBlue after:transition-transform after:duration-300 hover:text-optimusBlue [&.active]:text-optimusBlue [&.active]:after:scale-x-100"
            >
              {item.label}
            </ScrollLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <ScrollLink to="contact" smooth={true} duration={500}>
            <Button className="btn-primary-gradient text-md hover:shadow-xl hover:bg-black transition duration-400">
              Lépj kapcsolatba!
            </Button>
          </ScrollLink>
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
            {navItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-80}
                activeClass="active"
                className="text-optimusDarkGray font-medium cursor-pointer transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-[30%] after:origin-left after:scale-x-0 after:bg-optimusBlue after:transition-transform after:duration-300 hover:text-optimusBlue [&.active]:text-optimusBlue [&.active]:after:scale-x-100"
                onClick={toggleMenu}
              >
                {item.label}
              </ScrollLink>
            ))}
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              onClick={toggleMenu}
            >
              <Button className="btn-primary-gradient w-full">
                Lépj kapcsolatba!
              </Button>
            </ScrollLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

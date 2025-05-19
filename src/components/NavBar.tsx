import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link as ScrollLink, animateScroll } from "react-scroll";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const [activeLink, setActiveLink] = useState("home");

  const navItems = [
    { labelKey: "nav.home", to: "home" },
    { labelKey: "nav.services", to: "services" },
    { labelKey: "nav.about", to: "about" },
    { labelKey: "nav.contact", to: "contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle navigation click and manually set the active link
  const handleSetActive = (to: string) => {
    setActiveLink(to);
  };

  // Function to scroll to section and manually set the active link
  const scrollToSection = (to: string) => {
    setActiveLink(to);
    const element = document.getElementById(to);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = element.offsetTop - navbarHeight - 40; // Additional 40px buffer
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  // Detect scroll and set active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // Add offset for navbar + buffer

      // Find which section is currently visible
      const sections = navItems
        .map((item) => document.getElementById(item.to))
        .filter(Boolean);
      const currentSection = sections.find((section) => {
        if (!section) return false;
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        return scrollPosition >= sectionTop && scrollPosition < sectionBottom;
      });

      if (currentSection) {
        setActiveLink(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

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
            <button
              key={item.to}
              onClick={() => scrollToSection(item.to)}
              className={`text-optimusDarkGray text-lg font-medium cursor-pointer transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-[25%] after:origin-left after:scale-x-0 after:bg-optimusBlue after:transition-transform after:duration-300 hover:text-optimusBlue ${
                activeLink === item.to
                  ? "text-optimusBlue after:scale-x-100"
                  : ""
              }`}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSwitcher />
          <Button
            onClick={() => scrollToSection("contact")}
            className="btn-primary-gradient text-md hover:shadow-xl hover:bg-black transition duration-400"
          >
            {t("nav.cta")}
          </Button>
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
              <button
                key={item.to}
                onClick={() => scrollToSection(item.to)}
                className={`text-left text-optimusDarkGray font-medium cursor-pointer transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-[10%] after:origin-left after:scale-x-0 after:bg-optimusBlue after:transition-transform after:duration-300 hover:text-optimusBlue ${
                  activeLink === item.to
                    ? "text-optimusBlue after:scale-x-100"
                    : ""
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
            <LanguageSwitcher />
            <Button
              onClick={() => scrollToSection("contact")}
              className="btn-primary-gradient w-full"
            >
              {t("nav.cta")}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

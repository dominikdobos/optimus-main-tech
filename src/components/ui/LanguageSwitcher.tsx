import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./button";
import EnglishFlag from "@/assets/english.png";
import HungarianFlag from "@/assets/hungary.png";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "hu" ? "en" : "hu");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center justify-center p-0 w-10 h-10 text-optimusDarkGray hover:text-optimusBlue"
      title={language === "hu" ? "Switch to English" : "Váltás magyarra"}
    >
      {language === "hu" ? (
        <img src={EnglishFlag} alt="English" className="w-6 h-6 rounded-full" />
      ) : (
        <img
          src={HungarianFlag}
          alt="Magyar"
          className="w-6 h-6 rounded-full"
        />
      )}
    </Button>
  );
};

export default LanguageSwitcher;

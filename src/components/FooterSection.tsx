import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-optimusDarkGray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-optimusBlue to-optimusGreen bg-clip-text text-transparent">
              Optimus Main Tech Kft.
            </h3>
            <p className="text-gray-300 mb-4">{t("footer.description")}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {t("footer.maintenance")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {t("footer.repairs")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {t("footer.diagnostics")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {t("footer.installation")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.links")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {t("footer.home")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {t("footer.testimonials")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">
              {t("footer.contact.title")}
            </h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">2314 Halásztelek, Ilona utca 53.</p>
              <p className="mb-2">Tel: +36 20 525 4621</p>
              <p className="mb-2">
                <span className="opacity-0">Tel:</span> +36 20 594 1551
              </p>
              <p className="mb-2">Email: optimusmaintech@omtkft.hu</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {t("footer.copyright").replace("{year}", currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

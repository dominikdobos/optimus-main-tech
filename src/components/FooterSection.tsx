import React from "react";

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-optimusDarkGray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-optimusBlue to-optimusGreen bg-clip-text text-transparent">
              Optimus Main Tech Kft.
            </h3>
            <p className="text-gray-300 mb-4">
              Professzionális ipari karbantartási megoldások, amelyek növelik
              berendezései élettartamát és csökkentik a váratlan leállásokat.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Szolgáltatások</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Üzemvitelszerű karbantartás
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Nagyjavítások
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Állapotfelmérés és diagnosztika
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Géptelepítés és beüzemelés
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Gyors linkek</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Kezdőlap
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Rólunk
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Ügyfélvélemények
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Kapcsolat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Elérhetőség</h3>
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
            © {currentYear} Optimus Main Tech Kft. Minden jog fenntartva.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Adatvédelmi irányelvek
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              ÁSZF
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Impresszum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

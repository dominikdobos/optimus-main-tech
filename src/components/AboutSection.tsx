
import React from 'react';
import { Check } from 'lucide-react';

const advantages = [
  "20+ év szakmai tapasztalat",
  "Képzett és tapasztalt mérnökcsapat",
  "24/7 készenléti szolgálat",
  "Modern diagnosztikai eszközök",
  "Gyors reagálás és problémamegoldás",
  "Teljes körű garanciavállalás"
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-optimusGreen/10 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-optimusBlue/10 rounded-lg"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Ipari karbantartás" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in-left opacity-0" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-optimusDarkGray">Az Optimus Main Tech Kft-ről</h2>
            <p className="text-lg mb-6 text-gray-600">
              Az Optimus Main Tech Kft. több mint két évtizede nyújt magas színvonalú ipari karbantartási szolgáltatásokat Magyarországon. Célunk, hogy ügyfeleink termelőberendezései folyamatosan, maximális hatékonysággal működjenek.
            </p>
            <p className="text-lg mb-8 text-gray-600">
              Szakértő csapatunk mérnökökből és technikusokból áll, akik széles körű tapasztalattal rendelkeznek az ipari berendezések üzemeltetésében és karbantartásában. Modern diagnosztikai eszközökkel és naprakész szaktudással állunk ügyfelemink rendelkezésére.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-optimusGreen mr-2" />
                  <span className="text-gray-700">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

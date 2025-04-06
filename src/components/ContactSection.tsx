
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-optimusLightGray">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Kapcsolat</h2>
        <p className="section-subtitle text-center">
          Vegye fel velünk a kapcsolatot és kérjen személyre szabott ajánlatot ipari karbantartási szolgáltatásainkról
        </p>
        
        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          <div className="lg:w-1/2">
            <form className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Név *</label>
                  <Input id="name" placeholder="Az Ön neve" required />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Cég</label>
                  <Input id="company" placeholder="Cég neve" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input id="email" type="email" placeholder="pl. nev@ceg.hu" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefonszám *</label>
                  <Input id="phone" placeholder="+36 30 123 4567" required />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Szolgáltatás típusa</label>
                <select id="service" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-optimusBlue focus:border-transparent">
                  <option value="">Válasszon szolgáltatást</option>
                  <option value="maintenance">Üzemvitelszerű karbantartás</option>
                  <option value="repair">Nagyjavítás</option>
                  <option value="diagnostic">Állapotfelmérés és diagnosztika</option>
                  <option value="installation">Géptelepítés és beüzemelés</option>
                  <option value="other">Egyéb</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Üzenet *</label>
                <Textarea id="message" placeholder="Kérjük, írja le részletesen, miben segíthetünk..." rows={5} required />
              </div>
              <Button type="submit" className="btn-primary-gradient w-full">
                Üzenet küldése
              </Button>
            </form>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 text-optimusDarkGray">Elérhetőségeink</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">Cím</p>
                    <p className="text-gray-600">1117 Budapest, Infopark sétány 1.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">Telefonszám</p>
                    <p className="text-gray-600">+36 1 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">Email</p>
                    <p className="text-gray-600">info@optimusmaintech.hu</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">Nyitvatartás</p>
                    <p className="text-gray-600">Hétfő - Péntek: 8:00 - 17:00</p>
                    <p className="text-gray-600">Hétvégén és ünnepnapokon zárva</p>
                    <p className="text-gray-600 mt-2">24/7 sürgősségi karbantartás elérhető szerződött partnereknek</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-optimusDarkGray mb-3">Kövessen minket</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-optimusBlue text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-optimusBlue text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection: React.FC = () => {
  // Az űrlap adatai
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    contactEmail: "kozponti", // alapértelmezett kiválasztás
    message: "",
  });

  // Hibák tárolása
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Változások kezelése az input mezőkben
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Egyszerű validációs függvény a kötelező mezők ellenőrzésére
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Név megadása kötelező!";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email megadása kötelező!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Érvénytelen email formátum!";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefonszám megadása kötelező!";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Üzenet megadása kötelező!";
    }
    return newErrors;
  };

  // Űrlap beküldésének kezelése
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    // Mivel nincs backend, itt egyszerűen csak a konzolra írjuk ki az adatokat
    console.log("Űrlap adatainak beküldése:", formData);

    // Az űrlap visszaállítása sikeres beküldés után
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      contactEmail: "kozponti",
      message: "",
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 bg-optimusLightGray">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Kapcsolat</h2>
        <p className="section-subtitle text-center">
          Vegye fel velünk a kapcsolatot és kérjen személyre szabott ajánlatot
          ipari karbantartási szolgáltatásainkról
        </p>

        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          <div className="lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Név<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Az Ön neve"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cég
                  </label>
                  <Input
                    id="company"
                    placeholder="Cég neve"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="pl. nev@ceg.hu"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Telefonszám<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    placeholder="+36 30 123 4567"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Szolgáltatás típusa
                </label>
                <select
                  id="service"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-optimusBlue focus:border-transparent"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Válasszon szolgáltatást</option>
                  <option value="uzemvitelszeru_karbantartas">
                    Üzemvitelszerű karbantartás
                  </option>
                  <option value="nagyjavitas">Nagyjavítás</option>
                  <option value="termeloberendezesek">
                    Termelőberendezések karbantartása
                  </option>
                  <option value="tervezett">Tervezett karbantartás</option>
                  <option value="alkatresz_beszerzes">
                    Alkatrész beszerzés
                  </option>
                  <option value="Alkatrész gyártás">Alkatrész gyártás</option>
                  <option value="diagnostic">
                    Állapotfelmérés és diagnosztika
                  </option>
                  <option value="installation">
                    Géptelepítés és beüzemelés
                  </option>
                  <option value="tpm_rendszerek">
                    TPM rendszerek kialakítása
                  </option>
                  <option value="other">Egyéb</option>
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email címzett
                </label>
                <select
                  id="contactEmail"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-optimusBlue focus:border-transparent"
                  value={formData.contactEmail}
                  onChange={handleChange}
                >
                  <option value="kozponti">optimusmaintech@omtkft.hu</option>
                  <option value="dobos">r.dobos@omtkft.hu</option>
                  <option value="rotariu">cs.rotariu@omtkft.hu</option>
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Üzenet<span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  placeholder="Kérjük, írja le részletesen, miben segíthetünk..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>
              <Button type="submit" className="btn-primary-gradient w-full">
                Üzenet küldése
              </Button>
            </form>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 text-optimusDarkGray">
                Elérhetőségeink
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">Cím</p>
                    <p className="text-gray-600">
                      1117 Budapest, Infopark sétány 1.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">
                      Telefonszám
                    </p>
                    <p className="text-gray-600">+36 1 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">Email</p>
                    <p className="text-gray-600">optimusmaintech@omtkft.hu</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">
                      Nyitvatartás
                    </p>
                    <p className="text-gray-600">
                      Hétfő - Péntek: 8:00 - 17:00
                    </p>
                    <p className="text-gray-600">
                      Hétvégén és ünnepnapokon zárva
                    </p>
                    <p className="text-gray-600 mt-2">
                      24/7 sürgősségi karbantartás elérhető szerződött
                      partnereknek
                    </p>
                  </div>
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

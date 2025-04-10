import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Név megadása kötelező" }),
  company: z.string().optional(),
  email: z.string().email({ message: "Érvényes email cím megadása kötelező" }),
  phone: z.string().min(6, { message: "Telefonszám megadása kötelező" }),
  service: z.string().optional(),
  message: z.string().min(3, { message: "Üzenet megadása kötelező" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      contactFormSchema.parse(formValues);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormValues, string>> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof ContactFormValues;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Hiba",
        description: "Kérjük, töltse ki a kötelező mezőket megfelelően.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Type-safe insert for the contacts table
      const { error: dbError } = await supabase
        .from('contacts')
        .insert({
          name: formValues.name,
          company: formValues.company || null,
          email: formValues.email,
          phone: formValues.phone,
          service_type: formValues.service || null,
          message: formValues.message,
        });

      if (dbError) throw new Error(dbError.message);

      // Send email via edge function
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formValues,
      });

      if (error) throw error;

      // Success
      toast({
        title: "Sikeres küldés!",
        description: "Köszönjük megkeresését, hamarosan válaszolunk!",
      });

      // Reset form
      setFormValues({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Hiba történt",
        description: "Az üzenetet nem sikerült elküldeni. Kérjük, próbálja újra később vagy vegye fel velünk a kapcsolatot telefonon.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Név *</label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    placeholder="Az Ön neve" 
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Cég</label>
                  <Input 
                    id="company" 
                    name="company"
                    value={formValues.company}
                    onChange={handleInputChange}
                    placeholder="Cég neve" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="pl. nev@ceg.hu" 
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefonszám *</label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    placeholder="+36 30 123 4567" 
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Szolgáltatás típusa</label>
                <select 
                  id="service" 
                  name="service"
                  value={formValues.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-optimusBlue focus:border-transparent"
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Üzenet *</label>
                <Textarea 
                  id="message" 
                  name="message"
                  value={formValues.message}
                  onChange={handleInputChange}
                  placeholder="Kérjük, írja le részletesen, miben segíthetünk..." 
                  rows={5} 
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <Button 
                type="submit" 
                className="btn-primary-gradient w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Küldés folyamatban..." : "Üzenet küldése"}
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
                    <p className="text-gray-600">info@omtkft.hu</p>
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

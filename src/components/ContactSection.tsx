import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { useLanguage } from "@/context/LanguageContext";

// Form validation schema with dynamic error messages
const createContactFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, { message: t("contact.error.name") }),
    company: z.string().optional(),
    email: z.string().email({ message: t("contact.error.email") }),
    phone: z.string().min(6, { message: t("contact.error.phone") }),
    service: z.string().optional(),
    message: z.string().min(3, { message: t("contact.error.message") }),
    contactEmail: z.string().min(1, { message: t("contact.error.recipient") }),
  });

type ContactFormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  contactEmail: string;
};

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    contactEmail: "kozponti",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      const contactFormSchema = createContactFormSchema(t);
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

  const getRecipientEmail = (): string => {
    switch (formValues.contactEmail) {
      case "kozponti":
        return "optimusmaintech@omtkft.hu";
      case "rotariu":
        return "cs.rotariu@omtkft.hu";
      default:
        return "optimusmaintech@omtkft.hu";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: t("contact.error"),
        description: t("contact.error.validation"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase.from("contacts").insert({
        name: formValues.name,
        company: formValues.company || null,
        email: formValues.email,
        phone: formValues.phone,
        service_type: formValues.service || null,
        message: formValues.message,
      });

      if (dbError) throw new Error(dbError.message);

      const recipientEmail = getRecipientEmail();

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          ...formValues,
          recipientEmail: recipientEmail,
        },
      });

      if (error) throw error;

      toast({
        title: t("contact.success"),
        description: t("contact.success.message"),
      });

      setFormValues({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        contactEmail: "kozponti",
      });
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: t("contact.error"),
        description: t("contact.error.message"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: "", label: t("contact.service.select") },
    {
      value: "Üzemvitelszerű karbantartás",
      label: t("services.maintenance.title"),
    },
    { value: "Nagyjavítás", label: t("services.repairs.title") },
    {
      value: "Termelőberendezések karbantartása",
      label: t("services.equipment.title"),
    },
    { value: "Tervezett karbantartás", label: t("services.planned.title") },
    { value: "Alkatrész beszerzés", label: t("services.parts.title") },
    { value: "Alkatrész gyártás", label: t("services.manufacturing.title") },
    {
      value: "Állapotfelmérés és diagnosztika",
      label: t("services.diagnostics.title"),
    },
    {
      value: "Géptelepítés és beüzemelés",
      label: t("services.installation.title"),
    },
    { value: "TPM rendszerek kialakítása", label: t("services.tpm.title") },
    { value: "Egyéb", label: t("contact.service.other") },
  ];

  return (
    <section id="contact" className="py-20 bg-optimusLightGray">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">{t("contact.title")}</h2>
        <p className="section-subtitle text-center">{t("contact.subtitle")}</p>

        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          <div className="lg:w-1/2">
            <form
              className="bg-white p-8 rounded-lg shadow-lg"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    placeholder={t("contact.name.placeholder")}
                    className={errors.name ? "border-red-500" : ""}
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
                    {t("contact.company")}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formValues.company}
                    onChange={handleInputChange}
                    placeholder={t("contact.company.placeholder")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder={t("contact.email.placeholder")}
                    className={errors.email ? "border-red-500" : ""}
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
                    {t("contact.phone")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    placeholder={t("contact.phone.placeholder")}
                    className={errors.phone ? "border-red-500" : ""}
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
                  {t("contact.service")}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formValues.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-optimusBlue focus:border-transparent"
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("contact.recipient")}
                </label>
                <select
                  id="contactEmail"
                  name="contactEmail"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-optimusBlue focus:border-transparent"
                  value={formValues.contactEmail}
                  onChange={handleInputChange}
                >
                  <option value="kozponti">optimusmaintech@omtkft.hu</option>
                  <option value="rotariu">cs.rotariu@omtkft.hu</option>
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("contact.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={handleInputChange}
                  placeholder={t("contact.message.placeholder")}
                  rows={5}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="btn-primary-gradient w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("contact.submit.sending")
                  : t("contact.submit")}
              </Button>
            </form>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 text-optimusDarkGray">
                {t("contact.info.title")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">
                      {t("contact.info.address")}
                    </p>
                    <p className="text-gray-600">
                      2314 Halásztelek, Ilona utca 53.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">
                      {t("contact.info.phone")}
                    </p>
                    <p className="text-gray-600">+36 20 525 4621</p>
                    <p className="text-gray-600">+36 20 594 1551</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">
                      {t("contact.info.email")}
                    </p>
                    <p className="text-gray-600">optimusmaintech@omtkft.hu</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-optimusBlue mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-optimusDarkGray">
                      {t("contact.info.hours.title")}
                    </p>
                    <p className="text-gray-600">
                      {t("contact.info.hours.weekdays")}
                    </p>
                    <p className="text-gray-600">
                      {t("contact.info.hours.weekend")}
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

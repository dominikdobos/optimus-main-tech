import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Settings,
  Wrench,
  Factory,
  Calendar,
  Hammer,
  HardHat,
  Package,
  Cog,
  Warehouse,
  Building,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const services = [
    {
      icon: <Wrench className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.maintenance.title",
      descriptionKey: "services.maintenance.description",
    },
    {
      icon: <HardHat className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.repairs.title",
      descriptionKey: "services.repairs.description",
    },
    {
      icon: <Factory className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.equipment.title",
      descriptionKey: "services.equipment.description",
    },
    {
      icon: <Calendar className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.planned.title",
      descriptionKey: "services.planned.description",
    },
    {
      icon: <Package className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.parts.title",
      descriptionKey: "services.parts.description",
    },
    {
      icon: <Cog className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.manufacturing.title",
      descriptionKey: "services.manufacturing.description",
    },
    {
      icon: <Settings className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.diagnostics.title",
      descriptionKey: "services.diagnostics.description",
    },
    {
      icon: <Hammer className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.installation.title",
      descriptionKey: "services.installation.description",
    },
    {
      icon: <Warehouse className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.tpm.title",
      descriptionKey: "services.tpm.description",
    },
    {
      icon: <Building className="h-12 w-12 text-optimusBlue" />,
      titleKey: "services.building.title",
      descriptionKey: "services.building.description",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards =
              sectionRef.current?.querySelectorAll(".industry-card");
            cards?.forEach((card, index) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                card.classList.add("animate-fade-in");
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 bg-optimusLightGray"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">{t("services.title")}</h2>
        <p className="section-subtitle text-center">{t("services.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 [&>*:last-child:nth-child(3n-1)]:md:col-span-2 [&>*:last-child:nth-child(3n-1)]:md:mx-auto [&>*:last-child:nth-child(3n-2)]:lg:col-start-2">
          {services.map((service, index) => (
            <Card
              key={index}
              className="industry-card overflow-hidden border-none opacity-0 transition-all duration-500"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-blue-50">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-optimusDarkGray">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-600">{t(service.descriptionKey)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

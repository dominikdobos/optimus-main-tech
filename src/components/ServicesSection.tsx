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
} from "lucide-react";

const services = [
  {
    icon: <Wrench className="h-12 w-12 text-optimusBlue" />,
    title: "Üzemvitelszerű karbantartás",
    description:
      "Rendszeres ellenőrzések és karbantartási feladatok, amelyek biztosítják a gépek folyamatos és optimális működését.",
  },
  {
    icon: <HardHat className="h-12 w-12 text-optimusBlue" />,
    title: "Nagyjavítások",
    description:
      "Komplex javítási munkálatok és alkatrészcserék, amelyek meghosszabbítják a berendezések élettartamát.",
  },
  {
    icon: <Factory className="h-12 w-12 text-optimusBlue" />,
    title: "Termelőberendezések karbantartása",
    description:
      "Speciális szakértelemmel végzett karbantartási szolgáltatások gyártósorok és ipari berendezések számára.",
  },
  {
    icon: <Calendar className="h-12 w-12 text-optimusBlue" />,
    title: "Tervezett karbantartás",
    description:
      "Előre ütemezett karbantartási munkák, amelyek minimalizálják az állásidőt és maximalizálják a termelékenységet.",
  },
  {
    icon: <Package className="h-12 w-12 text-optimusBlue" />,
    title: "Alkatrész beszerzés",
    description:
      "Eredeti és helyettesítő alkatrészek gyors és megbízható beszerzése minden típusú ipari berendezéshez.",
  },
  {
    icon: <Cog className="h-12 w-12 text-optimusBlue" />,
    title: "Alkatrész gyártás",
    description:
      "Egyedi és nehezen beszerezhető alkatrészek gyártása precíziós technológiával, rövid határidővel.",
  },
  {
    icon: <Settings className="h-12 w-12 text-optimusBlue" />,
    title: "Állapotfelmérés és diagnosztika",
    description:
      "Fejlett technológiák alkalmazása a potenciális problémák korai azonosítására és megelőzésére.",
  },
  {
    icon: <Hammer className="h-12 w-12 text-optimusBlue" />,
    title: "Géptelepítés és beüzemelés",
    description:
      "Szakszerű telepítési és beüzemelési szolgáltatások az új berendezések optimális teljesítményének biztosítására.",
  },
  {
    icon: <Warehouse className="h-12 w-12 text-optimusBlue" />,
    title: "TPM Rendszerek kialakítása",
    description:
      "Kiépítése egy átfogó műszaki és menedzsmentből álló rendszernek, melynek célja, hogy maximálisan ki lehessen használni a karbantartásban lévő erőforrásokat.",
  },
];

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        <h2 className="section-title text-center">Szolgáltatásaink</h2>
        <p className="section-subtitle text-center">
          Teljes körű ipari karbantartási megoldásokat kínálunk, amelyek növelik
          berendezései élettartamát és csökkentik a váratlan leállásokat
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
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
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
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

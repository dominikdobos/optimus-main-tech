
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const testimonials = [
  {
    text: "Az Optimus Main Tech Kft. kiváló minőségű karbantartási szolgáltatásokat nyújt gyárunknak már több mint 5 éve. A szakértelmüknek köszönhetően jelentősen csökkent a váratlan leállások száma.",
    author: "Nagy Péter",
    position: "Műszaki igazgató, Hungarotech Ltd.",
    rating: 5
  },
  {
    text: "Gyors reagálás, professzionális hozzáállás és magas szakértelem jellemzi az Optimus csapatát. A nagyjavítási projektünk határidőre és költségkereten belül valósult meg.",
    author: "Kovács István",
    position: "Üzemeltetési vezető, Magyar Ipari Művek",
    rating: 5
  },
  {
    text: "Mióta az Optimus Main Tech végzi berendezéseink karbantartását, a gépeink élettartama jelentősen növekedett, és a termelési hatékonyságunk is javult. Csak ajánlani tudom őket!",
    author: "Szabó Andrea",
    position: "Gyárigazgató, Pannonia Industries",
    rating: 5
  },
  {
    text: "Kiváló partnerre találtunk az Optimus Main Tech csapatában. Komplex projektjeink során mindig találnak megoldást, bármilyen technikai kihívással is állunk szemben.",
    author: "Tóth János",
    position: "Termelési vezető, Industrial Solutions Kft.",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-r from-optimusBlue to-optimusGreen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>Ügyfélvélemények</h2>
        <p className="text-lg md:text-xl mb-12 text-white/90 text-center max-w-3xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Ismerje meg, mit mondanak ügyfeleink a szolgáltatásainkról
        </p>
        
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="sm:basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white shadow-lg border-none h-full mx-2">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex text-yellow-400 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 flex-grow">{testimonial.text}</p>
                      <div>
                        <p className="font-bold text-optimusDarkGray">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.position}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static mr-2 bg-white text-optimusBlue hover:bg-optimusBlue hover:text-white" />
              <CarouselNext className="relative static ml-2 bg-white text-optimusBlue hover:bg-optimusBlue hover:text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

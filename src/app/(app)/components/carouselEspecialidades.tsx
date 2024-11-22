import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/app/(app)/components/ui/carousel2";

import { Card, CardContent } from "@/app/(app)/components/ui/card";
import { CalendarRange } from "lucide-react";
import Link from "next/link";

  const especialidades = [
    { nombre: "Cardiología", color: "bg-[#b9b1a9]" },
    { nombre: "Dermatología", color: "bg-[#e9c6bc]" },
    { nombre: "Urología", color: "bg-[#a9dea3]" },
    { nombre: "Ginecología", color: "bg-[#d8bad8]" },
    { nombre: "Neurología", color: "bg-[#9f97d6]" },
    { nombre: "Oftalmología", color: "bg-[#a3c3de]" },
    { nombre: "Oncología", color: "bg-[#c7beb5]" },
    { nombre: "Ortopedia", color: "bg-[#f0d1c8]" },
    { nombre: "Pediatría", color: "bg-[#b7e5b1]" },
    { nombre: "Psiquiatría", color: "bg-[#e5cfe5]" }
  ];

const CarouselEspecialidades = () => {
    return ( 
        <div className="pl-10 pr-10 flex justify-center">
        <Carousel
          opts={{
            align: "start",
            loop:true
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-8">
            {especialidades.map((especialidad, index) => (
              <CarouselItem key={index} className="pl-8 basis-1/3 sm:basis-1/4 md:basis-1/6">
                <Link href={'/infodoctors'}>
                  <div>
                    <Card className={especialidad.color}>
                      <CardContent className="p-0 flex aspect-square items-center justify-center">
                        <CalendarRange size={46} color="#fff" />
                      </CardContent>
                    </Card>
                    <span className="block text-center text-sm pt-2">{especialidad.nombre}</span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#89ccc5]" />
          <CarouselNext className="bg-[#89ccc5]" />
        </Carousel>
      </div>
     );
}
 
export default CarouselEspecialidades;
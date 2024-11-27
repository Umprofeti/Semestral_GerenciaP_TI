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
import { getPayload } from "payload";
import configPromise from '@payload-config'


const CarouselEspecialidades =async ({idPaciente})=> {


  const payload = await getPayload({ config: configPromise })
  const dataEspecialidad = await payload.find({
    collection: 'especialidades',
    
  })

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
            {dataEspecialidad.docs.map((especialidad, index) => (
              <CarouselItem key={index} className="pl-8 basis-1/3 sm:basis-1/4 md:basis-1/6">
                <Link href={`/ver-especialista/${idPaciente}/${encodeURIComponent(especialidad.Nombre)}`}>
                  <div>
                    <Card style={{ backgroundColor: `#${especialidad.Color}` }}>
                      {/* especialidad.Color */}
                      <CardContent className="p-0 flex aspect-square items-center justify-center">
                        <CalendarRange size={46} color="#fff" />
                      </CardContent>
                    </Card>
                    <span className="block text-center text-sm pt-2">{especialidad.Nombre}</span>
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
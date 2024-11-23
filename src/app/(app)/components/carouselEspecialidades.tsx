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
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from '@payload-config'


const CarouselEspecialidades =async () => {

  const payload = await getPayloadHMR({ config: configPromise })
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
                <Link href={`/ver-especialistas/${especialidad.id}`}>
                  <div>
                    <Card className={especialidad.Color}>
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
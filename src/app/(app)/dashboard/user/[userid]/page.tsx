import { Card, CardContent } from "@/app/(app)/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/(app)/components/ui/carousel";
import { Input } from "@/app/(app)/components/ui/input";
import { Search } from 'lucide-react';
import Image from 'next/image';
import CarouselEspecialidades from "@/app/(app)/components/carouselEspecialidades";
import Header from "@/app/(app)/components/header";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import { getPayload } from "payload";
import configPromise from '@payload-config';

export default async function Home({ params }: { params: { userid: string } }) {
  const { userid } = await params;
  // Obtener datos de los doctores desde Payload
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: "doctor",
    where: {
      "Doctor/a destacada?": {
        equals: true,
      },
    },
  });

  return (
    <div className="p-4 lg:pl-16 lg:pr-16 flex flex-col gap-4">
      <Header />
      <DesktopNavigation />
      <h1 className="text-2xl sm:text-3xl">
        Bienvenido, <span className="text-[#89ccc5] block sm:inline">Nombre Apellido</span>
      </h1>

      {/* Mobile-only Search Bar */}
      <div className="relative md:hidden">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" />
      </div>

      <div>
        <h2 className="m-3 text-xl md:text-2xl">Especialidades</h2>
        <CarouselEspecialidades idPaciente={userid}/>
      </div>
      <div>
        <h2 className="m-3 text-xl md:text-2xl">Médicos Destacados</h2>
        <CarouselMedicosDestacados doctors={data.docs} />
      </div>
      <MobileNavigation />
    </div>
  );
}

function CarouselMedicosDestacados({ doctors }: { doctors: any[] }) {
  const color = "bg-[#cce7e4]";

  return (
    <div className="flex justify-center">
      <Carousel className="w-full">
        <CarouselContent className="ml-0 flex">
          {doctors.map((doctor) => (
            <CarouselItem key={doctor.id} className="basis-1/2 md:basis-1/6">
              <div className="p-1 flex flex-col gap-2">
                <Card className={color}>
                <CardContent className="p-2 flex aspect-square items-center justify-center overflow-hidden">
                  <Image
                    src={doctor.fotoDoctor.url}
                    alt={`Foto de ${doctor.nombreDoctor}`}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </CardContent>
                </Card>
                <div className="flex flex-col justify-center items-center">
                  <h2>{doctor.nombreDoctor}</h2>
                  <p className="text-sm">{doctor.especialidad.Nombre}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
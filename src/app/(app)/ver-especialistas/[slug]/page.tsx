'use client'
import { Search } from "lucide-react";
import Header from "@/app/(app)/components/header";
import { Input } from "@/app/(app)/components/ui/input";
import Image from "next/image";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import { Carousel, CarouselContent, CarouselItem } from "@/app/(app)/components/ui/carousel";
import { Card, CardContent } from "@/app/(app)/components/ui/card";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import CargandoPediatras from "../../components/cargandoPediatras";

const Especialidades = () => {

  const { slug } = useParams();
  const [result, setResult] = useState<EspecialistaResponse>();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  //Borrar
  const idusuario = '674275b2304b0c977fbe1b48test'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`http://localhost:3000/api/doctor?where[especialidad.Nombre][equals]=${slug}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        setResult(data)
        setLoading(false)
      } catch (err) {
        setError(error)
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  if (!loading) {
    if (result?.docs.length == 0) {
      return (
        <div className="">
          <Header />
          <DesktopNavigation />
          <div className="px-6">
            <h1 className="text-2xl sm:text-3xl my-4">
              Especialistas en, <span className="text-[#89ccc5] block sm:inline">
                {decodeURIComponent(Array.isArray(slug) ? slug.join('') : slug || '')}
              </span>
            </h1>
            <div className="relative md:hidden">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </div>
          <div className="flex flex-col w-full px-6  py-6">
            <h2 className="text-center">Error, no se ha encontrado doctores con la especialidad: {decodeURIComponent(Array.isArray(slug) ? slug.join('') : slug || '')}</h2>
            <Link href={`/dashboard/user/${idusuario}`} className="w-1/2 md:w-1/6 text-center py-3  bg-[#89ccc5] hover:bg-[#6fa09b] text-white rounded my-4">Regresar al inicio</Link>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="">
      <Header />
      <DesktopNavigation />
      <div className="px-6">
        <h1 className="text-2xl sm:text-3xl my-4">
          Especialistas en, <span className="text-[#89ccc5] block sm:inline">
            {decodeURIComponent(Array.isArray(slug) ? slug.join('') : slug || '')}
          </span>
        </h1>
        <div className="relative md:hidden">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
        {/* Carousel escritorio */}
        <Carousel orientation="horizontal" className="w-full hidden lg:block ">
          <CarouselContent className="-mt-1">
            {!loading ?
              result?.docs.map((doctor, index) => {
                return (
                  <CarouselItem key={`doc-${index}`} className="pt-1 md:basis-1/4 ">
                    <div className="p-1 ">
                      <Card className="md:h-96 w-full bg-red-500">
                        <CardContent className="flex md:flex-col items-center justify-center gap-2 bg-[#cce7e4] py-2 md:h-full">
                          <div className="w-2/5 md:w-full flex justify-center items-center bg-[#8ccac3] rounded-lg overflow-hidden h-28 max-h-28 md:h-56 md:max-h-56">
                            <Image src={doctor.fotoDoctor.url} width={420} height={360} alt={doctor.fotoDoctor.alt} className="h-full w-full object-cover" />
                          </div>
                          <div className="w-3/5 md:w-full flex items-center md:items-start ">
                            <ul>
                              <li>Dr/a. {doctor.nombreDoctor}</li>
                              <li>Hora: {doctor.horario.desde} - {doctor.horario.hasta}</li>
                              <li>Horario: {doctor.diasDisponibles}</li>
                              <li>Costo: {doctor.costo}</li>
                              <Link href={`/doctor-info/${doctor.id}`} className="font-semibold">Ver mas</Link>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              })
              :
              <CargandoPediatras />
            }
          </CarouselContent>
        </Carousel>

        {/* Carousel movil */}
        <Carousel orientation="vertical" className="w-full lg:hidden">
          <CarouselContent className="-mt-1">
            {!loading ?
              result?.docs.map((doctor, index) => {
                return (
                  <CarouselItem key={`docM-${index}`} className="pt-1 md:basis-1/4 ">
                    <div className="p-1 ">
                      <Card>
                        <CardContent className="flex md:flex-col items-center justify-center gap-2 bg-[#cce7e4] py-2 md:h-full">
                          <div className="w-2/5 md:w-full flex justify-center items-center bg-[#8ccac3] rounded-lg overflow-hidden h-28 max-h-28 md:h-56 md:max-h-56 ">
                            <Image src={doctor.fotoDoctor.url} width={420} height={360} alt={doctor.fotoDoctor.alt} className="h-full w-full object-cover" />
                          </div>
                          <div className="w-3/5 md:w-full text-sm md:text-lg  flex items-center md:items-start md:mt-6">
                            <ul>
                              <li>Dr/a. {doctor.nombreDoctor}</li>
                              <li>Hora: {doctor.horario.desde} - {doctor.horario.hasta}</li>
                              <li>Horario: {doctor.diasDisponibles}</li>
                              <li>Costo: {doctor.costo}</li>
                              <Link href={`/doctor-info/${doctor.id}`} className="font-semibold text-center w-full">Ver mas</Link>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              })
              :
              <CargandoPediatras />
            }
          </CarouselContent>
        </Carousel>


        <MobileNavigation />

      </div>
    </div>
  );
}

export default Especialidades;
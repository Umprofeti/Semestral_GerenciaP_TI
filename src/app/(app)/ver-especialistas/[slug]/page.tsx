'use client'
import {Search } from "lucide-react";
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

const especialidades = [
  { nombre: "Cardiología", url:"6740d69ef9de49d15ccdee66" },
  { nombre: "Dermatología", url:"6740d6a9f9de49d15ccdee8a" },
  { nombre: "Urología", url:"6740d6b5f9de49d15ccdeeae" },
  { nombre: "Ginecología", url:"6740d6bff9de49d15ccdeed3" },
  { nombre: "Neurología", url:"6740d6cdf9de49d15ccdeefb" },
  { nombre: "Oftalmología", url:"6740d6eaf9de49d15ccdef32" },
  { nombre: "Oncología", url:"6740d6f3f9de49d15ccdef55" },
  { nombre: "Ortopedia", url:"6740d732f9de49d15ccdef78" },
  { nombre: "Pediatría", url:"6740d73ff9de49d15ccdef9d" },
  { nombre: "Psiquiatría", url:"6740d68ff9de49d15ccdee43" }
];

const Especialidades = () => {

  const { slug } = useParams();
  const [result, setResult] = useState<EspecialistaResponse>();
  const [loading, setLoading] =useState(true)
  const [error, setError] =useState('')
  const [especialidadNombre, setEspecialidadNombre] = useState("");

  useEffect(() => {
    // Busca la especialidad basada en el slug
    const especialidad = especialidades.find((esp) => esp.url === slug);
    if (especialidad) {
      setEspecialidadNombre(especialidad.nombre);
    } else {
      setEspecialidadNombre("Especialidad no encontrada");
    }
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`http://localhost:3000/api/doctor?where[especialidad][equals]=${slug}`, {
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

  return ( 
    <div className="m-6">
      <Header />
      <DesktopNavigation/>
      <h1 className="text-2xl sm:text-3xl my-4">
        Especialistas en, <span className="text-[#89ccc5] block sm:inline">{especialidadNombre}</span>
      </h1>
      <div className="relative md:hidden">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
      </div>
      <Carousel orientation="horizontal" className="w-full hidden lg:block">
        <CarouselContent className="-mt-1">
 
          {result?.docs.map((doctor, index)=>{
            return(
              <CarouselItem key={`doc-${index}`} className="pt-1 md:basis-1/4 ">
                <div className="p-1 ">
                  <Card>
                    <CardContent className="flex md:flex-col items-center justify-center gap-2 bg-[#cce7e4] py-2 md:h-full">
                        <div className="w-2/5 md:w-full flex justify-center items-center bg-[#8ccac3] rounded-lg overflow-hidden h-28 max-h-28 md:h-56 md:max-h-56">
                          <Image src={doctor.fotoDoctor.url} width={420} height={360} alt={doctor.fotoDoctor.alt} className="h-full w-full object-cover"/>
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
          })}
        </CarouselContent>
      </Carousel>


      <Carousel orientation="vertical" className="w-full lg:hidden">
        <CarouselContent className="-mt-1">
          {result?.docs.map((doctor, index)=>{
              return(
                <CarouselItem key={`docM-${index}`} className="pt-1 md:basis-1/4 ">
                <div className="p-1 ">
                  <Card>
                    <CardContent className="flex md:flex-col items-center justify-center gap-2 bg-[#cce7e4] py-2 md:h-full">
                        <div className="w-2/5 md:w-full flex justify-center items-center bg-[#8ccac3] rounded-lg overflow-hidden h-28 max-h-28 md:h-56 md:max-h-56 ">
                          <Image src={doctor.fotoDoctor.url} width={420} height={360} alt={doctor.fotoDoctor.alt} className="h-full w-full object-cover"/>
                        </div>
                        <div className="w-3/5 md:w-full text-sm md:text-lg  flex items-center md:items-start md:mt-6">
                          <ul>
                            <li>Dr/a. {doctor.nombreDoctor}</li>
                            <li>Hora: {doctor.horario.desde} - {doctor.horario.hasta}</li>
                            <li>Horario: {doctor.diasDisponibles}</li>
                            <li>Costo: {doctor.costo}</li>
                            <Link href="/doctor-info" className="font-semibold text-center w-full">Ver mas</Link>
                          </ul>
                        </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              )
            })}
        </CarouselContent>
      </Carousel>


      <MobileNavigation/>

    </div>
  );
}
 
export default Especialidades;
'use client'
import DesktopNavigation from "@/app/(app)/components/desktopNavigation"
import Header from "@/app/(app)/components/header"
import MobileNavigation from "@/app/(app)/components/mobileNavigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/(app)/components/ui/card"
import { Input } from "@/app/(app)/components/ui/input"
import { Clock, DollarSign, MapPin, Search } from "lucide-react"
import Image from 'next/image'
import { useParams } from "next/navigation"

interface Doctor {
  id: number
  nombre: string
  especialidad: string
  horario: string
  ubicacion: string
  precioDeCita: number
  descripcion: string
}

const doctor: Doctor = {
  id: 1,
  nombre: "Dr. Juan Perez",
  especialidad: "Cardiología",
  precioDeCita: 50.00,
  horario: "Lunes a Viernes de 8:00 a 18:00",
  ubicacion: "Calle 123, Ciudad",
  descripcion: `
    Cardiólogo con más de 15 años de experiencia, especializado en prevención 
    y tratamiento de enfermedades del corazón. Formado en la Universidad Nacional, 
    combina tecnología avanzada y un trato personalizado. Sus áreas de enfoque 
    incluyen la hipertensión, colesterol y cuidados postoperatorios. Miembro activo 
    de la Sociedad Nacional de Cardiología, se destaca por su compromiso con la salud preventiva.
  `
}

const DoctorInfo = () => {

  const especialidad = useParams()

  return (
    <div className="flex flex-col p-6 gap-y-4">
      <Header/>
      <DesktopNavigation/>

      <div className="flex flex-col gap-y-6">
        <h1 className="text-2xl sm:text-3xl">
          Especialistas en, <span className="text-[#89ccc5] block sm:inline">{especialidad.slug}</span>
        </h1>

        <div className="relative md:hidden">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>

        {/* Contenido Principal */}
        <div className="md:flex md:flex-row-reverse">

          {/* Presentacion del Doctor */}
          <div className="flex-1 flex justify-center items-center gap-x-6">
            <div>
              <div className="text-xl md:text-3xl">{doctor.nombre}</div>
              <div className="text-lg text-[#3f3c3c] md:text-2xl">{doctor.especialidad}</div>
            </div>
            <Image
              src="/doctor.png"
              alt="Doctor's Picture"
              width={150}  
              height={150} 
              className="w-36 h-auto md:w-64 md:h-auto" 
              sizes="(max-width: 768px) 150px, (min-width: 768px) 256px"
            />
          </div>     

          {/* Descripcion del Doctor */}
          <Card className="flex-1">
            <CardHeader>
              <CardDescription className="text-base text-black flex flex-col gap-y-4">
                <div className="flex gap-x-2">
                  <Clock color="#89ccc5" />
                  <p>{doctor.horario}</p>
                </div>
                <div className="flex gap-x-2">
                  <MapPin color="#89ccc5" />
                  <p>{doctor.ubicacion}</p>
                </div>
                <div className="flex gap-x-2">
                  <DollarSign color="#89ccc5" />
                  <p>{doctor.precioDeCita.toFixed(2)}</p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              {doctor.descripcion}
            </CardContent>
          </Card>
        </div>
      </div>
      <MobileNavigation/>
    </div>
  )
}

export default DoctorInfo
'use client'
import DesktopNavigation from "@/app/(app)/components/desktopNavigation"
import Header from "@/app/(app)/components/header"
import MobileNavigation from "@/app/(app)/components/mobileNavigation"
import { Card, CardContent, CardDescription, CardHeader } from "@/app/(app)/components/ui/card"
import { Input } from "@/app/(app)/components/ui/input"
import { Clock, DollarSign, MapPin, Search } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"


const DoctorInfo = () => {

  const {iddoctor} = useParams()
  const {idpaciente} = useParams()

  const [result, setResult] = useState<InformacionDoctoresType>();
  const [loading, setLoading] =useState(true)
  const [error, setError] =useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`http://localhost:3000/api/doctor?where[id][equals]=${iddoctor}`, {
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
    <div className="flex flex-col gap-y-4 p-4">
      <Header/>
      <DesktopNavigation/>

      <div className="flex flex-col gap-y-6">
        {/* <h1 className="text-2xl sm:text-3xl">
          Especialistas en, <span className="text-[#89ccc5] block sm:inline">{result?.docs[0].especialidad.Nombre}</span>
        </h1> */}

        <div className="relative md:hidden">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>

        {/* Contenido Principal */}
        <div className="md:flex md:flex-row-reverse">
          {result?.docs.map((doctor, index)=>{
              return(
                <React.Fragment key={index}>
                  {/* Presentacion del Doctor */}
                  <div className="flex-1 flex justify-center items-center md:px-6">
                    <div className="w-1/2">
                      <div className="text-xl md:text-3xl">{doctor.nombreDoctor}</div>
                      <div className="text-lg text-[#3f3c3c] md:text-2xl">{doctor.especialidad.Nombre}</div>
                    </div>
                    <div className="w-1/2 max-h-48 md:max-h-72 overflow-hidden rounded-lg">
                      <Image
                      src={doctor.fotoDoctor.url}
                      alt={doctor.fotoDoctor.alt}
                        width={150}  
                        height={150} 
                        className="w-full h-full object-cover " 
                        // sizes="(max-width: 768px) 150px, (min-width: 768px) 256px"
                      />
                    </div>
                  </div>     
  
                  {/* Descripcion del Doctor */}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <Card >
                      <CardHeader>
                        <CardDescription className="text-base text-black flex flex-col gap-y-4">
                          <div className="flex gap-x-2">
                            <Clock color="#89ccc5" />
                            <p>{doctor.diasDisponibles} de {doctor.horario.desde} a {doctor.horario.hasta} </p>
                          </div>
                          <div className="flex gap-x-2">
                            <MapPin color="#89ccc5" />
                            <p>{doctor.ubicacion}</p>
                          </div>
                          <div className="flex gap-x-2">
                            <DollarSign color="#89ccc5" />
                            <p>{doctor.costo}</p>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        {doctor.descripcion}
                      </CardContent>
                    </Card>
                    <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] mx-auto h-12 px-3 mt-2 text-lg font-normal rounded flex justify-center items-center text-white" href={`/doc-info/${idpaciente}/${doctor.id}/agendar`}>Agendar Cita</Link>
                  </div>
                </React.Fragment>
              )
          })}
        </div>
      </div>
      <MobileNavigation/>
    </div>
  )
}

export default DoctorInfo
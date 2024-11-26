'use client'

import DesktopNavigation from "@/app/(app)/components/desktopNavigation";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import FormCita from "@/app/(app)/components/formCita";

const AddCita = () => {

  const { iddoctor } = useParams()

  const [result, setResult] = useState<InformacionDoctoresType>();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
    <div className="flex flex-col gap-y-4 bg-[#89ccc5] md:bg-white ">
      <DesktopNavigation />
      <div className="flex flex-col gap-y-6 md:px-6 mt-12">
        <h1 className="text-2xl sm:text-3xl px-6">
          Agendar <span className="text-white md:text-[#89ccc5] md:block smd:inline">Cita</span>
        </h1>
        <div className="md:flex md:flex-row-reverse">
          {/* Presentacion del Doctor */}
          {result?.docs.map((doctor, index) => {
            return (
              <div key={index} className="md:w-1/2 max-h-48 md:max-h-72 overflow-hidden rounded-lg px-6">
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
                      />
                    </div>
                  </div>
              </div>

            )
          })}
          {/* Descripcion del Doctor */}
          <FormCita infoDoctor={result?.docs[0]}/>
        </div>
      </div>
      <MobileNavigation/>
    </div>
  );
};

export default AddCita;

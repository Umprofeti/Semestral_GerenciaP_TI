"use client";

import { Card, CardContent } from "@/app/(app)/components//ui/card";
import { Button } from "@/app/(app)/components/ui/button";
import { useState } from "react";
import MobileNavigation from "@/app/(app)/components//mobileNavigation";
import DesktopNavigation from "@/app/(app)/components//desktopNavigation";
import Header from "@/app/(app)/components//header";

interface CitaMedica {
  id: number;
  especialidad: string;
  doctor: string;
  fecha: string;
  hora: string;
  estado: "Pendiente" | "Finalizada";
}

const citasFinalizadas: CitaMedica[] = [
  {
    id: 1,
    especialidad: "Gastroenterología",
    doctor: "Dr. Pedro Ramírez",
    fecha: "10 de noviembre de 2024",
    hora: "13:00",
    estado: "Finalizada",
  },
  {
    id: 2,
    especialidad: "Reumatología",
    doctor: "Dra. Elena Torres",
    fecha: "8 de noviembre de 2024",
    hora: "11:30",
    estado: "Finalizada",
  },
];

const initialCitasPendientes: CitaMedica[] = [
  {
    id: 3,
    especialidad: "Cardiología",
    doctor: "Dr. Juan Pérez",
    fecha: "24 de noviembre de 2024",
    hora: "14:30",
    estado: "Pendiente",
  },
  {
    id: 5,
    especialidad: "Neurología",
    doctor: "Dra. Ana López",
    fecha: "2 de diciembre de 2024",
    hora: "09:00",
    estado: "Pendiente",
  },
];

const HistorialDeCitas = () => {
  const [citasPendientes, setCitasPendientes] = useState<CitaMedica[]>(initialCitasPendientes);

  function cancelarCita(id: number) {
    setCitasPendientes((previous) => previous.filter((cita) => cita.id !== id));
  }

  const renderCitas = (citas: CitaMedica[], cancelar: boolean) => {
    return citas.map(({ id, especialidad, doctor, fecha, hora }) => (
      <Card key={id} className="bg-[#f4f7f7] border border-[#b8cccc] text-[#4c4949] mb-4">
        <CardContent className="p-2 flex flex-col gap-1">
          <div className="text-sm">{`${especialidad} - ${doctor}`}</div>
          <div className="text-sm">{`Fecha: ${fecha} - Hora: ${hora}`}</div>
          {cancelar && (
            <div className="flex justify-center mt-2">
              <Button 
                // variant="destructive" 
                onClick={() => cancelarCita(id)} 
                aria-label={`Cancelar cita con ${doctor}`}
                className="bg-[#f0b2ae] w-full"
              >
                Cancelar Cita
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    ));
  };

  return (
    <div>
      <div className="h-[10vh] bg-[#89ccc5] flex justify-center items-center md:hidden">
        <h1 className="text-[#f4f7f7] text-2xl">Historial de Citas</h1>
      </div>
      <div className="bg-[#89ccc5]">

        {/* Contenido */}
        <div className="h-[90vh] bg-[#f4f7f7] rounded-t-3xl p-6 flex flex-col gap-y-4 overflow-auto md:h-auto md:rounded-t-none">
          <Header/>
          <DesktopNavigation />
          <h1 className="text-2xl hidden md:block">Historial de Citas</h1>
          {/* Wrapper */}
          <div className="md:flex md:gap-x-4">
            {/* Sección de citas pendientes */}
            <div className="md:flex-1">
              <h2 className="text-lg mb-2">Pendientes</h2>
              {renderCitas(citasPendientes, true)}
            </div>

            {/* Sección de citas finalizadas */}
            <div className="md:flex-1">
              <h2 className="text-lg mb-2">Finalizadas</h2>
              {renderCitas(citasFinalizadas, false)}
            </div>
          </div>
          
          <MobileNavigation />
        </div>

      </div>
    </div>
  );
};

export default HistorialDeCitas;

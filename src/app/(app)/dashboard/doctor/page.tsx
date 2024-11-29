"use client";

import { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/app/(app)/components/ui/table";
import { 
  Dialog, DialogClose, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, 
  DialogTrigger 
} from "@/app/(app)/components/ui/dialog";
import { Button } from "@/app/(app)/components/ui/button";
import { Paciente } from "@/payload-types";
import BotonCerrarSession from "../../components/botonCerrarSesion";

const CitasDelDia = () => {
  const [doctorData, setDoctorData] = useState<any>(null);
  const [citas, setCitas] = useState<any[]>([]);
  const [expedientes, setExpedientes] = useState<any[]>([]);

  useEffect(() => {
    // Obtener datos del doctor
    const fetchDoctorData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctor/me`, {
        credentials: "include",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setDoctorData(data.user);
    };

    // Obtener citas y expedientes
    const fetchCitasYExpedientes = async () => {
      const responseCitas = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/citas`, {
        credentials: "include",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const citasData = await responseCitas.json();
      const filteredCitas = citasData.docs.filter(
        (cita: any) => cita.Estado === 'pendiente' && cita.Doctor.id === doctorData?.id
      );
      setCitas(filteredCitas);

      const responseExpedientes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expedientes`, {
        credentials: "include",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const expedientesData = await responseExpedientes.json();
      setExpedientes(expedientesData.docs);
    };

    if (!doctorData) {
      fetchDoctorData();
    } else {
      fetchCitasYExpedientes();
    }
  }, [doctorData]);

  const finalizarCita = async (citaId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/citas/${citaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Estado: 'completado',
      }),
    });

    if (response.ok) {
      // Filtrar las citas con estado pendiente
      setCitas((prevCitas) => prevCitas.filter((cita) => cita.id !== citaId));
    } else {
      console.error('Error al finalizar la cita');
    }
  };

  if (!doctorData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="p-4 lg:pl-16 lg:pr-16 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium md:text-3xl">
          Bienvenido,{" "}
          <span className="text-[#89ccc5] block sm:inline">{doctorData?.nombreDoctor}</span>
        </h1>
        <div>
          <BotonCerrarSession/>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium md:text-xl">Citas del día</h2>
        {citas.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-sm md:text-base text-black">Paciente</TableHead>
                <TableHead className="text-sm md:text-base text-black">Hora</TableHead>
                <TableHead className="text-sm md:text-base text-black">Fecha</TableHead>
                <TableHead className="text-right text-sm md:text-base text-black">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {citas.map((cita) => {
                const paciente = cita.Paciente as Paciente;
                const citaHora = new Date(cita.Hora).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                });
                const citaFecha = new Date(cita.Fecha).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                });

                const expediente = expedientes.find(
                  (expediente) => (expediente.paciente as Paciente).id === paciente.id
                );

                return (
                  <TableRow key={cita.id}>
                    <TableCell className="text-black text-xs sm:text-base">
                      {paciente.nombre} {paciente.apellido}
                    </TableCell>
                    <TableCell className="text-black text-xs sm:text-base">{citaHora}</TableCell>
                    <TableCell className="text-black text-xs sm:text-base">{citaFecha}</TableCell>
                    <TableCell className="text-right text-xs sm:text-base">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="bg-[#89ccc5] text-xs px-3 py-1 rounded mb-2 hover:bg-[#89ccc5]/85 md:text-sm md:mb-0"
                            variant="outline"
                          >
                            Ver expediente
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-black">Expediente</DialogTitle>
                            <DialogDescription>
                              Expediente médico y datos personales del paciente.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-4">
                              <div>
                                <h2 className="text-black font-medium">Información Básica</h2>
                                <p>Nombre: {paciente.nombre}</p>
                                <p>Sexo: {paciente.genero}</p>
                                <p>Edad: {paciente.edad}</p>
                                <p>Teléfono: {paciente.telefono}</p>
                              </div>

                              <div>
                                <h2 className="text-black font-medium">Información Médica</h2>
                                <p>Tipo de Sangre: {expediente?.tiposangre}</p>
                                <p>Alergias: {expediente?.alergia || 'Ninguna'}</p>
                                <p>Condiciones: {expediente?.condiciones || 'Ninguna'}</p>
                                <p>Medicamentos: {expediente?.medicamentos || 'Ninguno'}</p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button className="bg-[#89ccc5] hover:bg-[#89ccc5]/85" type="button" variant="secondary">
                                Cerrar
                              </Button>
                            </DialogClose>      
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        className="bg-[#f2b0b0] text-xs px-3 py-1 rounded hover:bg-[#f2b0b0]/85 md:text-sm md:ml-4"
                        variant="outline"
                        onClick={() => finalizarCita(cita.id)}
                      >
                        Finalizar cita
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500 text-sm">No hay citas programadas para hoy.</p>
        )}
      </div>
    </div>
  );
};

export default CitasDelDia;
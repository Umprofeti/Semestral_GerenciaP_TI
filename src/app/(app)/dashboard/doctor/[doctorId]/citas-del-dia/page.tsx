import { getPayload } from "payload";
import configPromise from '@payload-config';
import Header from "@/app/(app)/components/header";
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/app/(app)/components/ui/table";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, 
  DialogTrigger 
} from "@/app/(app)//components/ui/dialog";
import { Button } from "@/app/(app)/components/ui/button";
import { Paciente } from "@/payload-types";

const CitasDelDia = async ({ params }: { params: { doctorId: string }}) => {
  // Obtener `doctorId`
  const { doctorId } = await params;
  console.log(`doctorId: ${doctorId}`);

  const payload = await getPayload({ config: configPromise });

  // Obtener datos del doctor por su `doctorId`
  const dataDoctores = await payload.find({
    collection: "doctor",
  });
  const doctores = dataDoctores.docs;
  const doctor = doctores.find((doc) => doc.id === doctorId);
  console.log(doctor);

  // Obtener citas relacionadas al `doctorId`
  const citasData = await payload.find({
    collection: "citas",
    where: {
      Doctor: {
        equals: doctorId,
      },
    },
    depth: 2,
  });
  const citas = citasData.docs;
  console.log(citas);

  return (
    <div className="p-4 lg:pl-16 lg:pr-16 flex flex-col gap-4">
      <h1 className="text-lg sm:text-2xl">
        Bienvenido,{" "}
        <span className="text-[#89ccc5] block sm:inline">{doctor?.nombreDoctor}</span>
      </h1>
      <div>
        <h2 className="m-3 text-md sm:text-xl md:text-2xl">Citas del Día</h2>
        {citas.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-sm sm:text-base">Paciente</TableHead>
                <TableHead className="text-sm sm:text-base">Hora</TableHead>
                <TableHead className="text-sm sm:text-base">Fecha</TableHead>
                <TableHead className="text-right text-sm sm:text-base">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {citas.map((cita) => {
                const paciente = cita.Paciente as Paciente
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

                return (
                  <TableRow key={cita.id}>
                    <TableCell className="font-medium text-xs sm:text-base">
                      {paciente.nombre} {paciente.apellido}
                    </TableCell>
                    <TableCell className="text-xs sm:text-base">
                      {citaHora}
                    </TableCell>
                    <TableCell className="text-xs sm:text-base">
                      {citaFecha}
                    </TableCell>
                    <TableCell className="text-right text-xs sm:text-base">
                      
                      {/* Expediente Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="bg-[#89ccc5] text-white text-xs sm:text-sm px-3 py-1 rounded"
                            variant="outline"
                          >
                            Expediente
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Expediente</DialogTitle>
                            <DialogDescription>
                              Expediente medico y datos personales del paciente.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-4">
                              <p>Nombre: {paciente.nombre}</p>
                              <p>Sexo: {paciente.genero}</p>
                              <p>Edad: {paciente.edad}</p>
                              <p>Telefono: {paciente.telefono}</p>
                              <p>Telefono de emergencia: 7777</p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
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

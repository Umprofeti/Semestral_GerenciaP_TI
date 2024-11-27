import { getPayload } from "payload";
import configPromise from '@payload-config';
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/app/(app)/components/ui/table";
import { 
  Dialog, DialogClose, DialogContent, DialogDescription, 
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

   // Obtener todos los expedientes
  const expedientes = await payload.find({
    collection: 'expedientes',
  });

  return (
    <div className="p-4 lg:pl-16 lg:pr-16 flex flex-col gap-4">
      <h1 className="text-xl font-medium md:text-3xl">
        Bienvenido,{" "}
        <span className="text-[#89ccc5] block sm:inline">{doctor?.nombreDoctor}</span>
      </h1>
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
                
                const expediente = expedientes.docs.find(
                  (expediente) => (expediente.paciente as Paciente).id === paciente.id
                );

                console.log(expediente)

                return (
                  <TableRow key={cita.id}>
                    <TableCell className="text-black text-xs sm:text-base">
                      {paciente.nombre} {paciente.apellido}
                    </TableCell>
                    <TableCell className="text-black text-xs sm:text-base">
                      {citaHora}
                    </TableCell>
                    <TableCell className="text-black text-xs sm:text-base">
                      {citaFecha}
                    </TableCell>
                    <TableCell className="text-right text-xs sm:text-base">
                      
                      {/* Expediente Dialog */}
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
                              Expediente medico y datos personales del paciente.
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
                        >
                          Finalizar cita
                      </Button>
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

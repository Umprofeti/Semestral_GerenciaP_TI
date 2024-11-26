import { getPayload } from "payload";
import configPromise from '@payload-config';
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/app/(app)/components/ui/table";
import Header from "@/app/(app)/components/header";

// Sample data
const citas = [
  {
    id: "PAC001",
    nombrePaciente: "Juan Pérez",
    horaCita: "10:00 AM",
    motivo: "Chequeo general",
  },
  {
    id: "PAC002",
    nombrePaciente: "María López",
    horaCita: "11:30 AM",
    motivo: "Dolor de cabeza persistente",
  },
  {
    id: "PAC003",
    nombrePaciente: "Carlos Fernández",
    horaCita: "01:00 PM",
    motivo: "Examen preoperatorio",
  },
  {
    id: "PAC004",
    nombrePaciente: "Ana González",
    horaCita: "02:45 PM",
    motivo: "Consulta de seguimiento",
  },
  {
    id: "PAC005",
    nombrePaciente: "Luis Martínez",
    horaCita: "04:15 PM",
    motivo: "Evaluación de laboratorio",
  },
];

const CitasDelDia = async ({ params }: { params: { doctorId: string }}) => {
  // obtener el id del doctor
  const { doctorId } = await params
  console.log(`doctorId: ${doctorId}`)

  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: "doctor",
    where: {
      "Doctor/a destacada?": {
        equals: true,
      },
    },
  });

  // arreglo de doctores
  const doctores = data.docs;
  console.log(doctores);

  // Encontrar al doctor por su id
  const doctor = doctores.find((doc) => doc.id === doctorId);
  console.log(doctor);

  return (
    <div className="p-4 lg:pl-16 lg:pr-16 flex flex-col gap-4">
      <Header />
      <h1 className="text-lg sm:text-2xl">
        Bienvenido,{" "}
        <span className="text-[#89ccc5] block sm:inline">Nombre Apellido</span>
      </h1>
      <div>
        <h2 className="m-3 text-md sm:text-xl md:text-2xl">Citas del Día</h2>
        {citas.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-sm sm:text-base">Paciente</TableHead>
                <TableHead className="text-sm sm:text-base">Hora</TableHead>
                <TableHead className="text-sm sm:text-base">Motivo</TableHead>
                <TableHead className="text-right text-sm sm:text-base">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell className="font-medium text-xs sm:text-base">{cita.nombrePaciente}</TableCell>
                  <TableCell className="text-xs sm:text-base">{cita.horaCita}</TableCell>
                  <TableCell className="text-xs sm:text-base">{cita.motivo}</TableCell>
                  <TableCell className="text-right text-sx sm:text-base">
                    <button className="bg-[#89ccc5] text-white text-xs sm:text-sm px-3 py-1 rounded">
                      Expediente
                    </button>
                  </TableCell>
                </TableRow>
              ))}
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

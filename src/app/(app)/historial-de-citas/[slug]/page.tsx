import { Card, CardContent } from "@/app/(app)/components//ui/card";
import MobileNavigation from "@/app/(app)/components//mobileNavigation";
import DesktopNavigation from "@/app/(app)/components//desktopNavigation";
import Header from "@/app/(app)/components//header";
import { getPayload } from "payload";
import configPromise from '@payload-config';
import BotonCancelarCita from "../../components/botonCancelaCita";

const HistorialDeCitas = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  // Obtener datos de los citas desde Payload
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: "citas",
    where: {
      Paciente: {
        equals: slug,
      },
    },
  });

  console.log(data);

  return (
    <div>
      <div className="h-[10vh] bg-[#89ccc5] flex justify-center items-center md:hidden">
        <h1 className="text-[#f4f7f7] text-2xl">Historial de Citas</h1>
      </div>
      <div className="bg-[#89ccc5]">
        {/* Contenido */}
        <div className="h-[90vh] bg-[#f4f7f7] rounded-t-3xl p-6 flex flex-col gap-y-4 overflow-auto md:h-auto md:rounded-t-none">
          <Header />
          <DesktopNavigation />
          <h1 className="text-2xl hidden md:block">Historial de Citas</h1>
          {/* Wrapper */}
          <div className="md:flex md:gap-x-4">
            {/* Sección de citas pendientes */}
            <div className="md:flex-1">
              <h2 className="text-lg mb-2">Próximas</h2>

              {data.docs.map((cita, index) => {
                if (!cita.Completado) {
                  return (
                    <Card
                      key={index}
                      className="bg-[#f4f7f7] border border-[#b8cccc] text-[#4c4949] mb-4"
                    >
                      <CardContent className="p-2 flex flex-col gap-1">
                        <div className="text-sm">
                          {cita.Doctor.especialidad.Nombre}, doctor/a: {cita.Doctor.nombreDoctor}
                        </div>
                        <div className="text-sm">
                          Fecha: {new Date(cita.Fecha).toLocaleDateString('es-ES')}, Hora: {cita.Hora}
                        </div>
                        <div className="flex justify-center mt-2">
                          <BotonCancelarCita idCita={cita.id}/>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
                return null; // Retorna null si no se cumple la condición.
              })}


            </div>

            {/* Sección de citas finalizadas */}
            <div className="md:flex-1">
              <h2 className="text-lg mb-2">Finalizadas</h2>
              {data.docs.map((cita, index) => {
                if (cita.Completado) {
                  return (
                    <Card
                      key={index}
                      className="bg-[#f4f7f7] border border-[#b8cccc] text-[#4c4949] mb-4"
                    >
                      <CardContent className="p-2 flex flex-col gap-1">
                        <div className="text-sm">
                          {cita.Doctor.especialidad.Nombre}, doctor/a: {cita.Doctor.nombreDoctor}
                        </div>
                        <div className="text-sm">
                          Fecha: {new Date(cita.Fecha).toLocaleDateString('es-ES')}, Hora: {cita.Hora}
                        </div>

                      </CardContent>
                    </Card>
                  );
                }
                return null; // Retorna null si no se cumple la condición.
              })}
            </div>
          </div>

          <MobileNavigation />
        </div>
      </div>
    </div>
  );
};

export default HistorialDeCitas;
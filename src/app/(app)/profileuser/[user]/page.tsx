import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import Image from "next/image";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";
import { getPayload } from "payload";
import configPromise from '@payload-config'
import { PencilLine } from "lucide-react";
import InfoPaciente from "../../components/infoPaciente";
import InfoFotoPaciente from "../../components/infoFotoPaciente";

const ProfUser = async () => {

    const payload = await getPayload({ config: configPromise })

    const data = await payload.find({
        collection: 'pacientes',
        where: {
            'id': {
                equals: '674275b2304b0c977fbe1b48'
            }
        }
    })

    const dataExpediente = await payload.find({
        collection: 'expedientes',
        where: {
            'paciente': {
                equals: '674275b2304b0c977fbe1b48' // ID del paciente
            }
        }
    });

    return (
        <div className="w-full h-screen flex flex-col">
            <DesktopNavigation />
            <div className="md:h-3/5 grid grid-cols-2 bg-[#89ccc5] md:bg-white">
                <h2 className="text-center md:text-left pt-12 pb-36 md:pb-0 px-20 text-2xl text-white md:text-black font-semibold col-span-2">{data.docs[0].nombre} {data.docs[0].apellido}</h2>
                <div className="md:grid grid-cols-2 col-end-3 gap-4 -ml-24 hidden">
                    <div className="mx-2">
                        <div className="md:bg-[#89ccc5] shadow-md py-2 px-2 text-center rounded-lg text-white text-lg">Información del paciente</div>
                        <ul className="px-4 py-3">
                            <li>Nombre:{data.docs[0].nombre} {data.docs[0].apellido}</li>
                            <li>Cedula de Paciente: {data.docs[0].identidadPersonal}</li>
                            <li>Fecha de nacimiento: {new Date(data.docs[0].fechaNacimiento).toLocaleDateString('es-ES')}</li>
                            <li>Edad: 39 años</li>
                            <li>Teléfono: {data.docs[0].telefono}</li>
                            <li>Correo Electrónico: {data.docs[0].email}</li>
                            <li>Dirección: {data.docs[0].direccion}</li>
                        </ul>
                    </div>
                    <InfoPaciente />
                </div>
            </div>
            <div className="w-full flex-grow bg-white md:bg-[#89ccc5] rounded-t-3xl relative">
                <div className="relative">
                    <div className="absolute flex bg-white justify-center w-48 md:w-64 h-48 md:h-64 overflow-hidden -top-28 md:-top-36 left-1/2 md:left-20 transform -translate-x-1/2 md:-translate-x-0 border-white md:border-[#89ccc5] border-8 rounded-full z-10">
                        <InfoFotoPaciente foto={data.docs[0].fotoPaciente.url} />
                    </div>
                </div>
                <div className="h-14 w-ful md:hidden"></div>
                <div className="md:hidden mx-6 my-8">
                    <div className="mx-2">
                        <div className="bg-[#89ccc5] shadow-md py-2 px-2 text-center rounded-lg text-white text-lg">Información del paciente</div>
                        <ul className="px-4 py-3 space-y-2">
                            <li>Nombre:{data.docs[0].nombre} {data.docs[0].apellido}</li>
                            <li>Cedula de Paciente: {data.docs[0].identidadPersonal}</li>
                            <li>Fecha de nacimiento: {data.docs[0].fechaNacimiento}</li>
                            <li>Edad: 39 años</li>
                            <li>Teléfono: {data.docs[0].telefono}</li>
                            <li>Correo Electrónico: {data.docs[0].email}</li>
                            <li>Dirección: {data.docs[0].direccion}</li>
                        </ul>
                    </div>
                    <InfoPaciente />
                </div>
            </div>
            <MobileNavigation />
        </div>
    );
}

export default ProfUser;
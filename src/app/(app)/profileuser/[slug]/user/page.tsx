'use client'
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";

import InfoPaciente from "../../../components/infoPaciente";
import InfoFotoPaciente from "../../../components/infoFotoPaciente";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserCircle } from "lucide-react";


const ProfUser = () => {

    const { slug } = useParams<{ slug: string }>()
    const [result, setResult] = useState<PacienteInformacion>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {

            try {
                const req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pacientes?where[id][equals]=${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!req.ok) {
                    console.log('Error al iniciar sesion')
                    return
                }

                const res = await req.json()
                setResult(res)
                setLoading(false)
            } catch (err: any) {
                setError(err)
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col">
            <DesktopNavigation />
            <div className="md:h-3/5 grid grid-cols-2 bg-[#89ccc5] md:bg-white">
                <h2 className="text-center md:text-left pt-12 pb-36 md:pb-0 px-20 text-2xl text-white md:text-black font-semibold col-span-2">{result?.docs[0].nombre} {result?.docs[0].apellido}</h2>
                <div className="md:grid grid-cols-2 col-end-3 gap-4 -ml-24 hidden">
                    <div className="mx-2">
                        <div className="md:bg-[#89ccc5] shadow-md py-2 px-2 text-center rounded-lg text-white text-lg">Información del paciente</div>
                        <ul className="px-4 py-3">
                            <li>Nombre:{result?.docs[0].nombre} {result?.docs[0].apellido}</li>
                            <li>Cedula de Paciente: {result?.docs[0].identidadPersonal}</li>
                            <li>Fecha de nacimiento: {new Date(result?.docs[0].fechaNacimiento || '2024-11-25T01:45:39.153Z').toLocaleDateString('es-ES')}</li>
                            <li>Edad: 39 años</li>
                            <li>Teléfono: {result?.docs[0].telefono}</li>
                            <li>Correo Electrónico: {result?.docs[0].email}</li>
                            <li>Dirección: {result?.docs[0].direccion}</li>
                        </ul>
                    </div>
                        <InfoPaciente infomacionExpe={slug} />
                    
                </div>
            </div>
            <div className="w-full flex-grow bg-white md:bg-[#89ccc5] rounded-t-3xl relative">
                <div className="relative">
                    <div className="absolute flex bg-white justify-center w-48 md:w-64 h-48 md:h-64 overflow-hidden -top-28 md:-top-36 left-1/2 md:left-20 transform -translate-x-1/2 md:-translate-x-0 border-white md:border-[#89ccc5] border-8 rounded-full z-10">
                        {!loading &&
                            result?.docs[0].fotoPaciente ?
                            <InfoFotoPaciente foto={result?.docs[0].fotoPaciente.url} defaultIcon={false}/>
                            :
                            <InfoFotoPaciente foto={<UserCircle/>} defaultIcon={true} />
                        }
                    </div>
                </div>
                <div className="h-14 w-ful md:hidden"></div>
                <div className="md:hidden mx-6 my-8">
                    <div className="mx-2">
                        <div className="bg-[#89ccc5] shadow-md py-2 px-2 text-center rounded-lg text-white text-lg">Información del paciente</div>
                        <ul className="px-4 py-3 space-y-2">
                            <li>Nombre:{result?.docs[0].nombre} {result?.docs[0].apellido}</li>
                            <li>Cedula de Paciente: {result?.docs[0].identidadPersonal}</li>
                            <li>Fecha de nacimiento: {new Date(result?.docs[0].fechaNacimiento || '2024-11-25T01:45:39.153Z').toLocaleDateString('es-ES')}</li>
                            <li>Edad: 39 años</li>
                            <li>Teléfono: {result?.docs[0].telefono}</li>
                            <li>Correo Electrónico: {result?.docs[0].email}</li>
                            <li>Dirección: {result?.docs[0].direccion}</li>
                        </ul>
                    </div>
                        <InfoPaciente infomacionExpe={slug} />
                    
                </div>
            </div>
            <MobileNavigation />
        </div>
    );
}

export default ProfUser;
'use client'
import { Button } from "@/app/(app)/components/ui/button";
import Image from "next/image";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import Link from "next/link";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";

const ProfileUser = () => {
    const router = useRouter()
    const { slug } = useParams()
    const [result, setResult] = useState<PacienteInformacion>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const handleLogout = async () => {
        const response = await fetch('/api/pacientes/logout', {
            method: 'POST',
        });

        if (response.ok) {
            router.push('/login');
        } else {
            console.error('Error logging out');
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await fetch(`http://localhost:3000/api/pacientes?where[id][equals]=${slug}`, {
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
                console.log(res)
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
        <div className="w-full h-screen flex flex-col ">
            <DesktopNavigation />
            <div className="md:h-3/5 grid grid-cols-2 bg-[#89ccc5] md:bg-white">
                <h2 className="text-center md:text-left pt-14 pb-36 md:pb-0 px-20 text-2xl text-white font-semibold col-span-2"><span className="text-white md:text-black">Bienvenido/a,</span> <span className="text-white md:text-[#89ccc5]"> {result?.docs[0].nombre} {result?.docs[0].apellido}</span></h2>
                <div className="col-end-3 hidden md:block">
                    <div className="grid grid-cols-2 gap-y-4 ">
                        <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={`/profileuser/${result?.docs[0].id}/user`}>Información del Paciente</Link>
                        <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={`/historial-de-citas/${slug}`}>Historial de Citas</Link>
                        <Button className="bg-[#f0b2ae] w-5/6 mx-auto h-12 text-lg font-normal" onClick={() => { handleLogout() }}>Cerrar sesión</Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex-grow bg-white md:bg-[#89ccc5] rounded-t-3xl relative">
                <MobileNavigation />
                <div className="relative">
                    <div className="absolute flex bg-white justify-center w-48 md:w-64 h-48 md:h-64 overflow-hidden -top-28 md:-top-36 left-1/2 md:left-20 transform -translate-x-1/2 md:-translate-x-0 border-white md:border-[#89ccc5] border-8 rounded-full z-10">
                        {!loading && result &&
                            result?.docs[0].fotoPaciente && result?.docs[0].fotoPaciente ?

                            <Image
                                src={result?.docs[0]?.fotoPaciente?.url}
                                width={100}
                                height={100}
                                alt={result?.docs[0].fotoPaciente.alt}
                                className="object-cover w-full"
                            />
                            :
                            <UserCircle className="w-full h-full object-cover" />
                        }
                    </div>
                </div>
                <div className="h-14 w-ful md:hidden">

                </div>
                <div className="flex md:hidden flex-col space-y-4 pt-8">
                    <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={`/profileuser/${result?.docs[0].id}/user`}>Información del Paciente</Link>
                    <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={`/historial-de-citas/${slug}`}>Historial de Citas</Link>
                    <Button className="bg-[#f0b2ae] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" onClick={() => { handleLogout() }}>Cerrar sesion</Button>
                </div>
            </div>
            <MobileNavigation />
        </div>
    );
}

export default ProfileUser;
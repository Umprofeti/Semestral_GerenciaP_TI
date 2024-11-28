'use client'
import BusquedaDoctor from "./busquedaDoctor";
import Link from "next/link";
import { useEffect, useState } from "react";

const DesktopNavigation = () => {
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
  
    useEffect(() => {
        const fetchData = async () => {
  
            try {
                const req = await fetch(`http://localhost:3000/api/pacientes/me`, {
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

    if(result){console.log('resultado cargados',result)}

    return (
        <div>
            <div className="relative bg-[#89ccc5] p-2 rounded-lg items-center justify-between hidden md:flex">
                <BusquedaDoctor />
                {/* Navigation Links */}
                <div className="flex gap-6 ml-4 w-full justify-end">
                    <Link href={`/dashboard/user/${!loading && result && result.user.id}`} className="text-white hover:underline text-lg flex-grow text-center">
                        Inicio
                    </Link>
                    <Link href={`/historial-de-citas/${!loading && result && result.user.id}`} className="text-white hover:underline text-lg flex-grow text-center">
                        Historial de citas
                    </Link>
                    <Link href={`/profileuser/${!loading && result && result.user.id}`} className="text-white hover:underline text-lg flex-grow text-center">
                        Perfil
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default DesktopNavigation;
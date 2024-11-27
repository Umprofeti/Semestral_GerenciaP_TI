'use client'
import { Folder, House, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MobileNavigation = () => {

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
                setResult({
                  id:res.user.id,
                  fotoPaciente:res.user.fotoPaciente.url,
                  altFoto: res.user.fotoPaciente.alt
                })
                setLoading(false)
            } catch (err: any) {
                setError(err)
                setLoading(false)
            }
        };
  
        fetchData();
    }, []);

  return (
    <div className="bg-[#89ccc5] fixed bottom-5 left-1/2 transform -translate-x-1/2 w-2/3 flex items-center justify-between rounded-lg px-4 py-2 md:hidden z-10">
      <Link href={`/profileuser/${!loading && result && result.id}`}><UserRound size={32} className="text-white" /></Link>
      <Link href={`/dashboard/user/${!loading && result && result.id}`}><House size={32} className="text-white" /></Link>
      <Link href={`/historial-de-citas/${!loading && result && result.id}`}><Folder size={32} className="text-white" /></Link>
    </div>
  );
}

export default MobileNavigation;
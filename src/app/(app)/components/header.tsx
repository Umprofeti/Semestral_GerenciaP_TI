'use client'
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const req = await fetch(`http://localhost:3000/api/pacientes/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!req.ok) {
            console.log('Error al iniciar sesion');
            return;
          }
  
          const res = await req.json();
          console.log(res)
          setResult({
            id: res.user.id,
            fotoPaciente: res.user.fotoPaciente.url,
            altFoto: res.user.fotoPaciente.alt,
          });
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <header className="flex items-center justify-between mb-4">
        {/* Asegúrate de que el enlace solo se renderice si result.id está disponible */}
        <Link href={result && result.id ? `/dashboard/user/${result.id}` : '#'}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </Link>
  
        {/* Renderiza el avatar solo si result está disponible y no se está cargando */}
        {!loading && result ? (
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={result.fotoPaciente}
              alt={result.altFoto || 'Foto de perfil'}
              className="object-cover rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full">
            {/* Placeholder mientras carga */}
            Cargando...
          </div>
        )}
      </header>
    );
  };
  
  export default Header;
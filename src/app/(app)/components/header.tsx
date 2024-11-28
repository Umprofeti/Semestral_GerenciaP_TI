'use client'
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserIcon } from "lucide-react";

const Header = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pacientes/me`, {
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
          setResult({
            id: res.user.id,
            fotoPaciente: res.user.fotoPaciente.url,
            altFoto: res.user.fotoPaciente.alt,
          });
          setLoading(false);
        } catch (err:any) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <header className="flex items-center justify-between mb-4">
        <Link href={result && result.id ? `/dashboard/user/${result.id}` : '#'}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </Link>
  
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
          <UserIcon className={`w-20 h-20 ${loading&&'animate-pulse'}`}/>
        )}
      </header>
    );
  };
  
  export default Header;
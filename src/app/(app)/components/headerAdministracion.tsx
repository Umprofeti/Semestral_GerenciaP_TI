'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

type UserAdmin ={
    user:{
        nombre:string
    }
}

const HeaderAdministracion = () => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        const now = new Date();
        setCurrentTime(now);

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Actualiza cada minuto

        return () => clearInterval(interval);
    }, []);

    const [result, setResult] = useState<UserAdmin>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await fetch(`http://localhost:3000/api/administracion/me`, {
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
                setResult(res);
                setLoading(false);
            } catch (err:any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex w-full">
            <div className="w-1/6">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={64}
                    height={64}
                    className="object-contain m-2 "
                />
            </div>
            <div className="w-4/6 flex flex-col justify-center items-center md:items-start text-2xl md:text-3xl">
                <h2>Bienvenido</h2>
                <h2 className="text-[#89ccc5]">{!loading && result ? result.user.nombre:' '}</h2>
            </div>
            <div className="w-1/6 text-sm md:text-3xl flex flex-col justify-center text-right">
                <div className="">
                    {currentTime ? currentTime.toLocaleTimeString() : ""}
                </div>
                <div>
                    {currentTime ? currentTime.toLocaleDateString() : ""}
                </div>
            </div>
        </div>
    );
};

export default HeaderAdministracion;

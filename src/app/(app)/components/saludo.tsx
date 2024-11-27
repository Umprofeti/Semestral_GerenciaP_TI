'use client'

import { useEffect, useState } from "react";

const Saludo = () => {

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
                setResult(res);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <h1 className="text-2xl sm:text-3xl">
            Bienvenido, <span className="text-[#89ccc5] block sm:inline">{!loading&&result&&result.user.nombre} {!loading&&result&&result.user.apellido}</span>
        </h1>
    );
}

export default Saludo;
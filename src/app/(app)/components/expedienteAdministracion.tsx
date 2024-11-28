'use client'

import { useEffect, useState } from "react";

const ExpedienteAdministracion = ({ idPaciente,visibleButton }) => {
    console.log(idPaciente)
    const [result, setResult] = useState<InfoExpediente>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await fetch(`http://localhost:3000/api/expedientes?where[paciente][equals]=${idPaciente}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await req.json();
                setResult(data)
                setLoading(false)
            } catch (err: any) {
                setError(err)
                setLoading(false)
            }
        };

        fetchData();
    }, []);


    return (
        <ul className={`py-2 ${visibleButton?'block':'hidden'}`}>
            <div className="flex">
                <p className="w-1/2">Tipo sangre: </p>
                <p className="w-1/2">{!loading && result&&result.docs[0].tiposangre}</p>
            </div>
            <div className="flex">
                <p className="w-1/2">Alergias: </p>
                <p className="w-1/2">{!loading && result&&result.docs[0].alergia}</p>

            </div>
            <div className="flex">
                <p className="w-1/2">Condiciones: </p>
                <p className="w-1/2">{!loading && result&&result.docs[0].condiciones}</p>

            </div>
            <div className="flex">
                <p className="w-1/2">Medicamentos: </p>
                <p className="w-1/2">{!loading && result&&result.docs[0].medicamentos}</p>
            </div>
        </ul>
    );
}

export default ExpedienteAdministracion;
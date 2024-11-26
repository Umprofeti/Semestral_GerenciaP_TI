'use client'
import { Button } from "@/app/(app)/components/ui/button";
import { SetStateAction, useEffect, useState } from "react";
import ExpedienteAdministracion from "./expedienteAdministracion";


type InfoCitas = {
    docs: {
        Doctor: {
            costo: number,
            descripcion: string,
            diasDisponibles: string,
            nombreDoctor: string,
            id: string
        },
        Estado: string,
        Hora: string,
        Fecha: string,
        id: string,
        Paciente: {
            nombre: string,
            apellido: string,
            id: string,
            expediente: string
        }
    }[];
}

const CarouselCitasProgramadas = () => {

    const [result, setResult] = useState<InfoCitas>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expedienteVisible, setExpedienteVisible] = useState<number | null>(null);

    const toggleExpediente = (index: number) => {
        setExpedienteVisible(expedienteVisible === index ? null : index); // Muestra u oculta el expediente correspondiente
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await fetch(`http://localhost:3000/api/citas`, {
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
        <div className="w-full text-sm">
            {!loading && result?.docs.map((cita, index) => {
                return (
                    <div key={`cita-${index}`} className="relative px-2 md:px-4 bg-white rounded-lg mx-2 md:mx-4 my-2 shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="md:w-2/6 py-4">
                                <ul>
                                    <li>Nombre: {`${cita.Paciente.nombre} ${cita.Paciente.apellido}`} </li>
                                    <li>Hora: {!loading && result && new Date(cita.Hora).toLocaleTimeString('es-PA')}</li>
                                    <li>Fecha: {!loading && result && new Date(cita.Fecha).toLocaleDateString('es-ES')}</li>
                                </ul>
                            </div>
                            <div className="md:w-2/6 py-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6">
                                <p className={`${result?.docs[0].Estado === 'pendiente' ? 'bg-[#f0e3a2]' : 'bg-[#f2b0b0]'} py-3 px-8 rounded-lg text-black shadow-sm`}>
                                    {!loading && result ? cita.Estado : 'Consultando...'}
                                </p>
                                <Button
                                    className="bg-[#89ccc5] shadow-sm px-8 py-2"
                                    onClick={() => toggleExpediente(index)}
                                >
                                    Expediente
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-2/6">
                            {!loading && result && (
                                <ExpedienteAdministracion
                                    idExpediente={cita.Paciente.expediente}
                                    visibleButton={expedienteVisible === index} // Muestra el expediente solo si coincide con el índice actual
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default CarouselCitasProgramadas;
'use client'
import { LoaderCircle, PencilLine } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";


interface InfoPacienteProps {
    infomacionExpe: string;
  }
  
  const InfoPaciente: React.FC<InfoPacienteProps> = ({ infomacionExpe }) => {
    
    const [result, setResult] = useState<InfoExpediente>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState({
        tipoSangre: "---",
        alergia: "---",
        condiciones: "---",
        medicamentos: "---",
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await fetch(`http://localhost:3000/api/expedientes?where[paciente][equals]=${infomacionExpe}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await req.json();
                setResult(data)
                setLoading(false)
            } catch (err:any) {
                setError(err)
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (result) {
            setFormData({
                tipoSangre: result.docs[0]?.tiposangre || "---",
                alergia: result.docs[0]?.alergia || "---",
                condiciones: result.docs[0]?.condiciones || "---",
                medicamentos: result.docs[0]?.medicamentos || "---",
            });
        }
    }, [result]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const responseEnvio = await fetch(
                `http://localhost:3000/api/expedientes?where[paciente][equals]=${infomacionExpe}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(formData), 
                }
            );

            if (!responseEnvio.ok) {
                // Si la respuesta no es exitosa
                throw new Error(`Error ${responseEnvio.status}: ${responseEnvio.statusText}`);
            }

            const updatedData = await responseEnvio.json();
            console.log('Expediente actualizado:', updatedData);
            setIsEditing(false)
            return updatedData; 
        } catch (error) {
            console.error('Error al actualizar el expediente:', error);
            throw error; 
        }

    };

    return (
        <div className="mx-2 pb-12">
            <div className="bg-[#89ccc5] text-sm shadow-md pb py-2 px-2 text-center rounded-lg text-white md:text-lg flex justify-center items-center"><LoaderCircle className={`${loading ? 'animate-spin w-1/6' : 'hidden'}`} /><div className="w-4/6">Datos Médicos Principales</div><PencilLine onClick={() => { setIsEditing(!isEditing) }} className="w-1/6" /></div>
            {loading ?
                <ul className="py-3 mx-5 flex flex-col space-y-1">
                    <li>Tipo de Sangre: --</li>
                    <li>Alergias: ---</li>
                    <li>Condiciones ---</li>
                    <li>Medicamentos Actuales: ---</li>
                </ul>
                :
                <div className="mx-5">
                    <form className=" py-3 flex flex-col space-y-1 " onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                            <label htmlFor="sangre" className="w-1/2">Tipo sangre:</label>
                            <input type="text" id="sangre"
                                required
                                disabled={!isEditing}
                                name="tipoSangre"
                                // placeholder={formData.tipoSangre}
                                value={formData.tipoSangre}
                                onChange={handleChange}
                                className={`w-1/2 appearance-none border-none bg-transparent mx-1 px-1 text-base text-black placeholder-black ${isEditing ? 'outline outline-1 rounded text-zinc-700 placeholder-zinc-700  ' : 'focus:outline-none'} focus:ring-0`}
                            />
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="alergia" className="w-1/2">Alergias:</label>
                            <input type="text" id="alergia"
                                required
                                disabled={!isEditing}
                                name="alergia"
                                value={formData.alergia}
                                placeholder={formData.alergia}
                                onChange={handleChange}
                                className={`w-1/2 appearance-none border-none bg-transparent mx-1 px-1 text-base text-black placeholder-black ${isEditing ? 'outline outline-1 rounded text-zinc-700 placeholder-zinc-700  ' : 'focus:outline-none'} focus:ring-0`}
                            />
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="condiciones" className="w-1/2">Condiciones:</label>
                            <input type="text" id="condiciones"
                                required
                                disabled={!isEditing}
                                name="condiciones"
                                value={formData.condiciones}
                                placeholder={formData.tipoSangre}
                                onChange={handleChange}
                                className={`w-1/2 appearance-none border-none bg-transparent mx-1 px-1 text-base text-black placeholder-black ${isEditing ? 'outline outline-1 rounded text-zinc-700 placeholder-zinc-700  ' : 'focus:outline-none'} focus:ring-0`}
                            />
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="medicamentos" className="w-1/2">Medicamentos actuales:</label>
                            <input type="text" id="medicamentos"
                                required
                                disabled={!isEditing}
                                name="medicamentos"
                                placeholder={formData.medicamentos}
                                value={formData.medicamentos}
                                onChange={handleChange}
                                className={`w-1/2 h-auto appearance-none border-none bg-transparent mx-1 px-1 text-base text-black placeholder-black ${isEditing ? 'outline outline-1 rounded text-zinc-700 placeholder-zinc-700  ' : 'focus:outline-none'} focus:ring-0`}
                            />
                        </div>
                        <div className="flex justify-center gap-2">
                            <Button className={`${!isEditing && 'hidden'} bg-red-500`} onClick={(e) => { e.preventDefault(); setIsEditing(!isEditing) }}>Cancelar</Button>
                            <Button type="submit" className={`${!isEditing && 'hidden'} bg-[#76afa9]`}>Guardar</Button>
                        </div>
                    </form>
                </div>
            }

        </div>
    );
}

export default InfoPaciente;
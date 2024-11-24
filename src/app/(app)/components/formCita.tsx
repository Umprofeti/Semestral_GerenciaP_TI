"use client";

import { useEffect, useState } from "react";
import { Input } from "@/app/(app)/components/ui/input";
import { Button } from "@/app/(app)/components/ui/button";
import { Label } from "@/app/(app)/components/ui/label";
import { LoaderIcon } from "lucide-react";

export default function FormCita({ infoDoctor }) {

    const [subiendoInfo, setSubiendoInfo]=useState(false)

    const [form, setForm] = useState({
        Completado: false,
        Doctor:  "",
        Paciente: "674275b2304b0c977fbe1b48",
        Hora: "",
        Fecha: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
        try {
            setSubiendoInfo(true)
            const responseEnvio = await fetch(
                `http://localhost:3000/api/citas`,
                {
                    method: 'POST', // Método HTTP
                    headers: {
                        'Content-Type': 'application/json', // Tipo de contenido
                        // Si necesitas autenticación, agrega aquí tu token:
                        // 'Authorization': `Bearer ${yourToken}`
                    },
                    body: JSON.stringify(form), // Convierte el objeto a JSON
                }
            );

            if (!responseEnvio.ok) {
                // Si la respuesta no es exitosa
                throw new Error(`Error ${responseEnvio.status}: ${responseEnvio.statusText}`);
            }

            const updatedData = await responseEnvio.json(); // Convierte la respuesta a JSON
            console.log('Expediente actualizado:', updatedData);

            setSubiendoInfo(false)
            return updatedData; // Devuelve los datos actualizados

        } catch (error) {
            console.error('Error al actualizar el expediente:', error);
            setSubiendoInfo(false)
            throw error; // Re-lanza el error para manejarlo donde se use este método

        }
    };

    // Update formData when result is updated
    useEffect(() => {
        console.log('Actualizado')
        setForm({
            Completado: false,
            Doctor: infoDoctor?.id || "",
            Paciente: "674275b2304b0c977fbe1b48",
            Hora: "",
            Fecha: ""
        });

    }, [infoDoctor]);


    return (
        <div className="relative w-full md:w-1/2  flex-1 flex flex-col items-center">
            <form
                className="w-full flex flex-col gap-y-6 max-w-md bg-white p-6 rounded-md "
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <Label htmlFor="nombre" className="block text-sm font-medium mb-2">
                        Nombre del paciente
                    </Label>
                    <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Ingresa el nombre"
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="fecha" className="block text-sm font-medium mb-2">
                        Fecha
                    </Label>
                    <Input
                        id="Fecha"
                        name="Fecha"
                        type="date"
                        value={form.Fecha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="hora" className="block text-sm font-medium mb-2">
                        Hora
                    </Label>
                    <Input
                        id="Hora"
                        name="Hora"
                        type="time"
                        value={form.Hora}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit" className={`w-full  ${subiendoInfo?'bg-[#6f9b96]':'bg-[#89ccc5]'}`} disabled={subiendoInfo?true:false}>
                    {subiendoInfo?'Subiendo':'Guardar'} {subiendoInfo&&<LoaderIcon className="animate-spin"/>}
                </Button>
            </form>
        </div>
    );
}

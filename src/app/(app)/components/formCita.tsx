"use client";
import { useEffect, useState } from "react";
import { Input } from "@/app/(app)/components/ui/input";
import { Button } from "@/app/(app)/components/ui/button";
import { Label } from "@/app/(app)/components/ui/label";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function FormCita() {
    const { idpaciente } = useParams();
    const { iddoctor } = useParams();
    const [result, setResult] = useState<PacienteInformacion>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [subiendoInfo, setSubiendoInfo] = useState(false);

    const [form, setForm] = useState({
        Completado: false,
        Doctor: iddoctor || "",
        Paciente: idpaciente || "",
        Hora: new Date().toISOString(),
        Fecha: new Date().toISOString().split("T")[0],
        Estado: "pendiente"
    });

    const [horaTemporal, setHoraTemporal] = useState<string>('00:00:00')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(value)
        if (name === "Hora") {
            //Se establece hora temporal que sera para el input
            setHoraTemporal(value)

            const [hours, minutes, seconds] = value.split(':');
            const year = 2024;
            const month = 11;
            const day = 27;
            const horas = parseInt(hours, 10);
            const minutos = parseInt(minutes, 10);
            const segundos = parseInt(seconds, 10);
            const date = new Date(Date.UTC(year, month - 1, day, horas, minutos, segundos));
            const isoString = date.toISOString();
            setForm((prev) => ({
                ...prev,
                [name]: isoString,
            }));

        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value || "",
            }));
        }
    };

    const verificarFecha = (fechaVerificar: string) => {
        const [dia, mes, anio] = fechaVerificar.split('-').map(num => parseInt(num, 10));
        const fechaHoy = new Date();
        const fechaVerificarObj = new Date(dia, mes - 1, anio);
        return fechaVerificarObj > fechaHoy;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (verificarFecha(form.Fecha)) {
            try {
                setSubiendoInfo(true);
                console.log(form)
                const responseEnvio = await fetch(`http://localhost:3000/api/citas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                });

                if (!responseEnvio.ok) {
                    throw new Error(`Error ${responseEnvio.status}: ${responseEnvio.statusText}`);
                }

                const updatedData = await responseEnvio.json();

                setSubiendoInfo(false);
                return updatedData;
            } catch (error) {
                console.error("Error al guardar la cita:", error);
                setSubiendoInfo(false);
                throw error;
            }
        } else {
            alert('Fecha no permitida')
        }
    };





    useEffect(() => {
        const fetchData = async () => {

            try {
                const req = await fetch(`http://localhost:3000/api/pacientes?where[id][equals]=${idpaciente}`, {
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


    return (
        <div className="relative w-full md:w-1/2 flex-1 flex flex-col items-center">
            <form
                className="w-full flex flex-col gap-y-6 max-w-md bg-white p-6 rounded-md"
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
                        placeholder={`${!loading && result?.docs[0].nombre} ${!loading && result?.docs[0].apellido}`}
                        disabled
                        className={`border-none font-semibold disabled:opacity-100 mx-1 px-1 text-base text-black placeholder-black placeholder:text-black `}
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
                        value={horaTemporal} // Valor predeterminado
                        onChange={handleChange}
                        required
                        step="2"
                    />
                </div>
                <Button
                    type="submit"
                    className={`w-full ${subiendoInfo ? "bg-[#6f9b96]" : "bg-[#89ccc5]"}`}
                    disabled={subiendoInfo}
                >
                    {subiendoInfo ? "Subiendo" : "Guardar"} {subiendoInfo && <LoaderIcon className="animate-spin" />}
                </Button>
            </form>
        </div>
    );
}
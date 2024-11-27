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
        Hora: "12:00", 
        Fecha: new Date().toISOString().split("T")[0], 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        if (name === "Fecha") {
            setForm((prev) => ({
                ...prev,
                [name]: value || new Date().toISOString().split("T")[0], 
            }));
        } else if (name === "Hora") {
            if (form.Fecha) {
                const [hours, minutes] = value.split(":");
                const fechaISO = new Date(form.Fecha);
                fechaISO.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    
                setForm((prev) => ({
                    ...prev,
                    Hora: fechaISO.toISOString(),
                }));
            }
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value || "",
            }));
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSubiendoInfo(true);
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
    };

    useEffect(() => {
        setForm({
            Completado: false,
            Doctor: iddoctor || "",
            Paciente: idpaciente || "",
            Hora: "12:00",
            Fecha: new Date().toISOString().split("T")[0],
        });
    }, [iddoctor, idpaciente]);
    



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
                        value={form.Hora?.split("T")[1]?.substring(0, 5) || "12:00"} // Valor predeterminado
                        onChange={handleChange}
                        required
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
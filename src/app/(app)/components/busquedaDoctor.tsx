'use client'
import { useState, useRef, useEffect } from 'react';
import { LoaderCircle, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { useParams } from 'next/navigation';

const BusquedaDoctor = () => {

    const { idpaciente } = useParams();


    const [busquedaInfo, setBusquedaInfo] = useState({
        nombreDoctor: ''
    })
    const [result, setResult] = useState<InformacionDoctoresType>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [busquedaCard, setBusquedaCard] = useState(false)
    
    const ref = useRef<HTMLDivElement>(null);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setBusquedaInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (busquedaInfo.nombreDoctor === '') {
            console.log('Vacio')
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setBusquedaCard(true)
        setLoading(true)
        try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctor?where[nombreDoctor][equals]=${busquedaInfo.nombreDoctor}`, {
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
            console.log(res)
            setResult(res)
            setLoading(false)
        } catch (err: any) {
            setError(err)
            setLoading(false)
        }
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setBusquedaCard(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div ref={ref} className="z-10 relative md:w-3/4 text-sm">
            <form onSubmit={handleSubmit} className="flex">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search"
                    name='nombreDoctor'
                    required
                    value={busquedaInfo.nombreDoctor}
                    onChange={handleChange}
                    className="pl-10 w-full text-lg" />
                <Button type="submit">Enviar</Button>
            </form>
            <div className={`absolute top-12 w-full bg-[#89ccc5]  ${busquedaCard ? 'block' : 'hidden'}`}>

                {!loading ?
                    result?.docs.map((doctor, index) => {
                        return (
                            <Card key={`busqueda-dcotor-${index}`} className=" m-2">
                                <CardContent className="p-0 md:p-2 flex md:max-h-32 items-center">
                                    <div className="w-[30%] aspect-square max-h-32  overflow-hidden">
                                        <Image src={doctor.fotoDoctor.url} width={420} height={360} alt={doctor.fotoDoctor.alt} className="object-cover h-full w-full p-1 rounded-3xl" />
                                    </div>
                                    <div className="w-[50%] md:w-full flex items-center md:items-start ">
                                        <ul className="md:pl-2 w-full flex flex-col gap-2 md:gap-1">
                                            <div className="md:flex">
                                                <li className="w-2/5 font-semibold">Dr/a:</li>
                                                <li className="w-3/5">{doctor.nombreDoctor}</li>
                                            </div>
                                            <div className="md:flex">
                                                <li className="w-2/5 font-semibold">Especialidad:</li>
                                                <li className="w-3/5">{doctor.especialidad.Nombre} </li>
                                            </div>
                                            <div className="md:flex">
                                                <li className="w-2/5 font-semibold">Horario:</li>
                                                <li className="w-3/5">{doctor.diasDisponibles}</li>
                                            </div>
                                            <div className="md:flex">
                                                <li className="w-2/5 font-semibold">Hora:</li>
                                                <li className="w-3/5">{doctor.horario.desde} a {doctor.horario.hasta}</li>
                                            </div>
                                        </ul>
                                    </div>
                                    <Link href={`/doc-info/${idpaciente}/${doctor.id}`} className="w-[20%] font-semibold md:w-2/6 text-end pr-2">Ver mas</Link>
                                </CardContent>
                            </Card>
                        )
                    })
                    :
                    <Card className="m-2">
                        <CardContent className="p-2 flex max-h-32 items-center">
                            <div className="w-2/5">
                                <LoaderCircle className="animate-spin ml-6" size={42} />
                            </div>
                            <div className="w-2/5 md:w-full flex items-center md:items-start ">
                                <ul className="w-full">
                                    <div className="flex">
                                        <li className="w-1/4 font-semibold">Dr/a:</li>
                                        <li className="w-3/4 animate-pulse">Cargando...</li>
                                    </div>
                                    <div className="flex">
                                        <li className="w-1/4 font-semibold">Horario:</li>
                                        <li className="w-3/4 animate-pulse">Cargando...</li>
                                    </div>
                                    <div className="flex">
                                        <li className="w-1/4 font-semibold">Hora:</li>
                                        <li className="w-3/4 animate-pulse">Cargando...</li>
                                    </div>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>}

            </div>
        </div>
    );
}

export default BusquedaDoctor;
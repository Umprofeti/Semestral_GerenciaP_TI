'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Ban } from "lucide-react";

const BotonCancelarCita = ({ idCita }: { idCita: string }) => {

    const [botonCancelado, setBotonCancelado] = useState(false)

    const cancelarCita = async (id: string) => {
        try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/citas?where[id][equals]=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    Estado: "cancelado"

                })

            });

            if (!req.ok) {
                console.log('Error al cancelar cita');
                return;
            }
            setBotonCancelado(true)
            console.log('Se ha eliminado');
        } catch (err) {
            console.log('Error:', err);
        }
    };

    return (
        <Button
            // variant="destructive"
            onClick={() => cancelarCita(idCita)}
            aria-label={`Cancelar cita con ID: ${idCita}`}
            className={`${!botonCancelado ? 'bg-[#f0b2ae]' : 'bg-[#000000]'} w-full `}
            disabled={botonCancelado}
        >
            {botonCancelado ? 'Cita Cancelada' : 'Cancelar Cita'} {botonCancelado && <Ban />}
        </Button>
    );
};

export default BotonCancelarCita;

'use client'
import { useState } from "react";
import { Button } from "./ui/button";

const BotonCancelarCita = ({ idCita }: { idCita: string }) => {

    const [botonCancelado, setBotonCancelado]=useState(false)

    const cancelarCita = async (id: string) => {
        try {
            const req = await fetch(`http://localhost:3000/api/citas?where[id][equals]=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
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
            className={`bg-[#f0b2ae] w-full '}`}
            disabled={botonCancelado}
        >
            {botonCancelado?'Cita Cancelada':'Cancelar Cita'}
        </Button>
    );
};

export default BotonCancelarCita;

'use client'

import BusquedaDoctor from "./busquedaDoctor";

const DesktopNavigation = () => {
    // http://localhost:3000/api/doctor?where[nombreDoctor][equals]=Carlos Gómez

    //Borrar
    const idusuario = '674275b2304b0c977fbe1b48test'





    return (
        <div className="relative bg-[#89ccc5] p-2 rounded-lg items-center justify-between hidden md:flex">
            
            <BusquedaDoctor/>
            {/* Navigation Links */}
            <div className="flex gap-6 ml-4 w-full justify-end">
                <a href={`/dashboard/user/${idusuario}`} className="text-white hover:underline text-lg flex-grow text-center">
                    Inicio
                </a>
                <a href="/historial-de-citas" className="text-white hover:underline text-lg flex-grow text-center">
                    Historial de citas
                </a>
                <a href="/profileuser" className="text-white hover:underline text-lg flex-grow text-center">
                    Perfil
                </a>
            </div>
        </div>
    );
}

export default DesktopNavigation;
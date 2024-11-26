'use client'

import BusquedaDoctor from "./busquedaDoctor";
import { useUserConext } from "../context/userContext";
import Link from "next/link";

const DesktopNavigation = () => {
    const { state, updateState } = useUserConext();
    return (
        <div>
            <div className="relative bg-[#89ccc5] p-2 rounded-lg items-center justify-between hidden md:flex">
                <BusquedaDoctor />
                {/* Navigation Links */}
                <div className="flex gap-6 ml-4 w-full justify-end">
                    <Link href={`/dashboard/user/${state.id}`} className="text-white hover:underline text-lg flex-grow text-center">
                        Inicio
                    </Link>
                    <Link href="/historial-de-citas" className="text-white hover:underline text-lg flex-grow text-center">
                        Historial de citas
                    </Link>
                    <Link href={`/profileuser/${state.id}`} className="text-white hover:underline text-lg flex-grow text-center">
                        Perfil
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default DesktopNavigation;
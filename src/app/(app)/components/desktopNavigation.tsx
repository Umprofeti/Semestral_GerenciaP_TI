import { Search } from "lucide-react";
import { Input } from "./ui/input";

const DesktopNavigation = () => {
    return ( 
        <div className="bg-[#89ccc5] p-2 rounded-lg items-center justify-between hidden md:flex">
            {/* Search bar */}
            <div className="relative w-3/4"> {/* Aumenta la proporción del ancho */}
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search" className="pl-10 w-full text-lg" /> {/* Más espacio para el texto */}
            </div>
    
            {/* Navigation Links */}
            <div className="flex gap-6 ml-4 w-full justify-end">
            <a href="/" className="text-white hover:underline text-lg flex-grow text-center">
                Inicio
            </a>
            <a href="/profileuser" className="text-white hover:underline text-lg flex-grow text-center">
                Perfil
            </a>
            <a href="#" className="text-white hover:underline text-lg flex-grow text-center">
                Amigos
            </a>
            </div>
        </div>
     );
}
 
export default DesktopNavigation;
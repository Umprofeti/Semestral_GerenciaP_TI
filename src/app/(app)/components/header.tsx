import { Avatar } from "@radix-ui/react-avatar";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
    return ( 
    <header className="flex items-center justify-between mb-4">
        <Image
            src="/logo.svg"
            alt="Logo"
            width={64}
            height={64}
            className="object-contain"
        />
        
        {/* Icono AlignJustify solo visible en dispositivos móviles */}
        <AlignJustify size={30} className="md:hidden"/>
  
         {/* Imagen de perfil solo visible en dispositivos de escritorio */}
         <Avatar className="w-20 h-20 hidden md:block"> {/* Set size with Tailwind classes */}
          <AvatarImage src="/profile.jpg" alt="@shadcn" className="object-cover rounded-full" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
     );
}
 
export default Header;
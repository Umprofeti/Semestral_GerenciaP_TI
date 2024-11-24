import { Avatar } from "@radix-ui/react-avatar";
import { AlignJustify, CircleUser } from "lucide-react";
import Image from "next/image";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
    return ( 
    <header className="flex items-center justify-between mb-4">
        <Link href={'/'}>
          <Image
              src="/logo.svg"
              alt="Logo"
              width={64}
              height={64}
              className="object-contain"
          />
        </Link>
        {/* Icono AlignJustify solo visible en dispositivos móviles */}
        <CircleUser size={70} color="#fff" className="md:hidden bg-[#b6e6e1] rounded-full" />
  
         {/* Imagen de perfil solo visible en dispositivos de escritorio */}
         <Avatar className="w-20 h-20 hidden md:block"> {/* Set size with Tailwind classes */}
          <AvatarImage src="/profile.jpg" alt="@shadcn" className="object-cover rounded-full" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
     );
}
 
export default Header;
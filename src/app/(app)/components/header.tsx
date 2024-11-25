import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {

  //Borrar
  const idusuario = '674275b2304b0c977fbe1b48test'

    return ( 
    <header className="flex items-center justify-between mb-4">
        <Link href={`/dashboard/user/${idusuario}`}>
          <Image
              src="/logo.svg"
              alt="Logo"
              width={64}
              height={64}
              className="object-contain"
          />
        </Link>
        {/* Icono AlignJustify solo visible en dispositivos móviles */}
        {/* <CircleUser size={70} color="#fff" className="md:hidden bg-[#b6e6e1] rounded-full" /> */}
  
         {/* Imagen de perfil solo visible en dispositivos de escritorio */}
         <Avatar className="w-20 h-20"> {/* Set size with Tailwind classes */}
          <AvatarImage src="/profile.jpg" alt="@shadcn" className="object-cover rounded-full" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
     );
}
 
export default Header;
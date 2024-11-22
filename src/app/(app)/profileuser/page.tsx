import { Button } from "@/app/(app)/components/ui/button";
import Image from "next/image";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import Link from "next/link";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";

const ProfileUser = () => {
    return ( 
        <div className="w-full h-screen flex flex-col ">
            <DesktopNavigation/>
            <div className="md:h-3/5 grid grid-cols-2 bg-[#89ccc5] md:bg-white">
                <h2 className="text-center md:text-left pt-14 pb-36 md:pb-0 px-20 text-2xl text-white font-semibold col-span-2"><span className="text-white md:text-black">Bienvenido,</span> <span className="text-white md:text-[#89ccc5]"> Nombre Apellido</span></h2>
                <div className="col-end-3 hidden md:block">
                    <div className="grid grid-cols-2 gap-y-4 ">
                        <Link className="bg-[#89ccc5] w-5/6 mx-auto h-12 text-lg font-normal rounded text-center items-center" href={'/profileuser/user'}>Información del Paciente</Link>
                        <Button className="bg-[#89ccc5] w-5/6 mx-auto h-12 text-lg font-normal">Familiares</Button>
                        <Button className="bg-[#89ccc5] w-5/6 mx-auto h-12 text-lg font-normal">Historial de Citas</Button>
                        <Button className="bg-[#f0b2ae] w-5/6 mx-auto h-12 text-lg font-normal">Cerrar sesión</Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex-grow bg-white md:bg-[#89ccc5] rounded-t-3xl relative">
            <MobileNavigation/>
            <div className="relative">
                <Image
                    src="/doctor.png"
                    width={200}
                    height={200}
                    alt="Perfil persona"
                    className="absolute -top-28 md:-top-36 left-1/2 md:left-20 transform -translate-x-1/2 md:-translate-x-0 border-white md:border-[#89ccc5] border-8 rounded-full z-10 object-cover w-icon-sm h-icon-sm md:w-icon-lg md:h-icon-lg"
                />
            </div>

                <div className="h-14 w-ful md:hidden">
                    
                </div>
                <div className="flex md:hidden flex-col space-y-4 pt-8"> 
                    <Link className="bg-[#89ccc5] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={'/profileuser/user'}>Información del Paciente</Link>                 
                    <Link className="bg-[#89ccc5] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={'/profileuser/user'}>Historial de Citas</Link>   
                    <Link className="bg-[#f0b2ae] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={'/profileuser/user'}>Cerrar sesion</Link>   
                </div>
            </div>
            <MobileNavigation />
        </div>
     );
}
 
export default ProfileUser;
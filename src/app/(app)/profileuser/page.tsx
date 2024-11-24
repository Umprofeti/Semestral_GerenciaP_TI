import { Button } from "@/app/(app)/components/ui/button";
import Image from "next/image";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import Link from "next/link";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";
import { getPayload } from "payload";
import configPromise from '@payload-config'

const ProfileUser =async () => {

    const payload = await getPayload({config: configPromise})
    const data = await payload.find({
      collection:'pacientes',
      where:{
        'id':{
            equals: '674275b2304b0c977fbe1b48'
        }
      }
    })

    return ( 
        <div className="w-full h-screen flex flex-col ">
            <DesktopNavigation/>
            <div className="md:h-3/5 grid grid-cols-2 bg-[#89ccc5] md:bg-white">
                <h2 className="text-center md:text-left pt-14 pb-36 md:pb-0 px-20 text-2xl text-white font-semibold col-span-2"><span className="text-white md:text-black">Bienvenido/a,</span> <span className="text-white md:text-[#89ccc5]"> {data.docs[0].nombre} {data.docs[0].apellido}</span></h2>
                <div className="col-end-3 hidden md:block">
                    <div className="grid grid-cols-2 gap-y-4 ">
                        <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={`/profileuser/${data.docs[0].id}`}>Información del Paciente</Link>                 
                        <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={'/historial-de-citas'}>Historial de Citas</Link>   
                        <Button className="bg-[#f0b2ae] w-5/6 mx-auto h-12 text-lg font-normal">Cerrar sesión</Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex-grow bg-white md:bg-[#89ccc5] rounded-t-3xl relative">
            <MobileNavigation/>
                <div className="relative">
                    <div className="absolute flex bg-white justify-center w-48 md:w-64 h-48 md:h-64 overflow-hidden -top-28 md:-top-36 left-1/2 md:left-20 transform -translate-x-1/2 md:-translate-x-0 border-white md:border-[#89ccc5] border-8 rounded-full z-10">
                        <Image
                            src={data.docs[0].fotoPaciente.url}
                            width={100}
                            height={100}
                            alt="Perfil persona"
                            className="object-cover w-full"
                        />
                    </div>
                </div>
                <div className="h-14 w-ful md:hidden">
                    
                </div>
                <div className="flex md:hidden flex-col space-y-4 pt-8"> 
                    <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={`/profileuser/${data.docs[0].id}`}>Información del Paciente</Link>                 
                    <Link className="bg-[#89ccc5] hover:bg-[#70a8a3] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={'/profileuser/user'}>Historial de Citas</Link>   
                    <Link className="bg-[#f0b2ae] w-5/6 mx-auto h-12 text-lg font-normal rounded flex justify-center items-center text-white" href={'/profileuser/user'}>Cerrar sesion</Link>   
                </div>
            </div>
            <MobileNavigation />
        </div>
     );
}
 
export default ProfileUser;
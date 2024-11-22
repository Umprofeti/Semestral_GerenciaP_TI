import DesktopNavigation from "@/app/(app)/components/desktopNavigation";
import Header from "@/app/(app)/components/header";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import { Input } from "@/app/(app)/components/ui/input";
import { BriefcaseBusiness, CircleDollarSign, MapPin, Search } from "lucide-react";
import Link from "next/link";


const InfoDoctors = () => {
    return (
        <div className="mx-4 my-4">
            <Header />
            <DesktopNavigation />
            <h2 className="text-2xl py-6">Especialista en <br /> ***Nombre**</h2>
            <div className="relative md:hidden  ">
                <Input placeholder="Search" className="pl-8" />
                <Search className="absolute right-8 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="md:flex md:flex-row-reverse">
                <div className="grid grid-cols-2 md:w-1/2">
                    <div className="flex flex-col items-center justify-center">
                        <h2>Doctor XXXXX</h2>
                        <p>Cardiologia</p>
                    </div>
                    <div className="flex justify-end relative">
                        <img src="/doctor.png" alt="hola" className="max-h-44 md:h-96" />
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="py-2  px-4 rounded-lg flex flex-col gap-4 bg-[#9adfd7] ">
                        <div className="flex gap-2 font-semibold">
                            <BriefcaseBusiness />
                            <p>Fecha semana, horas semanas</p>
                        </div>
                        <div className="flex  gap-4 justify-between font-semibold">
                            <div className="flex gap-2"><MapPin /> Lugar consultorio</div>
                            <div className="flex gap-2 jus"><CircleDollarSign /> 50.00$</div>
                        </div>
                        <p className="text-justify font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quidem quas ducimus cumque animi quo alias, quaerat, sapiente dolor magnam nisi? Autem reprehenderit inventore, velit voluptate minima temporibus consectetur nostrum.</p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center py-4">
                        <Link className="rounded-2xl text-lg w-3/4 text-white bg-[#90d6d0] hover:bg-[#74b1ac] py-4 shadow-md flex justify-center items-center" href={'/infodoctors/addcita'}>Agendar Cita</Link>
                    </div>
                </div>
            </div>



            <MobileNavigation />
        </div>
    );
}

export default InfoDoctors;
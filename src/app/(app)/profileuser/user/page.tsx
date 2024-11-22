import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import Image from "next/image";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";

const ProfUser = () => {
    return ( 
        <div className="w-full h-screen flex flex-col">
            <DesktopNavigation/>
            <div className="md:h-3/5 grid grid-cols-2 bg-[#89ccc5] md:bg-white">
                <h2 className="text-center md:text-left pt-12 pb-36 md:pb-0 px-20 text-2xl text-white md:text-black font-semibold col-span-2">Nombre Apellido</h2>
                <div className="md:grid grid-cols-2 col-end-3 gap-4 -ml-24 hidden">
                    <div className="mx-2">
                        <div className="md:bg-[#89ccc5] shadow-md py-2 px-2 text-center rounded-lg text-white text-lg">Información del paciente</div>
                        <ul className="px-4 py-3">
                            <li>Nombre: Ana Martínez</li>
                            <li>ID de Paciente: 234567</li>
                            <li>Fecha de nacimiento: 15 de abril de 1985</li>
                            <li>Edad: 39 años</li>
                            <li>Teléfono: +123 456 789</li>
                            <li>Correo Electrónico: ana.martinez@email.com</li>
                            <li>Dirección: Calle 123, Ciudad, País</li>
                        </ul>
                    </div>
                    <div className="mx-2">
                        <div className="md:bg-[#89ccc5] shadow-md pb py-2 px-2 text-center rounded-lg text-white text-lg">Datos Médicos Principales</div>
                        <ul className="px-4 py-3">
                            <li>Tipo de Sangre: O+</li>
                            <li>Alergias: Penicilina, mariscos</li>
                            <li>Condiciones Crónicas: Hipertensión, asma</li>
                            <li>Medicamentos Actuales: Losartán, Salbutamol</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full flex-grow bg-white md:bg-[#89ccc5] rounded-t-3xl relative">
                <div className="relative">
                    <Image
                        src="/persona.jpg"
                        width={200} // Puedes ajustar este tamaño según lo necesites
                        height={200}
                        alt="Perfil persona"
                        className="absolute -top-28 md:-top-36 left-1/2 md:left-20 transform -translate-x-1/2 md:-translate-x-0 border-white md:border-[#89ccc5] border-8 rounded-full z-10 object-cover w-icon-sm h-icon-sm md:w-icon-lg md:h-icon-lg"
                    />
                </div>
                <div className="h-14 w-ful md:hidden"></div>
                <div className="md:hidden mx-6 my-8">
                    <div className="mx-2">
                        <div className="bg-[#89ccc5] shadow-md py-2 px-2 text-center rounded-lg text-white text-lg">Información del paciente</div>
                        <ul className="px-4 py-3 space-y-2">
                            <li>Nombre: Ana Martínez</li>
                            <li>ID de Paciente: 234567</li>
                            <li>Fecha de nacimiento: 15 de abril de 1985</li>
                            <li>Edad: 39 años</li>
                            <li>Teléfono: +123 456 789</li>
                            <li>Correo Electrónico: ana.martinez@email.com</li>
                            <li>Dirección: Calle 123, Ciudad, País</li>
                        </ul>
                    </div>
                    <div className="mx-2">
                        <div className="bg-[#89ccc5] shadow-md pb py-2 px-2 text-center rounded-lg text-white text-lg">Datos Médicos Principales</div>
                        <ul className="px-4 py-3 space-y-2">
                            <li>Tipo de Sangre: O+</li>
                            <li>Alergias: Penicilina, mariscos</li>
                            <li>Condiciones Crónicas: Hipertensión, asma</li>
                            <li>Medicamentos Actuales: Losartán, Salbutamol</li>
                        </ul>
                    </div>
                </div>
            </div>
            <MobileNavigation />
        </div>
     );
}
 
export default ProfUser;
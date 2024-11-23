import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import Image from "next/image";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";
import { getPayload } from "payload";
import configPromise from '@payload-config'

const ProfUser =async () => {

    const payload = await getPayload({config: configPromise})

    const data = await payload.find({
      collection:'pacientes',
      where:{
        'id':{
            equals: '674227772315e3750a24ee4a'
        }
      }
    })

    const dataExpediente = await payload.find({
        collection: 'expedientes',
        where: {
            'paciente': {
                equals: '674227772315e3750a24ee4a' // ID del paciente
            }
        }
    });
    console.log(dataExpediente)

    return ( 
        <div className="w-full h-screen flex flex-col">
            <DesktopNavigation/>
            <div className="md:h-3/5 grid grid-cols-2 bg-[#89ccc5] md:bg-white">
                <h2 className="text-center md:text-left pt-12 pb-36 md:pb-0 px-20 text-2xl text-white md:text-black font-semibold col-span-2">{data.docs[0].nombre} {data.docs[0].apellido}</h2>
                <div className="md:grid grid-cols-2 col-end-3 gap-4 -ml-24 hidden">
                    <div className="mx-2">
                        <div className="md:bg-[#89ccc5] shadow-md py-2 px-2 text-center rounded-lg text-white text-lg">Información del paciente</div>
                        <ul className="px-4 py-3">
                            <li>Nombre:{data.docs[0].nombre} {data.docs[0].apellido}</li>
                            <li>Cedula de Paciente: {data.docs[0].identidadPersonal}</li>
                            <li>Fecha de nacimiento: {data.docs[0].fechaNacimiento}</li>
                            <li>Edad: 39 años</li>
                            <li>Teléfono: {data.docs[0].telefono}</li>
                            <li>Correo Electrónico: {data.docs[0].correo}</li>
                            <li>Dirección: {data.docs[0].direccion}</li>
                        </ul>
                    </div>
                    <div className="mx-2">
                        <div className="md:bg-[#89ccc5] shadow-md pb py-2 px-2 text-center rounded-lg text-white text-lg">Datos Médicos Principales</div>
                        <ul className="px-4 py-3">
                            <li>Tipo de Sangre: {dataExpediente.docs[0]["tipo sangre"]}</li>
                            <li>Alergias: {dataExpediente.docs[0].alergia}</li>
                            <li>Condiciones {dataExpediente.docs[0].condiciones}</li>
                            <li>Medicamentos Actuales: {dataExpediente.docs[0].medicamentos}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full flex-grow bg-white md:bg-[#89ccc5] rounded-t-3xl relative">
                <div className="relative">
                    <div className="absolute flex bg-white justify-center w-48 md:w-64 h-48 md:h-64 overflow-hidden -top-28 md:-top-36 left-1/2 md:left-20 transform -translate-x-1/2 md:-translate-x-0 border-white md:border-[#89ccc5] border-8 rounded-full z-10">
                        <Image
                            src={data.docs[0].fotoPaciente.url}
                            width={200}
                            height={200}
                            alt="Perfil persona"
                            className="object-cover w-full"
                        />
                    </div>
                </div>
                <div className="h-14 w-ful md:hidden"></div>
                <div className="md:hidden mx-6 my-8">
                    <div className="mx-2">
                        <div className="bg-[#89ccc5] shadow-md py-2 px-2 text-center rounded-lg text-white text-lg">Información del paciente</div>
                        <ul className="px-4 py-3 space-y-2">
                            <li>Nombre:asds</li>
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
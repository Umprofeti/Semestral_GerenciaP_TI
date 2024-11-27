import CarouselCitasProgramadas from "@/app/(app)/components/carouselCitasProgramadas";
import HeaderAdministracion from "@/app/(app)/components/headerAdministracion";





const Administracion = () => {


    return (
        <div className="p-4 w-full  ">
            <HeaderAdministracion />
            <h1 className="my-8 text-2xl">Citas programadas</h1>
            <CarouselCitasProgramadas />
        </div>
    );
}

export default Administracion;
import { Search } from "lucide-react";
import Header from "@/app/(app)/components/header";
import { Input } from "@/app/(app)/components/ui/input";
import Image from "next/image";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import { Carousel, CarouselContent, CarouselItem } from "@/app/(app)/components/ui/carousel";
import { Card, CardContent } from "@/app/(app)/components/ui/card";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";

const Especialidades = () => {
  return ( 
    <div className="m-6">
      <Header />
      <DesktopNavigation/>
      <h1 className="text-2xl sm:text-3xl my-4">
          Especialistas en, <span className="text-[#89ccc5] block sm:inline">Cardiologia</span>
      </h1>
      <div className="relative md:hidden">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
      </div>
      <Carousel orientation="horizontal" className="w-full hidden lg:block">
        <CarouselContent className="-mt-1">
          <CarouselItem className="pt-1 md:basis-1/4 ">
            <div className="p-1 ">
              <Card>
                <CardContent className="flex md:flex-col items-center justify-center gap-2 bg-[#cce7e4] py-2 md:h-full">
                    <div className="w-2/5 md:w-full flex justify-center items-center bg-[#8ccac3] rounded-lg overflow-hidden h-28 max-h-28 md:h-56 md:max-h-56 ">
                      <Image src={'/doctor.png'} width={100} height={100} alt={'ss'} className="w-full "/>
                    </div>
                    <div className="w-3/5 md:w-full text-sm md:text-lg  flex items-center md:items-start md:mt-6">
                      <ul>
                        <li>Dr. XXXX</li>
                        <li>Hora: </li>
                        <li>Horario: </li>
                        <li>Costo: 100.00$</li>
                        <li >Ver mas</li>
                      </ul>
                    </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          
          
        </CarouselContent>
      </Carousel>
      <Carousel orientation="vertical" className="w-full lg:hidden">
        <CarouselContent className="-mt-1">
          <CarouselItem className="pt-1 md:basis-1/4 ">
            <div className="p-1 ">
              <Card>
                <CardContent className="flex md:flex-col items-center justify-center gap-2 bg-[#cce7e4] py-2 md:h-full">
                    <div className="w-2/5 md:w-full flex justify-center items-center bg-[#8ccac3] rounded-lg overflow-hidden h-28 max-h-28 md:h-56 md:max-h-56 ">
                      <Image src={'/doctor.png'} width={100} height={100} alt={'ss'} className="max-w-28 "/>
                    </div>
                    <div className="w-3/5 md:w-full text-sm md:text-lg  flex items-center md:items-start md:mt-6">
                      <ul>
                        <li>Dr. XXXX</li>
                        <li>Hora: </li>
                        <li>Horario: </li>
                        <li>Costo: 100.00$</li>
                        <li >Ver mas</li>
                      </ul>
                    </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          
          
        </CarouselContent>
      </Carousel>
      <MobileNavigation/>

    </div>
  );
}
 
export default Especialidades;
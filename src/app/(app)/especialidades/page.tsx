import { Card, CardContent } from "@/app/(app)/components/ui/card";
import Image from "next/image";
import React from "react";
import doctor from "../public/doctor.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/(app)/components/ui/carousel";
import MobileNavigation from "@/app/(app)/components/mobileNavigation";
import Header from "@/app/(app)/components/header";
import DesktopNavigation from "@/app/(app)/components/desktopNavigation";

const especialidades = () => {
  return (
    <>
      <Header />
      <DesktopNavigation />
      <main className="flex flex-col items-center justify-around bg-gray-50">
        <h1 className="my-5 w-4/5 text-left text-3xl font-thin">
          Especialistas en{" "}
          <span className="block text-sky-300">{"Especialidad"}</span>
        </h1>
        <form className="relative my-4 ml-auto flex w-4/5 items-center">
          <input
            type="text"
            placeholder="Buscar Especialista"
            className="w-4/5 rounded-2xl border bg-gray-50 py-2 pl-10 pr-4 focus:outline-none active:outline-none"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-4/5 items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </form>
        <section className="flex w-full flex-col items-center justify-around gap-6 lg:flex-row lg:gap-10">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-2lg rounded-lg border-4 border-black"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="flex border-2 border-sky-300 h-fit w-full bg-sky-100 p-2">
                    <CardContent className="flex items-center justify-center p-6">
                      
                      <Image
                        src={doctor}
                        alt="Logo"
                        width={120}
                        height={120}
                        className="ml-1 rounded-xl"
                      />
                      <section className="ml-5 pr-5">
                        <span className="font-semibold">
                          {" "}
                          Dr. {"doctorName"}
                        </span>
                        <p>Horario {"horario"}</p>
                        <p>Hora: {"hora"}</p>
                        {"price"}
                        <span className="block cursor-pointer font-semibold">
                          Ver más
                        </span>
                      </section>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="flex border-2 border-sky-300 h-fit w-full bg-sky-100 p-2">
                    <CardContent className="flex items-center justify-center p-6">
                      
                      <Image
                        src={doctor}
                        alt="Logo"
                        width={120}
                        height={120}
                        className="ml-1 rounded-xl"
                      />
                      <section className="ml-5 pr-5">
                        <span className="font-semibold">
                          {" "}
                          Dr. {"doctorName"}
                        </span>
                        <p>Horario {"horario"}</p>
                        <p>Hora: {"hora"}</p>
                        {"price"}
                        <span className="block cursor-pointer font-semibold">
                          Ver más
                        </span>
                      </section>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="flex border-2 border-sky-300 h-fit w-full bg-sky-100 p-2">
                    <CardContent className="flex items-center justify-center p-6">
                      
                      <Image
                        src={doctor}
                        alt="Logo"
                        width={120}
                        height={120}
                        className="ml-1 rounded-xl"
                      />
                      <section className="ml-5 pr-5">
                        <span className="font-semibold">
                          {" "}
                          Dr. {"doctorName"}
                        </span>
                        <p>Horario {"horario"}</p>
                        <p>Hora: {"hora"}</p>
                        {"price"}
                        <span className="block cursor-pointer font-semibold">
                          Ver más
                        </span>
                      </section>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="flex border-2 border-sky-300 bg-sky-100 p-2">
                    <CardContent className="flex items-center justify-center p-6">
                      
                      <Image
                        src={doctor}
                        alt="Logo"
                        width={120}
                        height={120}
                        className="ml-1 rounded-xl"
                      />
                      <section className="ml-5 pr-5">
                        <span className="font-semibold">
                          {" "}
                          Dr. {"doctorName"}
                        </span>
                        <p>Horario {"horario"}</p>
                        <p>Hora: {"hora"}</p>
                        {"price"}
                        <span className="block cursor-pointer font-semibold">
                          Ver más
                        </span>
                      </section>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselPrevious />
              <CarouselNext />
            </CarouselContent>
          </Carousel>
        </section>
      </main>
      <MobileNavigation />
    </>
  );
};

export default especialidades;

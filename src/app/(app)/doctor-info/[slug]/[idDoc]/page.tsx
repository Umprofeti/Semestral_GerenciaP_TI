'use client'
import Header from "@/app/(app)/components/header";
import { Button } from "@/app/(app)/components/ui/button";
import { Input } from "@/app/(app)/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/(app)/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/app/(app)/lib/utils";
import { Calendar } from "@/app/(app)/components/ui/calendar";
import {Popover,PopoverContent,PopoverTrigger,} from "@/app/(app)/components/ui/popover";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/app/(app)/components/ui/form";
import DesktopNavigation from "../../../components/desktopNavigation";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  dob: z.date({ required_error: "Por favor selecciona una fecha válida." }),
  email: z.string().email("Correo inválido"),
  tipoPaciente: z.string().nonempty("Selecciona un tipo de paciente"),
});

const AddCita = () => {

  const {idDoc} = useParams()

  const [result, setResult] = useState<InformacionDoctoresType>();
  const [loading, setLoading] =useState(true)
  const [error, setError] =useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`http://localhost:3000/api/doctor?where[id][equals]=${idDoc}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await req.json();
        setResult(data)
        setLoading(false)
      } catch (err) {
        setError(error)
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Datos enviados:", data);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Header />
      <DesktopNavigation />
      <div className="flex flex-col gap-y-6 px-6">
        <h1 className="text-2xl sm:text-3xl">
          Agendar <span className="text-[#89ccc5] block sm:inline">Cita</span>
        </h1>
        <div className="md:flex md:flex-row-reverse">
          {/* Presentacion del Doctor */}
          {result?.docs.map((doctor, index)=>{
            return(
              <div key={index} className="w-1/2 max-h-48 md:max-h-72 overflow-hidden ">
                <Image
                src={doctor.fotoDoctor.url}
                alt={doctor.fotoDoctor.alt}
                width={150}  
                height={150} 
                className="w-full mx-auto h-full object-cover" 
                />
              </div>

            )
          })}
          {/* Descripcion del Doctor */}
          <div className="flex-1 flex flex-col items-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 px-4 py-4 w-3/4">
                {/* Tipo de paciente */}
                <FormField
                  control={form.control}
                  name="tipoPaciente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de paciente</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipo paciente</SelectLabel>
                            <SelectItem value="paciente1">Paciente 1</SelectItem>
                            <SelectItem value="paciente2">Paciente 2</SelectItem>
                            <SelectItem value="paciente3">Paciente 3</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Fecha */}
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : "Selecciona una fecha"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Hora de la cita"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-[#89ccc5]">
                  Confirmar Cita
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCita;

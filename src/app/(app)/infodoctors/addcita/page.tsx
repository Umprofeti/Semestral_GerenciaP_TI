'use client'
import Header from "@/app/(app)/components/header";
import { Button } from "@/app/(app)/components/ui/button";
import { Input } from "@/app/(app)/components/ui/input";
import { Label } from "@/app/(app)/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/(app)/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/app/(app)/lib/utils";
import { Calendar } from "@/app/(app)/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/(app)/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(app)/components/ui/form";

const FormSchema = z.object({
  dob: z.date({ required_error: "Por favor selecciona una fecha válida." }),
  email: z.string().email("Correo inválido"),
  tipoPaciente: z.string().nonempty("Selecciona un tipo de paciente"),
});

const AddCita = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Datos enviados:", data);
  };

  return (
    <div className="pt-4 bg-[#65c4ba]">
      <div className="px-4">
        <Header />
        <h2 className="text-3xl text-zinc-700">Agendar <span className="text-white">Cita</span></h2>
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2>Doctor XXXXX</h2>
            <p className="text-zinc-700">Cardiología</p>
          </div>
          <div className="flex justify-end">
            <img src="/doctor.png" alt="Doctor" className="max-h-48" />
          </div>
        </div>
      </div>
      <div className="h-10 w-full rounded-t-3xl bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 px-4 py-4">
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
  );
};

export default AddCita;

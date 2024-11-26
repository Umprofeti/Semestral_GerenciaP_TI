import { Doctor, Paciente } from "@/payload-types";

export interface InfoCita {
  id: string;
  Doctor: Doctor;
  Paciente: Paciente;
  Completado?: boolean | null;
  Hora: string;
  Fecha: string;
  updatedAt: string;
  createdAt: string;
}
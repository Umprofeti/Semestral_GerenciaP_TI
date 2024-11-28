'use client'

import React, { use } from 'react'
import './crearCuenta.css'
import Logo from '../public/doctor.svg'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Users } from '../../../collections/Users'
import { postLocalAPI } from '../utils/localAPI'
import { useRouter } from 'next/navigation'

type Inputs = {
  name: string
  lastName: string
  userId: string
  dateBirth: string
  address: string
  phoneNumber: string
  email: string
  password: string
  passwornConfirm: string
  edad: number
  genero: string
}

const CrearCuenta = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password === data.passwornConfirm) {
      const birthSelected = new Date(data.dateBirth); // Fecha de nacimiento
      const today = new Date(); // Fecha actual

      // Cálculo de la edad
      let age = today.getFullYear() - birthSelected.getFullYear();
      const monthDifference = today.getMonth() - birthSelected.getMonth();
      const dayDifference = today.getDate() - birthSelected.getDate();

      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
      }

      if (age > 0) {
        const dataPaciente = {
          email: data.email,
          password: data.password,
          nombre: data.name,
          apellido: data.lastName,
          identidadPersonal: data.userId,
          fechaNacimiento: data.dateBirth,
          telefono: data.phoneNumber,
          direccion: data.address,
          genero: data.genero,
          edad: age
        }
        console.log(dataPaciente)
        postLocalAPI(dataPaciente)
        try {
          const req = await fetch(`http://localhost:3000/api/pacientes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPaciente),
          })

          const res = await req.json()
          router.push("/login")
        } catch (error) {
          console.log(error)
        }
      } else {
        alert('Verifique su fecha de naciemiento')
      }
    } else {
      alert('confirma correctamente la contraseña por favor')
    }
  }

  return (
    <div className="flex flex-col my-4 items-center justify-center bg-slate-50 p-0 lg:flex-row lg:justify-around">
      <div className="superior-box absolute left-0 top-0 hidden h-36 w-36 bg-sky-200 lg:block" />
      <div className='flex justify-center w-full'>
        <Image src={Logo} alt="Logo" width={350} height={350} className="hidden lg:block md:mx-8" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  md:mx-8 ">
          <h1 className="m-2 text-3xl font-semibold text-sky-300 my-8 md:my-2">
            {' '}
            <span className="text-black"> Crear </span> Nueva Cuenta
          </h1>

          <div className=" input-with-placeholder">
            <input {...register('name', { required: true })} type="text" id="nombre" />
            <label htmlFor="nombre">Nombre/s</label>
          </div>

          <div className=" input-with-placeholder">
            <input {...register('lastName', { required: true })} type="text" id="apellido" />
            <label htmlFor="apellido">Apellido/s</label>
          </div>

          <div className="input-with-placeholder">
            <input {...register('userId', { required: true })} type="text" id="identidad" />
            <label htmlFor="identidad"> No. de Identidad Personal</label>
          </div>

          <div className="input-with-placeholder">
            <input {...register('dateBirth', { required: true })} type="date" id="fechaNacimiento" />
            <label htmlFor="fechaNacimiento" id="fechaNacimiento2">
              {' '}
              Fecha de Nacimiento
            </label>
          </div>
          <div className="my-4 flex items-center">
            <label htmlFor="genero" className="mr-4 text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              {...register('genero', { required: true })}
              id="genero"
              defaultValue="Hombre"
              className="block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Selecciona tu género
              </option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </div>




          <div className="input-with-placeholder">
            <input {...register('address', { required: true })} type="text" id="direccion" />
            <label htmlFor="direccion"> Dirección de Residencia</label>
          </div>

          <div className="input-with-placeholder">
            <input {...register('phoneNumber', { required: true })} type="text" id="telefono" />
            <label htmlFor="telefono"> Teléfono de Contacto</label>
          </div>

          <div className="input-with-placeholder">
            <input {...register('email', { required: true })} type="email" id="email" />
            <label htmlFor="email"> Correo Electronico</label>
          </div>

          <div className="input-with-placeholder">
            <input {...register('password', { required: true })} type="password" id="password" />
            <label htmlFor="password"> Contraseña</label>
          </div>

          <div className="input-with-placeholder">
            <input
              {...register('passwornConfirm', { required: true })}
              type="password"
              id="confirmPassword"
            />
            <label htmlFor="confirmPassword"> Confirmar Contraseña</label>
          </div>

          <button className="my-2 rounded-md bg-blue-300 px-4 py-2 text-white">Crear Cuenta</button>
          <p className="text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <span
              onClick={() => router.push('/login')}
              className="font-medium text-sky-300 hover:cursor-pointer"
            >
              Iniciar Sesión
            </span>
          </p>
        </form>
      </div>
      <div className="inferior-box absolute bottom-0 right-0 hidden h-20 w-20 bg-sky-200 lg:block" />
    </div>
  )
}

export default CrearCuenta
'use client'

import React, { use } from 'react'
import './crearCuenta.css'
import Logo from '../public/doctor.svg'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Users } from '../../../collections/Users'

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
}

const CrearCuenta = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password === data.passwornConfirm) {
      const dataPaciente = {
        email: data.email,
        password: data.password,
        nombre: data.name,
        apellido: data.lastName,
        identidadPersonal: data.userId,
        fechaNacimiento: data.dateBirth,
        telefono: data.phoneNumber,
        direccion: data.address,
      }
      console.log(dataPaciente)

      try {
        const req = await fetch(`http://localhost:3000/api/pacientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataPaciente),
        })

        const res = await req.json()
        console.log('HOLAAAA', res)
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('confirma correctamente la contraseña por favor')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 p-0 lg:flex-row lg:justify-around">
      <div className="superior-box absolute left-0 top-0 hidden h-36 w-36 bg-sky-200 lg:block" />
      <Image src={Logo} alt="Logo" width={350} height={350} className="hidden lg:block" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center lg:w-96">
        <h1 className="m-2 text-3xl font-semibold text-sky-300">
          {' '}
          <span className="text-black"> Crear </span> Nueva Cuenta
        </h1>

        <div className="input-with-placeholder">
          <input {...register('name', { required: true })} type="text" id="nombre" />
          <label htmlFor="nombre">Nombre/s</label>
        </div>

        <div className="input-with-placeholder">
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
          ¿Ya tienes una cuenta? <span className="font-medium text-sky-300">Iniciar Sesión</span>
        </p>
      </form>
      <div className="inferior-box absolute bottom-0 right-0 hidden h-20 w-20 bg-sky-200 lg:block" />
    </div>
  )
}

export default CrearCuenta

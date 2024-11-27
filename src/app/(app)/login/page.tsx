'use client'

import React from 'react'
import './login.css'
import '../crearCuenta/crearCuenta.css'
import Logo from '../public/doctor.svg'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type Inputs = {
  email: string
  password: string
}

const Login = () => {



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const reqPacientes = await fetch(`http://localhost:3000/api/pacientes/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(data)
      const reqDoctor = await fetch(`http://localhost:3000/api/doctor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const reqUser = await fetch(`http://localhost:3000/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (reqPacientes.ok) {
        const res = await reqPacientes.json()
        router.push(`/dashboard/user/${res.user.id}`)
        console.log(res)
      } else if (reqDoctor.ok) {
        const res = await reqDoctor.json()
        router.push(`/dashboard/doctor`)
        console.log(res)
      } else if (reqUser.ok) {
        const res = await reqUser.json()
        router.push(`/admin`)
        console.log(res)
      } else {
        console.log('Error al iniciar sesion')
        return
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="lg:justify-space-between flex h-screen flex-col items-center justify-around lg:flex-row">
      <div className="superior-box absolute top-0 h-20 w-full bg-[#89ccc5] lg:absolute lg:left-0 lg:top-0 lg:h-40 lg:w-40"></div>

      <Image src={Logo} alt="Logo" width={250} height={250} className="mt-10" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <h1 className="hidden text-3xl font-semibold lg:block">
          Iniciar <span className="text-sky-300">Sesión</span>
        </h1>
        <div className="input-with-placeholder">
          <input {...register('email', { required: true })} type="email" id="email" />
          <label htmlFor="email"> Correo Electronico</label>
        </div>

        <div className="input-with-placeholder">
          <input {...register('password', { required: true })} type="password" id="password" />
          <label htmlFor="password"> Contraseña</label>
        </div>
        {errors.email && <p className="text-sm text-red-500">El correo electronico es requerido</p>}
        {errors.password && <p className="text-sm text-red-500">La contraseña es requerida</p>}
        <button className="mt-6 rounded-xl bg-sky-300 px-8 py-2 text-lg text-white">
          Iniciar Sesión
        </button>

        <p className="text-sm text-gray-500">¿Olvidaste tu contraseña?</p>

        <button className="mt-5 rounded-xl bg-sky-300 px-8 py-2 text-lg text-white">
          Crear Cuenta
        </button>
      </form>
      <div className="inferior-box absolute bottom-0 right-0 hidden h-20 w-20 bg-sky-200 lg:block" />
    </div>
  )
}

export default Login

'use client'
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {submitMedia}from '@/app/(app)/utils/localAPI'


const InfoFotoPaciente = ({ foto, defaultIcon }) => {

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleUpload(file); 
        }
    };

    const handleUpload = async (image) => {
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('alt', 'image');
            try {
                 const response = await submitMedia(formData);
                 console.log("Archivo subido correctamente:", response);
                //  Aquí podrías usar 'response.url' o cualquier otra propiedad según sea necesario
            } catch (error) {
                console.error("Error al conectar con la API", error);
            }
        }
    };
    
    

    return (
        <div className="relative flex items-center justify-center w-full h-full group">

            <Image
                src={'/doctor.png'}
                width={200}
                height={200}
                alt="Perfil persona"
                className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
            />

            <label
                className="absolute bg-[#689b96] text-white px-4 py-2 rounded opacity-0 transition duration-300 group-hover:opacity-100 cursor-pointer"
            >
                Cambiar foto
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export default InfoFotoPaciente;

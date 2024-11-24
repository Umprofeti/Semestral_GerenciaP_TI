'use client'
import Image from "next/image";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";

const InfoFotoPaciente = ({ foto }) => {
    const { user } = useParams();
    const [selectedImage, setSelectedImage] = useState(foto);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div className="relative flex items-center justify-center w-full h-full group">
            {/* Imagen con efecto de oscurecimiento */}
            <Image
                src={selectedImage}
                width={200}
                height={200}
                alt="Perfil persona"
                className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
            />

            {/* Botón centrado para subir imagen */}
            <label
                className="absolute bg-[#689b96] text-white px-4 py-2 rounded opacity-0 transition duration-300 group-hover:opacity-100 cursor-pointer"
            >
                Cambiar foto
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </label>
        </div>
    );
};

export default InfoFotoPaciente;

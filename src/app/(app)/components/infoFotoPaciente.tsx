'use client'
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { postImageLocal } from '@/app/(app)/utils/localAPI'


const InfoFotoPaciente = ({ foto, idPerfil }) => {

  const [selectedImage, setSelectedImage] = useState(foto);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange =async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
    //   const formData = new FormData();
    //   console.log(file)
    //   formData.append('file', event.target.files[0]);
    //   const respuestaMedia = await postImageLocal(file)
    //   console.log(respuestaMedia)
    const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    //   submitImage(file)
    }
  };

  // const submitImage = async (imagenSubir) => {



    // try {
    //   const response = await fetch(`http://localhost:3000/api/media/create`, {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
    //     },
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setMessage('Imagen subida correctamente');
    //     setSelectedImage(data.fotoPaciente.url);
    //   } else {
    //     setMessage('Error al subir la imagen');
    //   }
    // } catch (error) {
    //   setMessage('Hubo un error con la subida: ' + error.message);
    // } finally {
    //   setIsLoading(false);
    // }
  // };

  return (
    <div className="relative flex items-center justify-center w-full h-full group">
      {/* Imagen con efecto de oscurecimiento */}
      {foto ? <Image
        src={selectedImage}
        decoding="async"
        width={200}
        height={200}
        alt="Perfil persona"
        className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
      /> : ''}

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

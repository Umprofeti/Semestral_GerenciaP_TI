'use client'
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { submitMedia } from '@/app/(app)/utils/localAPI'


const InfoFotoPaciente = ({ foto,idPerfil }) => {

    const [selectedImage, setSelectedImage] = useState(foto);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tokenCookie, setTokenCookie]= useState()

    const handleImageChange = (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            submitImage(file)
        }
    };

    const submitImage = async (imagenSubir) => {
        setIsLoading(true); // Muestra el indicador de carga
        const formData = new FormData();
        formData.append('fotoPaciente[media]', imagenSubir); // Imagen de perfil del paciente
        formData.append('fotoPaciente[alt]', 'Imagen de perfil del paciente');
        console.log()
        // try {
        //     const response = await fetch(`http://localhost:3000/api/media`, {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/javascript",
        //         },
        //         body:formData,
        //     });
    
        //     if (response.ok) {
        //         const data = await response.json();
        //         setMessage('Imagen subida correctamente');
        //         setSelectedImage(data.fotoPaciente.url); // Actualiza con la URL del servidor
        //     } else {
        //         setMessage('Error al subir la imagen');
        //     }
        // } catch (error) {
        //     setMessage('Hubo un error con la subida: ' + error.message);
        // } finally {
        //     setIsLoading(false); // Oculta el indicador de carga
        // }
    };
    
    const [resultCookie, setResultCookie] = useState(null);
    const [loadingCookie, setLoadingCookie] = useState(true);
    const [errorCookie, setErrorCookie] = useState('');
  
    useEffect(() => {
      const fetchDataCookie = async () => {
        try {
          const reqCookie = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pacientes/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!reqCookie.ok) {
            console.log('Error al iniciar sesion');
            return;
          }
  
          const res = await reqCookie.json();
          console.log(res)

          setLoadingCookie(false);
        } catch (err:any) {
          setErrorCookie(err.message);
          setLoadingCookie(false);
        }
      };
        
      fetchDataCookie();
    }, []);
    
    return (
        <div className="relative flex items-center justify-center w-full h-full group">
            {/* Imagen con efecto de oscurecimiento */}
            {foto?<Image
                src={selectedImage}
                decoding="async"
                width={200}
                height={200}
                alt="Perfil persona"
                className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
            />:''}

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

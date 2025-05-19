import { useCallback, useState } from "react";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import API from "@/services";
import { useAuth } from "@/hooks/useAuth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function useAddAdjunto(id:  string | undefined) {

  const { userData} = useAuth()
  const navigate = useNavigate()

  const [adjunto, setAdjunto] = useState<File | null>(null);
  const [nombre, setNombre] = useState<string>("");

    const {data, isPending, mutateAsync} = useMutation({
      mutationFn: async () => {
        if(id && adjunto){
            const f = new FormData()
            f.append("nombre", nombre)
            f.append("adjunto", adjunto)
          return await API.adjuntos.agregarAdjunto(userData && userData.tokenWithBearer, id, f)
        }
        return null
      },      
      onSettled: async(data)=> {
        if(data && data.success){
          data.message
          const res = await swal({
            title: 'Correcto',
            icon: "success",
            text: data.message
          })
          if(res)
            navigate('/clientes')
          
        }
      },
    })
    
    
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      // Función para comprimir imágene
      const compressImages = async (file: File) => {
        let compressedImages: File | null = null;
    
        const options = {
          maxSizeMB: 0.5, // Máximo 500 KB por imagen
          maxWidthOrHeight: 1280, // Redimensionar si es más grande
          useWebWorker: true,
        };
    
        try {
          const compressedFile = await imageCompression(file, options);
          compressedImages = new File([compressedFile], file.name, { type: compressedFile.type });
        } catch (error) {
          console.error("Error al comprimir la imagen:", error);
        }
    
        return compressedImages;
      };
    
      // Función de subida de imágenes
      const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
          if (acceptedFiles.length === 0) return;
    
          const compressedFile = await compressImages(acceptedFiles[0]); // Solo una imagen
          if (compressedFile) {
            setAdjunto(compressedFile);
            // Crear una URL para la vista previa
            setImagePreview(URL.createObjectURL(compressedFile));
          }
        },
        [setAdjunto, setImagePreview]
      );

      const removeImage = useCallback(() => {
        setAdjunto(null);   
          setImagePreview(null);
         
      }, [setAdjunto, setImagePreview]);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] }, // Solo acepta imágenes
        onDrop, // Maneja la subida aquí
      });

    
    
    return { imagePreview, onDrop, removeImage, getRootProps, getInputProps, isDragActive, isPending, data, subir : mutateAsync, nombre, setNombre}
}

export default useAddAdjunto 
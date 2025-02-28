import { useCallback, useState } from "react";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import API from "@/services";
import { useAuth } from "@/hooks/useAuth";

function useFotoCedula({id, foto_cedula}: {id: string, foto_cedula: File | null}) {
    
  const { userData} = useAuth()

    const {data, isPending, mutate} = useMutation({
      mutationFn: async () => API.clientes.actualizarFotoCedula(userData && userData.tokenWithBearer, id,form),
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    })

    const [form, setForm] = useState<FormData>(() => {
        const formData = new FormData();
        if (foto_cedula) formData.append("foto_cedula", foto_cedula);
        return formData;
      });
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      // Función para comprimir imágenes
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
            setForm((prevForm) => {
              const newForm = new FormData();
              prevForm.forEach((value, key) => {
                newForm.append(key, value);
              });
              newForm.append("foto_cedula", compressedFile);
              return newForm;
            });
    
            // Crear una URL para la vista previa
            setImagePreview(URL.createObjectURL(compressedFile));
          }
        },
        [setForm]
      );

      const removeImage = () => {
        setForm((prev) => {
          const newForm = new FormData();
          prev.forEach((value, key) => {
            if (key !== "foto_cedula") {
              newForm.append(key, value);
            }
          });
          setImagePreview(null);
          return newForm;
        });
      };
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] }, // Solo acepta imágenes
        onDrop, // Maneja la subida aquí
      });
    
    
    return {form, imagePreview, onDrop, removeImage, getRootProps, getInputProps, isDragActive, isPending, data, subir : mutate}
}

export default useFotoCedula 
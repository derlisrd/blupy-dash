import { useAuth } from "@/hooks/useAuth";
import { BASE } from "@/services/base";
import { Button, Container, LinearProgress, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import swal from "sweetalert";

export default function Cobranzas() {
  const { userData } = useAuth();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const f = e.target.files[0];
      if (!f.name.endsWith(".csv")) {
        alert("Solo se permiten archivos CSV (.csv)");
        e.target.value = "";
        setFile(null);
        setFileName("");
        return;
      }
      setFile(f);
      setFileName(f.name);
    }
  };

  const enviarSms = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await BASE.post("/morosos/reclamo-sms-excel", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: userData?.tokenWithBearer },
      });
      return res.data;
    },
    onSuccess: () => {
      setText("");
      setFile(null);
      setFileName("");
      swal("✅ Mensaje enviado correctamente en 2do plano");
    },
    onError: (error) => {
      console.error(error);
      swal("❌ Error al enviar el SMS");
    },
  });

  const handleSubmit = () => {
    if (!text.trim()) return swal("Debe ingresar un mensaje de texto");
    if (!file) return swal("Ingrese el archivo csv con las cedulas de morosos");

    const formData = new FormData();
    formData.append("text", text);
    formData.append("csv_file", file);

    enviarSms.mutate(formData);
  };

  return (
    <Container>
      <h3>Notificaciones de cobranza</h3>
      <p>Gestionar las notificaciones de cobranzas por sms masivo difusión para clientes de BLUPY DIGITAL.</p>
      <Grid container spacing={2}>
        <Grid size={12}>{enviarSms.isPending && <LinearProgress />}</Grid>
        <Grid size={12}>
          <TextField fullWidth label="Ingrese el mensaje" value={text} helperText="Máximo 100 caracteres" multiline rows={4} onChange={(e) => setText(e.target.value)} />
        </Grid>
        <Grid size={12}>
          <Button variant="contained" component="label">
            Seleccionar excel
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {fileName && <p>Archivo seleccionado: {fileName}</p>}
          <p>Formato CSV </p>
        </Grid>
        <Grid size={12}>
          <Button variant="contained" color="success" disabled={enviarSms.isPending} onClick={handleSubmit}>
            {enviarSms.isPending ? "Enviando..." : "Enviar"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

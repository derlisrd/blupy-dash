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
  const MAX_CHARS = 100;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const f = e.target.files[0];
      if (!f.name.endsWith(".csv")) {
        swal("Solo se permiten archivos CSV (.csv)");
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
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: userData?.tokenWithBearer,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      setText("");
      setFile(null);
      setFileName("");
      swal("✅ Mensaje enviado correctamente en segundo plano");
    },
    onError: (error) => {
      console.error(error);
      swal("❌ Error al enviar el SMS");
    },
  });

  const handleSubmit = () => {
    if (!text.trim()) return swal("Debe ingresar un mensaje de texto");
    if (text.length > MAX_CHARS) return swal(`El mensaje no puede superar los ${MAX_CHARS} caracteres`);
    if (!file) return swal("Ingrese el archivo CSV con las cédulas de morosos");

    const formData = new FormData();
    formData.append("text", text);
    formData.append("csv_file", file);

    enviarSms.mutate(formData);
  };

  return (
    <Container>
      <h3>Notificaciones de cobranza</h3>
      <p>Gestionar las notificaciones de cobranza por SMS masivo para clientes de BLUPY DIGITAL.</p>

      <Grid container spacing={2}>
        <Grid size={12}>{enviarSms.isPending && <LinearProgress />}</Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            label="Ingrese el mensaje"
            value={text}
            helperText={`${text.length}/${MAX_CHARS} caracteres`}
            multiline
            rows={4}
            slotProps={{
              htmlInput: {
                maxLength: MAX_CHARS,
              },
            }}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>

        <Grid size={12}>
          <Button variant="contained" component="label">
            Seleccionar archivo CSV
            <input type="file" hidden accept=".csv" onChange={handleFileChange} />
          </Button>
          {fileName && <p>Archivo seleccionado: {fileName}</p>}
          <p>Formato CSV requerido</p>
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

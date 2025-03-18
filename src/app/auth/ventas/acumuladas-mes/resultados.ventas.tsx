import FichaCard from "@/components/common/fichaCard";
import { Fragment } from "react";
import { Grid2 as Grid } from "@mui/material";
import { VentasAcumuladasMesResults } from "@/services/dto/ventas/ventasAcumuladosMes";
import { useNavigate } from "react-router-dom";

interface ResultadosVentasProps {
  data: VentasAcumuladasMesResults | null;
  periodo: string;
}

function ResultadosVentas({ data, periodo }: ResultadosVentasProps) {
  const navigate = useNavigate();
  const formatPYG = (amount?: number) => {
    return amount?.toLocaleString("es-PY", { style: "currency", currency: "PYG" }) || "0,00 ₲";
  };
  const navegar = (codigo?: number, alianza?: boolean) => {
    if (!codigo) return;
    const alianzaStr = alianza ? "1" : "0";
    navigate(`/ventas/periodo-forma?codigo=${codigo}&periodo=${periodo}&alianza=${alianzaStr}`);
  };

  if (!data) return <Fragment></Fragment>;

  return (
    <Fragment>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <FichaCard title="Totales" bold subtitle={formatPYG(data.total)} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FichaCard
          title="Blupy Digital"
          bold
          subtitle={formatPYG(data.blupyDigital?.total)}
          actions
          onClickButtonActions={() => {
            navegar(data.blupyDigital?.codigo, data.blupyDigital?.alianza);
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FichaCard
          title="Blupy Funcionarios"
          bold
          subtitle={formatPYG(data.blupy1DiaFuncionarios?.total)}
          actions
          onClickButtonActions={() => {
            navegar(data.blupy1DiaFuncionarios?.codigo, data.blupy1DiaFuncionarios?.alianza);
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FichaCard
          title="Blupy Alianzas"
          bold
          subtitle={formatPYG(data.blupy1DiaAlianzas?.total)}
          actions
          onClickButtonActions={() => {
            navegar(data.blupy1DiaAlianzas?.codigo, data.blupy1DiaAlianzas?.alianza);
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FichaCard
          title="Blupy 3 cuotas"
          bold
          subtitle={formatPYG(data.blupy3Cuotas?.total)}
          actions
          onClickButtonActions={() => {
            navegar(data.blupy3Cuotas?.codigo, data.blupy3Cuotas?.alianza);
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FichaCard
          title="Blupy 3 cuotas alianzas"
          bold
          subtitle={formatPYG(data.blupy3CuotasAlianza?.total)}
          actions
          onClickButtonActions={() => {
            navegar(data.blupy3CuotasAlianza?.codigo, data.blupy3CuotasAlianza?.alianza);
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FichaCard
          title="Blupy 4 cuotas alianzas"
          bold
          subtitle={formatPYG(data.blupy4CuotasAlianza?.total)}
          actions
          onClickButtonActions={() => {
            navegar(data.blupy4CuotasAlianza?.codigo, data.blupy4CuotasAlianza?.alianza);
          }}
        />
      </Grid>
    </Fragment>
  );
}

export default ResultadosVentas;

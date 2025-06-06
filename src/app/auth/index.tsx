import AuthMenuLayout from "@/layout/auth/AuthLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Clientes from "./clientes";
import LogOut from "./out";
import Solicitudes from "./solicitudes";
import { lazy, LazyExoticComponent, Suspense } from "react";
import Loading from "@/components/ui/loading";
import PageNotFound from "../404";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Loadable =
  <T extends object>(Component: LazyExoticComponent<() => JSX.Element>) =>
    (props: T) => {
      return (
        <Suspense fallback={<Loading />}>
          <Component {...props} />
        </Suspense>
      );
    };

const CambiarContrasena = Loadable(lazy(() => import("./clientes/cambiar.contrasena")));
const ClientesFotoCedula = Loadable(lazy(() => import("./clientes/fotocedula")));
const Adjuntos = Loadable(lazy(() => import("./adjuntos")));
const AgregarAdjunto = Loadable(lazy(() => import("./adjuntos/agregar")));
const FichaClienteFarma = Loadable(lazy(() => import("./farma/clientes/ficha")));
const Comisiones = Loadable(lazy(() => import("./farma/comisiones")));
const FichaClienteFarmaCodigo = Loadable(lazy(() => import("./farma/clientes/codigo")));
const ContratoPorDocumento = Loadable(lazy(() => import("./contratos/pordocumento")));
const ContratoPorCodigo = Loadable(lazy(() => import("./contratos/porcodigo")));
const NotificacionesDifusion = Loadable(lazy(() => import("./notificaciones/difusion")));
const NotificacionesIndividual = Loadable(lazy(() => import("./notificaciones/individual")));
const VentasPorFactura = Loadable(lazy(() => import("./ventas/por-factura")));
const VentasPorCodigo = Loadable(lazy(() => import("./ventas/por-codigo")));
const VentasPorFecha = Loadable(lazy(() => import("./ventas/por-fecha")));
const Comparativa = Loadable(lazy(() => import("./ventas/comparativa")));
const VentasAcumuladas = Loadable(lazy(() => import("./ventas/acumuladas")));
const VentasAcumuladasMes = Loadable(lazy(() => import("./ventas/acumuladas-mes")));
const VentasPeriodoForma = Loadable(lazy(() => import("./ventas/periodo-forma")));
const VentasFecha = Loadable(lazy(() => import("./actualizaciones/ventas-fecha")));
const Movimientos = Loadable(lazy(() => import("./farma/movimientos")));
const SMS = Loadable(lazy(() => import("./notificaciones/sms")));

const Users = Loadable(lazy(() => import("./users")));

function AuthPages() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<AuthMenuLayout />}>
          <Route index element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/adjuntos" element={<Adjuntos />} />
          <Route path="/agregar-adjunto/:id" element={<AgregarAdjunto />} />
          <Route path="/clientes/foto-cedula" element={<ClientesFotoCedula />} />
          <Route path="/clientes/cambiar-contrasena" element={<CambiarContrasena />} />
          <Route path="/solicitudes" element={<Solicitudes />} />
          <Route path="/contratos/pordocumento" element={<ContratoPorDocumento />} />
          <Route path="/contratos/porcodigo" element={<ContratoPorCodigo />} />
          <Route path="/farma/clientes/ficha" element={<FichaClienteFarma />} />
          <Route path="/farma/clientes/codigo" element={<FichaClienteFarmaCodigo />} />
          <Route path="/farma/comisiones" element={<Comisiones />} />
          <Route path="/notificaciones/difusion" element={<NotificacionesDifusion />} />
          <Route path="/notificaciones/individual" element={<NotificacionesIndividual />} />
          <Route path="/notificaciones/sms" element={<SMS />} />
          <Route path="/ventas/por-factura" element={<VentasPorFactura />} />
          <Route path="/ventas/por-codigo/:codigo" element={<VentasPorCodigo />} />
          <Route path="/ventas/por-fecha" element={<VentasPorFecha />} />
          <Route path="/ventas/comparativa" element={<Comparativa />} />
          <Route path="/ventas/acumuladas" element={<VentasAcumuladas />} />
          <Route path="/ventas/acumuladas-mes" element={<VentasAcumuladasMes />} />
          <Route path="/ventas/periodo-forma" element={<VentasPeriodoForma />} />
          <Route path="/actualizaciones/ventas-fecha" element={<VentasFecha />} />
          <Route path="/farma/movimientos" element={<Movimientos />} />
          <Route path="/users" element={<Users />} />
          <Route path="/logout" element={<LogOut />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default AuthPages;

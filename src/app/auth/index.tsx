import AuthMenuLayout from "@/layout/auth/AuthLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Clientes from "./clientes";
import LogOut from "./out";
import Solicitudes from "./solicitudes";
import { lazy, LazyExoticComponent, Suspense } from "react";
import Loading from "@/components/ui/loading";
import PageNotFound from "../404";

const Loadable =
  <T extends object>(Component: LazyExoticComponent<() => JSX.Element>) =>
  (props: T) => {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };

function AuthPages() {
  return (
    <Routes>
      <Route path="/" element={<AuthMenuLayout />}>
        <Route index element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/foto-cedula" element={<ClientesFotoCedula />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/contratos/pordocumento" element={<ContratoPorDocumento />} />
        <Route path="/contratos/porcodigo" element={<ContratoPorCodigo />} />
        <Route path="/farma/clientes/ficha" element={<FichaClienteFarma />} />
        <Route path="/farma/clientes/codigo" element={<FichaClienteFarmaCodigo />} />
        <Route path="/notificaciones/difusion" element={<NotificacionesDifusion />} />
        <Route path="/notificaciones/individual" element={<NotificacionesIndividual />} />
        <Route path="/ventas/por-factura" element={<VentasPorFactura />} />
        <Route path="/ventas/acumuladas" element={<VentasAcumuladas />} />
        <Route path="/logout" element={<LogOut />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
const ClientesFotoCedula = Loadable(lazy(() => import("./clientes/fotocedula")));
const FichaClienteFarma = Loadable(lazy(() => import("./farma/clientes/ficha")));
const FichaClienteFarmaCodigo = Loadable(lazy(() => import("./farma/clientes/codigo")));
const ContratoPorDocumento = Loadable(lazy(() => import("./contratos/pordocumento")));
const ContratoPorCodigo = Loadable(lazy(() => import("./contratos/porcodigo")));
const NotificacionesDifusion = Loadable(lazy(() => import("./notificaciones/difusion")));
const NotificacionesIndividual = Loadable(lazy(() => import("./notificaciones/individual")));
const VentasPorFactura = Loadable(lazy(() => import("./ventas/por-factura")));
const VentasAcumuladas = Loadable(lazy(() => import("./ventas/acumuladas")));
export default AuthPages;

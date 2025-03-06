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
        <Route path="/farma/contratos/pordocumento" element={<ContratoPorDocumento />} />
        <Route path="/farma/clientes/ficha" element={<FichaClienteFarma />} />
        <Route path="/notificaciones/difusion" element={<NotificacionesDifusion />} />
        <Route path="/logout" element={<LogOut />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
const ClientesFotoCedula = Loadable(lazy(() => import("./clientes/fotocedula")));
const FichaClienteFarma = Loadable(lazy(() => import("./farma/clientes/ficha")));
const ContratoPorDocumento = Loadable(lazy(() => import("./farma/contratos/pordocumento")));
const NotificacionesDifusion = Loadable(lazy(() => import("./notificaciones/difusion")));
export default AuthPages;

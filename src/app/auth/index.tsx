import AuthMenuLayout from "@/layout/auth/AuthLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Clientes from "./clientes";
import LogOut from "./out";
import Solicitudes from "./solicitudes";
import { lazy, LazyExoticComponent, Suspense } from "react";
import Loading from "@/components/ui/loading";
import EnviarNotificaciones from "./notificaciones/enviarNotificaciones";

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
        <Route path="/notificaciones/enviar-notificaciones" element={<EnviarNotificaciones />} />
        <Route path="/logout" element={<LogOut />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
const ClientesFotoCedula = Loadable(lazy(() => import("./clientes/fotocedula")));
const FichaClienteFarma = Loadable(lazy(() => import("./farma/clientes/ficha")));
const ContratoPorDocumento = Loadable(lazy(() => import("./farma/contratos/pordocumento")));

export default AuthPages;

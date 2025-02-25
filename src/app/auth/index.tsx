import AuthMenuLayout from "@/layout/auth/AuthLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Clientes from "./clientes";
import LogOut from "./out";
import Solicitudes from "./solicitudes";
import Contratos from "./farma/consultas/contratos";
import { lazy, LazyExoticComponent, Suspense } from "react";
import Loading from "@/components/ui/loading";

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
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/farma/consulta-firma-contratos" element={<Contratos />} />
        <Route path="/farma/consulta-clientes" element={<ConsultaClientesFarma />} />
        <Route path="/logout" element={<LogOut />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

const ConsultaClientesFarma = Loadable(lazy(() => import("./farma/consultas/clientes")));

export default AuthPages;

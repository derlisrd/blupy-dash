import { Route, Routes } from "react-router-dom";
import HomePage from "./home";
import MainPageAuth from "./main_page_auth";
import ClientesPage from "./clientes";
import { useEffect } from "react";
import { APICALLER } from "../../services/api";
import userDataHook from "../../store/user_data_store";
import swal from "sweetalert";
import AuthProvider from "../../providers/auth_provider";
import Solicitudes from "./solicitudes";
import Mensajes from "./mensajes";
import ConsultasPage from "./consultas";
import VentasPage from "./ventas";
import Vendedores from "./vendedores";
import EnviarNotificacion from "./enviar_notificacion";
import ReporteComisionVendedor from "./reporte/comision.vendedor";

function AuthPages() {
  const { dataUser,logOutUserData} = userDataHook()
  
  useEffect(()=>{
    (async()=>{
        const res = await APICALLER.check(dataUser.token)
        if(!res.success){
            swal({text:'Sesión expirada',icon:'info'})
            logOutUserData(false)
        }
    })()
},[dataUser.token,logOutUserData])

  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainPageAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/mensajes" element={<Mensajes />} />
            <Route path="/consultas" element={<ConsultasPage />} />
            <Route path="/ventas" element={<VentasPage />} />
            <Route path="/vendedores" element={<Vendedores />} />
            <Route path="/enviar-notificacion" element={<EnviarNotificacion />} />
            <Route path="/reporte-comision" element={<ReporteComisionVendedor />} />
            <Route path="*" element={<HomePage />} />
        </Route>
    </Routes>
    </AuthProvider>
  );
}

export default AuthPages;

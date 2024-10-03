import ModalNoti from "./modal_noti";
import ModalEmail from "./modal_email";
import ModalFicha from "./modal_ficha";
import ModalFiltros from "./modal_filtros";
import ModalPassword from "./modal_password";
import ModalSms from "./modal_sms";
import ModalWa from "./modal_wa";
import ClientesPage from "./page";
import ClientesProvider from "./provider";

function Clientes() {
  return (
    <ClientesProvider>
      <ClientesPage />
      <ModalFiltros />
      <ModalEmail />
      <ModalFicha />
      <ModalSms />
      <ModalWa />
      <ModalNoti />
      <ModalPassword />
    </ClientesProvider>
  );
}

export default Clientes;

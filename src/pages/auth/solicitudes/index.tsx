import ModalWa from "./modal_wa";
import ModalEmail from "./modal_email";
import ModalFicha from "./modal_ficha";
import ModalFiltros from "./modal_filtros";
import ModalNoti from "./modal_noti";
import ModalSms from "./modal_sms";
import SolicitudesPage from "./page";
import SolicitudesProvider from "./provider";

function Solicitudes() {
    return ( <SolicitudesProvider>
        <ModalNoti />
        <ModalFiltros />
        <ModalFicha />
        <ModalWa />
        <ModalEmail />
        <ModalSms />
        <SolicitudesPage />
    </SolicitudesProvider> );
}

export default Solicitudes;
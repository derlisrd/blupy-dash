import ModalFiltros from "./modal_filtros";
import Page from "./page";
import SucursalesProvider from "./Provider";

function Sucursales() {
  return (
    <SucursalesProvider>
      <ModalFiltros />
      <Page />
    </SucursalesProvider>
  );
}

export default Sucursales;

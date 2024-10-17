import VentasProvider from "./provider";
import Page from "./page";

function VentasPage() {
  return (
    <VentasProvider>
      <Page />
    </VentasProvider>
  );
}

export default VentasPage;

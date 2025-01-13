import { Column, Table } from "react-virtualized";
import { useSucursales } from "./Provider";

function TablaVentas() {
  const { ventas } = useSucursales();
  const ancho = window.innerWidth > 1380 ? 1380 : window.innerWidth - 60;

  return (
    <Table width={ancho} autoWidth height={window.innerHeight - 205} headerHeight={20} rowHeight={30} rowCount={ventas.length} rowGetter={({ index }) => ventas[index]}>
      <Column headerRenderer={({ dataKey }) => <div>{dataKey}</div>} dataKey="codigo" label="#" width={80} />
      <Column dataKey="forma_pago" label="Forma" width={90} />
      <Column dataKey="documento" label="Documento" width={90} />
      <Column dataKey="factura_numero" label="Factura" width={120} />
      <Column dataKey="importe" label="Importe" width={90} />
      <Column dataKey="sucursal" label="Sucursal" width={220} />
      <Column dataKey="fecha" label="Fecha" width={120} />
    </Table>
  );
}

export default TablaVentas;

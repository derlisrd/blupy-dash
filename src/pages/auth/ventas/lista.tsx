import { Stack } from "@chakra-ui/react";
import { Column, Table } from "react-virtualized";
import useVentas from "./useVentas";

function ListaVentas() {
  const { lista } = useVentas();
  console.log(lista);
  const list = lista.map(() => ({
    id: null,
  }));

  const ancho = window.innerWidth > 1380 ? 1380 : window.innerWidth - 60;

  return (
    <Table width={ancho} autoWidth height={window.innerHeight - 205} headerHeight={20} rowHeight={30} rowCount={lista.length} rowGetter={({ index }) => list[index]}>
      <Column headerRenderer={({ dataKey }) => <div>{dataKey}</div>} dataKey="id" label="#" width={80} />
      <Column headerRenderer={({ dataKey }) => <div>{dataKey}</div>} dataKey="cedula" label="cedula" width={80} />
      <Column dataKey="name" label="Nombre" width={250} />
      <Column dataKey="farma" label="Farma" width={78} cellRenderer={({ cellData: e }) => (e == 1 ? <p className="FarmaFuncionario">Funcionario</p> : <p>Externo</p>)} />
      <Column dataKey="aso" label="Aso" width={50} cellRenderer={({ cellData: e }) => (e == 1 ? <p className="AsoBlupy">Aso</p> : <p>No aso</p>)} />
      <Column dataKey="vendedor" label="vendedor" width={90} />
      <Column dataKey="fecha" label="fecha" width={128} />
      <Column dataKey="accion" label="Acciones" width={160} cellRenderer={() => <Stack direction="row" gap={0.5}></Stack>} />
    </Table>
  );
}

export default ListaVentas;

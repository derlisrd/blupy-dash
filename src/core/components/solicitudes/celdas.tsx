import TableCell from "@/components/ui/tableCell";
import TableCellHead from "@/components/ui/tablecellhead";
import { TableCellProps, TableHeaderProps } from "react-virtualized";

const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

const estados: { [key: number]: string } = {
  5: "Contrato Pendiente",
  7: "Vigente",
  11: "Rechazado",
  3: "Pend. Aprobación",
  13: "Anulado",
};
const colores: { [key: number]: string } = {
  5: "#06c",
  7: "#4caf50",
  11: "#f44336",
  3: "#ff9800",
  13: "#9e9e9e",
};
const tipo: { [key: number]: string } = {
  0: "Registro",
  1: "Crédito",
  2: "Adicional",
  3: "Ampliación",
};

const cellRendererEstado = ({ cellData }: TableCellProps) => {
  const estado = estados[cellData];

  return (
    <TableCell>
      <span style={{ color: colores[cellData] }}>{estado}</span>
    </TableCell>
  );
};
const cellRendererTipo = ({ cellData }: TableCellProps) => {
  const estado = tipo[cellData];

  return <TableCell>{estado}</TableCell>;
};

export { headerRenderer, cellRenderer, cellRendererEstado, cellRendererTipo };

import TableCell from "@/components/ui/tableCell";
import TableCellHead from "@/components/ui/tablecellhead";
import { TableCellProps, TableHeaderProps } from "react-virtualized";

const colores: { [key: number]: string } = {
  0: "#ccc",
  1: "#06c",
};

const cellRendererFuncionario = ({ cellData }: TableCellProps) => {
  return (
    <TableCell>
      <span style={{ color: colores[cellData] }}>{cellData === 1 ? "FARMA SA" : ""}</span>
    </TableCell>
  );
};
const cellRendererAlianza = ({ cellData }: TableCellProps) => {
  return (
    <TableCell>
      <span style={{ color: colores[cellData] }}>{cellData === 1 ? "Alianza" : ""}</span>
    </TableCell>
  );
};

const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

export { headerRenderer, cellRenderer, cellRendererFuncionario, cellRendererAlianza };

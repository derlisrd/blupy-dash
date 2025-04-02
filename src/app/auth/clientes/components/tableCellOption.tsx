import { IconButton } from "@mui/material";
import { ClientesResults } from "@/services/dto/clientes/clientes";
import TableCell from "@/components/ui/tableCell";
import Icon from "@/components/ui/icon";

interface TableCellOptionsProps {
  rowData: ClientesResults;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, row: ClientesResults) => void;
}

function TableCellOptions({ rowData, onMenuOpen }: TableCellOptionsProps) {
  return (
    <TableCell>
      <IconButton onClick={(event) => onMenuOpen(event, rowData)}>
        <Icon>caret-down</Icon>
      </IconButton>
    </TableCell>
  );
}

export default TableCellOptions;

// components/table/GenericTable.tsx

import { Table, Column, TableHeaderProps, TableCellProps } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import { SxProps, Theme, Box } from "@mui/material";
import { ColumnConfigType } from "@/core/types/columnsconfig";
import { styled } from "@mui/material/styles";

const StyledTableContainer = styled(Box)(({ theme }) => ({
  "& .ReactVirtualized__Table__headerRow": {
    borderRadius: "5px",
    textTransform: "uppercase",
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
  },
  "& .ReactVirtualized__Table__row": {
    padding: "0 14px",
    cursor: "pointer",
    transition: "background-color 0.1s ease",
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.paper,
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
      borderRadius: "12px",
    },
  },
}));

function TableCellHead({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "pointer",
        height: 48,
        backgroundColor: "primary.main",
        color: "white",
        padding: "0 0 0 14px",
      }}
    >
      {children}
    </Box>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        height: 48,
        paddingLeft: 1,
      }}
    >
      {children}
    </Box>
  );
}


interface GenericTableProps<T> {
  data: T[];
  columns: ColumnConfigType[];
  rowHeight?: number;
  headerHeight?: number;
  sx?: SxProps<Theme>;
  minHeight?: number;
}

const defaultHeaderRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const defaultCellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

function GenericTable<T extends object>({ data, columns, rowHeight = 48, headerHeight = 48, sx, minHeight = 190 }: GenericTableProps<T>) {
  return (
    <StyledTableContainer sx={{ minHeight: `calc(100% - ${headerHeight + minHeight}px)`, ...sx }}>
      {data && (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={rowHeight!}
              headerHeight={headerHeight!}
              rowStyle={{ display: "flex", alignItems: "center" }}
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
            >
              {columns.map((column) => (
                <Column
                  key={column.dataKey}
                  headerRenderer={column.headerRenderer || defaultHeaderRenderer}
                  cellRenderer={column.cellRenderer || defaultCellRenderer}
                  dataKey={column.dataKey}
                  label={column.label}
                  width={Number(column.width)}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      )}
    </StyledTableContainer>
  );
}

export default GenericTable;




import { TableCellProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { Stack, Tooltip, IconButton, Typography } from "@mui/material";

import Icon from "@/components/ui/icon";
import { ColumnConfigType } from "@/core/types/columnsconfig";
import TableHeadRender from "@/components/table/tableheadrender";
import TableCellRender from "@/components/table/tablecellrender";
import { useUsersContext } from "../provider";
import { AdminResults } from "@/services/dto/auth/admin";

const AccionesCell = (rowData: AdminResults) => {
    const { handleModal, setSelectedAdmin } = useUsersContext()


    return (
        <Stack direction="row">
            <Tooltip title="Editar" placement="top" arrow>
                <IconButton onClick={() => { }}>
                    <Icon>edit</Icon>
                </IconButton>
            </Tooltip>
            <Tooltip title="Permisos" placement="top" arrow>
                <IconButton onClick={() => { setSelectedAdmin(rowData); handleModal('permisos') }}>
                    <Icon>user-square-rounded</Icon>
                </IconButton>
            </Tooltip>
        </Stack>
    );
};

export const productosColumnConfig = (width: number): ColumnConfigType[] => [
    { dataKey: "id", label: "ID", width: width * 0.1 },
    { dataKey: "name", label: "Nombre", width: width * 0.2 },
    { dataKey: "email", label: "Correo", width: width * 0.3 },
    { dataKey: "role", label: "Rol", width: width * 0.2 },
    {
        dataKey: "created_at",
        label: "Fecha",
        width: width * 0.18,
        cellRenderer: ({ rowData }: TableCellProps) => <Typography variant="caption">{format(rowData.created_at, "DD-MMM-YY")}</Typography>,
    },
    {
        dataKey: "_",
        label: "Acciones",
        width: width * 0.2,
        cellRenderer: ({ rowData }: TableCellProps) => <AccionesCell {...rowData} />,
    },
];





const columns = (): ColumnConfigType[] =>
    productosColumnConfig(window.innerWidth).map((config) => ({
        ...config,
        headerRenderer: TableHeadRender,
        cellRenderer: config.cellRenderer || TableCellRender,
    }));

export default columns;

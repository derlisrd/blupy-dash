import {  TableCellProps,TableHeaderProps } from "react-virtualized";
export type ColumnConfigType = {
    dataKey: string;
    label: string;
    width: number | string;
    cellRenderer?: TableCellProps["cellRenderer"];
    headerRenderer?: TableHeaderProps["headerRenderer"];
  }
  
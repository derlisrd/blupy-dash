import { Box } from "@mui/material";

const TableCellHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "pointer",
        height: 48,
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      {children}
    </Box>
  );
};

export default TableCellHead;

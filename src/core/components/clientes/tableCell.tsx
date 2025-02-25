import { Box } from "@mui/material";

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "pointer",
        height: 48,
      }}
    >
      {children}
    </Box>
  );
};

export default TableCell;

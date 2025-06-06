import { Box, Container, LinearProgress, Slide, Typography } from "@mui/material";
import { useUsersContext } from "./provider";
import GenericTable from "@/components/table/generictable";
import columns from "./_components/columns";

function MainUsers() {

  const { isLoading, users } = useUsersContext()


  return <Container>
    <Typography variant="h5" mt={2}>Usuarios moderadores</Typography>
    {isLoading ? (
      <LinearProgress />
    ) : (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box>
          <GenericTable data={users} columns={columns()} rowHeight={40} headerHeight={36} />
        </Box>
      </Slide>
    )}
  </Container>
}

export default MainUsers;
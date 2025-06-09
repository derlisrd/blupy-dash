import { Box, Button, Container, LinearProgress, Slide, Stack, Typography } from "@mui/material";
import { useUsersContext } from "./provider";
import GenericTable from "@/components/table/generictable";
import columns from "./_components/columns";
import Icon from "@/components/ui/icon";

function MainUsers() {

  const { isLoading, users, handleModal } = useUsersContext()


  return <Container>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
      <Typography variant="h5" mt={2}>Usuarios moderadores</Typography>
      <Button onClick={() => handleModal("add")} endIcon={<Icon>users-plus</Icon>} variant="contained">
        Agregar
      </Button>
    </Stack>
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
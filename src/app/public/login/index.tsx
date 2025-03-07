import Icon from "@/components/ui/icon";
import useLogin from "@/core/hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";
import { TextField, Stack, Button, Typography, Container, InputAdornment, CircularProgress, Alert, IconButton } from "@mui/material";

function Login() {
  const { username, setUsername, password, setPassword, handleLogin, isLoading, error, hide, toggleHide } = useLogin();
  const { loading } = useAuth();

  return (
    <Container maxWidth="md">
      {isLoading || loading ? (
        <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <CircularProgress />
        </Stack>
      ) : (
        <form onSubmit={handleLogin}>
          <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <Stack gap={2} p={3} boxShadow={5} borderRadius={3} maxWidth={360} width="100%" alignItems="center" sx={{ border: "1px solid #efefef" }}>
              <Typography variant="button" fontSize={20}>
                INGRESAR
              </Typography>
              {error.code > 0 && <Alert severity="error">{error.message}</Alert>}

              <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon size={18}>mail</Icon>
                      </InputAdornment>
                    ),
                  },
                }}
                autoFocus
                required
                type="email"
                variant="outlined"
                placeholder="Email"
                label="Email"
                fullWidth
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
                value={username}
              />
              <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon size={18}>lock</Icon>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleHide}>
                          <Icon>{hide ? `visibility_off` : `visibility`}</Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
                placeholder="Contraseña"
                label="Contraseña"
                type={hide ? `password` : `text`}
                fullWidth
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
                id="password_user"
                value={password}
              />
              <Button variant="contained" type="submit" size="large">
                Ingresar
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Container>
  );
}

export default Login;

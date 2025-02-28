import useDrawerMenu from "@/hooks/useDrawerMenu";

import { Drawer, Box, Toolbar, Stack, Icon, IconButton, Tooltip } from "@mui/material";
import { NavigateOptions, Outlet, To, useNavigate } from "react-router-dom";
import MenuNavList from "./MenuNavList";

function AuthMenuLayout() {
  const navigate = useNavigate();
  const { isOpenMenu, toggleMenu, isOpenMobileMenu, toggleMobileMenu, DRAWER_WIDTH } = useDrawerMenu();

  const out = () => navigate("/logout");

  const margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : "0";
  const width_main = isOpenMenu ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%";

  const navegar = (to: To, isMobile: boolean, options?: NavigateOptions) => {
    navigate(to, options);
    isMobile && toggleMobileMenu();
  };

  const TopBar = () => {
    return (
      <Toolbar
        component="header"
        sx={{
          position: "fixed",
          display: "flex",
          width: "100%",
          backdropFilter: "blur(5px)",
          zIndex: 1100,
          alignItems: "center",
          boxShadow: 12,
          borderRadius: 4,
          backgroundColor: "primary.contrastText",
        }}
      >
        <Stack justifyContent="space-between" flexDirection="row" width="100%" alignItems="center">
          <IconButton onClick={toggleMobileMenu} sx={{ minWidth: "48px", display: { xs: "block", md: "none" } }}>
            <Icon color="primary">arrow_forward_ios</Icon>
          </IconButton>
          <IconButton onClick={toggleMenu} sx={{ minWidth: "50px", marginLeft: margin_left, display: { xs: "none", md: "block", transition: "all 0.2s" } }}>
            <Icon color="primary">{isOpenMenu ? "arrow_forward_ios" : "arrow_back_ios"}</Icon>
          </IconButton>
          <Stack flexDirection="row">
            <IconButton onClick={out}>
              <Tooltip placement="bottom" arrow title="Cerrar sesión">
                <Icon>exit_to_app</Icon>
              </Tooltip>
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    );
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "primary.darker", minHeight: "100vh", position: "fixed", top: 0, right: 0, width: "100%" }}>
      <Drawer
        variant="persistent"
        open={isOpenMenu}
        onClose={toggleMenu}
        sx={{
          display: { xs: "none", md: "block" },

          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            backgroundColor: "primary.darker",
            width: DRAWER_WIDTH,
            borderRight: "0",
          },
        }}
      >
        <MenuNavList navegar={navegar} />
      </Drawer>
      <Drawer
        variant="temporary"
        closeAfterTransition
        open={isOpenMobileMenu}
        onClose={toggleMobileMenu}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { bosmizing: "border-box", width: DRAWER_WIDTH, bgcolor: "primary.darker" },
        }}
      >
        <MenuNavList navegar={navegar} isMobile />
      </Drawer>

      <TopBar />
      <Box
        sx={{
          paddingTop: "64px",
          paddingLeft: 0,
          paddingRight: 0,
          width: { xs: "100%", md: width_main },
          marginLeft: { xs: 0, md: margin_left },
          transition: "all 0.2s",
          bgcolor: "primary.contrastText",
          borderRadius: 5,
          position: "relative",
          overflow: "auto",
          flexGrow: 1,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AuthMenuLayout;

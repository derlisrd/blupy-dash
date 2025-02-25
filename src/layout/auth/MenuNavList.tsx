import "simplebar-react/dist/simplebar.min.css";
import { Fragment } from "react";
import SimpleBar from "simplebar-react";
import { Toolbar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Icon, Typography, ListItemButtonBaseProps, Stack, Avatar } from "@mui/material";

import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import menu from "@/constants/menu";

const MenuNavList = ({ isMobile = false, navegar }: { isMobile?: boolean; navegar: (to: string, mobile: boolean) => void }) => {
  const { pathname } = useLocation();
  const { userData } = useAuth();

  const SELECTED = {
    "&.Mui-selected": {
      borderRadius: "18px",
      margin: "0",
      borderLeftStyle: "solid",
      background: "primary.main",
      borderLeftWidth: "0px",
      borderLeftColor: "#fff",
      backgroundColor: "primary.main",
      span: { fontWeight: "bold", color: "#fff" },
      "&:hover": {
        backgroundColor: "primary.main",
        color: "#fff",
        span: { color: "#fff" },
      },
    },
    "&:hover": {
      borderRadius: "18px",
      backgroundColor: "primary.main",
      color: "#fff",
      span: { color: "#fff" },
    },
  } as ListItemButtonBaseProps["sx"];

  return (
    <SimpleBar forceVisible="y" autoHide={true} style={{ maxHeight: "100vh" }}>
      <Toolbar>
        <Stack gap={1} mt={1} direction="column" alignItems="center" justifyContent="center" width="100%">
          <Typography variant="overline" sx={{ fontWeight: "bold" }}>
            BLUPY DASHBOARD
          </Typography>
          <Stack direction="column" justifyContent="center" alignItems="center" gap={1}>
            <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }} />
            <Typography variant="caption">{userData && userData.name}</Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <List sx={{ px: 1 }}>
        {menu.map((e) => (
          <Fragment key={e.id}>
            <ListItem disablePadding>
              <ListItemButton selected={pathname === e.url} onClick={() => navegar(e.url ?? "#", isMobile)} sx={SELECTED}>
                <ListItemIcon>
                  <Icon>{e.icon}</Icon>
                </ListItemIcon>
                <ListItemText>{e.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </SimpleBar>
  );
};

export default MenuNavList;

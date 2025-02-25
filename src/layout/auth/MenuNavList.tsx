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
      borderRadius: "0 18px 18px 0",
      margin: "0",
      borderLeftStyle: "solid",
      background: "#253248",
      borderLeftWidth: "0px",
      color: "white",
      borderLeftColor: "#253248",
      div: { color: "white" },
      span: { fontWeight: "bold", color: "white" },
    },
    span: {
      color: "white",
    },
    color: "white",
    ":hover": {
      borderRadius: "0 18px 18px 0",
      background: "primary.main",
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
            <Typography variant="caption" sx={{ color: "white" }}>
              {userData && userData.email}
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <List>
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

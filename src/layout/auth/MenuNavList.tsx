import "simplebar-react/dist/simplebar.min.css";
import { Fragment, useState } from "react";
import SimpleBar from "simplebar-react";
import { Toolbar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Icon, Typography, ListItemButtonBaseProps, Stack, Avatar, Collapse } from "@mui/material";

import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import menu from "@/constants/menu";

const MenuNavList = ({ isMobile = false, navegar }: { isMobile?: boolean; navegar: (to: string, mobile: boolean) => void }) => {
  const { pathname } = useLocation();
  const { userData } = useAuth();
  const [lista, setLista] = useState(menu);

  const SELECTED = {
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
    color: "primary.contrastText",
    "&.Mui-selected": {
      margin: "0",
      borderLeftStyle: "solid",
      backgroundColor: "primary.contrastText",
      span: { fontWeight: "normal", color: "primary.main" },
      "&:hover": {
        backgroundColor: "primary.contrastText",
        color: "primary.main",
        span: { color: "primary.main" },
      },
    },
    "&:hover": {
      backgroundColor: "primary.contrastText",
      color: "primary.main",
      span: { color: "primary.main" },
    },
    span: { color: "primary.contrastText" },
  } as ListItemButtonBaseProps["sx"];

  const openCollapseMenu = (sw: boolean, id: number) => {
    const array = [...lista];
    const index = array.findIndex((e) => e.id === id);
    array[index].open = !sw;
    setLista(array);
  };

  return (
    <SimpleBar forceVisible="y" autoHide={true} style={{ maxHeight: "100vh" }}>
      <Toolbar>
        <Stack gap={1} mt={1} direction="column" alignItems="center" justifyContent="center" width="100%">
          <Typography variant="overline" sx={{ fontWeight: "bold" }} color="primary.contrastText">
            BLUPY DASHBOARD
          </Typography>
          <Stack direction="column" justifyContent="center" alignItems="center" gap={1}>
            <Avatar sx={{ width: 48, height: 48 }} />
            <Typography variant="caption" color="primary.contrastText">
              {userData && userData.name}
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <List>
        {menu.map((e) => (
          <Fragment key={e.id}>
            {e.submenu != null ? (
              <Fragment>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => openCollapseMenu(e.open, e.id)} sx={SELECTED}>
                    <ListItemIcon>
                      <Icon>{e.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={e.title} />
                    <Icon>{e.open ? `expand_less` : `keyboard_arrow_right`} </Icon>
                  </ListItemButton>
                </ListItem>
                <Collapse in={e.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ paddingLeft: 1 }}>
                    {e.submenu.map((elem) => (
                      <ListItem disablePadding key={elem.id}>
                        <ListItemButton sx={SELECTED} selected={pathname === elem.url} onClick={() => navegar(elem.url ?? "#", isMobile)}>
                          <ListItemIcon>
                            <Icon> {pathname === elem.url ? "arrow_drop_down" : "arrow_right"}</Icon>
                          </ListItemIcon>
                          <ListItemText primary={elem.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Fragment>
            ) : (
              <ListItem disablePadding>
                <ListItemButton selected={pathname === e.url} onClick={() => navegar(e.url ?? "#", isMobile)} sx={SELECTED}>
                  <ListItemIcon>
                    <Icon>{e.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText>{e.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </Fragment>
        ))}
      </List>
    </SimpleBar>
  );
};

export default MenuNavList;

import { Box, Container, Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, List, ListItem, Menu, MenuButton, MenuItem, MenuList, Spacer, useDisclosure } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon,ArrowRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import userDataHook from "../../store/user_data_store";
import { menuList } from "../../utils/menu_list";




function MainPageAuth() {
    const {logOutUserData} = userDataHook()
    const { isOpen, onOpen, onClose,onToggle } = useDisclosure()
 

    return (
        <>
        <Flex p='4' borderBottomWidth={1} >
        <Box>
        <IconButton onClick={onOpen} aria-label='menu' icon={<HamburgerIcon color='black' boxSize={6} />} />
        </Box>
        <Spacer />
        <Box >

        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<ChevronDownIcon />}
                variant='outline'
            />
            <MenuList>
                <MenuItem icon={<ArrowRightIcon />} onClick={()=>{ logOutUserData(false) }} >
                    Cerrar sesión
                </MenuItem>
            </MenuList>
            </Menu>


        </Box>
        </Flex>
        <Container maxW='8xl' padding='4' marginX='auto'>
            <Outlet />
        </Container>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
                <List sx={{ marginTop:12,marginLeft:12 }}>
                    {
                        menuList.map(e=>(
                            <ListItem key={e.id} sx={{ marginTop:2 }} onClick={onToggle} >
                                <Link style={{ padding:8 }} to={e.link}>{e.label}</Link>
                            </ListItem>
                        ))
                    }
                </List>
            </DrawerContent>
        </Drawer>
        </>
    );
}

export default MainPageAuth;
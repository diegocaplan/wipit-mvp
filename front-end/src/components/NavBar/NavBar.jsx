import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, Grid, GridItem, Box, Spacer, Img } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { NotificationIcon } from "./NotificationIcon";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { clearUser } from "../../redux/reducers/registerReducer/registerAction";
import { clearRoom } from "../../redux/reducers/roomReducer/roomActions";

export const NavBar = () => {
    const { push } = useHistory()
    const user = useSelector((state) => state.registerReducer.user)
    const dispatch = useDispatch()

    function logOut(e) {
        localStorage.setItem("user", null);
        push("/")
        dispatch(clearUser());
        dispatch(clearRoom());
    }

    return (
        <Grid alignItems="center" justifyContent="center" templateColumns="repeat(8, 1fr)" px="5vw" gap="2vw" color="white" bgGradient="linear(to-r, #ef2e64, #fc2464,#cc345c,#9c445c)">
            <HamburgerIcon w={8} h={8} />
            <NavLink to="/home">
                BackLog
            </NavLink>
            <NavLink to="/myboard">
                Mis tareas
            </NavLink>
            <GridItem colStart={7} colSpan={2}>
                <Flex alignContent="center">
                    <NotificationIcon />
                    <Spacer />
                    <NavLink to={`/user/${user.userName}`}>
                        <Box m="0.2vw"><Img boxSize="10" borderRadius="100%" src={user.image} alt="foto perfil" /></Box>
                    </NavLink>
                    <Spacer />
                    <Button variant="unstyled" onClick={logOut}>Log Out</Button>

                </Flex>
            </GridItem>
        </Grid>
    )
}
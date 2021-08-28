import React, { useEffect } from "react";
import { Box, ChakraProvider, Grid } from "@chakra-ui/react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Landing } from "./components/Landing/Landing.jsx";
import { MyBoard } from "./components/MyBoard/MyBoard.jsx";
import Backlog from "./components/Backlog/Backlog.jsx";
import { myNewTheme } from "./styles/theme";
import { NavBar } from "./components/NavBar/NavBar.jsx";
import { UrlError } from "./components/UrlError/UrlError.jsx";
import { useSelector } from "react-redux";
import { UserProfile } from "./components/UserProfile/UserProfile.js";
import Chat from "./components/Chat/Chat";
import AdminPage from "./components/AdmingPage/AdminPage.jsx";
import axios from "axios";
import { logInUser } from "./redux/reducers/registerReducer/registerAction.js";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Footer } from "./components/Footer/Footer.jsx";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm.jsx";

function App() {
  const reduxUser = useSelector((store) => store.registerReducer.user);
  const room = useSelector((store) => store.roomReducer.room);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { push } = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken !== null) {
      axios
        .get("http://localhost:3001/auth/decrypt", {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        })
        .then((response) => {
          if (response) {
            dispatch(logInUser(response.data));
            if (location.pathname === "/") {
              push("/home");
            }
          }
        });
    }
  }, []);

  return (
    <ChakraProvider theme={myNewTheme}>
      <Box
        zIndex="-2"
        fontFamily="nunito"
        bg={location.pathname === "/" ? "white" : "blueBg"}
      >
        <Switch>
          <>
          <Route exact path="/" component={Landing} />
          {userToken ? (
            <Grid templateRows="9vh auto">
              <NavBar />
              <Switch>
                <Route exact path="/userProfile" component={UserProfile} />
                <Route exact path="/myboard" component={MyBoard} />
                <Route
                  exact
                  path="/home"
                  component={reduxUser.role !== "admin" ? Backlog : AdminPage}
                />
                <Route exact path="/feedback" component={FeedbackForm} />
                <Route
                  exact
                  path="/user/:userName"
                  render={({ match }) => (
                    <UserProfile userNameUrl={match.params.userName} />
                  )}
                />
                <Route path="/*" component={UrlError} />
              </Switch>
            </Grid>
          ) : (
            <Redirect to="/" />
          )}
          </>
        </Switch>
        {room && reduxUser.name ? <Chat room={room}></Chat> : null}
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;

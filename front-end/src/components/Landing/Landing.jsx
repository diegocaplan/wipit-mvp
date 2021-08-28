import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Center,
  Button,
  Text,
  Grid,
  Img,
} from "@chakra-ui/react";
import Register from "../Forms/Register";
import Login from "../Forms/Login";
import style from "./Landing.module.css";
import logo from "../../logos/logo_blanco.png";
import step1 from "./step1.jpg";
import step2 from "./step2.jpg";
import step3 from "./step3.jpg";
import { ArrowBackIcon, DownloadIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router";

export const Landing = () => {
  const [show, setShow] = useState("initial");
  const [renderComponent, setRenderComponent] = useState("register");
  const [user, setUser] = useState();
  const location = useLocation();
  const [btnStyle, setBtnStyle] = useState({
    registerBg: "black",
    registerC: "white",
    loginBg: "white",
    loginC: "black",
  });
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    let timeoutArray = [];
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    if (
      loggedInUser != null &&
      show === "initial" &&
      document.getElementsByClassName("demo").length > 0
    ) {
      var txt = `SOMOS EL PRIMER BACKLOG GLOBAL DE PAIR PROGRAMMING
      
      [Entry mode; press Ctrl+D to save in browser; press Ctrl+U for welcome]
    
      ### Sirve para juniors que buscan practicar y aprender con colegas en la misma situación.
      ### Y para semiseniors y seniors que quieran colaborar con otros.
  
      - Desarrollo
      - Testeos
      - Despliegues
      - Bases de datos
      - todos los lenguajes...
      
      --Pequeñas tareas resuleven grandes problemas.
  
      ### En Wipit puedes buscar tareas para ayudar a otros desarrolladores
      ### o crear pequeñas tareas en las que necesites ayuda y contactar a otros colegas.
      
      start --now --name wipit --time today
      
      [[[-----------------------WIPIT started----------------------------]]]`;
      var speed = 60;

      function typeItOut() {
        let code = document.getElementsByClassName("demo")[0];
        for (let i = 0; i < txt.length; i++) {
          if (location.pathname !== "/") {
            return "????????????";
          }
          timeoutArray.push(
            setTimeout(() => {
              if (code) {
                code.innerHTML += txt.charAt(i);
              }
              else return null
            }, speed * i)
          );
        }
      }
      setTimeout(typeItOut, 1800);
    }
    return {
      function() {
        timeoutArray.forEach((element) => {
          clearTimeout(element);
        });
      },
    };
  }, []);

  return (
    <Box bg="white">
      {(show === "initial" && (
        <Box h="100%">
          <Box
            background="#f8f8fa"
            h="25%"
            w="100%"
            position="absolute"
            zIndex="0"
          >
            <Flex justify="flex-end" paddingRight="5vh" pt="0.5%">
              <Button
                marginTop="auto"
                variant="link"
                onClick={() => {
                  setBtnStyle({
                    ...btnStyle,
                    registerBg: "white",
                    registerC: "black",
                    loginBg: "black",
                    loginC: "white",
                  });
                  setShow("start");
                  setRenderComponent("login");
                }}
                _hover={{ color: "#f95959" }}
                justify="flex-end"
                color="black"
                mr="2%"
              >
                <u className={style.link}>Ingresa</u>
              </Button>

              <Button
                marginTop="auto"
                variant="link"
                onClick={() => {
                  setBtnStyle({
                    ...btnStyle,
                    registerBg: "black",
                    registerC: "white",
                    loginBg: "white",
                    loginC: "black",
                  });
                  setShow("start");
                  setRenderComponent("register");
                }}
                _hover={{ color: "#f95959" }}
                color="black"
              >
                <u className={style.link}> Registrate</u>
              </Button>
            </Flex>
          </Box>
          <Center
            flexDirection="column"
            justify="center"
            w="100%"
            paddingTop="auto"
            zIndex="10"
          >
            <p className={style.wipit_title}>WIPIT BOARD</p>
            <Text zIndex="100" m="1%">
              El primer backlog para pair programming
            </Text>
          </Center>
          <Center flexDirection="column">
            <Box
              w="60vw"
              h="75vh"
              borderColor="black"
              position="center"
              marginBottom="5vh"
              borderRadius="4px"
              background="#232323"
              color="white"
              p="2%"
              fontFamily="monospace"
              fontSize="sm"
              zIndex="100"
              display="block"
            >
              <pre className={style.heroterminalPre}>
                <code class="demo">wipit ~ $ </code>
              </pre>
            </Box>
          </Center>
          <Center></Center>
          <Center></Center>
          <Center>
            <Flex
              justify="center"
              flexDirection="column"
              alignContent="space-between"
              justifyContent="center"
              w="70%"
              justifyItems="center"
            >
              <Text fontSize="18.72px" fontFamily="Nunito Sans, sans-serif">
                <strong>¿Cómo funciona?</strong>
              </Text>
              <Box display="inline-block">
                <Box className={style.step}>
                  <h5>
                    <strong> Únete o sube tareas</strong>
                  </h5>
                  <Img src={step1} alt="step1" borderRadius="13px" />
                </Box>
                <Box className={style.step}>
                  <h5>
                    <strong> Chatea con tu compañero</strong>{" "}
                  </h5>
                  <Img src={step2} alt="step2" borderRadius="13px" />
                </Box>
                <Box className={style.step}>
                  <h5>
                    <strong> Comienza a hacer pair programming</strong>{" "}
                  </h5>
                  <Img src={step3} alt="step3" borderRadius="13px" />
                </Box>
              </Box>
              <Grid templateColumns="repeat(3, 2fr)">
                <Box m="10px 10px 10px 10px">
                  <Text className={style.infotitle}> Rápido & Liviano</Text>
                  <Text className={style.info}>
                    No necesita instalación. Estás en el mejor backlog del
                    mundo. Comienza a programar de a pares.
                  </Text>
                </Box>
                <Box m="10px 10px 10px 10px">
                  <Text className={style.infotitle}> Compartir pantalla</Text>
                  <Text className={style.info}>
                    Se encuentran en un meet y comienzan a ayudarse.
                  </Text>
                </Box>
                <Box m="10px 10px 10px 10px">
                  <Text className={style.infotitle}> Seguro</Text>
                  <Text className={style.info}>
                    Encripta tus ideas. Nadie puede acceder a tus secretos.
                    ¡Sólo comparte pantalla!
                  </Text>
                </Box>
                <Box m="10px 10px 10px 10px">
                  <Text className={style.infotitle}> Configuración segura</Text>
                  <Text className={style.info}>
                    No necesita instalación. Estás en el mejor backlog del
                    mundo. Comienza a programar de a pares.
                  </Text>
                </Box>
                <Box m="10px 10px 10px 10px">
                  <Text className={style.infotitle}> Limpio & Listo</Text>
                  <Text className={style.info}>
                    Haz descripciones limpias y claras para todos. Puedes
                    trabajar con juniors o seniors.
                  </Text>
                </Box>
                <Box m="10px 10px 10px 10px">
                  <Text className={style.infotitle}> Beta gratis</Text>
                  <Text className={style.info}>
                    Estamos aquí para aprender, practicar y ayudar. Armemos una
                    comunidad. Te necesitamos a ti, tu trabajo, tu experiencia y
                    tu feedback.
                  </Text>
                </Box>
              </Grid>
            </Flex>
          </Center>

          <Center>
            <Text className={style.textStart}>
              ¡Comienza tus tareas pendientes ahora mismo!
            </Text>
          </Center>
          <br />
          <Center>
            <button
              className={style.getStarted}
              onClick={() => {
                setShow("start");
              }}
            >
              Empezar
            </button>
          </Center>
        </Box>
      )) ||
        (show === "start" && (
          <Center flexDirection="column">
            <Flex flexDir="column" align="center" p="2%">
              <Img src={logo} w="20%" />
              <Text fontSize="2xl" fontWeight="bold">
                WIPIT BOARD
              </Text>

              <Text fontWeight="bold">
                Primer backlog para pair programming
              </Text>
            </Flex>
            <Box transform="scale(1.3) translateX(-12%)" pt="3.5%">
              <Flex>
                <Flex pb="60vh" justify="center" flexDirection="column">
                  <Button
                    color="black"
                    bgColor="transparent"
                    _hover={{
                      color: "grey",
                    }}
                    className={style.back}
                    onClick={() => {
                      setShow("initial");
                    }}
                  >
                    <ArrowBackIcon />
                  </Button>
                  <Button
                    className={style.btns}
                    borderBottomRadius="none"
                    bg={btnStyle.loginBg}
                    color={btnStyle.loginC}
                    _hover={{
                      bgColor: "black",
                      color: "white",
                    }}
                    onClick={() => {
                      setBtnStyle({
                        ...btnStyle,
                        registerBg: "white",
                        registerC: "black",
                        loginBg: "black",
                        loginC: "white",
                      });
                      setRenderComponent("login");
                    }}
                  >
                    👥Ingresa
                  </Button>
                  <Button
                    className={style.btns}
                    borderBottomRadius="none"
                    mt={20}
                    _hover={{
                      bgColor: "black",
                      color: "white",
                    }}
                    bg={btnStyle.registerBg}
                    color={btnStyle.registerC}
                    _hover={{
                      bgColor: "black",
                      color: "white",
                    }}
                    onClick={() => {
                      setBtnStyle({
                        ...btnStyle,
                        registerBg: "black",
                        registerC: "white",
                        loginBg: "white",
                        loginC: "black",
                      });
                      setRenderComponent("register");
                    }}
                  >
                    <DownloadIcon /> Registrate
                  </Button>
                </Flex>
                <Flex
                  alignItems="flex-start"
                  borderColor="white"
                  justify="center"
                  h="max-content"
                  p="5vh"
                  boxShadow="2xl"
                  borderWidth="1px"
                  borderRadius="xl"
                >
                  {renderComponent === "register" ? (
                    <Flex>
                      <Register />
                      <code class="demo" style={{ display: "none" }}>
                        wipit ~ ${" "}
                      </code>
                    </Flex>
                  ) : (
                    <Flex>
                      <Login user={user} />
                      <code class="demo" style={{ display: "none" }}>
                        wipit ~ ${" "}
                      </code>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Center>
        ))}
    </Box>
  );
};

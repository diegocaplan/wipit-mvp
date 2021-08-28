import { Flex, Button, Input, Text, Checkbox } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ChangePassword from "../Forms/ResetPassword";
import style from "./Forms.module.css";
import GoogleLogin from "react-google-login";
import { logInUser } from "../../redux/reducers/registerReducer/registerAction";
import { useDispatch } from "react-redux";

export default function Login({ user }) {
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const { push } = useHistory();
  const dispatch = useDispatch();

  let errors = {};
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!emailRegex.test(email) && email.length > 0) {
    errors.email = "Email inválido";
  }

  useEffect(() => {
    if (user) {
      setLoggedInUser(user);
    }
  }, [user]);

  function handleChange(e) {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        setValidation({ ...validation, email: false });
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    return axios
      .get(`http://localhost:3001/user/getUsers?email=${email}`)
      .then((response) => {
        if (response.data !== null && response.data.email === email) {
          if (response.data.deleted === false) {
            if (response.data.password === password) {
              setLoggedInUser(response.data);

              //aca iria la accion
              dispatch(logInUser(response.data));
              // window.location.href = "http://localhost:3000/home";
              axios
                .post("http://localhost:3001/auth/login", { password, email })
                .then((response) => {
                  if (rememberMe) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                  }
                  setEmail("");
                  setPassword("");
                  push("/home");
                });
            } else {
              setValidation({ ...validation, password: true });
            }
          } else {
            alert("Lo sentimos, pero tu usuario esta bloqueado/borrado.");
          }
        } else {
          setValidation({ ...validation, email: true });
        }
      });
  }

  const responseGoogle = (response) => {
    const googleInfo = response.profileObj;
    axios
      .get(`http://localhost:3001/user/getUsers?email=${googleInfo.email}`)
      .then((response) => {
        if (response.data && response.data.googleId === googleInfo.googleId) {
          if (response.data.deleted === false) {
            dispatch(logInUser(response.data));
            axios
              .post("http://localhost:3001/auth/login", {
                email: googleInfo.email,
              })
              .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                push("/home");
              });
          } else {
            alert("Lo sentimos, pero tu usuario esta bloqueado/borrado.");
          }
          // window.location.href = "http://localhost:3000/home";
        } else {
          alert(
            "Este usuario de google no se reconoce. Por favor, ve a la seccion de Registrarse."
          );
        }
      });
  };

  function handleCheckbox(state) {
    switch (state) {
      case true:
        setRememberMe(false);
        break;
      case false:
        setRememberMe(true);
        break;
      default:
        return state;
    }
  }

  function logOut(e) {
    setLoggedInUser("");
    localStorage.setItem("user", null);
    window.location.reload();
  }

  return loggedInUser ? (
    <div>
      <div>Hola de vuelta, {loggedInUser.userName}</div>
      <Button onClick={(e) => logOut(e)}>Este no es mi usuario.</Button>
    </div>
  ) : (
    <Flex flexDirection="column" alignItems="center">
      <Flex w="100%">
        <Text fontWeight="semibold" mb="2vh">
          Ingresa a tu cuenta
        </Text>
      </Flex>
      <GoogleLogin
        clientId="651810898365-7ap37qb7o9h3r9acfj2fgpfq8mjffb4t.apps.googleusercontent.com"
        buttonText="Ingresa con Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <Text color="gray.400" m="2vh" fontSize="sm">
        or
      </Text>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <Flex flexDirection="column">
          {errors.email ? (
            <p className={style.invalidInputAlert}>{errors.email}</p>
          ) : null}
          {validation.email ? (
            <p className={style.invalidInputAlert}>
              No existe usuarios registrados con este email
            </p>
          ) : null}
          <Input
            w="20em"
            mt="1vh"
            variant='flushed'
            className={style.inputs}
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Tu E-mail"
          />
          {validation.password ? (
            <p className={style.invalidInputAlert}>Contraseña incorrecta</p>
          ) : null}
          <Input
            mt="1vh"
            variant='flushed'
            className={style.inputs}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <Flex m="1vh" flexDir="column" alignItems="flex-end">
            <ChangePassword type="landing" />
          </Flex>

          <Checkbox
            size="sm"
            checked={rememberMe}
            onChange={(e) => handleCheckbox(rememberMe)}
          >
            Recuérdame
          </Checkbox>

          <Input
            w="20vh"
            size="sm"
            border="none"
            bg="wipit"
            color="white"
            boxShadow="lg"
            mt="1vh"
            type="submit"
            value="Ingresar"
          />
        </Flex>
      </form>
    </Flex>
  );
}

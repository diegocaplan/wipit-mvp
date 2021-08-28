import { Flex, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { createUser } from "../../redux/reducers/registerReducer/registerAction";
import style from "./Forms.module.css";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [validators, setValidators] = useState({
    email: false,
    userName: false,
    password: false,
  });
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const dispatch = useDispatch();
  const { push } = useHistory();

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const onlyLettersAndSpaces = /^[a-zA-Z\u00C0-\u017F\s]*$/;
  let errors = {};
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{6,15}$/;

  if ((!passwordRegex.test(password) || password.length < 8) && password.length > 0) {
    errors.password = "Debe tener: mínimo 8 caracteres, una mayúscula, una mínuscula y un número.";
  }

  if (!emailRegex.test(email) && email.length > 0) {
    errors.email = "Dirección de correo inválida";
  }

  if (!onlyLettersAndSpaces.test(name)) {
    errors.name = "Solo se permiten letras y espacios";
  }

  if (!onlyLettersAndSpaces.test(lastName)) {
    errors.lastName = "Solo se permiten letras y espacios";
  }

  function handleChange(e) {
    switch (e.target.name) {
      case "userName":
        setUserName(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "passwordRepeat":
        setPasswordRepeat(e.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (errors.email || errors.password) {
      if (errors.email && errors.password) {
        alert("Email y contrasena incorrectos");
      } else {
        if (errors.email) {
          alert("Dirección de email incorrecta");
        }
        if (errors.password) {
          alert("Contraseña incorrecta");
        }
      }
    } else if (password !== passwordRepeat) {
      return setValidators({ ...validators, password: true });
    } else {
      axios.get(`http://localhost:3001/user/getUsers?email=${email}`)
        .then((response) => {
          if (response.data === null) {
            return axios.get(`http://localhost:3001/user/getUsers?userName=${userName}`)
              .then((response) => {
                if (response.data === null) {
                  dispatch(createUser({ userName, name, lastName, password, email }));
                  axios.post("http://localhost:3001/auth/login", {
                    password,
                    email,
                  })
                    .then((response) => {
                      localStorage.setItem(
                        "user",
                        JSON.stringify(response.data)
                      );
                    });

                  /* axios
                    .get(`http://localhost:3001/user/getUsers?email=${email}`)
                    .then((response) => {
                      localStorage.setItem(
                        "user",
                        JSON.stringify(response.data)
                      );
                    }); */

                  setUserName("");
                  setName("");
                  setLastName("");
                  setPassword("");
                  setEmail("");
                  setPasswordRepeat("");
                  setValidators({
                    ...validators,
                    email: false,
                    userName: false,
                    password: false,
                  });
                  push("/home");
                  // window.location.href = "http://localhost:3000/home";
                } else {
                  setValidators({ ...validators, userName: true });
                }
              });
          } else {
            setValidators({ ...validators, email: true });
          }
        });
    }
  }

  const responseGoogle = (response) => {
    const googleInfo = response.profileObj;

    const googleUserName =
      googleInfo.givenName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase() +
      "_" +
      uuidv4().slice(0, 7);
    const googleUser = {
      userName: googleUserName,
      name: googleInfo.givenName,
      lastName: googleInfo.familyName,
      password: null,
      googleId: googleInfo.googleId,
      email: googleInfo.email,
      image: googleInfo.imageUrl,
    };
    axios.get(`http://localhost:3001/user/getUsers?email=${googleUser.email}`)
      .then((response) => {
        if (response.data !== null) {
          alert("Tu cuenta ya se encuentra vinculada con google. Ve a Login.");
        } else {
          dispatch(createUser(googleUser));
          axios.post("http://localhost:3001/auth/login", {
            email: googleInfo.email,
          })
            .then((response) => {
              localStorage.setItem("user", JSON.stringify(response.data));
            });
          push("/home");
          // window.location.href = "http://localhost:3000/home";
        }
      });
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex w="100%">
        <Text fontWeight="semibold" mb="2vh">
          Completa el formulario de registro
        </Text>
      </Flex>

      <GoogleLogin
        clientId="651810898365-7ap37qb7o9h3r9acfj2fgpfq8mjffb4t.apps.googleusercontent.com"
        buttonText="Regístrate con Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <Text color="gray.400" m="2vh" fontSize="sm">
        or
      </Text>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <Flex flexDirection="column">
          {validators.userName && (
            <p className={style.invalidInputAlert}>
              this username already exists.
            </p>
          )}
          <Input
            w="20em"
            mt="1vh"
            variant='flushed'
            className={style.inputs}
            type="text"
            name="userName"
            value={userName}
            isRequired
            onChange={handleChange}
            placeholder="Username"
          />
          {errors.name && (
            <Text className={style.invalidInputAlert}>{errors.name}</Text>
          )}
          <Input
            mt="1vh"
            variant='flushed'
            className={style.inputs}
            type="text"
            name="name"
            value={name}
            isRequired
            onChange={handleChange}
            placeholder="Nombres"
          />
          {errors.lastName && (
            <Text className={style.invalidInputAlert}>{errors.lastName}</Text>
          )}
          <Input
            mt="1vh"
            variant='flushed'
            className={style.inputs}
            type="text"
            name="lastName"
            value={lastName}
            isRequired
            onChange={handleChange}
            placeholder="Apellidos"
          />

          {errors.email && (
            <Text className={style.invalidInputAlert}>{errors.email}</Text>
          )}
          {validators.email && (
            <Text className={style.invalidInputAlert}>
              Este mail ya existe!
            </Text>
          )}
          <Input
            mt="1vh"
            variant='flushed'
            className={style.inputs}
            type="text"
            name="email"
            value={email}
            isRequired
            onChange={handleChange}
            placeholder="E-mail"
          />
          {errors.password && (
            <Text className={style.invalidInputAlert}>{errors.password}</Text>
          )}
          <Input
            mt="1vh"
            variant='flushed'
            className={style.inputs}
            type="password"
            name="password"
            value={password}
            isRequired
            onChange={handleChange}
            placeholder="Contraseña"
          />
          {validators.password && (
            <p className={style.invalidInputAlert}>Contraseña incorrecta</p>
          )}
          <Input
            mt="1vh"
            variant='flushed'
            className={style.inputs}
            type="password"
            name="passwordRepeat"
            value={passwordRepeat}
            isRequired
            onChange={handleChange}
            placeholder="Repetir contraseña"
          />
          <Input
            border="none"
            bg="wipit"
            color="white"
            boxShadow="lg"
            mt="5vh"
            type="submit"
            value="Completar Registro"
          />
        </Flex>
      </form>
    </Flex>
  );
}

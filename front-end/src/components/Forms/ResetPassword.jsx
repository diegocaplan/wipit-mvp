import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import style from "./Forms.module.css";

export default function ChangePassword({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");
  const [validate, setValidate] = useState({ full: true });
  const [equal, setEqual] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [valCode, setValCode] = useState("");
  const [show, setShow] = useState("emailPopup");

  let errors = {};
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{6,15}$/;
  if (!emailRegex.test(email) && email.length > 0) {
    errors.email = "Email inválido";
  }
  if (
    (!passwordRegex.test(password) || password.length < 8) &&
    password.length > 0
  ) {
    errors.password =
      "Debe tener: mínimo 8 caracteres, una mayúscula, una minúscula y un número.";
  }
  if (repeatPassword.length > 0 && repeatPassword !== password) {
    errors.equal = "Las contraseñas deben ser iguales";
  }

  useEffect(() => {
    setValCode(uuidv4().slice(0, 6));
  }, []);

  function handleChange(e) {
    switch (e.target.name) {
      case "email":
        setValidate({ ...validate, full: true });
        setEmail(e.target.value);
        break;
      case "goBack":
        setShow("emailPopup");
        break;
      case "tryAgain":
        setShow("emailPopup");
        break;
      case "register":
        window.location.reload();
        break;
      case "sentCode":
        setEqual(true);
        setSentCode(e.target.value);
        break;
      case "password":
        setValidate({ ...validate, full: true });
        setPassword(e.target.value);
        break;
      case "repeatPassword":
        setEqual(true);
        setrepeatPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (email.length === 0 || errors.email) {
      setValidate({ ...validate, full: false });
    } else {
      switch (show) {
        case "emailPopup":
          return axios
            .get(`http://localhost:3001/user/getUsers?email=${email}`)
            .then((response) => {
              if (response.data !== null && response.data.email === email) {
                const credentials = { email: email, code: valCode };
                axios.post("http://localhost:3001/user/sendEmail", credentials);
                setValidate(true);
                setShow("valCode");
              } else {
                setValidate(false);
                setShow("emailPopupError");
                setEmail("");
              }
            });
        case "valCode":
          if (sentCode === valCode) {
            setShow("changePassword");
          } else {
            setEqual(false);
          }
          break;
        case "changePassword":
          if (password === repeatPassword && password.length > 0) {
            const newPasswordCredentials = { email: email, password: password };
            axios.put(
              "http://localhost:3001/user/changePassword",
              newPasswordCredentials
            );
            alert("Contraseña actualizada");
          } else if (password.length === 0) {
            setValidate({ ...validate, full: false });
          } else {
            setEqual(false);
          }
          break;
        default:
          return show;
      }
    }
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {type === 'landing' ? <Button variant="link" size="xs" colorScheme="red" fontSize="sm">Olvidé mi contraseña</Button> : <Button size="xs" fontSize="sm">Cambiar contraseña</Button>}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {(show === "emailPopup" && (
              <div>
                {type === 'landing' ? <PopoverHeader>Recupera tu cuenta</PopoverHeader> : <PopoverHeader>Cambiar tu contraseña</PopoverHeader>}
                Ingresa tu email para buscar tu cuenta.
                {errors.email ? (
                  <p className={style.invalidInputAlert}>{errors.email}</p>
                ) : null}
                <Input
                  autoComplete="off"
                  placeholder="E-mail"
                  size="sm"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                {validate.full === false ? (
                  <p className={style.invalidInputAlert}>
                    Ingresa un email válido
                  </p>
                ) : null}
                <Button colorScheme="teal" size="xs" onClick={handleSubmit}>
                  Buscar
                </Button>
              </div>
            )) ||
              (show === "emailPopupError" && (
                <div>
                  <PopoverHeader>Error: Email no encontrado</PopoverHeader>
                  No tenemos ningun usuario registrado con ese email.
                  <br />
                  <Button
                    colorScheme="teal"
                    size="xs"
                    onClick={handleChange}
                    name="tryAgain"
                  >
                    Intentar de nuevo
                  </Button>
                  <Button
                    color="teal"
                    size="xs"
                    name="register"
                    onClick={handleChange}
                  >
                    Registrate
                  </Button>
                </div>
              )) ||
              (show === "valCode" && (
                <div>
                  <PopoverHeader>Valida tu correo</PopoverHeader>
                  Te enviamos un correo a {email} con un código. Ingresalo aqui
                  para poder cambiar tu contraseña
                  {sentCode.length > 0 && !equal ? (
                    <p className={style.invalidInputAlert}>Codigo Invalido</p>
                  ) : null}
                  <Input
                    autoComplete="off"
                    placeholder="Tu código"
                    size="sm"
                    name="sentCode"
                    value={sentCode}
                    onChange={handleChange}
                  />
                  <Button
                    colorScheme="teal"
                    size="xs"
                    onClick={handleChange}
                    name="goBack"
                  >
                    Atrás
                  </Button>
                  <Button
                    colorScheme="teal"
                    size="xs"
                    onClick={handleSubmit}
                    name="validate"
                  >
                    Seguir
                  </Button>
                </div>
              )) ||
              (show === "changePassword" && (
                <div>
                  <PopoverHeader>Cambiar contraseña</PopoverHeader>
                  {errors.password ? (
                    <p className={style.invalidInputAlert}>{errors.password}</p>
                  ) : null}
                  {validate.full === false ? (
                    <p className={style.invalidInputAlert}>
                      Ingresa una nueva contraseña
                    </p>
                  ) : null}
                  <Input
                    autoComplete="off"
                    type="password"
                    placeholder="Nueva contraseña"
                    size="sm"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  {!equal ? (
                    <p className={style.invalidInputAlert}>
                      Las contraseñas deben ser iguales
                    </p>
                  ) : null}
                  <Input
                    autoComplete="off"
                    type="password"
                    placeholder="Repite contraseña"
                    size="sm"
                    name="repeatPassword"
                    value={repeatPassword}
                    onChange={handleChange}
                  />
                  <Button
                    colorScheme="teal"
                    size="xs"
                    onClick={handleSubmit}
                    name="changePassword"
                  >
                    Cambiar contraseña
                  </Button>
                </div>
              ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}

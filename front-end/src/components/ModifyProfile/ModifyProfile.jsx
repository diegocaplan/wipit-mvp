import React, { useState, useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  Button,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { modifyUser } from "../../redux/reducers/registerReducer/registerAction";
import { useDispatch } from "react-redux";

export const ModifyProfile = ({ infoName, userEmail, userNameUrl }) => {
  const initRef = useRef();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [basicProfileInfoInput, setBasicProfileInfoInput] = useState({
    image: "",
    name: "",
    lastName: "",
  });
  const [errorImg, setErrorImg] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleChangeProfile(e) {
    if (e.target.name === "image") {
      let files = e.target.files;
      let reader = new FileReader();
      if (files[0] !== undefined) {
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
          setBasicProfileInfoInput({
            ...basicProfileInfoInput,
            image: e.target.result,
          });
        };
        setErrorImg("");
      } else {
        return null;
      }
    } else {
      setBasicProfileInfoInput({
        ...basicProfileInfoInput,
        [e.target.name]: e.target.value,
      });
    }
  }

  function onClick(e) {
    e.preventDefault();
    switch (infoName) {
      case "profile":
        if (
          (basicProfileInfoInput.image !== "" &&
            !basicProfileInfoInput.image.includes("data:image")) ||
          basicProfileInfoInput.image.length > 48500
        ) {
          setErrorImg("El archivo tiene que ser una imagen menor a 50kb");
        } else {
          let basicUserInfo = {
            email: userEmail,
            image: basicProfileInfoInput.image,
            name: basicProfileInfoInput.name,
            lastName: basicProfileInfoInput.lastName,
          };

          for (let propName in basicUserInfo) {
            if (basicUserInfo[propName] === "") {
              delete basicUserInfo[propName];
            }
          }
          dispatch(modifyUser(basicUserInfo));
          setErrorImg("");
        }
        break;
      default:
        let userInfo = {
          email: userEmail,
          [infoName]: input,
        };
        dispatch(modifyUser(userInfo));

        break;
    }
  }

  function deleteImg(e) {
    e.preventDefault();
    const defaultImg = {
      email: userEmail,
      image:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png",
    };
    dispatch(modifyUser(defaultImg));
  }

  return (
    <Popover initialFocusRef={initRef}>
      <PopoverTrigger onClick={(e) => setIsOpen(true)}>
        <Button variant="ghost" size="xs" w="1vh" fontSize="sm">
          <EditIcon w={6} h={6} color="red.500"/>
        </Button>
      </PopoverTrigger>
      {infoName === "profile" ? (
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader>Información Básica del Perfil</PopoverHeader>
          <PopoverBody>
            <Text>Cambiar foto de perfil: </Text>
            {errorImg !== "" ? <Text>{errorImg}</Text> : null}
            <Input
              type="file"
              name="image"
              onChange={(e) => handleChangeProfile(e)}
            />
            <Button
              variant="link"
              size="sm"
              color="red.500"
              onClick={(e) => deleteImg(e)}
            >
              Borrar foto de perfil
            </Button>
            <Input
              type="text"
              placeholder="Nombres"
              name="name"
              onChange={(e) => handleChangeProfile(e)}
              value={basicProfileInfoInput.name}
            />
            <Input
              type="text"
              placeholder="Apellidos"
              name="lastName"
              onChange={(e) => handleChangeProfile(e)}
              value={basicProfileInfoInput.lastName}
            />
            <Button
              variant="outline"
              bg="green.300"
              onClick={(e) => onClick(e)}
            >
              Modificar
            </Button>
          </PopoverBody>
        </PopoverContent>
      ) : (
        <PopoverContent>
          <PopoverHeader>Modificar Perfil</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {infoName === "description" ? (
              <Textarea
                placeholder="..."
                onChange={(e) => handleChange(e)}
                value={input}
              />
            ) : (
              <Input
                placeholder="..."
                onChange={(e) => handleChange(e)}
                value={input}
              />
            )}
            <Button marginTop="2px" bg="green.300" onClick={(e) => onClick(e)}>
              Modificar
            </Button>
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};

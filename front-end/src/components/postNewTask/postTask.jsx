import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getLanguages } from "../../redux/reducers/languageReducer/languageAction";
import { createTask } from "../../redux/reducers/taskReducer/taskActions";
import {
  Box,
  Flex,
  Input,
  Select,
  Button,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast,
  Tooltip,
} from "@chakra-ui/react";

export default function PostTask() {
  const toast = useToast();
  const [error, setError] = useState({
    title: null,
    description: null,
    languages: null,
    purpose: null,
    area: null,
    difficulty: null,
    howlong: null,
    otherLang: null,
    flag: false
  });
  const [selectedLang, setSelectedLang] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    status: "sprint",
    purpose: "",
    difficulty: "",
    howlong: "",
    otherLang: "",
  });

  const dispatch = useDispatch();
  const user = useSelector(state => state.registerReducer.user)
  const languages = useSelector((store) => store.languageReducer.languages);
  const [area, setArea] = useState(null)
  const [gc, setGc] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:3001/globalconstants")
      .then((gc) => setGc(gc.data))

    dispatch(getLanguages(area));
  }, [area, dispatch]);

  function validate(e) {
    if (e.target.name === "languages") {
      if (selectedLang === null || selectedLang.length <= 0) {
        return setError({ ...error, languages: "select a language", flag: true });
      } else return setError({ ...error, languages: null, flag: false });
    } else {
      if (e.target.value === null || e.target.value === "") {
        return setError({ ...error, [e.target.name]: "campo obligatorio", flag: true });
      } else {
        return setError({ ...error, [e.target.name]: null, flag: false });
      }
    }
  }

  function handleInputChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    e.preventDefault();
    let lang = e.target.value.split(",");
    var i = selectedLang.length;
    var flag = false;
    while (i--) {
      if (selectedLang[i].name === lang[0]) return (flag = true);
    }
    if (flag) return;
    var pack = { id: lang[1], name: lang[0] };
    setError({ ...error, languages: null });
    return setSelectedLang([...selectedLang, pack]);
  }

  const onClose = (e) => {
    e.preventDefault();
    let newLangs = selectedLang.filter((l) => l.id !== e.target.value);
    setSelectedLang(newLangs);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (error.flag === false && inputs.title !== '') {
      toast({
        title: "Tarea Creada!.",
        description: "Tu Tarea se ha creado correctamente!.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      dispatch(
        createTask({ ...inputs, area: area, userName: user.userName, languages: selectedLang && selectedLang.map((l) => l.id) })
      );
      setInputs({
        title: "",
        description: "",
        status: "sprint",
        purpose: "",
        area: "",
        difficulty: "",
        howlong: "",
        otherLang: ""
      });
      setSelectedLang([]);
      e.target.reset();
      window.location.href = "http://localhost:3000/myboard"
    } else {
      toast({
        title: "Tu Tarea no ha podido ser creada.",
        description: "Por favor, completa el formulario.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Box align="center" bgGradient="wipitHeader">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="stat">
          <Input
            size="sm"
            rounded="10px"
            variant="filled"
            m="5px"
            p="5px"
            focusBorderColor="pink.400"
            name="title"
            type="text"
            value={inputs.title}
            placeholder="Escribe el titulo de tu tarea..."
            onChange={handleInputChange}
            onKeyUp={validate}
            onBlur={validate}
          />
          {error.title ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.title}!</AlertTitle>
            </Alert>
          ) : null}
        </div>
        <div className="stat">
          <Textarea
            size="lg"
            m="5px"
            p="5px"
            rounded="10px"
            variant="filled"
            focusBorderColor="pink.400"
            name="description"
            type="text"
            value={inputs.description}
            placeholder="Escribe una descripción para tu tarea..."
            onChange={handleInputChange}
            onKeyUp={validate}
            onBlur={validate}
          />
          {error.description ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.description}!</AlertTitle>
            </Alert>
          ) : null}
        </div>

        <div className="stat">
          <Select
            name="area"
            m="5px"
            p="5px"
            onChange={(e) => setArea(e.target.value)}
            placeholder="--selecciona un area--"
            onBlur={validate}
          >
            {gc &&
              gc.AREA.map((element, i) => element ?
                <option key={i} value={element}>{element}</option> : null
              )}
          </Select>
          {error.area ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.area}!</AlertTitle>
            </Alert>
          ) : null}
        </div>

        {selectedLang.length < 3 ? (
          <Select
            name="languages"
            onBlur={(e) => validate(e)}
            m="5px"
            p="5px"
            onChange={handleSelect}

          >

            <option>--selecciona lenguajes--</option>
            {languages &&
              languages.map(l =>
                <option key={l.id} value={[l.name, l.id]}>{l.name}</option>
              )}

          </Select>
        ) : null}
        <div>
          {error.languages ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.languages}!</AlertTitle>
            </Alert>
          ) : null}

          {selectedLang
            ? selectedLang.map((l) => {
              return (
                <Button
                  colorScheme="pink"
                  m="5px"
                  p="5px"
                  variant="solid"
                  onClick={onClose}
                  key={l.name}
                  value={l.id}
                >
                  {l.name}
                </Button>
              );
            })
            : null}
          {selectedLang.length > 0 && selectedLang[0].id === "18" ?
            <Input
              size="sm"
              rounded="10px"
              variant="filled"
              m="5px"
              p="5px"
              focusBorderColor="pink.400"
              name="otherLang"
              type="text"
              value={inputs.otherLang}
              placeholder="escriba el lenguaje"
              onChange={handleInputChange}
              onKeyUp={validate}
              onBlur={validate}
            />
            : null}
          {error.otherLang ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.otherLang}!</AlertTitle>
            </Alert>
          ) : null}

        </div>

        <div className="stat">
          <Select
            name="purpose"
            onChange={handleInputChange}
            placeholder="--selecciona un proposito--"
            onBlur={validate}
            m="5px"
            p="5px"
          >
            {gc && gc.PURPOSE.map((element, i) => <option value={element} key={i}>{element}</option>)}
          </Select>
          {error.purpose ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.purpose}!</AlertTitle>
            </Alert>
          ) : null}
        </div>
        <div className="stat">
          <Select
            name="difficulty"
            onChange={handleInputChange}
            placeholder="--estima una dificultad--"
            onBlur={validate}
            m="5px"
            p="5px"
          >
            {gc && gc.DIFFICULTY.map((element, i) => <option value={element} key={i}>{element}</option>)}
          </Select>
          {error.difficulty ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.difficulty}!</AlertTitle>
            </Alert>
          ) : null}
        </div>

        <div className="stat">
          <Select
            name="howlong"
            onChange={handleInputChange}
            placeholder="--estima un tiempo--"
            onBlur={validate}
            m="5px"
            p="5px"
          >
            {gc && gc.HOWLONG.map((element, i) => <option value={element} key={element}>{element}</option>)}
          </Select>
          {error.howlong ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.howlong}!</AlertTitle>
            </Alert>
          ) : null}
        </div>
        <Flex align="flex-start" justify="flex-start">
          <Tooltip placement="auto" label="Post" aria-label="A tooltip">
            <Button
              alignSelf="flex-start"
              justifySelf="flex-start"
              type="submit"
              variant="primary"
            >
              Publicar en backlog
            </Button>
          </Tooltip>
        </Flex>
      </form>
    </Box>
  );
}

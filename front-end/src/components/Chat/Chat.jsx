import React, { useEffect, useState, useRef } from 'react'
import socket from './socket';
import style from "./chat.module.css"
import { useSelector, useDispatch } from "react-redux";
import {
  Flex,
  Input,
  Button,
  Icon,
  Text
} from "@chakra-ui/react";
import { AiOutlineVideoCamera, AiOutlineSend } from "react-icons/ai"
import { FaRegWindowMinimize } from "react-icons/fa"
import { clearRoom } from "../../redux/reducers/roomReducer/roomActions"

function Chat({ room }) {

  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [jitsi, setJitsi] = useState("")
  const usuario = useSelector(state => state.registerReducer.user.userName)
  const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  const dispatch = useDispatch()
  const [chatDisplay, setChaDisplay] = useState(true)

  const hashCode = function (str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    str = "W" + str + "B"
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    hash = "https://meet.jit.si/Wipit_Board_" + hash
    return hash;
  };

  useEffect(() => {
    setJitsi(hashCode(room))
  })

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });


  useEffect(() => {
    socket.emit("conectado", usuario, room)
    socket.emit("joinRoom", room)
  }, [usuario, room])


  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });
    return () => {
      socket.off();
    };
  }, [mensajes]);


  useEffect(() => {
    socket.on("getHistory", (mensaje) => {
      setMensajes(mensaje);
    })
  }, [room])

  const submit = (e) => {
    e.preventDefault();
    if (mensaje === "") return;
    else {
      socket.emit("mensaje", usuario, mensaje, room);
      setMensaje("");
    }
  };

  function changeDisplay() {
    if (chatDisplay) return setChaDisplay(false)
    setChaDisplay(true)
  }
  function closeChat() {
    dispatch(clearRoom())
  }

  return (<div className={style.container}>
    <Flex className={style.header}><Text align="end" m="3px" colorScheme="blackAlpha">Wipit Chat</Text><div><Button onClick={changeDisplay} variant="wipit" color={"black"}><Icon as={FaRegWindowMinimize} /></Button><Button onClick={closeChat} variant="wipit" color={"black"}><Text fontSize="x-large">x</Text></Button></div></Flex>
    <Flex display={chatDisplay ? "flex" : "none"} className={style.chat} flexDirection="column">
      {mensajes.map((e, i) => (
        <div key={i} className={e.nombre === usuario ? style.msgCont : style.msgContAssign}>
          <div className={style.msgAuthor}>{e.nombre}: <span className={style.msgHora}>{e.hora && e.hora.slice(0, e.hora.length - 3)}</span> </div>
          <div className={style.msgTxt} ><p>{regex.test(e.mensaje) ? <a style={{ color: "blue", textDecoration: "underline" }} href={e.mensaje.includes("http://") ? `${e.mensaje}` : `http://${e.mensaje}`} rel="noopener noreferrer" target="_blank">{e.mensaje}</a> : <span>{e.mensaje}</span>}</p></div>
        </div>
      ))}
      <div ref={divRef}></div>
    </Flex>

    <Flex display={chatDisplay ? "flex" : "none"} w={"40vw"} justifyContent="flex-start">
      <form onSubmit={submit} >
        <Input
          placeholder="escriba su mensaje"
          name=""
          id=""
          cols="30"
          rows="10"
          width="25vw"
          h="40px"
          m="10px"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></Input>
        {mensaje !== "" ? <Button type="submit" h="40px" w="5vw" variant="primary" ><Icon as={AiOutlineSend} /></Button> : <Button h="40px" width="5vw" variant="secondary"><Icon as={AiOutlineSend} /></Button>}
        <Button variant="primary" h="40px" w="5vw"><a href={jitsi} target="_blank" rel="noopener noreferrer"><Icon w={6} h={6} as={AiOutlineVideoCamera} /></a></Button>
      </form>
    </Flex>

  </div>
  )
}

export default Chat

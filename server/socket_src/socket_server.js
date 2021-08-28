const socketio = require("socket.io");
const {
  postMessage,
  getMessagesByRoom,
  changeDatabaseDatetime,
  getNotificationsByUser,
  getReceiverUserName,
  getTaskTitle,
  getCreatorName,
  markAsSeenForUser,
  postNotification,
} = require("./utils");

function socket_server(expressServer) {
  const io = socketio(expressServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("notification", async (creatorUserName, taskId, type) => {
      let receiverUserName = await getReceiverUserName(taskId, type);
      await postNotification(creatorUserName, receiverUserName, taskId, type);
      let taskTitle = await getTaskTitle(taskId);
      let creatorName = await getCreatorName(creatorUserName);

      io.to(receiverUserName).emit("notification", {
        creatorUserName,
        creatorName,
        taskId,
        taskTitle,
        type,
      });
    });

    socket.on("joinNotificationsRoom", async (userName) => {
      socket.join(userName);
      const getAllNotifications = await getNotificationsByUser(userName);
      socket.emit("getAllNotifications", getAllNotifications);
    });

    //cuandor abre la noti front manda evento -> se marca como leido
    socket.on("markAsSeen", async (userName) => {
      markAsSeenForUser(userName);
    });

    socket.on("joinRoom", async (room) => {
      socket.join(room);
      const mensajes = await getMessagesByRoom(room);
      const mensajeChanged = mensajes.map((m) => {
        return {
          nombre: m.author_id,
          mensaje: m.content,
          hora: changeDatabaseDatetime(m.createdAt),
        };
      });
      socket.emit("getHistory", mensajeChanged);
    });

    //variables para almacenar la información a enviar
    let nombre;
    let room;

    socket.on("conectado", (nomb, ro) => {
      //cuando se conecta guardo la info
      nombre = nomb;
      room = ro;
      //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
      socket.to(room).emit("mensajes", {
        nombre: "Servidor",
        mensaje: `${nombre} ha entrado en la sala del chat`,
      });
    });

    socket.on("mensaje", (nombre, mensaje, room) => {
      postMessage(mensaje, room, nombre);
      //io.emit manda el mensaje a todos los clientes conectados al chat
      const time = Date.now();
      const hora = new Date(time).toLocaleString();
      io.to(room).emit("mensajes", { nombre, mensaje, hora });
    });

    socket.on("disconnect", () => {
      io.to(room).emit("mensajes", {
        nombre: "Servidor",
        mensaje: `${nombre} ha abandonado la sala de la tarea ${room}`,
      });
    });
  });
}

module.exports = socket_server;

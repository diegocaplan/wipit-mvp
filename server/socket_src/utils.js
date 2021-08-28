const { TASK_NOTIFICATION_TYPES } = require("../global_constants");
const { Message, Notification, Task, User } = require("../src/db");

async function getMessagesByRoom(room) {
  try {
    const messages = await Message.findAll({
      where: {
        task_id: room,
      },
    });
    if (messages) return messages;
    return { msg: "no hay mensajes que mostrar" };
  } catch (error) {
    console.log(error);
  }
}

async function postMessage(content, room, user, status = "enviado") {
  try {
    const newMessage = await Message.create({
      content,
      task_id: room,
      status,
    });
    (await user) && newMessage.setWriter(user);
    return newMessage;
  } catch (error) {
    console.log(error);
  }
}

function changeDatabaseDatetime(datetime) {
  timeStamp = datetime.toLocaleString();
  return timeStamp;
}

async function getNotificationsByUser(userName) {
  try {
    let notifications = await Notification.findAll({
      where: {
        receiver_id: userName,
      },
      order: [["id", "DESC"]],
    });

    const tasksP = notifications.map((n) => {
      return Task.findOne({
        where: {
          id: n.task_id,
        },
      }).then((t) => t);
    });
    const tasks = await Promise.all(tasksP);

    const creatorsP = notifications.map((n) => {
      return User.findOne({
        where: {
          userName: n.creator_id,
        },
      }).then((u) => u);
    });
    const creators = await Promise.all(creatorsP);

    notifications = notifications.map((n, i) => ({
      creatorUserName: creators[i].userName,
      creatorName: creators[i].name,
      taskId: tasks[i].id,
      taskTitle: tasks[i].title,
      type: n.type,
      seen: n.seen,
    }));

    return notifications;
  } catch (error) {
    console.log(error);
  }
}

async function getReceiverUserName(taskId, type) {
  try {
    let task = await Task.findOne({
      where: {
        id: taskId,
      },
      include: {
        model: User,
        as: "author",
      },
      include: {
        model: User,
        as: "assigned",
      },
    });
    if (type === TASK_NOTIFICATION_TYPES[2]) {
      return task.author_id;
    } else {
      return task.assigned[0].userName;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTaskTitle(taskId) {
  try {
    let task = await Task.findOne({
      where: {
        id: taskId,
      },
    });
    return task.title;
  } catch (error) {
    console.log(error);
  }
}

async function getCreatorName(creatorUserName) {
  try {
    let creator = await User.findByPk(creatorUserName);
    return creator.name;
  } catch (error) {
    console.log(error);
  }
}

async function markAsSeenForUser(receiverUserName) {
  const notifications = await Notification.findAll({
    where: {
      receiver_id: receiverUserName,
    },
  });
  notifications.forEach((n) => {
    n.seen = true;
    n.save();
  });
}

async function postNotification(
  creatorUserName,
  receiverUserName,
  taskId,
  type
) {
  try {
    const newNotification = await Notification.create({
      type,
      seen: false,
    });
    newNotification.setCreator(creatorUserName);
    newNotification.setReceiver(receiverUserName);
    newNotification.setTask(taskId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMessagesByRoom,
  postMessage,
  changeDatabaseDatetime,
  getNotificationsByUser,
  getReceiverUserName,
  getTaskTitle,
  getCreatorName,
  markAsSeenForUser,
  postNotification,
};

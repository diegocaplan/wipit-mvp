const Router = require("express");
const router = Router();
const TasksRoute = require("./tasks/tasks");
const TaskRoute = require("./task/task");
const UserRoute = require("./users/users");
const LanguagesRoute = require("./languages/languages");
const AuthRoute = require("./auth/auth");
const globalconstantsRoute = require("./globalconstants/globalconstants");
const MessagesRoute = require("./messages/messages");
const FeedbackRoute = require("./feedback/feedback");


router.get("/", (_req, res) => {
  res.send("wipit api");
});
router.use("/task", TaskRoute);
router.use("/languages", LanguagesRoute);
router.use("/tasks", TasksRoute);
router.use("/user", UserRoute);
router.use("/globalconstants", globalconstantsRoute);
router.use("/auth", AuthRoute);
router.use("/messages", MessagesRoute);
router.use("/feedback", FeedbackRoute);


module.exports = router;

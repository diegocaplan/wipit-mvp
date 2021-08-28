const STATUS = ["sprint", "in progress", "done", "archived"];
const AREA = [
  "frontend",
  "backend",
  "database",
  "console/terminal",
  "plugins",
  "cms",
  "framework",
  "architecture",
  "",
];
const DIFFICULTY = ["easy", "medium", "moderate", "hard", "almost impossible"];
const PURPOSE = [
  "set up",
  "ask a quick question",
  "practice",
  "develop",
  "test",
  "debug",
  "deploy",
];
const HOWLONG = ["15m", "30m", "45m", "1h", "1.5h", "2h", "3h", "4h"];
const TASK_NOTIFICATION_TYPES = [
  "archived",
  "reviewed",
  "activated",
  "finished",
];

module.exports = {
  STATUS,
  AREA,
  DIFFICULTY,
  PURPOSE,
  HOWLONG,
  TASK_NOTIFICATION_TYPES,
};

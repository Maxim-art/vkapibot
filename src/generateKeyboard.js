const { Keyboard } = require("vk-io");
// import { Keyboard } from "vk-io";

const generateKeyboard = Keyboard.builder()
  .textButton({
    label: "Обновить клаву 🎮",
    payload: {
      command: "start",
    },
  })
  .row()
  .textButton({
    label: "f1 🙀",
    payload: {
      answer: "ans 1 🙀",
      command: "setAnswer",
    },
    color: Keyboard.PRIMARY_COLOR,
  })
  .textButton({
    label: "f2 👀",
    payload: {
      answer: "ans 2 👀",
      command: "setAnswer",
    },
    color: Keyboard.PRIMARY_COLOR,
  });

module.exports = { generateKeyboard };
// export { generateKeyboard };

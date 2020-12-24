require("dotenv").config();
const { VK, Keyboard, getRandomId } = require("vk-io");
const { HearManager } = require("@vk-io/hear");
// const fs = require("fs");
// const mongoose = require("mongoose");

// const mongoUrl = process.env.MONGO_URL;

// (async () => {
//   const dbConnection = await mongoose.connect(mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: false,
//     // useCreateIndex: true,
//   });

//   const Cat = dbConnection.model("Cat", { name: String });
//   const Some = dbConnection.model("Some", { name: String });

//   // const kitty = new Some({ name: "Zildjian" });
//   // await kitty.save();

//   // await Some.updateOne(
//   //   { name: "Zildjian" },
//   //   { name: "Z1s11ildjian" },
//   //   function (err, result) {
//   //     if (err) return console.log(err);
//   //     // console.log(result);
//   //   }
//   // );

//   // Kitten.find({ name: /^fluff/ }, callback);
//   await Cat.find({}, async function (err, docs) {
//     if (err) return console.log(err);
//     console.log(docs);
//   });

//   await Some.find({}, async function (err, docs) {
//     if (err) return console.log(err);
//     console.log(docs);
//   });

//   await dbConnection.disconnect();
// })();

const GROUP_ID = 102364255;
const vk = new VK({
  token: process.env.VK_TOKEN,
  apiMode: "parallel", // sequential parallel
  pollingGroupId: GROUP_ID,
  apiLimit: 20,
});
const hearManager = new HearManager();

vk.updates.on("message_new", (context, next) => {
  // console.log(context);
  const { messagePayload } = context;
  context.state.command =
    messagePayload && messagePayload.command ? messagePayload.command : null;
  return next();
});
vk.updates.on("message_new", hearManager.middleware);

const hearCommand = (name, conditions, handle) => {
  if (typeof handle !== "function") {
    handle = conditions;
    conditions = [`/${name}`];
  }

  if (!Array.isArray(conditions)) {
    conditions = [conditions];
  }

  hearManager.hear(
    [(text, { state }) => state.command === name, ...conditions],
    handle
  );
};

hearCommand("start", ["/t1est"], (context, next) => {
  // context.state.command = "help";
  return Promise.all([
    context.send({
      message: `Отправляю клавиатуру!`,
      keyboard: Keyboard.builder()
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
        }),
    }),
    next(),
  ]);
});

hearCommand("setAnswer", ["/ответ"], (context, next) => {
  // console.log(context.messagePayload.answer);
  return Promise.all([
    context.send({
      message: `Получено! ${context.messagePayload.answer}`,
    }),
    next(),
  ]);
});

hearManager.hear(
  (value, context) => {
    // console.log(value, context);
    return value.startsWith("temp");
  },
  async (context, next) => {
    //   if (
    //     context.isGroup ||
    //     context.peerType !== "chat" ||
    //     context.senderType !== "user"
    //   )
    //     return;

    //   // context.text - отправленное сообщение
    // let user = await vk.api.users.get({
    //   user_ids: context.senderId,
    // });
    // await context.send(`*id${context.senderId} (${user[0].first_name})`);
    // await context.send(`Ответ для *id${context.senderId} (Пользователя)`);

    await context.send({
      message: `Отправка клавиватуры`,
      keyboard: Keyboard.builder()
        .textButton({
          label: "The help",
          payload: {
            command: "start",
          },
        })
        .row()
        .textButton({
          label: "The current date",
          payload: {
            command: "time",
          },
        })
        .row()
        .textButton({
          label: "Cat photo",
          payload: {
            command: "cat",
          },
          color: Keyboard.PRIMARY_COLOR,
        })
        .textButton({
          label: "Cat purring",
          payload: {
            command: "purr",
          },
          color: Keyboard.PRIMARY_COLOR,
        }),
    });

    await next();
  }
);

vk.updates.start().catch(console.error);

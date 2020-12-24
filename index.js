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
  const { messagePayload } = context;
  context.state.command =
    messagePayload && messagePayload.command ? messagePayload.command : null;
  return next();
});
vk.updates.on("message_new", hearManager.middleware);

hearManager.hear(
  (value, context) => {
    return value.startsWith("!start");
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

    await next();
  }
);

vk.updates.start().catch(console.error);

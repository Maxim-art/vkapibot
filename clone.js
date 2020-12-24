// https://github.com/negezor/vk-io/blob/master/docs/ru/api-reference/contexts/message.md
// https://github.com/negezor/vk-io/blob/d816b2c6/packages/vk-io/src/structures/contexts/message.ts#L322

const { VK, Keyboard } = require("vk-io");
const fs = require("fs");

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
const { Console } = require('console');
const logger = new Console({ stdout: output, stderr: errorOutput });
const count = 5;
logger.log('count: %d', count);

const vk = new VK({
  token:
    "",
  apiMode: "parallel", // sequential parallel
  pollingGroupId: 102364255,
});

const openKeyboard = async ({ context }) => {
  // context.senderId context.text
  await vk.api.messages.send({
    // peer_id: context.peerId,
    peer_id: context.peerId,
    message: "Открываем...",
    keyboard: Keyboard.keyboard([
      [
        Keyboard.textButton({
          label: "b1",
          color: "positive",
          payload: "ok",
        }),
        Keyboard.textButton({
          label: "b2",
          color: "negative",
        }),
        Keyboard.textButton({
          label: "b3",
          color: "primary",
        }),
        Keyboard.textButton({
          label: "b4",
          color: "secondary",
        }),
      ],
      [
        Keyboard.textButton({
          label: "b5",
          color: "positive",
          payload: "ok",
        }),
        Keyboard.textButton({
          label: "b6",
          color: "negative",
        }),
        Keyboard.textButton({
          label: "b7",
          color: "primary",
        }),
        Keyboard.textButton({
          label: "b8",
          color: "secondary",
        }),
      ],
    ]),
  });
};

vk.updates.on("message", async (context, next) => {
  if (context.isGroup) return;
  if (context.peerType !== "chat") return;

  // let user = await vk.api.users.get({
  //   user_ids: context.senderId,
  // });
  // let realAns = context.text.replace(/\[.*?\]\s/g, "");
  // await context.send(
  //   `*id${context.senderId} (${user[0].first_name}) выбрал(а) ${realAns}`
  // );

  // console.log(context);
  // openKeyboard({ context });
  await next();
});

vk.updates.hear(/^hello$/i, async (context) => {
  // /^hello\s(.*)$/i
  let user = await vk.api.users.get({
    user_ids: context.senderId,
  });
  await context.send(
    `message for *id${context.senderId} (${user[0].first_name})`
  );
  // vk.api.messages.send({})
  // return context.send(`message`);
});

vk.updates.hear(/^\/клава$/i, async (context) => {
  openKeyboard({ context });
});

/*
  ------------------------------------------------
*/
const run = async () => {
  // await vk.updates.startPolling();
  await vk.updates.start();
};
run().catch(console.error);
// vk.updates.start(); // console.log(vk.updates.isStarted);
// https://regex101.com/r/SqDccx/1/

// https://github.com/negezor/vk-io/blob/master/docs/ru/api-reference/contexts/message.md
// https://github.com/negezor/vk-io/blob/d816b2c6/packages/vk-io/src/structures/contexts/message.ts#L322
const { VK, Keyboard, getRandomId } = require("vk-io");
const fs = require("fs");

const GROUP_ID = 102364255;
const vk = new VK({
  token:
    "",
  apiMode: "parallel", // sequential parallel
  pollingGroupId: GROUP_ID,
  apiLimit: 20,
});

// const openKeyboard = async ({ context }) => {
//   // context.senderId context.text
//   await vk.api.messages.send({
//     // peer_id: context.peerId,
//     peer_id: context.peerId,
//     message: "Открываем...",
//     keyboard: Keyboard.keyboard([
//       [
//         Keyboard.textButton({
//           label: "b1",
//           color: "positive",
//           payload: "ok",
//         }),
//         Keyboard.textButton({
//           label: "b2",
//           color: "negative",
//         }),
//         Keyboard.textButton({
//           label: "b3",
//           color: "primary",
//         }),
//         Keyboard.textButton({
//           label: "b4",
//           color: "secondary",
//         }),
//       ],
//       [
//         Keyboard.textButton({
//           label: "b5",
//           color: "positive",
//           payload: "ok",
//         }),
//         Keyboard.textButton({
//           label: "b6",
//           color: "negative",
//         }),
//         Keyboard.textButton({
//           label: "b7",
//           color: "primary",
//         }),
//         Keyboard.textButton({
//           label: "b8",
//           color: "secondary",
//         }),
//       ],
//     ]),
//   });
// };

// vk.api.messages
//   .send({
//     // peer_id: context.peerId,
//     peer_id: 2000000000 + 293301,
//     message: "max - test",
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// async function testF() {
//   let conversations = await vk.api.messages.getConversations(); // хранит личные сообщения
//   // conversations.items[0].conversation.peer.id  // ид написавшего
//   console.log(conversations);
//   // let messages = await vk.api.messages.getHistory({
//   //   count: 10,
//   //   peer_id: 2000000002,
//   // });
//   // console.log(messages);
// }
// testF().catch(console.log);

vk.updates.on("message", async (context, next) => {
  // // peer_id: 2000000000 + id беседы
  console.log(context);

  if (context.isGroup) return;
  if (context.peerType !== "chat") return;

  // let history = await vk.api.messages.getHistory({
  //   peer_id: -GROUP_ID,
  //   // count: 5,
  //   // offset: 5,
  // });
  // console.log(history);

  // await vk.api.messages.removeChatUser({
  //   chat_id: GROUP_ID,
  //   user_id: context.senderId
  // })
  // let test = await vk.api.messages.getById({
  //   message_ids: [651, 652, 653, 654],
  // });
  // console.log(test);
  let test = await vk.api.messages.getConversationsById({
    peer_ids: context.peerId,
  });
  console.log(test, test.items[0].peer, test.items[0].sort_id);

  // let conversationmesid = await vk.api.messages.getByConversationMessageId({
  //   peer_id: context.peerId,
  //   conversation_message_ids: [context.conversationMessageId],
  //   group_id: GROUP_ID,
  // });
  // console.log(conversationmesid);

  // let deleted = await vk.api.messages.delete({
  //   message_ids: [context.id],
  //   group_id: GROUP_ID,
  //   delete_for_all: 1,
  // });
  // console.log(deleted);

  // ----------------------------------------------

  // await context.send(
  //   `message for *id${context.senderId}` + `` + `` + `` + `` + `` + ``
  // );

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

// vk.updates.hear(/^hello$/i, async (context) => {
//   // /^hello\s(.*)$/i
//   let user = await vk.api.users.get({
//     user_ids: context.senderId,
//   });
//   await context.send(
//     `message for *id${context.senderId} (${user[0].first_name})`
//   );
//   // vk.api.messages.send({})
//   // return context.send(`message`);
// });

// vk.updates.hear(/^\/клава$/i, async (context) => {
//   openKeyboard({ context });
// });

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

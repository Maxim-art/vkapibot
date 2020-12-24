// vk.api.messages.send({
//   peer_id: context.peerId,
//   random_id: getRandomId(),
//   message: "max - test",
// });

// getConversations - только для личных сообщений в группу
// let conversations = await vk.api.messages.getConversations({
//   // offset: 0,
//   // count: 20,
//   // filter: "all",
//   // extended: 1,
//   // start_message_id: 1,
//   group_id: GROUP_ID,
// });
//   // conversations.items[0].conversation.peer.id  // ид написавшего
// conversations.items.forEach((element) => {
//   console.log(element);
// });

// *** Получение личных сообщений, работает!!!
// let history = await vk.api.messages.getHistory({
//   peer_id: context.peerId, // context.peerId context.senderId // context.conversationMessageId
//   // count: 5,
//   // offset: 5,
// });

// *** Удаление в личных сообщений, работает!!!
// history.items.forEach((element) => {
//   if (element.from_id == -GROUP_ID) {
//     vk.api.messages.delete({
//       message_ids: [element.id],
//       group_id: GROUP_ID,
//       delete_for_all: 1,
//     });
//   }
// });

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

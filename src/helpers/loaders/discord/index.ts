import { Message } from 'discord.js';
import client from './client'

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});
client.on("messageCreate", (msg: Message) => {
  console.log(msg.content)
})
//
// const res = loadData(["1141046406153502733", "1141064439639048213"], client)
// console.log(res)
// client.on('message', async (message: Message) => {
//
//   console.log(message.channel.awaitMessages())
//
// });
//
// const res = client.channels.fetch("1141046406153502733")
// console.log(res)






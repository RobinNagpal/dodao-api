import { Client, IntentsBitField, TextChannel, Message } from 'discord.js';
import dotenv from "dotenv"
import { options } from 'pdfkit';

dotenv.config()
const client = new Client({ intents: IntentsBitField.Flags.Guilds })
client.login(process.env.DISCORD_BOT)

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});
// client.on("message", msg => {
//   console.log(msg)
// })
//
// const res = loadData(["1141046406153502733", "1141064439639048213"], client)
// console.log(res)
client.on('message', async (message: Message) => {

  console.log(message.channel.awaitMessages())

});
//
// const res = client.channels.fetch("1141046406153502733")
// console.log(res)






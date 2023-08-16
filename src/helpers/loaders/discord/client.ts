import { Client, GatewayIntentBits } from "discord.js"
import dotenv from "dotenv"

dotenv.config()
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
client.login(process.env.DISCORD_BOT)

export default client

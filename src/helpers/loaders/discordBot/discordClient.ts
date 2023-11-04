import { Client } from 'discord.js';
import dotenv from 'dotenv';

let client: Client;
async function initialize(): Promise<Client> {
  dotenv.config();
  const localClient = new Client({ intents: [] });
  await localClient.login(process.env.DISCORD_BOT_TOKEN);
  client = localClient;
  return client;
}

export async function getDiscordClient(): Promise<Client> {
  if (!client) {
    client = await initialize();
  }
  return client;
}

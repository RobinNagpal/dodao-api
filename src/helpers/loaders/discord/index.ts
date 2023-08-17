import { TextChannel } from 'discord.js';
import client from './client'
import { loadData } from './discordloader';
// import { loadData } from './discordloader';
// import { DiscordMessage } from '@prisma/client'
// import { prisma } from '@/prisma';
import getChannelId from './getId';

client.on('ready', async () => {
	console.log(`Logged in as ${client.user?.tag}`);
	const channelIds = await getChannelId()
	const results = await loadData(channelIds, client)
	console.log(results)
	// const cha = client.channels.cache.get(channelIds[4]) as TextChannel
	// const messages = await cha?.messages.fetch()
	// messages.map((msg) => {
	// 	// console.log(msg.content)
	// })

});





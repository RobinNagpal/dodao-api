// import { TextChannel } from 'discord.js';
import client from './client'
import { loadData } from './discordloader';
import { PrismaClient, Prisma } from '@prisma/client'
import getChannelId from './getId';
import { Document } from 'langchain/document';
client.on('ready', async () => {
	console.log(`Logged in as ${client.user?.tag}`);
	const channelIds = await getChannelId()
	const results = await loadData(channelIds, client)
	console.log(results)
	sendDiscordMessages(results)

});

async function sendDiscordMessages(results: Document<Record<string, any>>[]) {
	const prisma = new PrismaClient()
	let discordMessage = Prisma.DiscordMessageScalarFieldEnum
	const messages = await prisma.discordMessage.createMany({
		data: results.map((result) => {
			return {
				id: result.metadata.id,
				createdTimestamp: result.metadata.createdTimestamp,
				type: result.metadata.type,
				content: result.pageContent,
				author: result.metadata.author,
				atachments: result.metadata.atachments,
			}
		})
	})

}



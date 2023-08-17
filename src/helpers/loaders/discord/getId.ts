import { Collection, Guild, OAuth2Guild, NonThreadGuildBasedChannel } from "discord.js"
import client from "./client"

function getAllguilds(): Promise<Collection<string, OAuth2Guild>> {
  const guilds = client.guilds.fetch()
  return guilds
}
async function getAllChannels(discordServer: Guild): Promise<Collection<string, NonThreadGuildBasedChannel | null>> {
  const channels = discordServer?.channels.guild.channels //gets all channels in the server

  const res = await channels?.fetch()
  return res
}


async function iterateOverChannels(channel: Collection<string, NonThreadGuildBasedChannel | null>): Promise<string[]> {
  let channelIds: string[] = []
  const res = channel.map(async (item) => {
    // console.log(item?.id)
    channelIds = [...channelIds, item?.id!]
    return item?.id
  })
  return channelIds
}
async function getChannelId(): Promise<string[]> {
  const guilds = await getAllguilds();
  const resPromises = guilds.map(async (guild) => {
    const discordServer = client.guilds.cache.get(guild.id);
    const res = await getAllChannels(discordServer!);
    const Ids = await iterateOverChannels(res)
    return Ids
  });

  const allRes = await Promise.all(resPromises)
  return allRes[0]

}

export default getChannelId

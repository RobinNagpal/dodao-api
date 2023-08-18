import { Document } from 'langchain/document';
import { Client, TextChannel } from 'discord.js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document as LGCDocument } from 'langchain/document';

//This library contains functions to load messages from discord channels

//loadData loads all messages from a discord channel and returns them as an array of Documents
//The metadata of each document contains the following fields:
//id: the id of the message
//createdTimestamp: the timestamp of the message
//type: the type of the message
//check out https://discord.com/developers/docs/resources/channel#message-object-message-types for message types
//content: the content of the message
//author: the author of the message
//atachments: an array of urls of the atachments of the message

export async function loadData(channelIds: string[], BOT: Client): Promise<Document[]> {
  let results: Document[] = [];
  for (let i in channelIds) {
    const channel = BOT.channels.cache.get(channelIds[i]) as TextChannel;
    //https://discord.com/developers/docs/resources/channel#channel-object-channel-types
    if (channel.type == 0) {
      // const channelContent = await readChannel(channel);
      const channelContent = await getMessages(channel)
      // console.log(`Downloaded chats from channel ${cha.name}, ${channelContent.length} messages`);
      results = results.concat(channelContent);
    }
  }
  results = await split(results);
  return results;
}

export interface Metadata {
  id: string;
  serverId: string;
  serverName: string;
  channelId: string;
  channelName?: string;
  createdTimestamp: number;
  type: number;
  content: string;
  author: string;
  atachments: string[] | undefined;

}

//readChannel reads all messages from a discord channel and returns them as an array of Documents with metadata

async function readChannel(channel: TextChannel): Promise<Document[]> {
  let result: Document[] = [];
  // Create message pointer
  let message = await channel.messages.fetch({ limit: 1 }).then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));
  while (message) {
    await channel.messages.fetch({ limit: 100, before: message.id }).then((messagePage) => {
      messagePage.forEach((msg) => {
        console.log('flgs : ', msg.flags.bitfield)
        //filter out messages with content less than 15 characters
        if (msg.content.length > 15) {
          const metadata: Metadata = {
            id: msg.id,
            serverId: msg.guildId,
            serverName: msg.guild.name,
            channelId: msg.channelId,
            createdTimestamp: msg.createdTimestamp,
            type: msg.type,
            content: msg.content,
            author: msg.author.username,
            atachments: msg.attachments.map((a) => a.url),
          };
          const doc = new Document({ pageContent: msg.content, metadata: metadata });
          // console.log(doc)
          result.push(doc);
          //console.log(`\n\n\n\nDEBUG:`, doc);
        }
      });
      message = 0 < messagePage.size ? messagePage.at(-1) : null;
    });
  }
  return result;
}

//getMesage functions gets the messages from the given channel
//

async function getMessages(channel: TextChannel): Promise<Document[]> {
  const messages = await channel?.messages.fetch()

  let result: Document[] = [];
  const res = messages.map(async (msg) => {
    console.log(msg.guild)

    if (msg.content.length > 15) {
      console.log(msg)
      const metadata: Metadata = {
        id: msg.id,
        serverId: msg.guildId,
        serverName: msg.guild.name,
        channelId: msg.channelId,
        channelName: msg.channel.name,
        createdTimestamp: msg.createdTimestamp,
        type: msg.type,
        content: msg.content,
        author: msg.author.username,
        atachments: msg.attachments.map((a) => a.url),
      };

      // console.log(metadata)

      const doc = new Document({ pageContent: msg.content, metadata: metadata });

      // console.log(doc)
      result.push(doc)
      return doc
    }

  })
  return result
}

async function split(docs: LGCDocument[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const output = await splitter.splitDocuments(docs);
  return output;
}

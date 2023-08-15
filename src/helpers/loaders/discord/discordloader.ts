import { Client, TextChannel } from 'discord.js';


export async function loadData(channelIds: string[], BOT: Client) {
  // let results: Document[] = [];
  for (let i in channelIds) {
    // const channel = BOT.channels.cache.get("1141046406153502733") as TextChannel;
    const cha = BOT.channels.cache.get("1141046406153502733") as TextChannel
    //https://discord.com/developers/docs/resources/channel#channel-object-channel-types
    console.log(cha)
    // if (channel?.type == 0) {
    //   // const channelContent = await readChannel(channel);
    //   // console.log(`Downloaded chats from channel ${channel.name}, ${channelContent.length} messages`);
    //   // results = results.concat(channelContent);
    //   console.log(channel.type)
    // }
  }
  // results = await split(results);
  // console.log(results)
  // return results;
}

export interface Metadata {
  id: string;
  createdTimestamp: number;
  type: number;
  content: string;
  author: string;
  atachments: string[] | undefined;
}
// async function readChannel(channel: TextChannel): Promise<Document[]> {
//   let result: Document[] = [];
//   // Create message pointer
//   let message = await channel.messages.fetch({ limit: 1 }).then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));
//   while (message) {
//     await channel.messages.fetch({ limit: 100, before: message.id }).then((messagePage) => {
//       messagePage.forEach((msg) => {
//         //filter out messages with content less than 15 characters
//         if (msg.content.length > 15) {
//           const metadata: Metadata = {
//             id: msg.id,
//             createdTimestamp: msg.createdTimestamp,
//             type: msg.type,
//             content: msg.content,
//             author: msg.author.username,
//             atachments: msg.attachments.map((a) => a.url),
//           };
//           const doc = new Document({ pageContent: msg.content, metadata: metadata });
//           result.push(doc);
//           //console.log(`\n\n\n\nDEBUG:`, doc);
//         }
//       });
//       message = 0 < messagePage.size ? messagePage.at(-1) : null;
//     });
//   }
//   return result;
// }

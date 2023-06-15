import tiktoken from 'tiktoken';

export function splitContentIntoSmallerChunks(cleanedContent: string, maxTokens: number) {
  const encoding = tiktoken.encoding_for_model('gpt-3.5-turbo');
  let chunks = [];
  let totalTokens = encoding.encode(cleanedContent).length;

  // Calculate the tokens per chunk we should aim for.
  let tokensPerChunk = Math.ceil(totalTokens / Math.ceil(totalTokens / maxTokens));

  let currentChunk = '';
  let currentChunkTokens = 0;

  // Split content into words
  let words = cleanedContent.split(' ');

  for (let word of words) {
    // Include the space that will be added before the word when joining back the words into a string.
    let wordWithSpace = ' ' + word;
    let wordTokens = encoding.encode(wordWithSpace).length;

    // If adding the current word doesn't exceed tokensPerChunk, add it to current chunk.
    if (currentChunkTokens + wordTokens <= tokensPerChunk) {
      currentChunk += wordWithSpace;
      currentChunkTokens += wordTokens;
    } else {
      // If it does exceed, push the current chunk to chunks and start a new chunk with the current word.
      chunks.push(currentChunk.trim());
      currentChunk = word;
      currentChunkTokens = wordTokens;
    }
  }

  // Add the last chunk to chunks.
  chunks.push(currentChunk.trim());

  return chunks;
}

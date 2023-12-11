import { getTokenCount } from '@/ai/getTokenCount';
import dotenv from 'dotenv';

dotenv.config();

import fs from 'fs';
import { summarizeLongDocumentWithoutInquiry, summarizeWithoutInquiry } from '@/helpers/chat/summarizer';
import posts from './hot_posts.json';
import readline from 'readline';

interface Post {
  number_of_comments: number;
  postid: string;
  posturl: string;
  combinedcontent: string;
}

async function contentSummarizer() {
  const csvLines: string[] = ['postUrl,postSummary'];

  for (const post of posts as Post[]) {
    const { posturl, combinedcontent } = post;
    const summary =
      getTokenCount(post.combinedcontent) > 4000 ? await summarizeLongDocumentWithoutInquiry(combinedcontent) : await summarizeWithoutInquiry(combinedcontent);

    const csvLine = `"${posturl}","${summary.replace(/"/g, '""')}"`;
    console.log(`summary of post ${post.posturl} is ${summary}`);
    csvLines.push(csvLine);
  }

  fs.writeFileSync('summary.csv', csvLines.join('\n'));
}

async function generateSqlScript() {
  const fileStream = fs.createReadStream('summary.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const sqlStatements: string[] = [];
  let isHeader = true;

  let currentUrl = '';
  let currentSummary = '';
  let isSummaryLine = false;

  for await (const line of rl) {
    // Skip the header
    if (isHeader) {
      isHeader = false;
      continue;
    }

    if (line.startsWith('"http')) {
      // New entry
      if (currentUrl && currentSummary) {
        // Process previous entry
        const sqlStatement = `UPDATE discourse_posts dp SET dp.ai_summary = $$${currentSummary}$$ WHERE dp.url = $$${currentUrl}$$;`;
        sqlStatements.push(sqlStatement);
      }

      const splitLine = line.split('","');
      currentUrl = splitLine[0].substring(1); // Remove leading quote
      currentSummary = splitLine.length > 1 ? splitLine[1] : '';
      isSummaryLine = splitLine.length === 1;
    } else {
      // Continuation of summary
      currentSummary += '\n' + line.replace(/"$/, ''); // Remove trailing quote if present
      isSummaryLine = !line.endsWith('"');
    }
  }

  // Process the last entry
  if (currentUrl && currentSummary) {
    const sqlStatement = `UPDATE discourse_posts dp SET dp.ai_summary = $$${currentSummary}$$ WHERE dp.url = $$${currentUrl}$$;`;
    sqlStatements.push(sqlStatement);
  }

  fs.writeFileSync('update_posts.sql', sqlStatements.join('\n'));
}
// generateSqlScript().then(() => console.log('SQL script generation completed.'));

// contentSummarizer().then(() => console.log('Summarization and CSV creation completed.'));

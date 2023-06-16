import { cleanupContent } from '@/ai/text/cleanupContent';
import getContentsUsingPuppeteer from '@/ai/text/getContentsUsingPuppeteer';
import { getImportantContentUsingCheerio } from '@/ai/text/getImportantContentUsingCheerio';
import { formatAxiosError } from '@/helpers/adapters/errorLogger';

export default async function downloadFromAllLinks(content: string) {
  const withoutUrls = extractStringContentWithoutUrls(content);
  const urls = extractUrls(content);
  const contents = [];
  for (const url of urls) {
    let importantContent = '';
    try {
      try {
        importantContent = await getImportantContentUsingCheerio(url);
      } catch (e) {
        const formattedAxiosError = formatAxiosError(e);
        console.log('Error while getting content from url', url, formattedAxiosError);
      }
      if ((importantContent?.length || 0) < 2000) {
        console.log('Cheerio failed, trying puppeteer :', url);
        importantContent = await getContentsUsingPuppeteer(url);
      }
    } catch (e) {
      console.log('Error while getting content from url', url, e);
    }
    contents.push(importantContent);
  }
  const combinedContent = [withoutUrls, ...contents].join('\n');
  return cleanupContent(combinedContent);
}
export function extractStringContentWithoutUrls(content: string): string {
  // Regex to match URLs
  const urlPattern = /https?:\/\/[^\s]+/g;

  // Replacing URLs with an empty string
  return content.replace(urlPattern, '').trim();
}

export function extractUrls(content: string): string[] {
  const urlPattern = /https?:\/\/[^\s]+/g;
  const matches: RegExpMatchArray | null = content.match(urlPattern);
  return matches ? matches.map((m) => m.trim()) : [];
}

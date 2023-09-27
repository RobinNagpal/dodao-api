import byte from '@/api/byte/byte';
import bytes from '@/api/byte/bytes';
import chat from '@/api/chat';
import course from '@/api/course/course';
import courses from '@/api/course/courses';
import downloadGuideSubmissionsCSV from '@/api/downloadGuideSubmissionsCSV';
import guide from '@/api/guide/guide';
import guides from '@/api/guide/guides';
import health from '@/api/health';
import extendedSpace from '@/api/space/extendedSpace';
import { json } from 'body-parser';
import cors from 'cors';
import { Express } from 'express';

export function registerApiRoutes(app: Express) {
  app.use('/chat', cors<cors.CorsRequest>(), json(), chat);
  app.use('/health', cors<cors.CorsRequest>(), health);
  app.get('/download-guide-submissions-csv', cors(), downloadGuideSubmissionsCSV);
  app.get('/extended-space', cors(), json(), extendedSpace);

  app.get('/:spaceId/guides', cors(), json(), guides);
  app.get('/:spaceId/guides/:guideId', cors(), json(), guide);

  app.get('/:spaceId/bytes', cors(), json(), bytes);
  app.get('/:spaceId/bytes/:byteId', cors(), json(), byte);

  app.get('/:spaceId/courses', cors(), json(), courses);
  app.get('/:spaceId/courses/:courseKey', cors(), json(), course);
}

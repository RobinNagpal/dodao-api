import byte from '@/api/byte/byte';
import byteCollections from '@/api/byte/byteCollections';
import bytes from '@/api/byte/bytes';
import chat from '@/api/chat/chat';
import course from '@/api/course/course';
import courses from '@/api/course/courses';
import shortVideos from '@/api/shortVideos/shortVideos';
import shortVideo from '@/api/shortVideos/shortVideo';
import downloadGuideSubmissionsCSV from '@/api/downloadGuideSubmissionsCSV';
import guide from '@/api/guide/guide';
import guides from '@/api/guide/guides';
import health from '@/api/health';
import project from '@/api/project/project';
import projectByte from '@/api/project/projectByte';
import projectByteCollections from '@/api/project/projectByteCollections';
import projectBytes from '@/api/project/projectBytes';
import projects from '@/api/project/projects';
import projectShortVideos from '@/api/project/projectShortVideos';
import extendedSpaceByDomain from '@/api/space/extendedSpaceByDomain';
import extendedSpaceById from '@/api/space/extendedSpaceById';
import findSpaceById from '@/api/space/findSpaceById';
import { json } from 'body-parser';
import cors from 'cors';
import { Express } from 'express';
import timeline from './timeline/timeline';
import timelines from './timeline/timelines';

export function registerApiRoutes(app: Express) {
  app.use('/chat', cors<cors.CorsRequest>(), json(), chat);
  app.use('/health', cors<cors.CorsRequest>(), health);
  app.get('/download-guide-submissions-csv', cors(), downloadGuideSubmissionsCSV);

  app.get('/space/:spaceId', cors(), json(), extendedSpaceById);
  app.get('/extended-space', cors(), json(), extendedSpaceByDomain);
  // doesn't throw error if space is not found
  app.get('/find-space/:spaceId', cors(), json(), findSpaceById);

  app.get('/:spaceId/guides', cors(), json(), guides);
  app.get('/:spaceId/guides/:guideId', cors(), json(), guide);

  app.get('/:spaceId/bytes', cors(), json(), bytes);
  app.get('/:spaceId/byte-collections', cors(), json(), byteCollections);

  app.get('/:spaceId/bytes/:byteId', cors(), json(), byte);

  app.get('/:spaceId/courses', cors(), json(), courses);
  app.get('/:spaceId/courses/:courseKey', cors(), json(), course);

  app.get('/:spaceId/short-videos', cors(), json(), shortVideos);
  app.get('/:spaceId/short-videos/:videoId', cors(), json(), shortVideo);

  app.get('/:spaceId/projects', cors(), json(), projects);
  app.get('/:spaceId/projects/:projectId', cors(), json(), project);
  app.get('/:spaceId/projects/:projectId/bytes', cors(), json(), projectBytes);
  app.get('/:spaceId/projects/:projectId/bytes/:byteId', cors(), json(), projectByte);
  app.get('/:spaceId/projects/:projectId/byte-collections', cors(), json(), projectByteCollections);
  app.get('/:spaceId/projects/:projectId/short-videos', cors(), json(), projectShortVideos);

  app.get('/:spaceId/timelines', cors(), json(), timelines);
  app.get('/:spaceId/timelines/:timelineKey', cors(), json(), timeline);
}

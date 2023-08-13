import { Comment } from '@/helpers/loaders/discourse/getDiscoursePostWithComments';

export interface DiscoursePost {
  [x: string]: any;

  source: string;
  url: string;
  fullContent: string;
  author: string;
  datePublished: string;
  comments: Comment[];
}

export interface DiscourseThread {
  url: string;
  postContentFull: string;
  author: string;
  // dateElement: any;
  date: string;
  comments: Comment[];
}

export interface DiscourseIndexRunWithPosts {
  id: number;
  url: string;
  runDate: Date;
  posts: DiscoursePost[];
}

import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { SummarizedGitCourse } from '@/graphql/generated/graphql';

export function transformToSummarizedCourse(course: GitCourseModel): SummarizedGitCourse {
  return {
    details: course.details,
    duration: course.duration,
    key: course.key,
    summary: course.summary,
    title: course.title,
    priority: course.priority,
    publishStatus: course.publishStatus,
    highlights: course.highlights,
    thumbnail: course.thumbnail,
    topics: course.topics.map((topic) => ({
      details: topic.details,
      key: topic.key,
      title: topic.title,
    })),
    uuid: course.key,
  };
}

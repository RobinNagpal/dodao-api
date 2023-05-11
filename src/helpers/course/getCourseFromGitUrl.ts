import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import axios from 'axios';

export async function getCourseFromGitUrl(courseJsonUrl: string) {
  const response = await axios.get(courseJsonUrl);
  return response.data as GitCourseModel;
}

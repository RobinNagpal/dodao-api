import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  DateTimeISO: any;
  JSON: any;
  JSONObject: any;
};

export type AcademyTask = {
  __typename?: 'AcademyTask';
  createdAt: Scalars['Int'];
  createdBy: Scalars['String'];
  details: Scalars['String'];
  excerpt: Scalars['String'];
  items: Array<GuideStepItem>;
  prerequisiteCourses: Array<SummarizedGitCourse>;
  prerequisiteGuides: Array<Guide>;
  spaceId: Scalars['String'];
  status: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['Int'];
  updatedBy: Scalars['String'];
  uuid: Scalars['String'];
};

export type AddTopicExplanationInput = {
  courseKey: Scalars['String'];
  details: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  topicKey: Scalars['String'];
};

export type AddTopicInput = {
  courseKey: Scalars['String'];
  details: Scalars['String'];
  title: Scalars['String'];
};

export type AddTopicQuestionInput = {
  answerKeys: Array<Scalars['String']>;
  choices: Array<TopicQuestionChoiceInput>;
  content: Scalars['String'];
  courseKey: Scalars['String'];
  explanation: Scalars['String'];
  hint: Scalars['String'];
  questionType: Scalars['String'];
  topicKey: Scalars['String'];
};

export type AddTopicQuestionsInput = {
  courseKey: Scalars['String'];
  questions: Array<AddTopicQuestionInput>;
  topicKey: Scalars['String'];
};

export type AddTopicSummaryInput = {
  courseKey: Scalars['String'];
  details: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  topicKey: Scalars['String'];
};

export type AddTopicVideoInput = {
  courseKey: Scalars['String'];
  details: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  topicKey: Scalars['String'];
  url: Scalars['String'];
};

export type AuthSettings = {
  __typename?: 'AuthSettings';
  enableLogin?: Maybe<Scalars['Boolean']>;
  loginOptions?: Maybe<Array<Scalars['String']>>;
};

export type AuthSettingsInput = {
  enableLogin: Scalars['Boolean'];
  loginOptions: Array<Scalars['String']>;
};

export type Byte = {
  __typename?: 'Byte';
  admins: Array<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  postSubmissionStepContent?: Maybe<Scalars['String']>;
  priority: Scalars['Int'];
  publishStatus: Scalars['String'];
  showIncorrectOnCompletion: Scalars['Boolean'];
  steps: Array<ByteStep>;
  tags: Array<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
};

export type ByteLinkedinPdfContent = {
  __typename?: 'ByteLinkedinPdfContent';
  excerpt: Scalars['String'];
  steps: Array<ByteLinkedinPdfContentStep>;
  title: Scalars['String'];
};

export type ByteLinkedinPdfContentInput = {
  excerpt: Scalars['String'];
  steps: Array<ByteLinkedinPdfContentStepInput>;
  title: Scalars['String'];
};

export type ByteLinkedinPdfContentStep = {
  __typename?: 'ByteLinkedinPdfContentStep';
  content: Scalars['String'];
  name: Scalars['String'];
};

export type ByteLinkedinPdfContentStepInput = {
  content: Scalars['String'];
  name: Scalars['String'];
};

export type ByteQuestion = {
  __typename?: 'ByteQuestion';
  answerKeys: Array<Scalars['String']>;
  choices: Array<QuestionChoice>;
  content: Scalars['String'];
  explanation: Scalars['String'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type ByteSettings = {
  __typename?: 'ByteSettings';
  askForLoginToSubmit?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use captureRating instead */
  captureBeforeAndAfterRating?: Maybe<Scalars['Boolean']>;
  captureRating?: Maybe<Scalars['Boolean']>;
  showCategoriesInSidebar?: Maybe<Scalars['Boolean']>;
};

export type ByteSettingsInput = {
  askForLoginToSubmit?: InputMaybe<Scalars['Boolean']>;
  captureRating?: InputMaybe<Scalars['Boolean']>;
  showCategoriesInSidebar?: InputMaybe<Scalars['Boolean']>;
};

export type ByteSocialShare = {
  __typename?: 'ByteSocialShare';
  byteId: Scalars['String'];
  linkedInImages?: Maybe<Array<Scalars['String']>>;
  linkedInPdf?: Maybe<Scalars['String']>;
  linkedinPdfContent?: Maybe<ByteLinkedinPdfContent>;
  spaceId: Scalars['String'];
  twitterImage?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type ByteStep = {
  __typename?: 'ByteStep';
  content: Scalars['String'];
  name: Scalars['String'];
  stepItems: Array<ByteStepItem>;
  uuid: Scalars['String'];
};

export type ByteStepInput = {
  content: Scalars['String'];
  name: Scalars['String'];
  stepItems: Array<StepItemInputGenericInput>;
  uuid: Scalars['String'];
};

export type ByteStepItem = ByteQuestion | ByteUserInput | UserDiscordConnect;

export type ByteSubmission = {
  __typename?: 'ByteSubmission';
  byteId: Scalars['String'];
  created: Scalars['String'];
  createdBy: Scalars['String'];
  id: Scalars['String'];
  spaceId: Scalars['String'];
};

export type ByteSubmissionInput = {
  byteId: Scalars['String'];
  from: Scalars['String'];
  space: Scalars['String'];
  timestamp?: InputMaybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type ByteUserInput = {
  __typename?: 'ByteUserInput';
  label: Scalars['String'];
  required: Scalars['Boolean'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type ChatCompletionAiInput = {
  messages: Array<OpenAiChatMessageInput>;
  model?: InputMaybe<Scalars['String']>;
  n?: InputMaybe<Scalars['Int']>;
  temperature?: InputMaybe<Scalars['Float']>;
};

export enum ChatCompletionRequestMessageRoleEnum {
  Assistant = 'assistant',
  System = 'system',
  User = 'user'
}

export type CompletionAiInput = {
  model?: InputMaybe<Scalars['String']>;
  n?: InputMaybe<Scalars['Int']>;
  prompt: Scalars['String'];
  temperature?: InputMaybe<Scalars['Float']>;
};

export type ConsolidatedGuideRating = {
  __typename?: 'ConsolidatedGuideRating';
  avgRating: Scalars['Float'];
  endRatingFeedbackCount: Scalars['Int'];
  negativeFeedbackCount: Scalars['Int'];
  negativeRatingDistribution: RatingDistribution;
  positiveFeedbackCount: Scalars['Int'];
  positiveRatingDistribution: RatingDistribution;
};

export type CourseBasicInfoInput = {
  courseAdmins: Array<Scalars['String']>;
  courseFailContent?: InputMaybe<Scalars['String']>;
  coursePassContent?: InputMaybe<Scalars['String']>;
  coursePassCount?: InputMaybe<Scalars['Int']>;
  details: Scalars['String'];
  duration: Scalars['String'];
  highlights: Array<Scalars['String']>;
  key: Scalars['String'];
  priority?: InputMaybe<Scalars['Int']>;
  publishStatus: Scalars['String'];
  summary: Scalars['String'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  topicConfig?: InputMaybe<TopicConfigInput>;
};

export type CourseIntegrations = {
  __typename?: 'CourseIntegrations';
  discordRoleIds?: Maybe<Array<Scalars['String']>>;
  discordRolePassingCount?: Maybe<Scalars['Int']>;
  discordWebhook?: Maybe<Scalars['String']>;
  projectGalaxyCredentialId?: Maybe<Scalars['String']>;
  projectGalaxyOatMintUrl?: Maybe<Scalars['String']>;
  projectGalaxyOatMintedContent?: Maybe<Scalars['String']>;
  projectGalaxyOatPassingCount?: Maybe<Scalars['Int']>;
};

export type CourseReadingQuestion = {
  __typename?: 'CourseReadingQuestion';
  answerKeys: Array<Scalars['String']>;
  choices: Array<GitCourseQuestionChoice>;
  content: Scalars['String'];
  explanation: Scalars['String'];
  hint: Scalars['String'];
  timeInSec: Scalars['Int'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type CourseSubmissionInput = {
  courseKey: Scalars['String'];
  uuid: Scalars['String'];
};

export type CreateCompletionResponseChoice = {
  __typename?: 'CreateCompletionResponseChoice';
  finish_reason?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  logprobs?: Maybe<OpenAiChoiceLogprobs>;
  text?: Maybe<Scalars['String']>;
};

export type CreateSignedUrlInput = {
  contentType: Scalars['String'];
  imageType: Scalars['String'];
  name: Scalars['String'];
  objectId: Scalars['String'];
};

export type DateTimeFilter = {
  after?: InputMaybe<Scalars['DateTimeISO']>;
  before?: InputMaybe<Scalars['DateTimeISO']>;
};

export type DeleteTopicExplanationInput = {
  courseKey: Scalars['String'];
  explanationKey: Scalars['String'];
  topicKey: Scalars['String'];
};

export type DeleteTopicInput = {
  courseKey: Scalars['String'];
  topicKey: Scalars['String'];
};

export type DeleteTopicQuestionInput = {
  courseKey: Scalars['String'];
  questionUuid: Scalars['String'];
  topicKey: Scalars['String'];
};

export type DeleteTopicSummaryInput = {
  courseKey: Scalars['String'];
  summaryKey: Scalars['String'];
  topicKey: Scalars['String'];
};

export type DeleteTopicVideoInput = {
  courseKey: Scalars['String'];
  topicKey: Scalars['String'];
  videoUuid: Scalars['String'];
};

export type DiscourseIndexRun = {
  __typename?: 'DiscourseIndexRun';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  runDate: Scalars['String'];
  spaceId: Scalars['String'];
  status: Scalars['String'];
  url: Scalars['String'];
};

export type DiscourseIndexRunInput = {
  runDate: Scalars['String'];
  spaceId: Scalars['String'];
  url: Scalars['String'];
};

export type DiscoursePost = {
  __typename?: 'DiscoursePost';
  author?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  datePublished: Scalars['String'];
  fullContent?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  indexedAt?: Maybe<Scalars['DateTimeISO']>;
  spaceId: Scalars['String'];
  status: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type DiscoursePostComment = {
  __typename?: 'DiscoursePostComment';
  author: Scalars['String'];
  commentPostId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  datePublished: Scalars['String'];
  id: Scalars['String'];
  indexedAt: Scalars['String'];
  postId: Scalars['String'];
  spaceId: Scalars['String'];
};

export type DownloadAndCleanContentResponse = {
  __typename?: 'DownloadAndCleanContentResponse';
  content: Scalars['String'];
  links: Array<DownloadLinkInfo>;
};

export type DownloadLinkInfo = {
  __typename?: 'DownloadLinkInfo';
  downloadStatus: Scalars['String'];
  link: Scalars['String'];
  tokenCount: Scalars['Int'];
};

export type ExtractRelevantTextForTopicInput = {
  content: Scalars['String'];
  topic: Scalars['String'];
};

export type GenerateImageEditInput = {
  editImageUrl: Scalars['String'];
  prompt: Scalars['String'];
};

export type GenerateImageInput = {
  prompt: Scalars['String'];
};

export type GenerateImageResponse = {
  __typename?: 'GenerateImageResponse';
  url: Scalars['String'];
};

export type GenericCourse = {
  __typename?: 'GenericCourse';
  categories: Array<Scalars['String']>;
  content: Scalars['String'];
  courseAdmins?: Maybe<Array<Scalars['String']>>;
  courseType: Scalars['String'];
  duration: Scalars['String'];
  excerpt: Scalars['String'];
  highlights: Array<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
  publishStatus: Scalars['String'];
  thumbnail: Scalars['String'];
  uuid: Scalars['String'];
};

export type GitCourse = {
  __typename?: 'GitCourse';
  courseAdmins?: Maybe<Array<Scalars['String']>>;
  courseFailContent?: Maybe<Scalars['String']>;
  coursePassContent?: Maybe<Scalars['String']>;
  coursePassCount?: Maybe<Scalars['Int']>;
  details: Scalars['String'];
  duration: Scalars['String'];
  highlights: Array<Scalars['String']>;
  key: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
  publishStatus: Scalars['String'];
  summary: Scalars['String'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  topicConfig?: Maybe<TopicConfig>;
  topics: Array<GitCourseTopic>;
};

export type GitCourseExplanation = {
  __typename?: 'GitCourseExplanation';
  details: Scalars['String'];
  key: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
};

export type GitCourseExplanationsSubmission = {
  __typename?: 'GitCourseExplanationsSubmission';
  key: Scalars['String'];
  status: Scalars['String'];
};

export type GitCourseExplanationsSubmissionInput = {
  key: Scalars['String'];
  status: Scalars['String'];
};

export type GitCourseInput = {
  courseRepoUrl: Scalars['String'];
  publishStatus: Scalars['String'];
  weight: Scalars['Int'];
};

export type GitCourseQuestion = {
  __typename?: 'GitCourseQuestion';
  answerKeys: Array<Scalars['String']>;
  choices: Array<GitCourseQuestionChoice>;
  content: Scalars['String'];
  explanation: Scalars['String'];
  hint: Scalars['String'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type GitCourseQuestionChoice = {
  __typename?: 'GitCourseQuestionChoice';
  content: Scalars['String'];
  key: Scalars['String'];
};

export type GitCourseQuestionsSubmission = {
  __typename?: 'GitCourseQuestionsSubmission';
  answers: Array<Scalars['String']>;
  status: Scalars['String'];
  uuid: Scalars['String'];
};

export type GitCourseQuestionsSubmissionInput = {
  answers: Array<Scalars['String']>;
  status: Scalars['String'];
  uuid: Scalars['String'];
};

export type GitCourseReading = {
  __typename?: 'GitCourseReading';
  details: Scalars['String'];
  questions?: Maybe<Array<CourseReadingQuestion>>;
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
  uuid: Scalars['String'];
};

export type GitCourseReadingsSubmission = {
  __typename?: 'GitCourseReadingsSubmission';
  questions?: Maybe<Array<GitCourseQuestionsSubmission>>;
  status: Scalars['String'];
  uuid: Scalars['String'];
};

export type GitCourseReadingsSubmissionInput = {
  questions: Array<GitCourseQuestionsSubmissionInput>;
  status: Scalars['String'];
  uuid: Scalars['String'];
};

export type GitCourseSubmission = {
  __typename?: 'GitCourseSubmission';
  courseKey: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  galaxyCredentialsUpdated?: Maybe<Scalars['Boolean']>;
  isLatestSubmission?: Maybe<Scalars['Boolean']>;
  questionsAttempted?: Maybe<Scalars['Int']>;
  questionsCorrect?: Maybe<Scalars['Int']>;
  questionsIncorrect?: Maybe<Scalars['Int']>;
  questionsSkipped?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
  status: Scalars['String'];
  topicSubmissions: Array<GitCourseTopicSubmission>;
  updatedAt: Scalars['DateTimeISO'];
  uuid: Scalars['String'];
};

export type GitCourseSummariesSubmission = {
  __typename?: 'GitCourseSummariesSubmission';
  key: Scalars['String'];
  status: Scalars['String'];
};

export type GitCourseSummariesSubmissionInput = {
  key: Scalars['String'];
  status: Scalars['String'];
};

export type GitCourseSummary = {
  __typename?: 'GitCourseSummary';
  details: Scalars['String'];
  key: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
};

export type GitCourseTopic = {
  __typename?: 'GitCourseTopic';
  details: Scalars['String'];
  explanations: Array<GitCourseExplanation>;
  key: Scalars['String'];
  questions: Array<GitCourseQuestion>;
  readings: Array<GitCourseReading>;
  summaries: Array<GitCourseSummary>;
  title: Scalars['String'];
};

export type GitCourseTopicCorrectAnswer = {
  __typename?: 'GitCourseTopicCorrectAnswer';
  answerKeys: Array<Scalars['String']>;
  uuid: Scalars['String'];
};

export type GitCourseTopicSubmission = {
  __typename?: 'GitCourseTopicSubmission';
  correctAnswers?: Maybe<Array<GitCourseTopicCorrectAnswer>>;
  courseKey: Scalars['String'];
  courseSubmissionUuid: Scalars['String'];
  createdAt: Scalars['DateTimeISO'];
  createdBy: Scalars['String'];
  isLatestSubmission: Scalars['Boolean'];
  questionsAttempted?: Maybe<Scalars['Int']>;
  questionsCorrect?: Maybe<Scalars['Int']>;
  questionsIncorrect?: Maybe<Scalars['Int']>;
  questionsSkipped?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
  status: Scalars['String'];
  submission?: Maybe<GitCourseTopicSubmissionJson>;
  topicKey: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
  uuid: Scalars['String'];
};

export type GitCourseTopicSubmissionInput = {
  courseKey: Scalars['String'];
  explanations: Array<GitCourseExplanationsSubmissionInput>;
  questions: Array<GitCourseQuestionsSubmissionInput>;
  readings: Array<GitCourseReadingsSubmissionInput>;
  status: Scalars['String'];
  summaries: Array<GitCourseSummariesSubmissionInput>;
  topicKey: Scalars['String'];
  uuid: Scalars['String'];
};

export type GitCourseTopicSubmissionJson = {
  __typename?: 'GitCourseTopicSubmissionJson';
  courseKey: Scalars['String'];
  explanations?: Maybe<Array<GitCourseExplanationsSubmission>>;
  questions?: Maybe<Array<GitCourseQuestionsSubmission>>;
  readings?: Maybe<Array<GitCourseReadingsSubmission>>;
  status: Scalars['String'];
  summaries?: Maybe<Array<GitCourseSummariesSubmission>>;
  topicKey: Scalars['String'];
  uuid: Scalars['String'];
};

export type GnosisSafeWallet = {
  __typename?: 'GnosisSafeWallet';
  chainId: Scalars['Int'];
  id: Scalars['String'];
  order: Scalars['Int'];
  tokenContractAddress: Scalars['String'];
  walletAddress: Scalars['String'];
  walletName: Scalars['String'];
};

export type GnosisSafeWalletInput = {
  chainId: Scalars['Int'];
  id: Scalars['String'];
  order: Scalars['Int'];
  tokenContractAddress: Scalars['String'];
  walletAddress: Scalars['String'];
  walletName: Scalars['String'];
};

export type Guide = {
  __typename?: 'Guide';
  authors: Array<Scalars['String']>;
  categories: Array<Scalars['String']>;
  content: Scalars['String'];
  createdAt: Scalars['DateTimeISO'];
  guideIntegrations: GuideIntegrations;
  guideSource: Scalars['String'];
  guideType: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  postSubmissionStepContent?: Maybe<Scalars['String']>;
  previousId?: Maybe<Scalars['String']>;
  publishStatus: Scalars['String'];
  steps: Array<GuideStep>;
  thumbnail?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
  version: Scalars['Int'];
};

export type GuideFeedback = {
  __typename?: 'GuideFeedback';
  content?: Maybe<Scalars['Boolean']>;
  questions?: Maybe<Scalars['Boolean']>;
  ux?: Maybe<Scalars['Boolean']>;
};

export type GuideFeedbackInput = {
  content?: InputMaybe<Scalars['Boolean']>;
  questions?: InputMaybe<Scalars['Boolean']>;
  ux?: InputMaybe<Scalars['Boolean']>;
};

export type GuideInput = {
  categories: Array<Scalars['String']>;
  content: Scalars['String'];
  from: Scalars['String'];
  guideIntegrations: GuideIntegrationsInput;
  guideSource: Scalars['String'];
  guideType: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  postSubmissionStepContent?: InputMaybe<Scalars['String']>;
  publishStatus: Scalars['String'];
  socialShareImage?: InputMaybe<Scalars['String']>;
  space: Scalars['String'];
  steps: Array<GuideStepInput>;
  thumbnail?: InputMaybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type GuideIntegrations = {
  __typename?: 'GuideIntegrations';
  discordRoleIds?: Maybe<Array<Scalars['String']>>;
  discordRolePassingCount?: Maybe<Scalars['Int']>;
  discordWebhook?: Maybe<Scalars['String']>;
  projectGalaxyCredentialId?: Maybe<Scalars['String']>;
  projectGalaxyOatMintUrl?: Maybe<Scalars['String']>;
  projectGalaxyOatPassingCount?: Maybe<Scalars['Int']>;
};

export type GuideIntegrationsInput = {
  discordRoleIds: Array<Scalars['String']>;
  discordRolePassingCount?: InputMaybe<Scalars['Int']>;
  discordWebhook?: InputMaybe<Scalars['String']>;
  projectGalaxyCredentialId?: InputMaybe<Scalars['String']>;
  projectGalaxyOatMintUrl?: InputMaybe<Scalars['String']>;
  projectGalaxyOatPassingCount?: InputMaybe<Scalars['Int']>;
};

export type GuideQuestion = {
  __typename?: 'GuideQuestion';
  answerKeys: Array<Scalars['String']>;
  choices: Array<QuestionChoice>;
  content: Scalars['String'];
  explanation?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type GuideQuestionInput = {
  answerKeys?: InputMaybe<Array<Scalars['String']>>;
  choices?: InputMaybe<Array<QuestionChoiceInput>>;
  content: Scalars['String'];
  explanation?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  questionType: Scalars['String'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type GuideRating = {
  __typename?: 'GuideRating';
  createdAt: Scalars['DateTimeISO'];
  endRating?: Maybe<Scalars['Int']>;
  guideUuid: Scalars['String'];
  ipAddress?: Maybe<Scalars['String']>;
  negativeFeedback?: Maybe<GuideFeedback>;
  positiveFeedback?: Maybe<GuideFeedback>;
  ratingUuid: Scalars['String'];
  skipEndRating?: Maybe<Scalars['Boolean']>;
  skipStartRating?: Maybe<Scalars['Boolean']>;
  spaceId: Scalars['String'];
  startRating?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTimeISO'];
  userId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type GuideSettings = {
  __typename?: 'GuideSettings';
  askForLoginToSubmit?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use captureRating instead */
  captureBeforeAndAfterRating?: Maybe<Scalars['Boolean']>;
  captureRating?: Maybe<Scalars['Boolean']>;
  showCategoriesInSidebar?: Maybe<Scalars['Boolean']>;
  showIncorrectAfterEachStep?: Maybe<Scalars['Boolean']>;
  showIncorrectOnCompletion?: Maybe<Scalars['Boolean']>;
};

export type GuideSettingsInput = {
  askForLoginToSubmit?: InputMaybe<Scalars['Boolean']>;
  captureRating?: InputMaybe<Scalars['Boolean']>;
  showCategoriesInSidebar?: InputMaybe<Scalars['Boolean']>;
  showIncorrectAfterEachStep?: InputMaybe<Scalars['Boolean']>;
  showIncorrectOnCompletion?: InputMaybe<Scalars['Boolean']>;
};

export type GuideStep = {
  __typename?: 'GuideStep';
  content: Scalars['String'];
  created: Scalars['Int'];
  id: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  stepItems: Array<GuideStepItem>;
  uuid: Scalars['String'];
};

export type GuideStepInput = {
  content: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  stepItems: Array<StepItemInputGenericInput>;
  uuid: Scalars['String'];
};

export type GuideStepItem = GuideQuestion | GuideUserInput | UserDiscordConnect;

export type GuideStepItemSubmission = {
  __typename?: 'GuideStepItemSubmission';
  selectedAnswerKeys?: Maybe<Array<Scalars['String']>>;
  type: Scalars['String'];
  userDiscordInfo?: Maybe<UserDiscordInfo>;
  userInput?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type GuideStepItemSubmissionInput = {
  selectedAnswerKeys?: InputMaybe<Array<Scalars['String']>>;
  type: Scalars['String'];
  userDiscordInfo?: InputMaybe<UserDiscordInfoInput>;
  userInput?: InputMaybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type GuideStepSubmission = {
  __typename?: 'GuideStepSubmission';
  itemResponses: Array<GuideStepItemSubmission>;
  uuid: Scalars['String'];
};

export type GuideStepSubmissionInput = {
  itemResponses: Array<GuideStepItemSubmissionInput>;
  uuid: Scalars['String'];
};

export type GuideSubmission = {
  __typename?: 'GuideSubmission';
  correctQuestionsCount: Scalars['Int'];
  createdAt: Scalars['DateTimeISO'];
  createdBy: Scalars['String'];
  createdByUsername: Scalars['String'];
  galaxyCredentialsUpdated?: Maybe<Scalars['Boolean']>;
  guideId: Scalars['String'];
  guideUuid: Scalars['String'];
  id: Scalars['String'];
  result: GuideSubmissionResult;
  spaceId: Scalars['String'];
  steps?: Maybe<Array<GuideStepSubmission>>;
  uuid: Scalars['String'];
};

export type GuideSubmissionFiltersInput = {
  correctQuestionsCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdByUsername?: InputMaybe<Scalars['String']>;
  itemsPerPage: Scalars['Int'];
  page: Scalars['Int'];
};

export type GuideSubmissionInput = {
  from: Scalars['String'];
  guideUuid: Scalars['String'];
  space: Scalars['String'];
  steps: Array<GuideStepSubmissionInput>;
  timestamp?: InputMaybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type GuideSubmissionResult = {
  __typename?: 'GuideSubmissionResult';
  allQuestions: Array<Scalars['String']>;
  correctQuestions: Array<Scalars['String']>;
  wrongQuestions: Array<Scalars['String']>;
};

export type GuideUserInput = {
  __typename?: 'GuideUserInput';
  label: Scalars['String'];
  order: Scalars['Int'];
  required: Scalars['Boolean'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type ImagesResponse = {
  __typename?: 'ImagesResponse';
  created: Scalars['Int'];
  data: Array<ImagesResponseDataInner>;
};

export type ImagesResponseDataInner = {
  __typename?: 'ImagesResponseDataInner';
  b64_json?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type JwtResponse = {
  __typename?: 'JwtResponse';
  jwt: Scalars['String'];
};

export type MoveTopicExplanationInput = {
  courseKey: Scalars['String'];
  direction: Scalars['String'];
  explanationKey: Scalars['String'];
  topicKey: Scalars['String'];
};

export type MoveTopicInput = {
  courseKey: Scalars['String'];
  direction: Scalars['String'];
  topicKey: Scalars['String'];
};

export type MoveTopicQuestionInput = {
  courseKey: Scalars['String'];
  direction: Scalars['String'];
  questionUuid: Scalars['String'];
  topicKey: Scalars['String'];
};

export type MoveTopicSummaryInput = {
  courseKey: Scalars['String'];
  direction: Scalars['String'];
  summaryKey: Scalars['String'];
  topicKey: Scalars['String'];
};

export type MoveTopicVideoInput = {
  courseKey: Scalars['String'];
  direction: Scalars['String'];
  topicKey: Scalars['String'];
  videoUuid: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addDiscordCredentials: Space;
  addTopic: GitCourseTopic;
  addTopicExplanation: GitCourseExplanation;
  addTopicQuestion: GitCourseQuestion;
  addTopicQuestions: Array<GitCourseQuestion>;
  addTopicSummary: GitCourseSummary;
  addTopicVideo: GitCourseReading;
  askChatCompletionAI: OpenAiChatCompletionResponse;
  askCompletionAI: OpenAiCompletionResponse;
  authenticateWithUnstoppable: JwtResponse;
  createNewDiscourseIndexRun: DiscourseIndexRun;
  createSignedUrl: Scalars['String'];
  createSpace: Space;
  createSummaryOfContent: OpenAiTextResponse;
  deleteAndPullCourseRepo: GitCourse;
  deleteGitCourseSubmission: Scalars['Boolean'];
  deleteGuide: Scalars['Boolean'];
  deleteTopic: GitCourse;
  deleteTopicExplanation: GitCourse;
  deleteTopicQuestion: GitCourse;
  deleteTopicSummary: GitCourse;
  deleteTopicVideo: GitCourse;
  downloadAndCleanContent: DownloadAndCleanContentResponse;
  extractRelevantTextForTopic: OpenAiTextResponse;
  generateImage: ImagesResponse;
  generateImageEdit: GenerateImageResponse;
  generateSharablePdf: Scalars['String'];
  initializeGitCourseSubmission: GitCourseSubmission;
  moveTopic: GitCourse;
  moveTopicExplanation: GitCourse;
  moveTopicQuestion: GitCourse;
  moveTopicSummary: GitCourse;
  moveTopicVideo: GitCourse;
  publishByte: Byte;
  refreshGitCourse: Scalars['Boolean'];
  refreshGitCourses: Scalars['Boolean'];
  reloadAcademyRepository: Scalars['Boolean'];
  saveByte: Byte;
  sendEmail: Scalars['Boolean'];
  submitByte: ByteSubmission;
  submitGitCourse: GitCourseSubmission;
  submitGitCourseTopic: GitCourseSubmission;
  submitGuide: GuideSubmission;
  triggerDiscourseIndexRun: DiscourseIndexRun;
  updateAuthSettings: Space;
  updateByteSettings: Space;
  updateCourseBasicInfo: GitCourse;
  updateGuideSettings: Space;
  updateSocialSettings: Space;
  updateSpace: Space;
  updateTopicBasicInfo: GitCourse;
  updateTopicExplanation: GitCourse;
  updateTopicQuestion: GitCourse;
  updateTopicSummary: GitCourse;
  updateTopicVideo: GitCourse;
  upsertAcademyTask: AcademyTask;
  upsertByte: Byte;
  upsertByteSocialShare: ByteSocialShare;
  upsertCourseIntegrations: CourseIntegrations;
  upsertGitCourse?: Maybe<SummarizedGitCourse>;
  upsertGitCourseTopicSubmission: GitCourseSubmission;
  upsertGnosisSafeWallets: Space;
  upsertGuide: Guide;
  upsertGuideRating: GuideRating;
  upsertProjectGalaxyAccessToken: Space;
  upsertSimulation: Simulation;
  upsertSpaceAcademyRepository: Space;
  upsertSpaceFeatures: Space;
  upsertSpaceInviteLinks: Space;
  upsertTimeline: Timeline;
};


export type MutationAddDiscordCredentialsArgs = {
  code: Scalars['String'];
  redirectUri: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationAddTopicArgs = {
  spaceId: Scalars['String'];
  topicInfo: AddTopicInput;
};


export type MutationAddTopicExplanationArgs = {
  explanationInfo: AddTopicExplanationInput;
  spaceId: Scalars['String'];
};


export type MutationAddTopicQuestionArgs = {
  questionInfo: AddTopicQuestionInput;
  spaceId: Scalars['String'];
};


export type MutationAddTopicQuestionsArgs = {
  input: AddTopicQuestionsInput;
  spaceId: Scalars['String'];
};


export type MutationAddTopicSummaryArgs = {
  spaceId: Scalars['String'];
  summaryInfo: AddTopicSummaryInput;
};


export type MutationAddTopicVideoArgs = {
  spaceId: Scalars['String'];
  videoInfo: AddTopicVideoInput;
};


export type MutationAskChatCompletionAiArgs = {
  input: ChatCompletionAiInput;
};


export type MutationAskCompletionAiArgs = {
  input: CompletionAiInput;
};


export type MutationAuthenticateWithUnstoppableArgs = {
  idToken: Scalars['String'];
};


export type MutationCreateNewDiscourseIndexRunArgs = {
  input: DiscourseIndexRunInput;
  spaceId: Scalars['String'];
};


export type MutationCreateSignedUrlArgs = {
  input: CreateSignedUrlInput;
  spaceId: Scalars['String'];
};


export type MutationCreateSpaceArgs = {
  spaceInput: UpsertSpaceInput;
};


export type MutationCreateSummaryOfContentArgs = {
  input: Scalars['String'];
};


export type MutationDeleteAndPullCourseRepoArgs = {
  courseKey: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationDeleteGitCourseSubmissionArgs = {
  courseKey: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationDeleteGuideArgs = {
  spaceId: Scalars['String'];
  uuid: Scalars['String'];
};


export type MutationDeleteTopicArgs = {
  spaceId: Scalars['String'];
  topicInfo: DeleteTopicInput;
};


export type MutationDeleteTopicExplanationArgs = {
  explanationInfo: DeleteTopicExplanationInput;
  spaceId: Scalars['String'];
};


export type MutationDeleteTopicQuestionArgs = {
  questionInfo: DeleteTopicQuestionInput;
  spaceId: Scalars['String'];
};


export type MutationDeleteTopicSummaryArgs = {
  spaceId: Scalars['String'];
  summaryInfo: DeleteTopicSummaryInput;
};


export type MutationDeleteTopicVideoArgs = {
  spaceId: Scalars['String'];
  videoInfo: DeleteTopicVideoInput;
};


export type MutationDownloadAndCleanContentArgs = {
  input: Scalars['String'];
};


export type MutationExtractRelevantTextForTopicArgs = {
  input: ExtractRelevantTextForTopicInput;
};


export type MutationGenerateImageArgs = {
  input: GenerateImageInput;
};


export type MutationGenerateImageEditArgs = {
  input: GenerateImageEditInput;
};


export type MutationGenerateSharablePdfArgs = {
  byteId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationInitializeGitCourseSubmissionArgs = {
  courseKey: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationMoveTopicArgs = {
  spaceId: Scalars['String'];
  topicInfo: MoveTopicInput;
};


export type MutationMoveTopicExplanationArgs = {
  explanationInfo: MoveTopicExplanationInput;
  spaceId: Scalars['String'];
};


export type MutationMoveTopicQuestionArgs = {
  questionInfo: MoveTopicQuestionInput;
  spaceId: Scalars['String'];
};


export type MutationMoveTopicSummaryArgs = {
  spaceId: Scalars['String'];
  summaryInfo: MoveTopicSummaryInput;
};


export type MutationMoveTopicVideoArgs = {
  spaceId: Scalars['String'];
  videoInfo: MoveTopicVideoInput;
};


export type MutationPublishByteArgs = {
  input: UpsertByteInput;
  spaceId: Scalars['String'];
};


export type MutationRefreshGitCourseArgs = {
  courseKey: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationRefreshGitCoursesArgs = {
  spaceId: Scalars['String'];
};


export type MutationReloadAcademyRepositoryArgs = {
  spaceId: Scalars['String'];
};


export type MutationSaveByteArgs = {
  input: UpsertByteInput;
  spaceId: Scalars['String'];
};


export type MutationSendEmailArgs = {
  input: SendEmailInput;
};


export type MutationSubmitByteArgs = {
  submissionInput: ByteSubmissionInput;
};


export type MutationSubmitGitCourseArgs = {
  input: CourseSubmissionInput;
  spaceId: Scalars['String'];
};


export type MutationSubmitGitCourseTopicArgs = {
  gitCourseTopicSubmission: GitCourseTopicSubmissionInput;
  spaceId: Scalars['String'];
};


export type MutationSubmitGuideArgs = {
  submissionInput: GuideSubmissionInput;
};


export type MutationTriggerDiscourseIndexRunArgs = {
  indexRunId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationUpdateAuthSettingsArgs = {
  input: AuthSettingsInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateByteSettingsArgs = {
  input: ByteSettingsInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateCourseBasicInfoArgs = {
  courseBasicInfo: CourseBasicInfoInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateGuideSettingsArgs = {
  input: GuideSettingsInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateSocialSettingsArgs = {
  input: SocialSettingsInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateSpaceArgs = {
  spaceInput: UpsertSpaceInput;
};


export type MutationUpdateTopicBasicInfoArgs = {
  spaceId: Scalars['String'];
  topicInfo: UpdateTopicBasicInfoInput;
};


export type MutationUpdateTopicExplanationArgs = {
  explanationInfo: UpdateTopicExplanationInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateTopicQuestionArgs = {
  questionInfo: UpdateTopicQuestionInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateTopicSummaryArgs = {
  spaceId: Scalars['String'];
  summaryInfo: UpdateTopicSummaryInput;
};


export type MutationUpdateTopicVideoArgs = {
  spaceId: Scalars['String'];
  videoInfo: UpdateTopicVideoInput;
};


export type MutationUpsertAcademyTaskArgs = {
  spaceId: Scalars['String'];
  task: UpsertAcademyTaskInput;
};


export type MutationUpsertByteArgs = {
  input: UpsertByteInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertByteSocialShareArgs = {
  input: UpsertByteSocialShareInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertCourseIntegrationsArgs = {
  courseIntegrationInput: UpsertCourseIntegrationsInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertGitCourseArgs = {
  gitCourseInput: GitCourseInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertGitCourseTopicSubmissionArgs = {
  gitCourseTopicSubmission: GitCourseTopicSubmissionInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertGnosisSafeWalletsArgs = {
  spaceId: Scalars['String'];
  wallets: Array<GnosisSafeWalletInput>;
};


export type MutationUpsertGuideArgs = {
  guideInput: GuideInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertGuideRatingArgs = {
  spaceId: Scalars['String'];
  upsertGuideRatingInput: UpsertGuideRatingInput;
};


export type MutationUpsertProjectGalaxyAccessTokenArgs = {
  accessToken: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationUpsertSimulationArgs = {
  input: UpsertSimulationInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertSpaceAcademyRepositoryArgs = {
  academyRepository: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationUpsertSpaceFeaturesArgs = {
  features: Array<Scalars['String']>;
  spaceId: Scalars['String'];
};


export type MutationUpsertSpaceInviteLinksArgs = {
  spaceId: Scalars['String'];
  spaceInviteArgs: SpaceInviteArgs;
};


export type MutationUpsertTimelineArgs = {
  input: UpsertTimelineInput;
  spaceId: Scalars['String'];
};

export type OpenAiChatCompletionChoice = {
  __typename?: 'OpenAIChatCompletionChoice';
  finish_reason?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  message?: Maybe<OpenAiMessage>;
};

export type OpenAiChatCompletionResponse = {
  __typename?: 'OpenAIChatCompletionResponse';
  choices: Array<OpenAiChatCompletionChoice>;
  created: Scalars['Int'];
  id: Scalars['ID'];
  model: Scalars['String'];
  object: Scalars['String'];
  usage?: Maybe<OpenAiUsage>;
};

export type OpenAiChatMessageInput = {
  content: Scalars['String'];
  role: ChatCompletionRequestMessageRoleEnum;
};

export type OpenAiChoiceLogprobs = {
  __typename?: 'OpenAIChoiceLogprobs';
  text?: Maybe<Scalars['String']>;
  text_offset?: Maybe<Array<Scalars['Int']>>;
  token_logprobs?: Maybe<Array<Scalars['Float']>>;
  tokens?: Maybe<Array<Scalars['String']>>;
  top_logprobs?: Maybe<Array<Scalars['Any']>>;
};

export type OpenAiCompletionResponse = {
  __typename?: 'OpenAICompletionResponse';
  choices: Array<CreateCompletionResponseChoice>;
  created: Scalars['Int'];
  id: Scalars['ID'];
  model: Scalars['String'];
  object: Scalars['String'];
  usage?: Maybe<OpenAiUsage>;
};

export type OpenAiMessage = {
  __typename?: 'OpenAIMessage';
  content?: Maybe<Scalars['String']>;
  role: Scalars['String'];
};

export type OpenAiTextResponse = {
  __typename?: 'OpenAITextResponse';
  text: Scalars['String'];
  tokenCount: Scalars['Int'];
};

export type OpenAiUsage = {
  __typename?: 'OpenAIUsage';
  completion_tokens: Scalars['Int'];
  prompt_tokens: Scalars['Int'];
  total_tokens: Scalars['Int'];
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  academyTask: AcademyTask;
  academyTasks?: Maybe<Array<AcademyTask>>;
  byte: Byte;
  byteSocialShare?: Maybe<ByteSocialShare>;
  bytes: Array<Byte>;
  consolidatedGuideRating?: Maybe<ConsolidatedGuideRating>;
  courses: Array<GitCourse>;
  discourseIndexRuns: Array<DiscourseIndexRun>;
  discoursePostComments: Array<DiscourseIndexRun>;
  discoursePosts: Array<DiscourseIndexRun>;
  gitCourse: GitCourse;
  gitCourseIntegrations?: Maybe<CourseIntegrations>;
  gitCourseSubmission?: Maybe<GitCourseSubmission>;
  gitCourseSummarized: SummarizedGitCourse;
  gitTopicSubmissions: Array<GitCourseTopicSubmission>;
  guide: Guide;
  guideRating: Array<GuideRating>;
  guideRatings: Array<GuideRating>;
  guideSubmissions: Array<GuideSubmission>;
  guides: Array<Guide>;
  rawGitCourse: RawGitCourse;
  rawGitCourses: Array<RawGitCourse>;
  route53Records: Array<Route53Record>;
  simulation: Simulation;
  simulations: Array<Simulation>;
  space?: Maybe<Space>;
  spaceDiscordGuild?: Maybe<Scalars['Any']>;
  spaces?: Maybe<Array<Space>>;
  timeline: Timeline;
  timelines: Array<Timeline>;
  vercelDomainRecords: Array<VercelDomain>;
};


export type QueryAcademyTaskArgs = {
  uuid: Scalars['String'];
};


export type QueryAcademyTasksArgs = {
  spaceId: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
};


export type QueryByteArgs = {
  byteId: Scalars['String'];
  includeDraft?: InputMaybe<Scalars['Boolean']>;
  spaceId: Scalars['String'];
};


export type QueryByteSocialShareArgs = {
  byteId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryBytesArgs = {
  spaceId: Scalars['String'];
};


export type QueryConsolidatedGuideRatingArgs = {
  guideUuid: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryCoursesArgs = {
  spaceId: Scalars['String'];
};


export type QueryDiscourseIndexRunsArgs = {
  spaceId: Scalars['String'];
};


export type QueryDiscoursePostCommentsArgs = {
  postId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryDiscoursePostsArgs = {
  spaceId: Scalars['String'];
};


export type QueryGitCourseArgs = {
  courseKey: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryGitCourseIntegrationsArgs = {
  key: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryGitCourseSubmissionArgs = {
  courseKey: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryGitCourseSummarizedArgs = {
  key: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryGitTopicSubmissionsArgs = {
  courseKey: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryGuideArgs = {
  spaceId: Scalars['String'];
  uuid: Scalars['String'];
};


export type QueryGuideRatingArgs = {
  ratingUuid: Scalars['String'];
};


export type QueryGuideRatingsArgs = {
  guideUuid: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryGuideSubmissionsArgs = {
  filters: GuideSubmissionFiltersInput;
  guideUuid: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryGuidesArgs = {
  spaceId: Scalars['String'];
};


export type QueryRawGitCourseArgs = {
  key: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryRawGitCoursesArgs = {
  spaceId: Scalars['String'];
};


export type QuerySimulationArgs = {
  simulationId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QuerySimulationsArgs = {
  spaceId: Scalars['String'];
};


export type QuerySpaceArgs = {
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QuerySpaceDiscordGuildArgs = {
  spaceId: Scalars['String'];
};


export type QueryTimelineArgs = {
  spaceId: Scalars['String'];
  timelineId: Scalars['String'];
};


export type QueryTimelinesArgs = {
  spaceId: Scalars['String'];
};

export type QuestionChoice = {
  __typename?: 'QuestionChoice';
  content: Scalars['String'];
  key: Scalars['String'];
};

export type QuestionChoiceInput = {
  content: Scalars['String'];
  key: Scalars['String'];
};

export type RatingDistribution = {
  __typename?: 'RatingDistribution';
  content: Scalars['Float'];
  questions: Scalars['Float'];
  ux: Scalars['Float'];
};

export type RawGitCourse = {
  __typename?: 'RawGitCourse';
  courseKey: Scalars['String'];
  courseRepoUrl: Scalars['String'];
  publishStatus: Scalars['String'];
  weight: Scalars['Int'];
};

export type Route53Record = {
  __typename?: 'Route53Record';
  name?: Maybe<Scalars['String']>;
  records?: Maybe<Array<Maybe<Scalars['String']>>>;
  ttl?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type SendEmailInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  message: Scalars['String'];
};

export type Simulation = {
  __typename?: 'Simulation';
  admins: Array<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  postSubmissionStepContent?: Maybe<Scalars['String']>;
  priority: Scalars['Int'];
  publishStatus: Scalars['String'];
  showIncorrectOnCompletion: Scalars['Boolean'];
  steps: Array<SimulationStep>;
  tags: Array<Scalars['String']>;
};

export type SimulationStep = {
  __typename?: 'SimulationStep';
  content: Scalars['String'];
  iframeUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  order: Scalars['Int'];
  uuid: Scalars['String'];
};

export type SimulationStepInput = {
  content: Scalars['String'];
  iframeUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  order: Scalars['Int'];
  uuid: Scalars['String'];
};

export type SocialSettings = {
  __typename?: 'SocialSettings';
  linkedSharePdfBackgroundImage?: Maybe<Scalars['String']>;
};

export type SocialSettingsInput = {
  linkedSharePdfBackgroundImage?: InputMaybe<Scalars['String']>;
};

export type Space = {
  __typename?: 'Space';
  adminUsernames: Array<Scalars['String']>;
  admins: Array<Scalars['String']>;
  authSettings: AuthSettings;
  avatar?: Maybe<Scalars['String']>;
  byteSettings: ByteSettings;
  creator: Scalars['String'];
  domains: Array<Scalars['String']>;
  features: Array<Scalars['String']>;
  guideSettings: GuideSettings;
  id: Scalars['String'];
  inviteLinks?: Maybe<SpaceInviteLinks>;
  name: Scalars['String'];
  skin: Scalars['String'];
  socialSettings: SocialSettings;
  spaceIntegrations?: Maybe<SpaceIntegrations>;
};

export type SpaceFilters = {
  __typename?: 'SpaceFilters';
  minScore?: Maybe<Scalars['Float']>;
  onlyMembers?: Maybe<Scalars['Boolean']>;
};

export type SpaceGitRepository = {
  __typename?: 'SpaceGitRepository';
  authenticationToken?: Maybe<Scalars['String']>;
  gitRepoType?: Maybe<Scalars['String']>;
  repoUrl: Scalars['String'];
};

export type SpaceGitRepositoryInput = {
  authenticationToken?: InputMaybe<Scalars['String']>;
  gitRepoType?: InputMaybe<Scalars['String']>;
  repoUrl: Scalars['String'];
};

export type SpaceIntegrations = {
  __typename?: 'SpaceIntegrations';
  academyRepository?: Maybe<Scalars['String']>;
  discordGuildId?: Maybe<Scalars['String']>;
  gitGuideRepositories?: Maybe<Array<SpaceGitRepository>>;
  gnosisSafeWallets?: Maybe<Array<GnosisSafeWallet>>;
  projectGalaxyTokenLastFour?: Maybe<Scalars['String']>;
};

export type SpaceIntegrationsInput = {
  academyRepository?: InputMaybe<Scalars['String']>;
  discordGuildId?: InputMaybe<Scalars['String']>;
  gitGuideRepositories: Array<SpaceGitRepositoryInput>;
  gnosisSafeWallets: Array<GnosisSafeWalletInput>;
  projectGalaxyTokenLastFour?: InputMaybe<Scalars['String']>;
};

export type SpaceInviteArgs = {
  discordInviteLink?: InputMaybe<Scalars['String']>;
  showAnimatedButtonForDiscord?: InputMaybe<Scalars['Boolean']>;
  showAnimatedButtonForTelegram?: InputMaybe<Scalars['Boolean']>;
  telegramInviteLink?: InputMaybe<Scalars['String']>;
};

export type SpaceInviteLinks = {
  __typename?: 'SpaceInviteLinks';
  discordInviteLink?: Maybe<Scalars['String']>;
  showAnimatedButtonForDiscord?: Maybe<Scalars['Boolean']>;
  showAnimatedButtonForTelegram?: Maybe<Scalars['Boolean']>;
  telegramInviteLink?: Maybe<Scalars['String']>;
};

export type SpaceInviteLinksInput = {
  discordInviteLink?: InputMaybe<Scalars['String']>;
  showAnimatedButtonForDiscord?: InputMaybe<Scalars['Boolean']>;
  showAnimatedButtonForTelegram?: InputMaybe<Scalars['Boolean']>;
  telegramInviteLink?: InputMaybe<Scalars['String']>;
};

export type SpaceWhere = {
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StepItemInputGenericInput = {
  answerKeys?: InputMaybe<Array<Scalars['String']>>;
  choices?: InputMaybe<Array<QuestionChoiceInput>>;
  content?: InputMaybe<Scalars['String']>;
  explanation?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  questionType?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['Boolean']>;
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type SummarizedGitCourse = {
  __typename?: 'SummarizedGitCourse';
  courseAdmins?: Maybe<Array<Scalars['String']>>;
  details: Scalars['String'];
  duration: Scalars['String'];
  highlights: Array<Scalars['String']>;
  key: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
  publishStatus: Scalars['String'];
  summary: Scalars['String'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  topics: Array<SummarizedGitCourseTopic>;
  uuid: Scalars['String'];
};

export type SummarizedGitCourseTopic = {
  __typename?: 'SummarizedGitCourseTopic';
  details: Scalars['String'];
  key: Scalars['String'];
  title: Scalars['String'];
};

export type Timeline = {
  __typename?: 'Timeline';
  admins: Array<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  events: Array<TimelineEvent>;
  excerpt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  publishStatus: Scalars['String'];
  tags: Array<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type TimelineEvent = {
  __typename?: 'TimelineEvent';
  date: Scalars['DateTimeISO'];
  fullDetails?: Maybe<Scalars['String']>;
  moreLink?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  summary: Scalars['String'];
  title: Scalars['String'];
  uuid: Scalars['String'];
};

export type TopicConfig = {
  __typename?: 'TopicConfig';
  showExplanations: Scalars['Boolean'];
  showHints: Scalars['Boolean'];
};

export type TopicConfigInput = {
  showExplanations: Scalars['Boolean'];
  showHints: Scalars['Boolean'];
};

export type TopicQuestionChoiceInput = {
  content: Scalars['String'];
  key: Scalars['String'];
};

export type UpdateTopicBasicInfoInput = {
  courseKey: Scalars['String'];
  details: Scalars['String'];
  title: Scalars['String'];
  topicKey: Scalars['String'];
};

export type UpdateTopicExplanationInput = {
  courseKey: Scalars['String'];
  details: Scalars['String'];
  explanationKey: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  topicKey: Scalars['String'];
};

export type UpdateTopicQuestionInput = {
  answerKeys: Array<Scalars['String']>;
  choices: Array<TopicQuestionChoiceInput>;
  content: Scalars['String'];
  courseKey: Scalars['String'];
  explanation: Scalars['String'];
  hint: Scalars['String'];
  questionType: Scalars['String'];
  questionUuid: Scalars['String'];
  topicKey: Scalars['String'];
};

export type UpdateTopicSummaryInput = {
  courseKey: Scalars['String'];
  details: Scalars['String'];
  shortTitle: Scalars['String'];
  summaryKey: Scalars['String'];
  title: Scalars['String'];
  topicKey: Scalars['String'];
};

export type UpdateTopicVideoInput = {
  courseKey: Scalars['String'];
  details: Scalars['String'];
  shortTitle: Scalars['String'];
  title: Scalars['String'];
  topicKey: Scalars['String'];
  url: Scalars['String'];
  videoUuid: Scalars['String'];
};

export type UpsertAcademyTaskInput = {
  details: Scalars['String'];
  excerpt: Scalars['String'];
  items: Array<StepItemInputGenericInput>;
  prerequisiteCourseUuids: Array<Scalars['String']>;
  prerequisiteGuideUuids: Array<Scalars['String']>;
  status: Scalars['String'];
  title: Scalars['String'];
  uuid: Scalars['String'];
};

export type UpsertByteInput = {
  admins: Array<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  publishStatus: Scalars['String'];
  steps: Array<ByteStepInput>;
  tags: Array<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['String']>;
};

export type UpsertByteSocialShareInput = {
  byteId: Scalars['String'];
  linkedInImages?: InputMaybe<Array<Scalars['String']>>;
  linkedInPdf?: InputMaybe<Scalars['String']>;
  linkedinPdfContent?: InputMaybe<ByteLinkedinPdfContentInput>;
  spaceId: Scalars['String'];
  twitterImage?: InputMaybe<Scalars['String']>;
};

export type UpsertCourseIntegrationsInput = {
  courseKey: Scalars['String'];
  discordRoleIds: Array<Scalars['String']>;
  discordRolePassingCount?: InputMaybe<Scalars['Int']>;
  discordWebhook?: InputMaybe<Scalars['String']>;
  projectGalaxyCredentialId?: InputMaybe<Scalars['String']>;
  projectGalaxyOatMintUrl?: InputMaybe<Scalars['String']>;
  projectGalaxyOatMintedContent?: InputMaybe<Scalars['String']>;
  projectGalaxyOatPassingCount?: InputMaybe<Scalars['Int']>;
};

export type UpsertGuideRatingInput = {
  endRating?: InputMaybe<Scalars['Int']>;
  guideUuid: Scalars['String'];
  negativeFeedback?: InputMaybe<GuideFeedbackInput>;
  positiveFeedback?: InputMaybe<GuideFeedbackInput>;
  ratingUuid: Scalars['String'];
  skipEndRating?: InputMaybe<Scalars['Boolean']>;
  skipStartRating?: InputMaybe<Scalars['Boolean']>;
  spaceId: Scalars['String'];
  startRating?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpsertSimulationInput = {
  admins: Array<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  priority: Scalars['Int'];
  publishStatus: Scalars['String'];
  steps: Array<SimulationStepInput>;
  tags: Array<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type UpsertSpaceInput = {
  adminUsernames: Array<Scalars['String']>;
  admins: Array<Scalars['String']>;
  avatar: Scalars['String'];
  creator: Scalars['String'];
  domains: Array<Scalars['String']>;
  features: Array<Scalars['String']>;
  id: Scalars['String'];
  inviteLinks: SpaceInviteLinksInput;
  name: Scalars['String'];
  skin: Scalars['String'];
  spaceIntegrations: SpaceIntegrationsInput;
};

export type UpsertTimelineEventInput = {
  date: Scalars['DateTimeISO'];
  fullDetails?: InputMaybe<Scalars['String']>;
  moreLink?: InputMaybe<Scalars['String']>;
  summary: Scalars['String'];
  title: Scalars['String'];
  uuid: Scalars['String'];
};

export type UpsertTimelineInput = {
  admins: Array<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  events: Array<UpsertTimelineEventInput>;
  excerpt: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  priority: Scalars['Int'];
  publishStatus: Scalars['String'];
  tags: Array<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type UserDiscordConnect = {
  __typename?: 'UserDiscordConnect';
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type UserDiscordInfo = {
  __typename?: 'UserDiscordInfo';
  accessToken: Scalars['String'];
  avatar: Scalars['String'];
  discriminator: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
};

export type UserDiscordInfoInput = {
  accessToken: Scalars['String'];
  avatar: Scalars['String'];
  discriminator: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
};

export type UserInputInput = {
  label: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  required?: InputMaybe<Scalars['Boolean']>;
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type VercelDomain = {
  __typename?: 'VercelDomain';
  apexName: Scalars['String'];
  createdAt?: Maybe<Scalars['Int']>;
  gitBranch?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  projectId: Scalars['String'];
  redirect?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Int']>;
  verified: Scalars['Boolean'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = {
  ByteStepItem: ( ByteQuestion ) | ( ByteUserInput ) | ( UserDiscordConnect );
  GuideStepItem: ( GuideQuestion ) | ( GuideUserInput ) | ( UserDiscordConnect );
};

/** Mapping of union parent types */
export type ResolversUnionParentTypes = {
  ByteStepItem: ( ByteQuestion ) | ( ByteUserInput ) | ( UserDiscordConnect );
  GuideStepItem: ( GuideQuestion ) | ( GuideUserInput ) | ( UserDiscordConnect );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AcademyTask: ResolverTypeWrapper<Omit<AcademyTask, 'items'> & { items: Array<ResolversTypes['GuideStepItem']> }>;
  AddTopicExplanationInput: AddTopicExplanationInput;
  AddTopicInput: AddTopicInput;
  AddTopicQuestionInput: AddTopicQuestionInput;
  AddTopicQuestionsInput: AddTopicQuestionsInput;
  AddTopicSummaryInput: AddTopicSummaryInput;
  AddTopicVideoInput: AddTopicVideoInput;
  Any: ResolverTypeWrapper<Scalars['Any']>;
  AuthSettings: ResolverTypeWrapper<AuthSettings>;
  AuthSettingsInput: AuthSettingsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Byte>;
  ByteLinkedinPdfContent: ResolverTypeWrapper<ByteLinkedinPdfContent>;
  ByteLinkedinPdfContentInput: ByteLinkedinPdfContentInput;
  ByteLinkedinPdfContentStep: ResolverTypeWrapper<ByteLinkedinPdfContentStep>;
  ByteLinkedinPdfContentStepInput: ByteLinkedinPdfContentStepInput;
  ByteQuestion: ResolverTypeWrapper<ByteQuestion>;
  ByteSettings: ResolverTypeWrapper<ByteSettings>;
  ByteSettingsInput: ByteSettingsInput;
  ByteSocialShare: ResolverTypeWrapper<ByteSocialShare>;
  ByteStep: ResolverTypeWrapper<Omit<ByteStep, 'stepItems'> & { stepItems: Array<ResolversTypes['ByteStepItem']> }>;
  ByteStepInput: ByteStepInput;
  ByteStepItem: ResolverTypeWrapper<ResolversUnionTypes['ByteStepItem']>;
  ByteSubmission: ResolverTypeWrapper<ByteSubmission>;
  ByteSubmissionInput: ByteSubmissionInput;
  ByteUserInput: ResolverTypeWrapper<ByteUserInput>;
  ChatCompletionAIInput: ChatCompletionAiInput;
  ChatCompletionRequestMessageRoleEnum: ChatCompletionRequestMessageRoleEnum;
  CompletionAIInput: CompletionAiInput;
  ConsolidatedGuideRating: ResolverTypeWrapper<ConsolidatedGuideRating>;
  CourseBasicInfoInput: CourseBasicInfoInput;
  CourseIntegrations: ResolverTypeWrapper<CourseIntegrations>;
  CourseReadingQuestion: ResolverTypeWrapper<CourseReadingQuestion>;
  CourseSubmissionInput: CourseSubmissionInput;
  CreateCompletionResponseChoice: ResolverTypeWrapper<CreateCompletionResponseChoice>;
  CreateSignedUrlInput: CreateSignedUrlInput;
  DateTimeFilter: DateTimeFilter;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']>;
  DeleteTopicExplanationInput: DeleteTopicExplanationInput;
  DeleteTopicInput: DeleteTopicInput;
  DeleteTopicQuestionInput: DeleteTopicQuestionInput;
  DeleteTopicSummaryInput: DeleteTopicSummaryInput;
  DeleteTopicVideoInput: DeleteTopicVideoInput;
  DiscourseIndexRun: ResolverTypeWrapper<DiscourseIndexRun>;
  DiscourseIndexRunInput: DiscourseIndexRunInput;
  DiscoursePost: ResolverTypeWrapper<DiscoursePost>;
  DiscoursePostComment: ResolverTypeWrapper<DiscoursePostComment>;
  DownloadAndCleanContentResponse: ResolverTypeWrapper<DownloadAndCleanContentResponse>;
  DownloadLinkInfo: ResolverTypeWrapper<DownloadLinkInfo>;
  ExtractRelevantTextForTopicInput: ExtractRelevantTextForTopicInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GenerateImageEditInput: GenerateImageEditInput;
  GenerateImageInput: GenerateImageInput;
  GenerateImageResponse: ResolverTypeWrapper<GenerateImageResponse>;
  GenericCourse: ResolverTypeWrapper<GenericCourse>;
  GitCourse: ResolverTypeWrapper<GitCourse>;
  GitCourseExplanation: ResolverTypeWrapper<GitCourseExplanation>;
  GitCourseExplanationsSubmission: ResolverTypeWrapper<GitCourseExplanationsSubmission>;
  GitCourseExplanationsSubmissionInput: GitCourseExplanationsSubmissionInput;
  GitCourseInput: GitCourseInput;
  GitCourseQuestion: ResolverTypeWrapper<GitCourseQuestion>;
  GitCourseQuestionChoice: ResolverTypeWrapper<GitCourseQuestionChoice>;
  GitCourseQuestionsSubmission: ResolverTypeWrapper<GitCourseQuestionsSubmission>;
  GitCourseQuestionsSubmissionInput: GitCourseQuestionsSubmissionInput;
  GitCourseReading: ResolverTypeWrapper<GitCourseReading>;
  GitCourseReadingsSubmission: ResolverTypeWrapper<GitCourseReadingsSubmission>;
  GitCourseReadingsSubmissionInput: GitCourseReadingsSubmissionInput;
  GitCourseSubmission: ResolverTypeWrapper<GitCourseSubmission>;
  GitCourseSummariesSubmission: ResolverTypeWrapper<GitCourseSummariesSubmission>;
  GitCourseSummariesSubmissionInput: GitCourseSummariesSubmissionInput;
  GitCourseSummary: ResolverTypeWrapper<GitCourseSummary>;
  GitCourseTopic: ResolverTypeWrapper<GitCourseTopic>;
  GitCourseTopicCorrectAnswer: ResolverTypeWrapper<GitCourseTopicCorrectAnswer>;
  GitCourseTopicSubmission: ResolverTypeWrapper<GitCourseTopicSubmission>;
  GitCourseTopicSubmissionInput: GitCourseTopicSubmissionInput;
  GitCourseTopicSubmissionJson: ResolverTypeWrapper<GitCourseTopicSubmissionJson>;
  GnosisSafeWallet: ResolverTypeWrapper<GnosisSafeWallet>;
  GnosisSafeWalletInput: GnosisSafeWalletInput;
  Guide: ResolverTypeWrapper<Guide>;
  GuideFeedback: ResolverTypeWrapper<GuideFeedback>;
  GuideFeedbackInput: GuideFeedbackInput;
  GuideInput: GuideInput;
  GuideIntegrations: ResolverTypeWrapper<GuideIntegrations>;
  GuideIntegrationsInput: GuideIntegrationsInput;
  GuideQuestion: ResolverTypeWrapper<GuideQuestion>;
  GuideQuestionInput: GuideQuestionInput;
  GuideRating: ResolverTypeWrapper<GuideRating>;
  GuideSettings: ResolverTypeWrapper<GuideSettings>;
  GuideSettingsInput: GuideSettingsInput;
  GuideStep: ResolverTypeWrapper<Omit<GuideStep, 'stepItems'> & { stepItems: Array<ResolversTypes['GuideStepItem']> }>;
  GuideStepInput: GuideStepInput;
  GuideStepItem: ResolverTypeWrapper<ResolversUnionTypes['GuideStepItem']>;
  GuideStepItemSubmission: ResolverTypeWrapper<GuideStepItemSubmission>;
  GuideStepItemSubmissionInput: GuideStepItemSubmissionInput;
  GuideStepSubmission: ResolverTypeWrapper<GuideStepSubmission>;
  GuideStepSubmissionInput: GuideStepSubmissionInput;
  GuideSubmission: ResolverTypeWrapper<GuideSubmission>;
  GuideSubmissionFiltersInput: GuideSubmissionFiltersInput;
  GuideSubmissionInput: GuideSubmissionInput;
  GuideSubmissionResult: ResolverTypeWrapper<GuideSubmissionResult>;
  GuideUserInput: ResolverTypeWrapper<GuideUserInput>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImagesResponse: ResolverTypeWrapper<ImagesResponse>;
  ImagesResponseDataInner: ResolverTypeWrapper<ImagesResponseDataInner>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JwtResponse: ResolverTypeWrapper<JwtResponse>;
  MoveTopicExplanationInput: MoveTopicExplanationInput;
  MoveTopicInput: MoveTopicInput;
  MoveTopicQuestionInput: MoveTopicQuestionInput;
  MoveTopicSummaryInput: MoveTopicSummaryInput;
  MoveTopicVideoInput: MoveTopicVideoInput;
  Mutation: ResolverTypeWrapper<{}>;
  OpenAIChatCompletionChoice: ResolverTypeWrapper<OpenAiChatCompletionChoice>;
  OpenAIChatCompletionResponse: ResolverTypeWrapper<OpenAiChatCompletionResponse>;
  OpenAIChatMessageInput: OpenAiChatMessageInput;
  OpenAIChoiceLogprobs: ResolverTypeWrapper<OpenAiChoiceLogprobs>;
  OpenAICompletionResponse: ResolverTypeWrapper<OpenAiCompletionResponse>;
  OpenAIMessage: ResolverTypeWrapper<OpenAiMessage>;
  OpenAITextResponse: ResolverTypeWrapper<OpenAiTextResponse>;
  OpenAIUsage: ResolverTypeWrapper<OpenAiUsage>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  QuestionChoice: ResolverTypeWrapper<QuestionChoice>;
  QuestionChoiceInput: QuestionChoiceInput;
  RatingDistribution: ResolverTypeWrapper<RatingDistribution>;
  RawGitCourse: ResolverTypeWrapper<RawGitCourse>;
  Route53Record: ResolverTypeWrapper<Route53Record>;
  SendEmailInput: SendEmailInput;
  Simulation: ResolverTypeWrapper<Simulation>;
  SimulationStep: ResolverTypeWrapper<SimulationStep>;
  SimulationStepInput: SimulationStepInput;
  SocialSettings: ResolverTypeWrapper<SocialSettings>;
  SocialSettingsInput: SocialSettingsInput;
  Space: ResolverTypeWrapper<Space>;
  SpaceFilters: ResolverTypeWrapper<SpaceFilters>;
  SpaceGitRepository: ResolverTypeWrapper<SpaceGitRepository>;
  SpaceGitRepositoryInput: SpaceGitRepositoryInput;
  SpaceIntegrations: ResolverTypeWrapper<SpaceIntegrations>;
  SpaceIntegrationsInput: SpaceIntegrationsInput;
  SpaceInviteArgs: SpaceInviteArgs;
  SpaceInviteLinks: ResolverTypeWrapper<SpaceInviteLinks>;
  SpaceInviteLinksInput: SpaceInviteLinksInput;
  SpaceWhere: SpaceWhere;
  StepItemInputGenericInput: StepItemInputGenericInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  SummarizedGitCourse: ResolverTypeWrapper<SummarizedGitCourse>;
  SummarizedGitCourseTopic: ResolverTypeWrapper<SummarizedGitCourseTopic>;
  Timeline: ResolverTypeWrapper<Timeline>;
  TimelineEvent: ResolverTypeWrapper<TimelineEvent>;
  TopicConfig: ResolverTypeWrapper<TopicConfig>;
  TopicConfigInput: TopicConfigInput;
  TopicQuestionChoiceInput: TopicQuestionChoiceInput;
  UpdateTopicBasicInfoInput: UpdateTopicBasicInfoInput;
  UpdateTopicExplanationInput: UpdateTopicExplanationInput;
  UpdateTopicQuestionInput: UpdateTopicQuestionInput;
  UpdateTopicSummaryInput: UpdateTopicSummaryInput;
  UpdateTopicVideoInput: UpdateTopicVideoInput;
  UpsertAcademyTaskInput: UpsertAcademyTaskInput;
  UpsertByteInput: UpsertByteInput;
  UpsertByteSocialShareInput: UpsertByteSocialShareInput;
  UpsertCourseIntegrationsInput: UpsertCourseIntegrationsInput;
  UpsertGuideRatingInput: UpsertGuideRatingInput;
  UpsertSimulationInput: UpsertSimulationInput;
  UpsertSpaceInput: UpsertSpaceInput;
  UpsertTimelineEventInput: UpsertTimelineEventInput;
  UpsertTimelineInput: UpsertTimelineInput;
  UserDiscordConnect: ResolverTypeWrapper<UserDiscordConnect>;
  UserDiscordInfo: ResolverTypeWrapper<UserDiscordInfo>;
  UserDiscordInfoInput: UserDiscordInfoInput;
  UserInputInput: UserInputInput;
  VercelDomain: ResolverTypeWrapper<VercelDomain>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AcademyTask: Omit<AcademyTask, 'items'> & { items: Array<ResolversParentTypes['GuideStepItem']> };
  AddTopicExplanationInput: AddTopicExplanationInput;
  AddTopicInput: AddTopicInput;
  AddTopicQuestionInput: AddTopicQuestionInput;
  AddTopicQuestionsInput: AddTopicQuestionsInput;
  AddTopicSummaryInput: AddTopicSummaryInput;
  AddTopicVideoInput: AddTopicVideoInput;
  Any: Scalars['Any'];
  AuthSettings: AuthSettings;
  AuthSettingsInput: AuthSettingsInput;
  Boolean: Scalars['Boolean'];
  Byte: Byte;
  ByteLinkedinPdfContent: ByteLinkedinPdfContent;
  ByteLinkedinPdfContentInput: ByteLinkedinPdfContentInput;
  ByteLinkedinPdfContentStep: ByteLinkedinPdfContentStep;
  ByteLinkedinPdfContentStepInput: ByteLinkedinPdfContentStepInput;
  ByteQuestion: ByteQuestion;
  ByteSettings: ByteSettings;
  ByteSettingsInput: ByteSettingsInput;
  ByteSocialShare: ByteSocialShare;
  ByteStep: Omit<ByteStep, 'stepItems'> & { stepItems: Array<ResolversParentTypes['ByteStepItem']> };
  ByteStepInput: ByteStepInput;
  ByteStepItem: ResolversUnionParentTypes['ByteStepItem'];
  ByteSubmission: ByteSubmission;
  ByteSubmissionInput: ByteSubmissionInput;
  ByteUserInput: ByteUserInput;
  ChatCompletionAIInput: ChatCompletionAiInput;
  CompletionAIInput: CompletionAiInput;
  ConsolidatedGuideRating: ConsolidatedGuideRating;
  CourseBasicInfoInput: CourseBasicInfoInput;
  CourseIntegrations: CourseIntegrations;
  CourseReadingQuestion: CourseReadingQuestion;
  CourseSubmissionInput: CourseSubmissionInput;
  CreateCompletionResponseChoice: CreateCompletionResponseChoice;
  CreateSignedUrlInput: CreateSignedUrlInput;
  DateTimeFilter: DateTimeFilter;
  DateTimeISO: Scalars['DateTimeISO'];
  DeleteTopicExplanationInput: DeleteTopicExplanationInput;
  DeleteTopicInput: DeleteTopicInput;
  DeleteTopicQuestionInput: DeleteTopicQuestionInput;
  DeleteTopicSummaryInput: DeleteTopicSummaryInput;
  DeleteTopicVideoInput: DeleteTopicVideoInput;
  DiscourseIndexRun: DiscourseIndexRun;
  DiscourseIndexRunInput: DiscourseIndexRunInput;
  DiscoursePost: DiscoursePost;
  DiscoursePostComment: DiscoursePostComment;
  DownloadAndCleanContentResponse: DownloadAndCleanContentResponse;
  DownloadLinkInfo: DownloadLinkInfo;
  ExtractRelevantTextForTopicInput: ExtractRelevantTextForTopicInput;
  Float: Scalars['Float'];
  GenerateImageEditInput: GenerateImageEditInput;
  GenerateImageInput: GenerateImageInput;
  GenerateImageResponse: GenerateImageResponse;
  GenericCourse: GenericCourse;
  GitCourse: GitCourse;
  GitCourseExplanation: GitCourseExplanation;
  GitCourseExplanationsSubmission: GitCourseExplanationsSubmission;
  GitCourseExplanationsSubmissionInput: GitCourseExplanationsSubmissionInput;
  GitCourseInput: GitCourseInput;
  GitCourseQuestion: GitCourseQuestion;
  GitCourseQuestionChoice: GitCourseQuestionChoice;
  GitCourseQuestionsSubmission: GitCourseQuestionsSubmission;
  GitCourseQuestionsSubmissionInput: GitCourseQuestionsSubmissionInput;
  GitCourseReading: GitCourseReading;
  GitCourseReadingsSubmission: GitCourseReadingsSubmission;
  GitCourseReadingsSubmissionInput: GitCourseReadingsSubmissionInput;
  GitCourseSubmission: GitCourseSubmission;
  GitCourseSummariesSubmission: GitCourseSummariesSubmission;
  GitCourseSummariesSubmissionInput: GitCourseSummariesSubmissionInput;
  GitCourseSummary: GitCourseSummary;
  GitCourseTopic: GitCourseTopic;
  GitCourseTopicCorrectAnswer: GitCourseTopicCorrectAnswer;
  GitCourseTopicSubmission: GitCourseTopicSubmission;
  GitCourseTopicSubmissionInput: GitCourseTopicSubmissionInput;
  GitCourseTopicSubmissionJson: GitCourseTopicSubmissionJson;
  GnosisSafeWallet: GnosisSafeWallet;
  GnosisSafeWalletInput: GnosisSafeWalletInput;
  Guide: Guide;
  GuideFeedback: GuideFeedback;
  GuideFeedbackInput: GuideFeedbackInput;
  GuideInput: GuideInput;
  GuideIntegrations: GuideIntegrations;
  GuideIntegrationsInput: GuideIntegrationsInput;
  GuideQuestion: GuideQuestion;
  GuideQuestionInput: GuideQuestionInput;
  GuideRating: GuideRating;
  GuideSettings: GuideSettings;
  GuideSettingsInput: GuideSettingsInput;
  GuideStep: Omit<GuideStep, 'stepItems'> & { stepItems: Array<ResolversParentTypes['GuideStepItem']> };
  GuideStepInput: GuideStepInput;
  GuideStepItem: ResolversUnionParentTypes['GuideStepItem'];
  GuideStepItemSubmission: GuideStepItemSubmission;
  GuideStepItemSubmissionInput: GuideStepItemSubmissionInput;
  GuideStepSubmission: GuideStepSubmission;
  GuideStepSubmissionInput: GuideStepSubmissionInput;
  GuideSubmission: GuideSubmission;
  GuideSubmissionFiltersInput: GuideSubmissionFiltersInput;
  GuideSubmissionInput: GuideSubmissionInput;
  GuideSubmissionResult: GuideSubmissionResult;
  GuideUserInput: GuideUserInput;
  ID: Scalars['ID'];
  ImagesResponse: ImagesResponse;
  ImagesResponseDataInner: ImagesResponseDataInner;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JwtResponse: JwtResponse;
  MoveTopicExplanationInput: MoveTopicExplanationInput;
  MoveTopicInput: MoveTopicInput;
  MoveTopicQuestionInput: MoveTopicQuestionInput;
  MoveTopicSummaryInput: MoveTopicSummaryInput;
  MoveTopicVideoInput: MoveTopicVideoInput;
  Mutation: {};
  OpenAIChatCompletionChoice: OpenAiChatCompletionChoice;
  OpenAIChatCompletionResponse: OpenAiChatCompletionResponse;
  OpenAIChatMessageInput: OpenAiChatMessageInput;
  OpenAIChoiceLogprobs: OpenAiChoiceLogprobs;
  OpenAICompletionResponse: OpenAiCompletionResponse;
  OpenAIMessage: OpenAiMessage;
  OpenAITextResponse: OpenAiTextResponse;
  OpenAIUsage: OpenAiUsage;
  Query: {};
  QuestionChoice: QuestionChoice;
  QuestionChoiceInput: QuestionChoiceInput;
  RatingDistribution: RatingDistribution;
  RawGitCourse: RawGitCourse;
  Route53Record: Route53Record;
  SendEmailInput: SendEmailInput;
  Simulation: Simulation;
  SimulationStep: SimulationStep;
  SimulationStepInput: SimulationStepInput;
  SocialSettings: SocialSettings;
  SocialSettingsInput: SocialSettingsInput;
  Space: Space;
  SpaceFilters: SpaceFilters;
  SpaceGitRepository: SpaceGitRepository;
  SpaceGitRepositoryInput: SpaceGitRepositoryInput;
  SpaceIntegrations: SpaceIntegrations;
  SpaceIntegrationsInput: SpaceIntegrationsInput;
  SpaceInviteArgs: SpaceInviteArgs;
  SpaceInviteLinks: SpaceInviteLinks;
  SpaceInviteLinksInput: SpaceInviteLinksInput;
  SpaceWhere: SpaceWhere;
  StepItemInputGenericInput: StepItemInputGenericInput;
  String: Scalars['String'];
  SummarizedGitCourse: SummarizedGitCourse;
  SummarizedGitCourseTopic: SummarizedGitCourseTopic;
  Timeline: Timeline;
  TimelineEvent: TimelineEvent;
  TopicConfig: TopicConfig;
  TopicConfigInput: TopicConfigInput;
  TopicQuestionChoiceInput: TopicQuestionChoiceInput;
  UpdateTopicBasicInfoInput: UpdateTopicBasicInfoInput;
  UpdateTopicExplanationInput: UpdateTopicExplanationInput;
  UpdateTopicQuestionInput: UpdateTopicQuestionInput;
  UpdateTopicSummaryInput: UpdateTopicSummaryInput;
  UpdateTopicVideoInput: UpdateTopicVideoInput;
  UpsertAcademyTaskInput: UpsertAcademyTaskInput;
  UpsertByteInput: UpsertByteInput;
  UpsertByteSocialShareInput: UpsertByteSocialShareInput;
  UpsertCourseIntegrationsInput: UpsertCourseIntegrationsInput;
  UpsertGuideRatingInput: UpsertGuideRatingInput;
  UpsertSimulationInput: UpsertSimulationInput;
  UpsertSpaceInput: UpsertSpaceInput;
  UpsertTimelineEventInput: UpsertTimelineEventInput;
  UpsertTimelineInput: UpsertTimelineInput;
  UserDiscordConnect: UserDiscordConnect;
  UserDiscordInfo: UserDiscordInfo;
  UserDiscordInfoInput: UserDiscordInfoInput;
  UserInputInput: UserInputInput;
  VercelDomain: VercelDomain;
};

export type AcademyTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcademyTask'] = ResolversParentTypes['AcademyTask']> = {
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  excerpt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['GuideStepItem']>, ParentType, ContextType>;
  prerequisiteCourses?: Resolver<Array<ResolversTypes['SummarizedGitCourse']>, ParentType, ContextType>;
  prerequisiteGuides?: Resolver<Array<ResolversTypes['Guide']>, ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Any'], any> {
  name: 'Any';
}

export type AuthSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthSettings'] = ResolversParentTypes['AuthSettings']> = {
  enableLogin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  loginOptions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Byte'] = ResolversParentTypes['Byte']> = {
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postSubmissionStepContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publishStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  showIncorrectOnCompletion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['ByteStep']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteLinkedinPdfContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteLinkedinPdfContent'] = ResolversParentTypes['ByteLinkedinPdfContent']> = {
  excerpt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['ByteLinkedinPdfContentStep']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteLinkedinPdfContentStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteLinkedinPdfContentStep'] = ResolversParentTypes['ByteLinkedinPdfContentStep']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteQuestion'] = ResolversParentTypes['ByteQuestion']> = {
  answerKeys?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  choices?: Resolver<Array<ResolversTypes['QuestionChoice']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteSettings'] = ResolversParentTypes['ByteSettings']> = {
  askForLoginToSubmit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  captureBeforeAndAfterRating?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  captureRating?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showCategoriesInSidebar?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteSocialShareResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteSocialShare'] = ResolversParentTypes['ByteSocialShare']> = {
  byteId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linkedInImages?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  linkedInPdf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinPdfContent?: Resolver<Maybe<ResolversTypes['ByteLinkedinPdfContent']>, ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitterImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteStep'] = ResolversParentTypes['ByteStep']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepItems?: Resolver<Array<ResolversTypes['ByteStepItem']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteStepItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteStepItem'] = ResolversParentTypes['ByteStepItem']> = {
  __resolveType: TypeResolveFn<'ByteQuestion' | 'ByteUserInput' | 'UserDiscordConnect', ParentType, ContextType>;
};

export type ByteSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteSubmission'] = ResolversParentTypes['ByteSubmission']> = {
  byteId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteUserInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteUserInput'] = ResolversParentTypes['ByteUserInput']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  required?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConsolidatedGuideRatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConsolidatedGuideRating'] = ResolversParentTypes['ConsolidatedGuideRating']> = {
  avgRating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  endRatingFeedbackCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  negativeFeedbackCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  negativeRatingDistribution?: Resolver<ResolversTypes['RatingDistribution'], ParentType, ContextType>;
  positiveFeedbackCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  positiveRatingDistribution?: Resolver<ResolversTypes['RatingDistribution'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseIntegrationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CourseIntegrations'] = ResolversParentTypes['CourseIntegrations']> = {
  discordRoleIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  discordRolePassingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  discordWebhook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectGalaxyCredentialId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectGalaxyOatMintUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectGalaxyOatMintedContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectGalaxyOatPassingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseReadingQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CourseReadingQuestion'] = ResolversParentTypes['CourseReadingQuestion']> = {
  answerKeys?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  choices?: Resolver<Array<ResolversTypes['GitCourseQuestionChoice']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeInSec?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCompletionResponseChoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCompletionResponseChoice'] = ResolversParentTypes['CreateCompletionResponseChoice']> = {
  finish_reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  logprobs?: Resolver<Maybe<ResolversTypes['OpenAIChoiceLogprobs']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export type DiscourseIndexRunResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscourseIndexRun'] = ResolversParentTypes['DiscourseIndexRun']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscoursePostResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscoursePost'] = ResolversParentTypes['DiscoursePost']> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  indexedAt?: Resolver<Maybe<ResolversTypes['DateTimeISO']>, ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscoursePostCommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscoursePostComment'] = ResolversParentTypes['DiscoursePostComment']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commentPostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  indexedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DownloadAndCleanContentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DownloadAndCleanContentResponse'] = ResolversParentTypes['DownloadAndCleanContentResponse']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['DownloadLinkInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DownloadLinkInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['DownloadLinkInfo'] = ResolversParentTypes['DownloadLinkInfo']> = {
  downloadStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenerateImageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenerateImageResponse'] = ResolversParentTypes['GenerateImageResponse']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenericCourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenericCourse'] = ResolversParentTypes['GenericCourse']> = {
  categories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courseAdmins?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  courseType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  excerpt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  highlights?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  publishStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourse'] = ResolversParentTypes['GitCourse']> = {
  courseAdmins?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  courseFailContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coursePassContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coursePassCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  highlights?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  publishStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  topicConfig?: Resolver<Maybe<ResolversTypes['TopicConfig']>, ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes['GitCourseTopic']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseExplanationResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseExplanation'] = ResolversParentTypes['GitCourseExplanation']> = {
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseExplanationsSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseExplanationsSubmission'] = ResolversParentTypes['GitCourseExplanationsSubmission']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseQuestion'] = ResolversParentTypes['GitCourseQuestion']> = {
  answerKeys?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  choices?: Resolver<Array<ResolversTypes['GitCourseQuestionChoice']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseQuestionChoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseQuestionChoice'] = ResolversParentTypes['GitCourseQuestionChoice']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseQuestionsSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseQuestionsSubmission'] = ResolversParentTypes['GitCourseQuestionsSubmission']> = {
  answers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseReadingResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseReading'] = ResolversParentTypes['GitCourseReading']> = {
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<ResolversTypes['CourseReadingQuestion']>>, ParentType, ContextType>;
  shortTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseReadingsSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseReadingsSubmission'] = ResolversParentTypes['GitCourseReadingsSubmission']> = {
  questions?: Resolver<Maybe<Array<ResolversTypes['GitCourseQuestionsSubmission']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseSubmission'] = ResolversParentTypes['GitCourseSubmission']> = {
  courseKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  galaxyCredentialsUpdated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isLatestSubmission?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  questionsAttempted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  questionsCorrect?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  questionsIncorrect?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  questionsSkipped?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  topicSubmissions?: Resolver<Array<ResolversTypes['GitCourseTopicSubmission']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseSummariesSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseSummariesSubmission'] = ResolversParentTypes['GitCourseSummariesSubmission']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseSummary'] = ResolversParentTypes['GitCourseSummary']> = {
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseTopicResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseTopic'] = ResolversParentTypes['GitCourseTopic']> = {
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanations?: Resolver<Array<ResolversTypes['GitCourseExplanation']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['GitCourseQuestion']>, ParentType, ContextType>;
  readings?: Resolver<Array<ResolversTypes['GitCourseReading']>, ParentType, ContextType>;
  summaries?: Resolver<Array<ResolversTypes['GitCourseSummary']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseTopicCorrectAnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseTopicCorrectAnswer'] = ResolversParentTypes['GitCourseTopicCorrectAnswer']> = {
  answerKeys?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseTopicSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseTopicSubmission'] = ResolversParentTypes['GitCourseTopicSubmission']> = {
  correctAnswers?: Resolver<Maybe<Array<ResolversTypes['GitCourseTopicCorrectAnswer']>>, ParentType, ContextType>;
  courseKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courseSubmissionUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isLatestSubmission?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  questionsAttempted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  questionsCorrect?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  questionsIncorrect?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  questionsSkipped?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submission?: Resolver<Maybe<ResolversTypes['GitCourseTopicSubmissionJson']>, ParentType, ContextType>;
  topicKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GitCourseTopicSubmissionJsonResolvers<ContextType = any, ParentType extends ResolversParentTypes['GitCourseTopicSubmissionJson'] = ResolversParentTypes['GitCourseTopicSubmissionJson']> = {
  courseKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanations?: Resolver<Maybe<Array<ResolversTypes['GitCourseExplanationsSubmission']>>, ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<ResolversTypes['GitCourseQuestionsSubmission']>>, ParentType, ContextType>;
  readings?: Resolver<Maybe<Array<ResolversTypes['GitCourseReadingsSubmission']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summaries?: Resolver<Maybe<Array<ResolversTypes['GitCourseSummariesSubmission']>>, ParentType, ContextType>;
  topicKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GnosisSafeWalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['GnosisSafeWallet'] = ResolversParentTypes['GnosisSafeWallet']> = {
  chainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tokenContractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  walletAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  walletName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideResolvers<ContextType = any, ParentType extends ResolversParentTypes['Guide'] = ResolversParentTypes['Guide']> = {
  authors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  guideIntegrations?: Resolver<ResolversTypes['GuideIntegrations'], ParentType, ContextType>;
  guideSource?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  guideType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postSubmissionStepContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  previousId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['GuideStep']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideFeedbackResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideFeedback'] = ResolversParentTypes['GuideFeedback']> = {
  content?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  questions?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  ux?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideIntegrationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideIntegrations'] = ResolversParentTypes['GuideIntegrations']> = {
  discordRoleIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  discordRolePassingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  discordWebhook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectGalaxyCredentialId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectGalaxyOatMintUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectGalaxyOatPassingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideQuestion'] = ResolversParentTypes['GuideQuestion']> = {
  answerKeys?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  choices?: Resolver<Array<ResolversTypes['QuestionChoice']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideRatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideRating'] = ResolversParentTypes['GuideRating']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  endRating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  guideUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ipAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  negativeFeedback?: Resolver<Maybe<ResolversTypes['GuideFeedback']>, ParentType, ContextType>;
  positiveFeedback?: Resolver<Maybe<ResolversTypes['GuideFeedback']>, ParentType, ContextType>;
  ratingUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skipEndRating?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  skipStartRating?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startRating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideSettings'] = ResolversParentTypes['GuideSettings']> = {
  askForLoginToSubmit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  captureBeforeAndAfterRating?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  captureRating?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showCategoriesInSidebar?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showIncorrectAfterEachStep?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showIncorrectOnCompletion?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideStep'] = ResolversParentTypes['GuideStep']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stepItems?: Resolver<Array<ResolversTypes['GuideStepItem']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideStepItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideStepItem'] = ResolversParentTypes['GuideStepItem']> = {
  __resolveType: TypeResolveFn<'GuideQuestion' | 'GuideUserInput' | 'UserDiscordConnect', ParentType, ContextType>;
};

export type GuideStepItemSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideStepItemSubmission'] = ResolversParentTypes['GuideStepItemSubmission']> = {
  selectedAnswerKeys?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userDiscordInfo?: Resolver<Maybe<ResolversTypes['UserDiscordInfo']>, ParentType, ContextType>;
  userInput?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideStepSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideStepSubmission'] = ResolversParentTypes['GuideStepSubmission']> = {
  itemResponses?: Resolver<Array<ResolversTypes['GuideStepItemSubmission']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideSubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideSubmission'] = ResolversParentTypes['GuideSubmission']> = {
  correctQuestionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  galaxyCredentialsUpdated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  guideId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  guideUuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['GuideSubmissionResult'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  steps?: Resolver<Maybe<Array<ResolversTypes['GuideStepSubmission']>>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideSubmissionResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideSubmissionResult'] = ResolversParentTypes['GuideSubmissionResult']> = {
  allQuestions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  correctQuestions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  wrongQuestions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideUserInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideUserInput'] = ResolversParentTypes['GuideUserInput']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  required?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImagesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImagesResponse'] = ResolversParentTypes['ImagesResponse']> = {
  created?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['ImagesResponseDataInner']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImagesResponseDataInnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImagesResponseDataInner'] = ResolversParentTypes['ImagesResponseDataInner']> = {
  b64_json?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type JwtResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['JwtResponse'] = ResolversParentTypes['JwtResponse']> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addDiscordCredentials?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationAddDiscordCredentialsArgs, 'code' | 'redirectUri' | 'spaceId'>>;
  addTopic?: Resolver<ResolversTypes['GitCourseTopic'], ParentType, ContextType, RequireFields<MutationAddTopicArgs, 'spaceId' | 'topicInfo'>>;
  addTopicExplanation?: Resolver<ResolversTypes['GitCourseExplanation'], ParentType, ContextType, RequireFields<MutationAddTopicExplanationArgs, 'explanationInfo' | 'spaceId'>>;
  addTopicQuestion?: Resolver<ResolversTypes['GitCourseQuestion'], ParentType, ContextType, RequireFields<MutationAddTopicQuestionArgs, 'questionInfo' | 'spaceId'>>;
  addTopicQuestions?: Resolver<Array<ResolversTypes['GitCourseQuestion']>, ParentType, ContextType, RequireFields<MutationAddTopicQuestionsArgs, 'input' | 'spaceId'>>;
  addTopicSummary?: Resolver<ResolversTypes['GitCourseSummary'], ParentType, ContextType, RequireFields<MutationAddTopicSummaryArgs, 'spaceId' | 'summaryInfo'>>;
  addTopicVideo?: Resolver<ResolversTypes['GitCourseReading'], ParentType, ContextType, RequireFields<MutationAddTopicVideoArgs, 'spaceId' | 'videoInfo'>>;
  askChatCompletionAI?: Resolver<ResolversTypes['OpenAIChatCompletionResponse'], ParentType, ContextType, RequireFields<MutationAskChatCompletionAiArgs, 'input'>>;
  askCompletionAI?: Resolver<ResolversTypes['OpenAICompletionResponse'], ParentType, ContextType, RequireFields<MutationAskCompletionAiArgs, 'input'>>;
  authenticateWithUnstoppable?: Resolver<ResolversTypes['JwtResponse'], ParentType, ContextType, RequireFields<MutationAuthenticateWithUnstoppableArgs, 'idToken'>>;
  createNewDiscourseIndexRun?: Resolver<ResolversTypes['DiscourseIndexRun'], ParentType, ContextType, RequireFields<MutationCreateNewDiscourseIndexRunArgs, 'input' | 'spaceId'>>;
  createSignedUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateSignedUrlArgs, 'input' | 'spaceId'>>;
  createSpace?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationCreateSpaceArgs, 'spaceInput'>>;
  createSummaryOfContent?: Resolver<ResolversTypes['OpenAITextResponse'], ParentType, ContextType, RequireFields<MutationCreateSummaryOfContentArgs, 'input'>>;
  deleteAndPullCourseRepo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteAndPullCourseRepoArgs, 'courseKey' | 'spaceId'>>;
  deleteGitCourseSubmission?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteGitCourseSubmissionArgs, 'courseKey' | 'spaceId'>>;
  deleteGuide?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteGuideArgs, 'spaceId' | 'uuid'>>;
  deleteTopic?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicArgs, 'spaceId' | 'topicInfo'>>;
  deleteTopicExplanation?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicExplanationArgs, 'explanationInfo' | 'spaceId'>>;
  deleteTopicQuestion?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicQuestionArgs, 'questionInfo' | 'spaceId'>>;
  deleteTopicSummary?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicSummaryArgs, 'spaceId' | 'summaryInfo'>>;
  deleteTopicVideo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicVideoArgs, 'spaceId' | 'videoInfo'>>;
  downloadAndCleanContent?: Resolver<ResolversTypes['DownloadAndCleanContentResponse'], ParentType, ContextType, RequireFields<MutationDownloadAndCleanContentArgs, 'input'>>;
  extractRelevantTextForTopic?: Resolver<ResolversTypes['OpenAITextResponse'], ParentType, ContextType, RequireFields<MutationExtractRelevantTextForTopicArgs, 'input'>>;
  generateImage?: Resolver<ResolversTypes['ImagesResponse'], ParentType, ContextType, RequireFields<MutationGenerateImageArgs, 'input'>>;
  generateImageEdit?: Resolver<ResolversTypes['GenerateImageResponse'], ParentType, ContextType, RequireFields<MutationGenerateImageEditArgs, 'input'>>;
  generateSharablePdf?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationGenerateSharablePdfArgs, 'byteId' | 'spaceId'>>;
  initializeGitCourseSubmission?: Resolver<ResolversTypes['GitCourseSubmission'], ParentType, ContextType, RequireFields<MutationInitializeGitCourseSubmissionArgs, 'courseKey' | 'spaceId'>>;
  moveTopic?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicArgs, 'spaceId' | 'topicInfo'>>;
  moveTopicExplanation?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicExplanationArgs, 'explanationInfo' | 'spaceId'>>;
  moveTopicQuestion?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicQuestionArgs, 'questionInfo' | 'spaceId'>>;
  moveTopicSummary?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicSummaryArgs, 'spaceId' | 'summaryInfo'>>;
  moveTopicVideo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicVideoArgs, 'spaceId' | 'videoInfo'>>;
  publishByte?: Resolver<ResolversTypes['Byte'], ParentType, ContextType, RequireFields<MutationPublishByteArgs, 'input' | 'spaceId'>>;
  refreshGitCourse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRefreshGitCourseArgs, 'courseKey' | 'spaceId'>>;
  refreshGitCourses?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRefreshGitCoursesArgs, 'spaceId'>>;
  reloadAcademyRepository?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationReloadAcademyRepositoryArgs, 'spaceId'>>;
  saveByte?: Resolver<ResolversTypes['Byte'], ParentType, ContextType, RequireFields<MutationSaveByteArgs, 'input' | 'spaceId'>>;
  sendEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendEmailArgs, 'input'>>;
  submitByte?: Resolver<ResolversTypes['ByteSubmission'], ParentType, ContextType, RequireFields<MutationSubmitByteArgs, 'submissionInput'>>;
  submitGitCourse?: Resolver<ResolversTypes['GitCourseSubmission'], ParentType, ContextType, RequireFields<MutationSubmitGitCourseArgs, 'input' | 'spaceId'>>;
  submitGitCourseTopic?: Resolver<ResolversTypes['GitCourseSubmission'], ParentType, ContextType, RequireFields<MutationSubmitGitCourseTopicArgs, 'gitCourseTopicSubmission' | 'spaceId'>>;
  submitGuide?: Resolver<ResolversTypes['GuideSubmission'], ParentType, ContextType, RequireFields<MutationSubmitGuideArgs, 'submissionInput'>>;
  triggerDiscourseIndexRun?: Resolver<ResolversTypes['DiscourseIndexRun'], ParentType, ContextType, RequireFields<MutationTriggerDiscourseIndexRunArgs, 'indexRunId' | 'spaceId'>>;
  updateAuthSettings?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateAuthSettingsArgs, 'input' | 'spaceId'>>;
  updateByteSettings?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateByteSettingsArgs, 'input' | 'spaceId'>>;
  updateCourseBasicInfo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateCourseBasicInfoArgs, 'courseBasicInfo' | 'spaceId'>>;
  updateGuideSettings?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateGuideSettingsArgs, 'input' | 'spaceId'>>;
  updateSocialSettings?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateSocialSettingsArgs, 'input' | 'spaceId'>>;
  updateSpace?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateSpaceArgs, 'spaceInput'>>;
  updateTopicBasicInfo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicBasicInfoArgs, 'spaceId' | 'topicInfo'>>;
  updateTopicExplanation?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicExplanationArgs, 'explanationInfo' | 'spaceId'>>;
  updateTopicQuestion?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicQuestionArgs, 'questionInfo' | 'spaceId'>>;
  updateTopicSummary?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicSummaryArgs, 'spaceId' | 'summaryInfo'>>;
  updateTopicVideo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicVideoArgs, 'spaceId' | 'videoInfo'>>;
  upsertAcademyTask?: Resolver<ResolversTypes['AcademyTask'], ParentType, ContextType, RequireFields<MutationUpsertAcademyTaskArgs, 'spaceId' | 'task'>>;
  upsertByte?: Resolver<ResolversTypes['Byte'], ParentType, ContextType, RequireFields<MutationUpsertByteArgs, 'input' | 'spaceId'>>;
  upsertByteSocialShare?: Resolver<ResolversTypes['ByteSocialShare'], ParentType, ContextType, RequireFields<MutationUpsertByteSocialShareArgs, 'input' | 'spaceId'>>;
  upsertCourseIntegrations?: Resolver<ResolversTypes['CourseIntegrations'], ParentType, ContextType, RequireFields<MutationUpsertCourseIntegrationsArgs, 'courseIntegrationInput' | 'spaceId'>>;
  upsertGitCourse?: Resolver<Maybe<ResolversTypes['SummarizedGitCourse']>, ParentType, ContextType, RequireFields<MutationUpsertGitCourseArgs, 'gitCourseInput' | 'spaceId'>>;
  upsertGitCourseTopicSubmission?: Resolver<ResolversTypes['GitCourseSubmission'], ParentType, ContextType, RequireFields<MutationUpsertGitCourseTopicSubmissionArgs, 'gitCourseTopicSubmission' | 'spaceId'>>;
  upsertGnosisSafeWallets?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertGnosisSafeWalletsArgs, 'spaceId' | 'wallets'>>;
  upsertGuide?: Resolver<ResolversTypes['Guide'], ParentType, ContextType, RequireFields<MutationUpsertGuideArgs, 'guideInput' | 'spaceId'>>;
  upsertGuideRating?: Resolver<ResolversTypes['GuideRating'], ParentType, ContextType, RequireFields<MutationUpsertGuideRatingArgs, 'spaceId' | 'upsertGuideRatingInput'>>;
  upsertProjectGalaxyAccessToken?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertProjectGalaxyAccessTokenArgs, 'accessToken' | 'spaceId'>>;
  upsertSimulation?: Resolver<ResolversTypes['Simulation'], ParentType, ContextType, RequireFields<MutationUpsertSimulationArgs, 'input' | 'spaceId'>>;
  upsertSpaceAcademyRepository?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertSpaceAcademyRepositoryArgs, 'academyRepository' | 'spaceId'>>;
  upsertSpaceFeatures?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertSpaceFeaturesArgs, 'features' | 'spaceId'>>;
  upsertSpaceInviteLinks?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertSpaceInviteLinksArgs, 'spaceId' | 'spaceInviteArgs'>>;
  upsertTimeline?: Resolver<ResolversTypes['Timeline'], ParentType, ContextType, RequireFields<MutationUpsertTimelineArgs, 'input' | 'spaceId'>>;
};

export type OpenAiChatCompletionChoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenAIChatCompletionChoice'] = ResolversParentTypes['OpenAIChatCompletionChoice']> = {
  finish_reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['OpenAIMessage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenAiChatCompletionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenAIChatCompletionResponse'] = ResolversParentTypes['OpenAIChatCompletionResponse']> = {
  choices?: Resolver<Array<ResolversTypes['OpenAIChatCompletionChoice']>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  object?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  usage?: Resolver<Maybe<ResolversTypes['OpenAIUsage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenAiChoiceLogprobsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenAIChoiceLogprobs'] = ResolversParentTypes['OpenAIChoiceLogprobs']> = {
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text_offset?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  token_logprobs?: Resolver<Maybe<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  top_logprobs?: Resolver<Maybe<Array<ResolversTypes['Any']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenAiCompletionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenAICompletionResponse'] = ResolversParentTypes['OpenAICompletionResponse']> = {
  choices?: Resolver<Array<ResolversTypes['CreateCompletionResponseChoice']>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  object?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  usage?: Resolver<Maybe<ResolversTypes['OpenAIUsage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenAiMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenAIMessage'] = ResolversParentTypes['OpenAIMessage']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenAiTextResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenAITextResponse'] = ResolversParentTypes['OpenAITextResponse']> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenAiUsageResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenAIUsage'] = ResolversParentTypes['OpenAIUsage']> = {
  completion_tokens?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  prompt_tokens?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_tokens?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  academyTask?: Resolver<ResolversTypes['AcademyTask'], ParentType, ContextType, RequireFields<QueryAcademyTaskArgs, 'uuid'>>;
  academyTasks?: Resolver<Maybe<Array<ResolversTypes['AcademyTask']>>, ParentType, ContextType, RequireFields<QueryAcademyTasksArgs, 'spaceId'>>;
  byte?: Resolver<ResolversTypes['Byte'], ParentType, ContextType, RequireFields<QueryByteArgs, 'byteId' | 'spaceId'>>;
  byteSocialShare?: Resolver<Maybe<ResolversTypes['ByteSocialShare']>, ParentType, ContextType, RequireFields<QueryByteSocialShareArgs, 'byteId' | 'spaceId'>>;
  bytes?: Resolver<Array<ResolversTypes['Byte']>, ParentType, ContextType, RequireFields<QueryBytesArgs, 'spaceId'>>;
  consolidatedGuideRating?: Resolver<Maybe<ResolversTypes['ConsolidatedGuideRating']>, ParentType, ContextType, RequireFields<QueryConsolidatedGuideRatingArgs, 'guideUuid' | 'spaceId'>>;
  courses?: Resolver<Array<ResolversTypes['GitCourse']>, ParentType, ContextType, RequireFields<QueryCoursesArgs, 'spaceId'>>;
  discourseIndexRuns?: Resolver<Array<ResolversTypes['DiscourseIndexRun']>, ParentType, ContextType, RequireFields<QueryDiscourseIndexRunsArgs, 'spaceId'>>;
  discoursePostComments?: Resolver<Array<ResolversTypes['DiscourseIndexRun']>, ParentType, ContextType, RequireFields<QueryDiscoursePostCommentsArgs, 'postId' | 'spaceId'>>;
  discoursePosts?: Resolver<Array<ResolversTypes['DiscourseIndexRun']>, ParentType, ContextType, RequireFields<QueryDiscoursePostsArgs, 'spaceId'>>;
  gitCourse?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<QueryGitCourseArgs, 'courseKey' | 'spaceId'>>;
  gitCourseIntegrations?: Resolver<Maybe<ResolversTypes['CourseIntegrations']>, ParentType, ContextType, RequireFields<QueryGitCourseIntegrationsArgs, 'key' | 'spaceId'>>;
  gitCourseSubmission?: Resolver<Maybe<ResolversTypes['GitCourseSubmission']>, ParentType, ContextType, RequireFields<QueryGitCourseSubmissionArgs, 'courseKey' | 'spaceId'>>;
  gitCourseSummarized?: Resolver<ResolversTypes['SummarizedGitCourse'], ParentType, ContextType, RequireFields<QueryGitCourseSummarizedArgs, 'key' | 'spaceId'>>;
  gitTopicSubmissions?: Resolver<Array<ResolversTypes['GitCourseTopicSubmission']>, ParentType, ContextType, RequireFields<QueryGitTopicSubmissionsArgs, 'courseKey' | 'spaceId'>>;
  guide?: Resolver<ResolversTypes['Guide'], ParentType, ContextType, RequireFields<QueryGuideArgs, 'spaceId' | 'uuid'>>;
  guideRating?: Resolver<Array<ResolversTypes['GuideRating']>, ParentType, ContextType, RequireFields<QueryGuideRatingArgs, 'ratingUuid'>>;
  guideRatings?: Resolver<Array<ResolversTypes['GuideRating']>, ParentType, ContextType, RequireFields<QueryGuideRatingsArgs, 'guideUuid' | 'spaceId'>>;
  guideSubmissions?: Resolver<Array<ResolversTypes['GuideSubmission']>, ParentType, ContextType, RequireFields<QueryGuideSubmissionsArgs, 'filters' | 'guideUuid' | 'spaceId'>>;
  guides?: Resolver<Array<ResolversTypes['Guide']>, ParentType, ContextType, RequireFields<QueryGuidesArgs, 'spaceId'>>;
  rawGitCourse?: Resolver<ResolversTypes['RawGitCourse'], ParentType, ContextType, RequireFields<QueryRawGitCourseArgs, 'key' | 'spaceId'>>;
  rawGitCourses?: Resolver<Array<ResolversTypes['RawGitCourse']>, ParentType, ContextType, RequireFields<QueryRawGitCoursesArgs, 'spaceId'>>;
  route53Records?: Resolver<Array<ResolversTypes['Route53Record']>, ParentType, ContextType>;
  simulation?: Resolver<ResolversTypes['Simulation'], ParentType, ContextType, RequireFields<QuerySimulationArgs, 'simulationId' | 'spaceId'>>;
  simulations?: Resolver<Array<ResolversTypes['Simulation']>, ParentType, ContextType, RequireFields<QuerySimulationsArgs, 'spaceId'>>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType, Partial<QuerySpaceArgs>>;
  spaceDiscordGuild?: Resolver<Maybe<ResolversTypes['Any']>, ParentType, ContextType, RequireFields<QuerySpaceDiscordGuildArgs, 'spaceId'>>;
  spaces?: Resolver<Maybe<Array<ResolversTypes['Space']>>, ParentType, ContextType>;
  timeline?: Resolver<ResolversTypes['Timeline'], ParentType, ContextType, RequireFields<QueryTimelineArgs, 'spaceId' | 'timelineId'>>;
  timelines?: Resolver<Array<ResolversTypes['Timeline']>, ParentType, ContextType, RequireFields<QueryTimelinesArgs, 'spaceId'>>;
  vercelDomainRecords?: Resolver<Array<ResolversTypes['VercelDomain']>, ParentType, ContextType>;
};

export type QuestionChoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuestionChoice'] = ResolversParentTypes['QuestionChoice']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RatingDistributionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RatingDistribution'] = ResolversParentTypes['RatingDistribution']> = {
  content?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  questions?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  ux?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RawGitCourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RawGitCourse'] = ResolversParentTypes['RawGitCourse']> = {
  courseKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courseRepoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Route53RecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['Route53Record'] = ResolversParentTypes['Route53Record']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  records?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  ttl?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SimulationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Simulation'] = ResolversParentTypes['Simulation']> = {
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postSubmissionStepContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publishStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  showIncorrectOnCompletion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['SimulationStep']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SimulationStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['SimulationStep'] = ResolversParentTypes['SimulationStep']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iframeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialSettings'] = ResolversParentTypes['SocialSettings']> = {
  linkedSharePdfBackgroundImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Space'] = ResolversParentTypes['Space']> = {
  adminUsernames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  authSettings?: Resolver<ResolversTypes['AuthSettings'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  byteSettings?: Resolver<ResolversTypes['ByteSettings'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domains?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  features?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  guideSettings?: Resolver<ResolversTypes['GuideSettings'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inviteLinks?: Resolver<Maybe<ResolversTypes['SpaceInviteLinks']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  socialSettings?: Resolver<ResolversTypes['SocialSettings'], ParentType, ContextType>;
  spaceIntegrations?: Resolver<Maybe<ResolversTypes['SpaceIntegrations']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceFiltersResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpaceFilters'] = ResolversParentTypes['SpaceFilters']> = {
  minScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  onlyMembers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceGitRepositoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpaceGitRepository'] = ResolversParentTypes['SpaceGitRepository']> = {
  authenticationToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gitRepoType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  repoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceIntegrationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpaceIntegrations'] = ResolversParentTypes['SpaceIntegrations']> = {
  academyRepository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discordGuildId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gitGuideRepositories?: Resolver<Maybe<Array<ResolversTypes['SpaceGitRepository']>>, ParentType, ContextType>;
  gnosisSafeWallets?: Resolver<Maybe<Array<ResolversTypes['GnosisSafeWallet']>>, ParentType, ContextType>;
  projectGalaxyTokenLastFour?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceInviteLinksResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpaceInviteLinks'] = ResolversParentTypes['SpaceInviteLinks']> = {
  discordInviteLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  showAnimatedButtonForDiscord?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showAnimatedButtonForTelegram?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  telegramInviteLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SummarizedGitCourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SummarizedGitCourse'] = ResolversParentTypes['SummarizedGitCourse']> = {
  courseAdmins?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  highlights?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  publishStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes['SummarizedGitCourseTopic']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SummarizedGitCourseTopicResolvers<ContextType = any, ParentType extends ResolversParentTypes['SummarizedGitCourseTopic'] = ResolversParentTypes['SummarizedGitCourseTopic']> = {
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimelineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timeline'] = ResolversParentTypes['Timeline']> = {
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['TimelineEvent']>, ParentType, ContextType>;
  excerpt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publishStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimelineEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimelineEvent'] = ResolversParentTypes['TimelineEvent']> = {
  date?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  fullDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moreLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicConfig'] = ResolversParentTypes['TopicConfig']> = {
  showExplanations?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showHints?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDiscordConnectResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDiscordConnect'] = ResolversParentTypes['UserDiscordConnect']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDiscordInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDiscordInfo'] = ResolversParentTypes['UserDiscordInfo']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discriminator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VercelDomainResolvers<ContextType = any, ParentType extends ResolversParentTypes['VercelDomain'] = ResolversParentTypes['VercelDomain']> = {
  apexName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gitBranch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redirect?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AcademyTask?: AcademyTaskResolvers<ContextType>;
  Any?: GraphQLScalarType;
  AuthSettings?: AuthSettingsResolvers<ContextType>;
  Byte?: ByteResolvers<ContextType>;
  ByteLinkedinPdfContent?: ByteLinkedinPdfContentResolvers<ContextType>;
  ByteLinkedinPdfContentStep?: ByteLinkedinPdfContentStepResolvers<ContextType>;
  ByteQuestion?: ByteQuestionResolvers<ContextType>;
  ByteSettings?: ByteSettingsResolvers<ContextType>;
  ByteSocialShare?: ByteSocialShareResolvers<ContextType>;
  ByteStep?: ByteStepResolvers<ContextType>;
  ByteStepItem?: ByteStepItemResolvers<ContextType>;
  ByteSubmission?: ByteSubmissionResolvers<ContextType>;
  ByteUserInput?: ByteUserInputResolvers<ContextType>;
  ConsolidatedGuideRating?: ConsolidatedGuideRatingResolvers<ContextType>;
  CourseIntegrations?: CourseIntegrationsResolvers<ContextType>;
  CourseReadingQuestion?: CourseReadingQuestionResolvers<ContextType>;
  CreateCompletionResponseChoice?: CreateCompletionResponseChoiceResolvers<ContextType>;
  DateTimeISO?: GraphQLScalarType;
  DiscourseIndexRun?: DiscourseIndexRunResolvers<ContextType>;
  DiscoursePost?: DiscoursePostResolvers<ContextType>;
  DiscoursePostComment?: DiscoursePostCommentResolvers<ContextType>;
  DownloadAndCleanContentResponse?: DownloadAndCleanContentResponseResolvers<ContextType>;
  DownloadLinkInfo?: DownloadLinkInfoResolvers<ContextType>;
  GenerateImageResponse?: GenerateImageResponseResolvers<ContextType>;
  GenericCourse?: GenericCourseResolvers<ContextType>;
  GitCourse?: GitCourseResolvers<ContextType>;
  GitCourseExplanation?: GitCourseExplanationResolvers<ContextType>;
  GitCourseExplanationsSubmission?: GitCourseExplanationsSubmissionResolvers<ContextType>;
  GitCourseQuestion?: GitCourseQuestionResolvers<ContextType>;
  GitCourseQuestionChoice?: GitCourseQuestionChoiceResolvers<ContextType>;
  GitCourseQuestionsSubmission?: GitCourseQuestionsSubmissionResolvers<ContextType>;
  GitCourseReading?: GitCourseReadingResolvers<ContextType>;
  GitCourseReadingsSubmission?: GitCourseReadingsSubmissionResolvers<ContextType>;
  GitCourseSubmission?: GitCourseSubmissionResolvers<ContextType>;
  GitCourseSummariesSubmission?: GitCourseSummariesSubmissionResolvers<ContextType>;
  GitCourseSummary?: GitCourseSummaryResolvers<ContextType>;
  GitCourseTopic?: GitCourseTopicResolvers<ContextType>;
  GitCourseTopicCorrectAnswer?: GitCourseTopicCorrectAnswerResolvers<ContextType>;
  GitCourseTopicSubmission?: GitCourseTopicSubmissionResolvers<ContextType>;
  GitCourseTopicSubmissionJson?: GitCourseTopicSubmissionJsonResolvers<ContextType>;
  GnosisSafeWallet?: GnosisSafeWalletResolvers<ContextType>;
  Guide?: GuideResolvers<ContextType>;
  GuideFeedback?: GuideFeedbackResolvers<ContextType>;
  GuideIntegrations?: GuideIntegrationsResolvers<ContextType>;
  GuideQuestion?: GuideQuestionResolvers<ContextType>;
  GuideRating?: GuideRatingResolvers<ContextType>;
  GuideSettings?: GuideSettingsResolvers<ContextType>;
  GuideStep?: GuideStepResolvers<ContextType>;
  GuideStepItem?: GuideStepItemResolvers<ContextType>;
  GuideStepItemSubmission?: GuideStepItemSubmissionResolvers<ContextType>;
  GuideStepSubmission?: GuideStepSubmissionResolvers<ContextType>;
  GuideSubmission?: GuideSubmissionResolvers<ContextType>;
  GuideSubmissionResult?: GuideSubmissionResultResolvers<ContextType>;
  GuideUserInput?: GuideUserInputResolvers<ContextType>;
  ImagesResponse?: ImagesResponseResolvers<ContextType>;
  ImagesResponseDataInner?: ImagesResponseDataInnerResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JwtResponse?: JwtResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OpenAIChatCompletionChoice?: OpenAiChatCompletionChoiceResolvers<ContextType>;
  OpenAIChatCompletionResponse?: OpenAiChatCompletionResponseResolvers<ContextType>;
  OpenAIChoiceLogprobs?: OpenAiChoiceLogprobsResolvers<ContextType>;
  OpenAICompletionResponse?: OpenAiCompletionResponseResolvers<ContextType>;
  OpenAIMessage?: OpenAiMessageResolvers<ContextType>;
  OpenAITextResponse?: OpenAiTextResponseResolvers<ContextType>;
  OpenAIUsage?: OpenAiUsageResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuestionChoice?: QuestionChoiceResolvers<ContextType>;
  RatingDistribution?: RatingDistributionResolvers<ContextType>;
  RawGitCourse?: RawGitCourseResolvers<ContextType>;
  Route53Record?: Route53RecordResolvers<ContextType>;
  Simulation?: SimulationResolvers<ContextType>;
  SimulationStep?: SimulationStepResolvers<ContextType>;
  SocialSettings?: SocialSettingsResolvers<ContextType>;
  Space?: SpaceResolvers<ContextType>;
  SpaceFilters?: SpaceFiltersResolvers<ContextType>;
  SpaceGitRepository?: SpaceGitRepositoryResolvers<ContextType>;
  SpaceIntegrations?: SpaceIntegrationsResolvers<ContextType>;
  SpaceInviteLinks?: SpaceInviteLinksResolvers<ContextType>;
  SummarizedGitCourse?: SummarizedGitCourseResolvers<ContextType>;
  SummarizedGitCourseTopic?: SummarizedGitCourseTopicResolvers<ContextType>;
  Timeline?: TimelineResolvers<ContextType>;
  TimelineEvent?: TimelineEventResolvers<ContextType>;
  TopicConfig?: TopicConfigResolvers<ContextType>;
  UserDiscordConnect?: UserDiscordConnectResolvers<ContextType>;
  UserDiscordInfo?: UserDiscordInfoResolvers<ContextType>;
  VercelDomain?: VercelDomainResolvers<ContextType>;
};


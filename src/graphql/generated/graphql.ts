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

export type AnnotateDiscoursePostInput = {
  discussed?: InputMaybe<Scalars['Boolean']>;
  enacted?: InputMaybe<Scalars['Boolean']>;
  postId: Scalars['String'];
  spaceId: Scalars['String'];
};

export type ArticleIndexingInfo = {
  __typename?: 'ArticleIndexingInfo';
  articleUrl: Scalars['String'];
  createdAt: Scalars['DateTimeISO'];
  id: Scalars['String'];
  spaceId: Scalars['String'];
  status: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  textLength?: Maybe<Scalars['Int']>;
  textSample?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTimeISO'];
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
  byteStyle?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  postSubmissionStepContent?: Maybe<Scalars['String']>;
  priority: Scalars['Int'];
  showIncorrectOnCompletion: Scalars['Boolean'];
  steps: Array<ByteStep>;
  tags: Array<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
};

export type ByteCollection = {
  __typename?: 'ByteCollection';
  byteIds: Array<Scalars['String']>;
  bytes: Array<ByteCollectionByte>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  status: Scalars['String'];
};

export type ByteCollectionByte = {
  __typename?: 'ByteCollectionByte';
  byteId: Scalars['String'];
  content: Scalars['String'];
  name: Scalars['String'];
  videoUrl?: Maybe<Scalars['String']>;
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
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  stepItems: Array<ByteStepItem>;
  uuid: Scalars['String'];
};

export type ByteStepInput = {
  content: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  stepItems: Array<StepItemInputGenericInput>;
  uuid: Scalars['String'];
};

export type ByteStepItem = ByteQuestion | ByteUserInput | UserDiscordConnect;

export enum ByteStyle {
  CardAndCircleProgress = 'CardAndCircleProgress',
  CarouselWithProgressBars = 'CarouselWithProgressBars'
}

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

export type ChatbotCategory = {
  __typename?: 'ChatbotCategory';
  description: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  subCategories: Array<ChatbotSubcategory>;
};

export type ChatbotFaq = ChatbotFaqCommon & {
  __typename?: 'ChatbotFAQ';
  answer: Scalars['String'];
  id: Scalars['String'];
  priority: Scalars['Int'];
  question: Scalars['String'];
  spaceId: Scalars['String'];
  url: Scalars['String'];
};

export type ChatbotFaqCommon = {
  answer: Scalars['String'];
  id: Scalars['String'];
  priority: Scalars['Int'];
  question: Scalars['String'];
  spaceId: Scalars['String'];
  url: Scalars['String'];
};

export type ChatbotSubcategory = {
  __typename?: 'ChatbotSubcategory';
  description: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
};

export type ChatbotUserQuestion = {
  __typename?: 'ChatbotUserQuestion';
  id: Scalars['String'];
  question: Scalars['String'];
  spaceId: Scalars['String'];
};

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

export type CreateByteCollectionInput = {
  byteIds: Array<Scalars['String']>;
  description: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  spaceId: Scalars['String'];
  status: Scalars['String'];
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

export type DiscordChannel = {
  __typename?: 'DiscordChannel';
  createdAt: Scalars['DateTimeISO'];
  discordChannelId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  serverId: Scalars['String'];
  shouldIndex: Scalars['Boolean'];
  status: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
};

export type DiscordMessage = {
  __typename?: 'DiscordMessage';
  authorUsername: Scalars['String'];
  channelId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTimeISO'];
  discordMessageId: Scalars['String'];
  id: Scalars['String'];
  messageDate: Scalars['DateTimeISO'];
  serverId: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
};

export type DiscordServer = {
  __typename?: 'DiscordServer';
  createdAt: Scalars['DateTimeISO'];
  discordServerId: Scalars['String'];
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
};

export type DiscourseIndexRun = {
  __typename?: 'DiscourseIndexRun';
  createdAt: Scalars['DateTimeISO'];
  id: Scalars['String'];
  runDate?: Maybe<Scalars['DateTimeISO']>;
  spaceId: Scalars['String'];
  status: Scalars['String'];
};

export type DiscoursePost = {
  __typename?: 'DiscoursePost';
  aiSummary?: Maybe<Scalars['String']>;
  aiSummaryDate?: Maybe<Scalars['DateTimeISO']>;
  author?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTimeISO'];
  datePublished: Scalars['DateTimeISO'];
  discussed?: Maybe<Scalars['Boolean']>;
  enacted?: Maybe<Scalars['Boolean']>;
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
  createdAt: Scalars['DateTimeISO'];
  datePublished: Scalars['DateTimeISO'];
  id: Scalars['String'];
  indexedAt: Scalars['DateTimeISO'];
  postId: Scalars['String'];
  spaceId: Scalars['String'];
};

export type DomainRecords = {
  __typename?: 'DomainRecords';
  route53Record: Route53Record;
  vercelDomainRecord: VercelDomain;
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
  priority?: Maybe<Scalars['Int']>;
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
  priority?: InputMaybe<Scalars['Int']>;
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

export enum ImageType {
  Academy = 'Academy',
  Course = 'Course',
  CryptoGelato = 'CryptoGelato',
  Guide = 'Guide',
  ShortVideo = 'ShortVideo',
  Space = 'Space',
  Tidbits = 'Tidbits'
}

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
  annotateDiscoursePost: DiscoursePost;
  askChatCompletionAI: OpenAiChatCompletionResponse;
  askCompletionAI: OpenAiCompletionResponse;
  authenticateWithUnstoppable: JwtResponse;
  copyAllBytesFromGitToDatabase: Scalars['Boolean'];
  createArticleIndexingInfo: ArticleIndexingInfo;
  createByteCollection: ByteCollection;
  createNewTidbitSpace: Space;
  createSignedUrl: Scalars['String'];
  createSpace: Space;
  createSummaryOfContent: OpenAiTextResponse;
  createWebsiteScrapingInfo: WebsiteScrapingInfo;
  deleteAndPullCourseRepo: GitCourse;
  deleteByteCollection: Scalars['Boolean'];
  deleteChatbotCategory: Scalars['Boolean'];
  deleteChatbotFAQ: Scalars['Boolean'];
  deleteChatbotUserQuestion: Scalars['Boolean'];
  deleteGitCourseSubmission: Scalars['Boolean'];
  deleteGuide: Scalars['Boolean'];
  deleteTopic: GitCourse;
  deleteTopicExplanation: GitCourse;
  deleteTopicQuestion: GitCourse;
  deleteTopicSummary: GitCourse;
  deleteTopicVideo: GitCourse;
  downloadAndCleanContent: DownloadAndCleanContentResponse;
  dropPineconeNamespace: Scalars['Boolean'];
  editArticleIndexingInfo: ArticleIndexingInfo;
  editWebsiteScrapingInfo: WebsiteScrapingInfo;
  extractRelevantTextForTopic: OpenAiTextResponse;
  generateImage: ImagesResponse;
  generateImageEdit: GenerateImageResponse;
  generateSharablePdf: Scalars['String'];
  indexChatbotFAQs: Scalars['Boolean'];
  indexDiscoursePost: Scalars['Boolean'];
  indexNeedsIndexingDiscoursePosts: DiscourseIndexRun;
  initializeGitCourseSubmission: GitCourseSubmission;
  moveTopic: GitCourse;
  moveTopicExplanation: GitCourse;
  moveTopicQuestion: GitCourse;
  moveTopicSummary: GitCourse;
  moveTopicVideo: GitCourse;
  reFetchDiscordChannels: Array<DiscordChannel>;
  reFetchDiscordMessages: Scalars['Boolean'];
  reFetchDiscordServers: Array<DiscordServer>;
  refreshGitCourse: Scalars['Boolean'];
  refreshGitCourses: Scalars['Boolean'];
  reloadAcademyRepository: Scalars['Boolean'];
  sendEmail: Scalars['Boolean'];
  submitByte: ByteSubmission;
  submitGitCourse: GitCourseSubmission;
  submitGitCourseTopic: GitCourseSubmission;
  submitGuide: GuideSubmission;
  triggerNewDiscourseIndexRun: DiscourseIndexRun;
  triggerSiteScrapingRun: SiteScrapingRun;
  updateArchivedStatusOfProject: Project;
  updateArchivedStatusOfProjectByte: ProjectByte;
  updateArchivedStatusOfProjectByteCollection: ProjectByteCollection;
  updateArchivedStatusOfProjectShortVideo: ProjectShortVideo;
  updateAuthSettings: Space;
  updateByteCollection: ByteCollection;
  updateByteSettings: Space;
  updateCourseBasicInfo: GitCourse;
  updateGuideSettings: Space;
  updateIndexWithAllDiscordPosts: Scalars['Boolean'];
  updateIndexingOfDiscordChannel: DiscordChannel;
  updateSeoOfProject: Project;
  updateSeoOfProjectByte: ProjectByte;
  updateSeoOfProjectByteCollection: ProjectByteCollection;
  updateSeoOfProjectShortVideo: ProjectShortVideo;
  updateSocialSettings: Space;
  updateSpace: Space;
  updateSpaceCreator: Space;
  updateThemeColors: Space;
  updateTopicBasicInfo: GitCourse;
  updateTopicExplanation: GitCourse;
  updateTopicQuestion: GitCourse;
  updateTopicSummary: GitCourse;
  updateTopicVideo: GitCourse;
  upsertAcademyTask: AcademyTask;
  upsertByte: Byte;
  upsertByteSocialShare: ByteSocialShare;
  upsertChatbotCategory: ChatbotCategory;
  upsertChatbotFAQ: ChatbotFaq;
  upsertChatbotUserQuestion: ChatbotUserQuestion;
  upsertCourseIntegrations: CourseIntegrations;
  upsertDomainRecords: DomainRecords;
  upsertGitCourse?: Maybe<SummarizedGitCourse>;
  upsertGitCourseTopicSubmission: GitCourseSubmission;
  upsertGnosisSafeWallets: Space;
  upsertGuide: Guide;
  upsertGuideRating: GuideRating;
  upsertProject: Project;
  upsertProjectByte: ProjectByte;
  upsertProjectByteCollection: ProjectByteCollection;
  upsertProjectGalaxyAccessToken: Space;
  upsertProjectShortVideo: ProjectShortVideo;
  upsertRoute53Record: Route53Record;
  upsertShortVideo: ShortVideo;
  upsertSimulation: Simulation;
  upsertSpaceAcademyRepository: Space;
  upsertSpaceFeatures: Space;
  upsertSpaceInviteLinks: Space;
  upsertSpaceLoaderInfo: Space;
  upsertSummaryOfDiscoursePost: DiscoursePost;
  upsertTimeline: Timeline;
  upsertVercelDomainRecord: VercelDomain;
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


export type MutationAnnotateDiscoursePostArgs = {
  input: AnnotateDiscoursePostInput;
  spaceId: Scalars['String'];
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


export type MutationCreateArticleIndexingInfoArgs = {
  articleUrl: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationCreateByteCollectionArgs = {
  input: CreateByteCollectionInput;
};


export type MutationCreateNewTidbitSpaceArgs = {
  spaceInput: UpsertSpaceInput;
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


export type MutationCreateWebsiteScrapingInfoArgs = {
  baseUrl: Scalars['String'];
  ignoreHashInUrl: Scalars['Boolean'];
  ignoreQueryParams: Scalars['Boolean'];
  scrapingStartUrl: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationDeleteAndPullCourseRepoArgs = {
  courseKey: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationDeleteByteCollectionArgs = {
  byteCollectionId: Scalars['String'];
};


export type MutationDeleteChatbotCategoryArgs = {
  id: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationDeleteChatbotFaqArgs = {
  id: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationDeleteChatbotUserQuestionArgs = {
  id: Scalars['String'];
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


export type MutationDropPineconeNamespaceArgs = {
  spaceId: Scalars['String'];
};


export type MutationEditArticleIndexingInfoArgs = {
  articleIndexingInfoId: Scalars['String'];
  articleUrl: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationEditWebsiteScrapingInfoArgs = {
  baseUrl: Scalars['String'];
  ignoreHashInUrl: Scalars['Boolean'];
  ignoreQueryParams: Scalars['Boolean'];
  scrapingStartUrl: Scalars['String'];
  spaceId: Scalars['String'];
  websiteScrapingInfoId: Scalars['String'];
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


export type MutationIndexChatbotFaQsArgs = {
  spaceId: Scalars['String'];
};


export type MutationIndexDiscoursePostArgs = {
  postId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationIndexNeedsIndexingDiscoursePostsArgs = {
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


export type MutationReFetchDiscordChannelsArgs = {
  serverId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationReFetchDiscordMessagesArgs = {
  channelId: Scalars['String'];
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


export type MutationTriggerNewDiscourseIndexRunArgs = {
  spaceId: Scalars['String'];
};


export type MutationTriggerSiteScrapingRunArgs = {
  spaceId: Scalars['String'];
  websiteScrapingInfoId: Scalars['String'];
};


export type MutationUpdateArchivedStatusOfProjectArgs = {
  archived: Scalars['Boolean'];
  projectId: Scalars['String'];
};


export type MutationUpdateArchivedStatusOfProjectByteArgs = {
  archived: Scalars['Boolean'];
  projectByteId: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationUpdateArchivedStatusOfProjectByteCollectionArgs = {
  archived: Scalars['Boolean'];
  byteCollectionId: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationUpdateArchivedStatusOfProjectShortVideoArgs = {
  archived: Scalars['Boolean'];
  projectId: Scalars['String'];
  projectShortVideoId: Scalars['String'];
};


export type MutationUpdateAuthSettingsArgs = {
  input: AuthSettingsInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateByteCollectionArgs = {
  input: UpdateByteCollectionInput;
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


export type MutationUpdateIndexWithAllDiscordPostsArgs = {
  spaceId: Scalars['String'];
};


export type MutationUpdateIndexingOfDiscordChannelArgs = {
  channelId: Scalars['String'];
  shouldIndex: Scalars['Boolean'];
  spaceId: Scalars['String'];
};


export type MutationUpdateSeoOfProjectArgs = {
  projectId: Scalars['String'];
  seoMeta?: InputMaybe<SeoMetaInput>;
};


export type MutationUpdateSeoOfProjectByteArgs = {
  projectId: Scalars['String'];
  seoMeta?: InputMaybe<SeoMetaInput>;
};


export type MutationUpdateSeoOfProjectByteCollectionArgs = {
  projectId: Scalars['String'];
  seoMeta?: InputMaybe<SeoMetaInput>;
};


export type MutationUpdateSeoOfProjectShortVideoArgs = {
  projectId: Scalars['String'];
  seoMeta?: InputMaybe<SeoMetaInput>;
};


export type MutationUpdateSocialSettingsArgs = {
  input: SocialSettingsInput;
  spaceId: Scalars['String'];
};


export type MutationUpdateSpaceArgs = {
  spaceInput: UpsertSpaceInput;
};


export type MutationUpdateSpaceCreatorArgs = {
  creator: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationUpdateThemeColorsArgs = {
  spaceId: Scalars['ID'];
  themeColors: ThemeColorsInput;
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


export type MutationUpsertChatbotCategoryArgs = {
  input: UpsertChatbotCategoryInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertChatbotFaqArgs = {
  input: UpsertChatbotFaqInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertChatbotUserQuestionArgs = {
  input: UpsertChatbotUserQuestionInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertCourseIntegrationsArgs = {
  courseIntegrationInput: UpsertCourseIntegrationsInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertDomainRecordsArgs = {
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


export type MutationUpsertProjectArgs = {
  input: UpsertProjectInput;
};


export type MutationUpsertProjectByteArgs = {
  input: UpsertProjectByteInput;
  projectId: Scalars['String'];
};


export type MutationUpsertProjectByteCollectionArgs = {
  input: UpsertProjectByteCollectionInput;
  projectId: Scalars['String'];
};


export type MutationUpsertProjectGalaxyAccessTokenArgs = {
  accessToken: Scalars['String'];
  spaceId: Scalars['String'];
};


export type MutationUpsertProjectShortVideoArgs = {
  projectId: Scalars['String'];
  shortVideo: ProjectShortVideoInput;
};


export type MutationUpsertRoute53RecordArgs = {
  spaceId: Scalars['String'];
};


export type MutationUpsertShortVideoArgs = {
  shortVideo: ShortVideoInput;
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


export type MutationUpsertSpaceLoaderInfoArgs = {
  input: SpaceLoadersInfoInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertSummaryOfDiscoursePostArgs = {
  input: UpsertSummaryOfDiscoursePostInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertTimelineArgs = {
  input: UpsertTimelineInput;
  spaceId: Scalars['String'];
};


export type MutationUpsertVercelDomainRecordArgs = {
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

export type Project = {
  __typename?: 'Project';
  adminUsernames: Array<Scalars['String']>;
  adminUsernamesV1: Array<UsernameAndName>;
  admins: Array<Scalars['String']>;
  archived: Scalars['Boolean'];
  cardThumbnail?: Maybe<Scalars['String']>;
  creator: Scalars['String'];
  details: Scalars['String'];
  discord?: Maybe<Scalars['String']>;
  docs?: Maybe<Scalars['String']>;
  excerpt: Scalars['String'];
  github?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  priority: Scalars['Int'];
  seoMeta?: Maybe<SeoMeta>;
  telegram?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type ProjectByte = {
  __typename?: 'ProjectByte';
  admins: Array<Scalars['String']>;
  archived: Scalars['Boolean'];
  byteStyle?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  postSubmissionStepContent?: Maybe<Scalars['String']>;
  priority: Scalars['Int'];
  seoMeta?: Maybe<SeoMeta>;
  steps: Array<ByteStep>;
  tags: Array<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
};

export type ProjectByteCollection = {
  __typename?: 'ProjectByteCollection';
  archived: Scalars['Boolean'];
  byteIds: Array<Scalars['String']>;
  bytes: Array<ByteCollectionByte>;
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  seoMeta?: Maybe<SeoMeta>;
  status: Scalars['String'];
};

export type ProjectShortVideo = {
  __typename?: 'ProjectShortVideo';
  archived: Scalars['Boolean'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  priority: Scalars['Int'];
  seoMeta?: Maybe<SeoMeta>;
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  videoUrl: Scalars['String'];
};

export type ProjectShortVideoInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  priority: Scalars['Int'];
  seoMeta?: InputMaybe<SeoMetaInput>;
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  videoUrl: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  academyTask: AcademyTask;
  academyTasks?: Maybe<Array<AcademyTask>>;
  articleIndexingInfo: ArticleIndexingInfo;
  articleIndexingInfos: Array<ArticleIndexingInfo>;
  byte: Byte;
  byteCollection: ByteCollection;
  byteCollections: Array<ByteCollection>;
  byteSocialShare?: Maybe<ByteSocialShare>;
  bytes: Array<Byte>;
  chatbotCategories: Array<ChatbotCategory>;
  chatbotFAQs: Array<ChatbotFaq>;
  chatbotUserQuestions: Array<ChatbotUserQuestion>;
  consolidatedGuideRating?: Maybe<ConsolidatedGuideRating>;
  courses: Array<GitCourse>;
  discordChannels: Array<DiscordChannel>;
  discordMessages: Array<DiscordMessage>;
  discordServer: DiscordServer;
  discourseIndexRuns: Array<DiscourseIndexRun>;
  discoursePostComments: Array<DiscoursePostComment>;
  discoursePosts: Array<DiscoursePost>;
  getSpaceFromCreator?: Maybe<Space>;
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
  project: Project;
  projectByte: ProjectByte;
  projectByteCollection: ProjectByteCollection;
  projectByteCollections: Array<ProjectByteCollection>;
  projectBytes: Array<ProjectByte>;
  projectShortVideo: ProjectShortVideo;
  projectShortVideos: Array<ProjectShortVideo>;
  projects: Array<Project>;
  rawGitCourse: RawGitCourse;
  rawGitCourses: Array<RawGitCourse>;
  route53Record?: Maybe<Route53Record>;
  scrapedUrlInfo: ScrapedUrlInfo;
  scrapedUrlInfos: Array<ScrapedUrlInfo>;
  searchChatbotFAQs: Array<SearchedChatbotFaq>;
  shortVideo: ShortVideo;
  shortVideos?: Maybe<Array<ShortVideo>>;
  simulation: Simulation;
  simulations: Array<Simulation>;
  siteScrapingRuns: Array<SiteScrapingRun>;
  space?: Maybe<Space>;
  spaceDiscordGuild?: Maybe<Scalars['Any']>;
  spaces?: Maybe<Array<Space>>;
  timeline: Timeline;
  timelines: Array<Timeline>;
  vercelDomainRecord?: Maybe<VercelDomain>;
  websiteScrapingInfos: Array<WebsiteScrapingInfo>;
};


export type QueryAcademyTaskArgs = {
  uuid: Scalars['String'];
};


export type QueryAcademyTasksArgs = {
  spaceId: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
};


export type QueryArticleIndexingInfoArgs = {
  articleIndexingInfoId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryArticleIndexingInfosArgs = {
  spaceId: Scalars['String'];
};


export type QueryByteArgs = {
  byteId: Scalars['String'];
  includeDraft?: InputMaybe<Scalars['Boolean']>;
  spaceId: Scalars['String'];
};


export type QueryByteCollectionArgs = {
  byteCollectionId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryByteCollectionsArgs = {
  spaceId: Scalars['String'];
};


export type QueryByteSocialShareArgs = {
  byteId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryBytesArgs = {
  spaceId: Scalars['String'];
};


export type QueryChatbotCategoriesArgs = {
  spaceId: Scalars['String'];
};


export type QueryChatbotFaQsArgs = {
  spaceId: Scalars['String'];
};


export type QueryChatbotUserQuestionsArgs = {
  spaceId: Scalars['String'];
};


export type QueryConsolidatedGuideRatingArgs = {
  guideUuid: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryCoursesArgs = {
  spaceId: Scalars['String'];
};


export type QueryDiscordChannelsArgs = {
  serverId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryDiscordMessagesArgs = {
  channelId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryDiscordServerArgs = {
  id: Scalars['String'];
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


export type QueryGetSpaceFromCreatorArgs = {
  creatorUsername?: InputMaybe<Scalars['String']>;
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


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryProjectByteArgs = {
  projectByteId: Scalars['String'];
  projectId: Scalars['String'];
};


export type QueryProjectByteCollectionArgs = {
  byteCollectionId: Scalars['String'];
  projectId: Scalars['String'];
};


export type QueryProjectByteCollectionsArgs = {
  projectId: Scalars['String'];
};


export type QueryProjectBytesArgs = {
  projectId: Scalars['String'];
};


export type QueryProjectShortVideoArgs = {
  projectId: Scalars['String'];
  projectShortVideoId: Scalars['String'];
};


export type QueryProjectShortVideosArgs = {
  projectId: Scalars['String'];
};


export type QueryProjectsArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type QueryRawGitCourseArgs = {
  key: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryRawGitCoursesArgs = {
  spaceId: Scalars['String'];
};


export type QueryRoute53RecordArgs = {
  spaceId: Scalars['String'];
};


export type QueryScrapedUrlInfoArgs = {
  scrapedUrlInfoId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryScrapedUrlInfosArgs = {
  spaceId: Scalars['String'];
  websiteScrapingInfoId: Scalars['String'];
};


export type QuerySearchChatbotFaQsArgs = {
  query: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryShortVideoArgs = {
  id: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QueryShortVideosArgs = {
  spaceId: Scalars['String'];
};


export type QuerySimulationArgs = {
  simulationId: Scalars['String'];
  spaceId: Scalars['String'];
};


export type QuerySimulationsArgs = {
  spaceId: Scalars['String'];
};


export type QuerySiteScrapingRunsArgs = {
  spaceId: Scalars['String'];
  websiteScrapingInfoId: Scalars['String'];
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


export type QueryVercelDomainRecordArgs = {
  spaceId: Scalars['String'];
};


export type QueryWebsiteScrapingInfosArgs = {
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

export type SeoMeta = {
  __typename?: 'SEOMeta';
  description: Scalars['String'];
  keywords: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type SeoMetaInput = {
  description: Scalars['String'];
  keywords: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type ScrapedUrlInfo = {
  __typename?: 'ScrapedUrlInfo';
  createdAt: Scalars['DateTimeISO'];
  id: Scalars['String'];
  spaceId: Scalars['String'];
  text: Scalars['String'];
  textLength: Scalars['Int'];
  textSample: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
  url: Scalars['String'];
  websiteScrapingInfoId: Scalars['String'];
};

export type SearchedChatbotFaq = ChatbotFaqCommon & {
  __typename?: 'SearchedChatbotFAQ';
  answer: Scalars['String'];
  id: Scalars['String'];
  priority: Scalars['Int'];
  question: Scalars['String'];
  score: Scalars['Float'];
  spaceId: Scalars['String'];
  url: Scalars['String'];
};

export type SendEmailInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  message: Scalars['String'];
};

export type ShortVideo = {
  __typename?: 'ShortVideo';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  priority: Scalars['Int'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  videoUrl: Scalars['String'];
};

export type ShortVideoInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  priority: Scalars['Int'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  videoUrl: Scalars['String'];
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

export type SiteScrapingRun = {
  __typename?: 'SiteScrapingRun';
  createdAt: Scalars['DateTimeISO'];
  id: Scalars['String'];
  scrapingRunDate: Scalars['DateTimeISO'];
  scrapingStartUrl: Scalars['String'];
  spaceId: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
  websiteScrapingInfo: WebsiteScrapingInfo;
  websiteScrapingInfoId: Scalars['String'];
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
  adminUsernamesV1: Array<UsernameAndName>;
  admins: Array<Scalars['String']>;
  authSettings: AuthSettings;
  avatar?: Maybe<Scalars['String']>;
  botDomains?: Maybe<Array<Scalars['String']>>;
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
  themeColors?: Maybe<ThemeColors>;
  type: Scalars['String'];
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
  loadersInfo?: Maybe<SpaceLoadersInfo>;
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

export type SpaceLoadersInfo = {
  __typename?: 'SpaceLoadersInfo';
  discordServerId?: Maybe<Scalars['String']>;
  discourseUrl?: Maybe<Scalars['String']>;
};

export type SpaceLoadersInfoInput = {
  discordServerId?: InputMaybe<Scalars['String']>;
  discourseUrl?: InputMaybe<Scalars['String']>;
};

export enum SpaceTypes {
  AcademySite = 'AcademySite',
  AiChatbotSite = 'AiChatbotSite',
  CryptoGelatoSite = 'CryptoGelatoSite',
  TidbitsSite = 'TidbitsSite'
}

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

export type ThemeColors = {
  __typename?: 'ThemeColors';
  bgColor: Scalars['String'];
  blockBg: Scalars['String'];
  borderColor: Scalars['String'];
  headingColor: Scalars['String'];
  linkColor: Scalars['String'];
  primaryColor: Scalars['String'];
  textColor: Scalars['String'];
};

export type ThemeColorsInput = {
  bgColor: Scalars['String'];
  blockBg: Scalars['String'];
  borderColor: Scalars['String'];
  headingColor: Scalars['String'];
  linkColor: Scalars['String'];
  primaryColor: Scalars['String'];
  textColor: Scalars['String'];
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
  timelineStyle?: Maybe<Scalars['String']>;
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

export type UpdateByteCollectionInput = {
  byteCollectionId: Scalars['String'];
  byteIds: Array<Scalars['String']>;
  description: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  spaceId: Scalars['String'];
  status: Scalars['String'];
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
  byteStyle?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  steps: Array<ByteStepInput>;
  tags: Array<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type UpsertByteSocialShareInput = {
  byteId: Scalars['String'];
  linkedInImages?: InputMaybe<Array<Scalars['String']>>;
  linkedInPdf?: InputMaybe<Scalars['String']>;
  linkedinPdfContent?: InputMaybe<ByteLinkedinPdfContentInput>;
  spaceId: Scalars['String'];
  twitterImage?: InputMaybe<Scalars['String']>;
};

export type UpsertChatbotCategoryInput = {
  description: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  subCategories: Array<UpsertChatbotSubcategoryInput>;
};

export type UpsertChatbotFaqInput = {
  answer: Scalars['String'];
  id: Scalars['String'];
  priority: Scalars['Int'];
  question: Scalars['String'];
  spaceId: Scalars['String'];
  url: Scalars['String'];
};

export type UpsertChatbotSubcategoryInput = {
  description: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
};

export type UpsertChatbotUserQuestionInput = {
  id: Scalars['String'];
  question: Scalars['String'];
  spaceId: Scalars['String'];
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

export type UpsertProjectByteCollectionInput = {
  byteIds: Array<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  projectId: Scalars['String'];
  seoMeta?: InputMaybe<SeoMetaInput>;
  status: Scalars['String'];
};

export type UpsertProjectByteInput = {
  admins: Array<Scalars['String']>;
  byteStyle?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  priority: Scalars['Int'];
  seoMeta?: InputMaybe<SeoMetaInput>;
  steps: Array<ByteStepInput>;
  tags: Array<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type UpsertProjectInput = {
  adminUsernames: Array<Scalars['String']>;
  adminUsernamesV1: Array<UsernameAndNameInput>;
  admins: Array<Scalars['String']>;
  cardThumbnail?: InputMaybe<Scalars['String']>;
  details: Scalars['String'];
  discord?: InputMaybe<Scalars['String']>;
  docs?: InputMaybe<Scalars['String']>;
  excerpt: Scalars['String'];
  github?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  priority: Scalars['Int'];
  seoMeta?: InputMaybe<SeoMetaInput>;
  telegram?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  website?: InputMaybe<Scalars['String']>;
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
  adminUsernamesV1: Array<UsernameAndNameInput>;
  admins: Array<Scalars['String']>;
  avatar: Scalars['String'];
  botDomains?: InputMaybe<Array<Scalars['String']>>;
  creator: Scalars['String'];
  domains: Array<Scalars['String']>;
  features: Array<Scalars['String']>;
  id: Scalars['String'];
  inviteLinks: SpaceInviteLinksInput;
  name: Scalars['String'];
  skin: Scalars['String'];
  spaceIntegrations: SpaceIntegrationsInput;
  type: Scalars['String'];
};

export type UpsertSummaryOfDiscoursePostInput = {
  aiSummary?: InputMaybe<Scalars['String']>;
  aiSummaryDate?: InputMaybe<Scalars['DateTimeISO']>;
  postId: Scalars['String'];
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
  timelineStyle?: InputMaybe<Scalars['String']>;
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

export type UsernameAndName = {
  __typename?: 'UsernameAndName';
  nameOfTheUser: Scalars['String'];
  username: Scalars['String'];
};

export type UsernameAndNameInput = {
  nameOfTheUser: Scalars['String'];
  username: Scalars['String'];
};

export type VercelDomain = {
  __typename?: 'VercelDomain';
  apexName: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTimeISO']>;
  gitBranch?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  projectId: Scalars['String'];
  redirect?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']>;
  verification?: Maybe<Array<VercelVerification>>;
  verified: Scalars['Boolean'];
};

export type VercelVerification = {
  __typename?: 'VercelVerification';
  domain: Scalars['String'];
  reason: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export type WebsiteScrapingInfo = {
  __typename?: 'WebsiteScrapingInfo';
  baseUrl: Scalars['String'];
  createdAt: Scalars['DateTimeISO'];
  id: Scalars['String'];
  ignoreHashInUrl: Scalars['Boolean'];
  ignoreQueryParams: Scalars['Boolean'];
  scrapedUrlInfos: Array<ScrapedUrlInfo>;
  scrapingRuns: Array<SiteScrapingRun>;
  scrapingStartUrl: Scalars['String'];
  spaceId: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
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
  AnnotateDiscoursePostInput: AnnotateDiscoursePostInput;
  Any: ResolverTypeWrapper<Scalars['Any']>;
  ArticleIndexingInfo: ResolverTypeWrapper<ArticleIndexingInfo>;
  AuthSettings: ResolverTypeWrapper<AuthSettings>;
  AuthSettingsInput: AuthSettingsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Byte>;
  ByteCollection: ResolverTypeWrapper<ByteCollection>;
  ByteCollectionByte: ResolverTypeWrapper<ByteCollectionByte>;
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
  ByteStyle: ByteStyle;
  ByteSubmission: ResolverTypeWrapper<ByteSubmission>;
  ByteSubmissionInput: ByteSubmissionInput;
  ByteUserInput: ResolverTypeWrapper<ByteUserInput>;
  ChatCompletionAIInput: ChatCompletionAiInput;
  ChatCompletionRequestMessageRoleEnum: ChatCompletionRequestMessageRoleEnum;
  ChatbotCategory: ResolverTypeWrapper<ChatbotCategory>;
  ChatbotFAQ: ResolverTypeWrapper<ChatbotFaq>;
  ChatbotFAQCommon: ResolversTypes['ChatbotFAQ'] | ResolversTypes['SearchedChatbotFAQ'];
  ChatbotSubcategory: ResolverTypeWrapper<ChatbotSubcategory>;
  ChatbotUserQuestion: ResolverTypeWrapper<ChatbotUserQuestion>;
  CompletionAIInput: CompletionAiInput;
  ConsolidatedGuideRating: ResolverTypeWrapper<ConsolidatedGuideRating>;
  CourseBasicInfoInput: CourseBasicInfoInput;
  CourseIntegrations: ResolverTypeWrapper<CourseIntegrations>;
  CourseReadingQuestion: ResolverTypeWrapper<CourseReadingQuestion>;
  CourseSubmissionInput: CourseSubmissionInput;
  CreateByteCollectionInput: CreateByteCollectionInput;
  CreateCompletionResponseChoice: ResolverTypeWrapper<CreateCompletionResponseChoice>;
  CreateSignedUrlInput: CreateSignedUrlInput;
  DateTimeFilter: DateTimeFilter;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']>;
  DeleteTopicExplanationInput: DeleteTopicExplanationInput;
  DeleteTopicInput: DeleteTopicInput;
  DeleteTopicQuestionInput: DeleteTopicQuestionInput;
  DeleteTopicSummaryInput: DeleteTopicSummaryInput;
  DeleteTopicVideoInput: DeleteTopicVideoInput;
  DiscordChannel: ResolverTypeWrapper<DiscordChannel>;
  DiscordMessage: ResolverTypeWrapper<DiscordMessage>;
  DiscordServer: ResolverTypeWrapper<DiscordServer>;
  DiscourseIndexRun: ResolverTypeWrapper<DiscourseIndexRun>;
  DiscoursePost: ResolverTypeWrapper<DiscoursePost>;
  DiscoursePostComment: ResolverTypeWrapper<DiscoursePostComment>;
  DomainRecords: ResolverTypeWrapper<DomainRecords>;
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
  ImageType: ImageType;
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
  Project: ResolverTypeWrapper<Project>;
  ProjectByte: ResolverTypeWrapper<ProjectByte>;
  ProjectByteCollection: ResolverTypeWrapper<ProjectByteCollection>;
  ProjectShortVideo: ResolverTypeWrapper<ProjectShortVideo>;
  ProjectShortVideoInput: ProjectShortVideoInput;
  Query: ResolverTypeWrapper<{}>;
  QuestionChoice: ResolverTypeWrapper<QuestionChoice>;
  QuestionChoiceInput: QuestionChoiceInput;
  RatingDistribution: ResolverTypeWrapper<RatingDistribution>;
  RawGitCourse: ResolverTypeWrapper<RawGitCourse>;
  Route53Record: ResolverTypeWrapper<Route53Record>;
  SEOMeta: ResolverTypeWrapper<SeoMeta>;
  SEOMetaInput: SeoMetaInput;
  ScrapedUrlInfo: ResolverTypeWrapper<ScrapedUrlInfo>;
  SearchedChatbotFAQ: ResolverTypeWrapper<SearchedChatbotFaq>;
  SendEmailInput: SendEmailInput;
  ShortVideo: ResolverTypeWrapper<ShortVideo>;
  ShortVideoInput: ShortVideoInput;
  Simulation: ResolverTypeWrapper<Simulation>;
  SimulationStep: ResolverTypeWrapper<SimulationStep>;
  SimulationStepInput: SimulationStepInput;
  SiteScrapingRun: ResolverTypeWrapper<SiteScrapingRun>;
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
  SpaceLoadersInfo: ResolverTypeWrapper<SpaceLoadersInfo>;
  SpaceLoadersInfoInput: SpaceLoadersInfoInput;
  SpaceTypes: SpaceTypes;
  SpaceWhere: SpaceWhere;
  StepItemInputGenericInput: StepItemInputGenericInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  SummarizedGitCourse: ResolverTypeWrapper<SummarizedGitCourse>;
  SummarizedGitCourseTopic: ResolverTypeWrapper<SummarizedGitCourseTopic>;
  ThemeColors: ResolverTypeWrapper<ThemeColors>;
  ThemeColorsInput: ThemeColorsInput;
  Timeline: ResolverTypeWrapper<Timeline>;
  TimelineEvent: ResolverTypeWrapper<TimelineEvent>;
  TopicConfig: ResolverTypeWrapper<TopicConfig>;
  TopicConfigInput: TopicConfigInput;
  TopicQuestionChoiceInput: TopicQuestionChoiceInput;
  UpdateByteCollectionInput: UpdateByteCollectionInput;
  UpdateTopicBasicInfoInput: UpdateTopicBasicInfoInput;
  UpdateTopicExplanationInput: UpdateTopicExplanationInput;
  UpdateTopicQuestionInput: UpdateTopicQuestionInput;
  UpdateTopicSummaryInput: UpdateTopicSummaryInput;
  UpdateTopicVideoInput: UpdateTopicVideoInput;
  UpsertAcademyTaskInput: UpsertAcademyTaskInput;
  UpsertByteInput: UpsertByteInput;
  UpsertByteSocialShareInput: UpsertByteSocialShareInput;
  UpsertChatbotCategoryInput: UpsertChatbotCategoryInput;
  UpsertChatbotFAQInput: UpsertChatbotFaqInput;
  UpsertChatbotSubcategoryInput: UpsertChatbotSubcategoryInput;
  UpsertChatbotUserQuestionInput: UpsertChatbotUserQuestionInput;
  UpsertCourseIntegrationsInput: UpsertCourseIntegrationsInput;
  UpsertGuideRatingInput: UpsertGuideRatingInput;
  UpsertProjectByteCollectionInput: UpsertProjectByteCollectionInput;
  UpsertProjectByteInput: UpsertProjectByteInput;
  UpsertProjectInput: UpsertProjectInput;
  UpsertSimulationInput: UpsertSimulationInput;
  UpsertSpaceInput: UpsertSpaceInput;
  UpsertSummaryOfDiscoursePostInput: UpsertSummaryOfDiscoursePostInput;
  UpsertTimelineEventInput: UpsertTimelineEventInput;
  UpsertTimelineInput: UpsertTimelineInput;
  UserDiscordConnect: ResolverTypeWrapper<UserDiscordConnect>;
  UserDiscordInfo: ResolverTypeWrapper<UserDiscordInfo>;
  UserDiscordInfoInput: UserDiscordInfoInput;
  UserInputInput: UserInputInput;
  UsernameAndName: ResolverTypeWrapper<UsernameAndName>;
  UsernameAndNameInput: UsernameAndNameInput;
  VercelDomain: ResolverTypeWrapper<VercelDomain>;
  VercelVerification: ResolverTypeWrapper<VercelVerification>;
  WebsiteScrapingInfo: ResolverTypeWrapper<WebsiteScrapingInfo>;
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
  AnnotateDiscoursePostInput: AnnotateDiscoursePostInput;
  Any: Scalars['Any'];
  ArticleIndexingInfo: ArticleIndexingInfo;
  AuthSettings: AuthSettings;
  AuthSettingsInput: AuthSettingsInput;
  Boolean: Scalars['Boolean'];
  Byte: Byte;
  ByteCollection: ByteCollection;
  ByteCollectionByte: ByteCollectionByte;
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
  ChatbotCategory: ChatbotCategory;
  ChatbotFAQ: ChatbotFaq;
  ChatbotFAQCommon: ResolversParentTypes['ChatbotFAQ'] | ResolversParentTypes['SearchedChatbotFAQ'];
  ChatbotSubcategory: ChatbotSubcategory;
  ChatbotUserQuestion: ChatbotUserQuestion;
  CompletionAIInput: CompletionAiInput;
  ConsolidatedGuideRating: ConsolidatedGuideRating;
  CourseBasicInfoInput: CourseBasicInfoInput;
  CourseIntegrations: CourseIntegrations;
  CourseReadingQuestion: CourseReadingQuestion;
  CourseSubmissionInput: CourseSubmissionInput;
  CreateByteCollectionInput: CreateByteCollectionInput;
  CreateCompletionResponseChoice: CreateCompletionResponseChoice;
  CreateSignedUrlInput: CreateSignedUrlInput;
  DateTimeFilter: DateTimeFilter;
  DateTimeISO: Scalars['DateTimeISO'];
  DeleteTopicExplanationInput: DeleteTopicExplanationInput;
  DeleteTopicInput: DeleteTopicInput;
  DeleteTopicQuestionInput: DeleteTopicQuestionInput;
  DeleteTopicSummaryInput: DeleteTopicSummaryInput;
  DeleteTopicVideoInput: DeleteTopicVideoInput;
  DiscordChannel: DiscordChannel;
  DiscordMessage: DiscordMessage;
  DiscordServer: DiscordServer;
  DiscourseIndexRun: DiscourseIndexRun;
  DiscoursePost: DiscoursePost;
  DiscoursePostComment: DiscoursePostComment;
  DomainRecords: DomainRecords;
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
  Project: Project;
  ProjectByte: ProjectByte;
  ProjectByteCollection: ProjectByteCollection;
  ProjectShortVideo: ProjectShortVideo;
  ProjectShortVideoInput: ProjectShortVideoInput;
  Query: {};
  QuestionChoice: QuestionChoice;
  QuestionChoiceInput: QuestionChoiceInput;
  RatingDistribution: RatingDistribution;
  RawGitCourse: RawGitCourse;
  Route53Record: Route53Record;
  SEOMeta: SeoMeta;
  SEOMetaInput: SeoMetaInput;
  ScrapedUrlInfo: ScrapedUrlInfo;
  SearchedChatbotFAQ: SearchedChatbotFaq;
  SendEmailInput: SendEmailInput;
  ShortVideo: ShortVideo;
  ShortVideoInput: ShortVideoInput;
  Simulation: Simulation;
  SimulationStep: SimulationStep;
  SimulationStepInput: SimulationStepInput;
  SiteScrapingRun: SiteScrapingRun;
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
  SpaceLoadersInfo: SpaceLoadersInfo;
  SpaceLoadersInfoInput: SpaceLoadersInfoInput;
  SpaceWhere: SpaceWhere;
  StepItemInputGenericInput: StepItemInputGenericInput;
  String: Scalars['String'];
  SummarizedGitCourse: SummarizedGitCourse;
  SummarizedGitCourseTopic: SummarizedGitCourseTopic;
  ThemeColors: ThemeColors;
  ThemeColorsInput: ThemeColorsInput;
  Timeline: Timeline;
  TimelineEvent: TimelineEvent;
  TopicConfig: TopicConfig;
  TopicConfigInput: TopicConfigInput;
  TopicQuestionChoiceInput: TopicQuestionChoiceInput;
  UpdateByteCollectionInput: UpdateByteCollectionInput;
  UpdateTopicBasicInfoInput: UpdateTopicBasicInfoInput;
  UpdateTopicExplanationInput: UpdateTopicExplanationInput;
  UpdateTopicQuestionInput: UpdateTopicQuestionInput;
  UpdateTopicSummaryInput: UpdateTopicSummaryInput;
  UpdateTopicVideoInput: UpdateTopicVideoInput;
  UpsertAcademyTaskInput: UpsertAcademyTaskInput;
  UpsertByteInput: UpsertByteInput;
  UpsertByteSocialShareInput: UpsertByteSocialShareInput;
  UpsertChatbotCategoryInput: UpsertChatbotCategoryInput;
  UpsertChatbotFAQInput: UpsertChatbotFaqInput;
  UpsertChatbotSubcategoryInput: UpsertChatbotSubcategoryInput;
  UpsertChatbotUserQuestionInput: UpsertChatbotUserQuestionInput;
  UpsertCourseIntegrationsInput: UpsertCourseIntegrationsInput;
  UpsertGuideRatingInput: UpsertGuideRatingInput;
  UpsertProjectByteCollectionInput: UpsertProjectByteCollectionInput;
  UpsertProjectByteInput: UpsertProjectByteInput;
  UpsertProjectInput: UpsertProjectInput;
  UpsertSimulationInput: UpsertSimulationInput;
  UpsertSpaceInput: UpsertSpaceInput;
  UpsertSummaryOfDiscoursePostInput: UpsertSummaryOfDiscoursePostInput;
  UpsertTimelineEventInput: UpsertTimelineEventInput;
  UpsertTimelineInput: UpsertTimelineInput;
  UserDiscordConnect: UserDiscordConnect;
  UserDiscordInfo: UserDiscordInfo;
  UserDiscordInfoInput: UserDiscordInfoInput;
  UserInputInput: UserInputInput;
  UsernameAndName: UsernameAndName;
  UsernameAndNameInput: UsernameAndNameInput;
  VercelDomain: VercelDomain;
  VercelVerification: VercelVerification;
  WebsiteScrapingInfo: WebsiteScrapingInfo;
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

export type ArticleIndexingInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleIndexingInfo'] = ResolversParentTypes['ArticleIndexingInfo']> = {
  articleUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  textLength?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  textSample?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthSettings'] = ResolversParentTypes['AuthSettings']> = {
  enableLogin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  loginOptions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Byte'] = ResolversParentTypes['Byte']> = {
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  byteStyle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postSubmissionStepContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  showIncorrectOnCompletion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['ByteStep']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteCollection'] = ResolversParentTypes['ByteCollection']> = {
  byteIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  bytes?: Resolver<Array<ResolversTypes['ByteCollectionByte']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ByteCollectionByteResolvers<ContextType = any, ParentType extends ResolversParentTypes['ByteCollectionByte'] = ResolversParentTypes['ByteCollectionByte']> = {
  byteId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type ChatbotCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatbotCategory'] = ResolversParentTypes['ChatbotCategory']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subCategories?: Resolver<Array<ResolversTypes['ChatbotSubcategory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatbotFaqResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatbotFAQ'] = ResolversParentTypes['ChatbotFAQ']> = {
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatbotFaqCommonResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatbotFAQCommon'] = ResolversParentTypes['ChatbotFAQCommon']> = {
  __resolveType: TypeResolveFn<'ChatbotFAQ' | 'SearchedChatbotFAQ', ParentType, ContextType>;
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ChatbotSubcategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatbotSubcategory'] = ResolversParentTypes['ChatbotSubcategory']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatbotUserQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatbotUserQuestion'] = ResolversParentTypes['ChatbotUserQuestion']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type DiscordChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscordChannel'] = ResolversParentTypes['DiscordChannel']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  discordChannelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serverId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shouldIndex?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscordMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscordMessage'] = ResolversParentTypes['DiscordMessage']> = {
  authorUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  discordMessageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messageDate?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  serverId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscordServerResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscordServer'] = ResolversParentTypes['DiscordServer']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  discordServerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iconUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscourseIndexRunResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscourseIndexRun'] = ResolversParentTypes['DiscourseIndexRun']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runDate?: Resolver<Maybe<ResolversTypes['DateTimeISO']>, ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscoursePostResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscoursePost'] = ResolversParentTypes['DiscoursePost']> = {
  aiSummary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  aiSummaryDate?: Resolver<Maybe<ResolversTypes['DateTimeISO']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  discussed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  enacted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  indexedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DomainRecordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DomainRecords'] = ResolversParentTypes['DomainRecords']> = {
  route53Record?: Resolver<ResolversTypes['Route53Record'], ParentType, ContextType>;
  vercelDomainRecord?: Resolver<ResolversTypes['VercelDomain'], ParentType, ContextType>;
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
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  annotateDiscoursePost?: Resolver<ResolversTypes['DiscoursePost'], ParentType, ContextType, RequireFields<MutationAnnotateDiscoursePostArgs, 'input' | 'spaceId'>>;
  askChatCompletionAI?: Resolver<ResolversTypes['OpenAIChatCompletionResponse'], ParentType, ContextType, RequireFields<MutationAskChatCompletionAiArgs, 'input'>>;
  askCompletionAI?: Resolver<ResolversTypes['OpenAICompletionResponse'], ParentType, ContextType, RequireFields<MutationAskCompletionAiArgs, 'input'>>;
  authenticateWithUnstoppable?: Resolver<ResolversTypes['JwtResponse'], ParentType, ContextType, RequireFields<MutationAuthenticateWithUnstoppableArgs, 'idToken'>>;
  copyAllBytesFromGitToDatabase?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createArticleIndexingInfo?: Resolver<ResolversTypes['ArticleIndexingInfo'], ParentType, ContextType, RequireFields<MutationCreateArticleIndexingInfoArgs, 'articleUrl' | 'spaceId'>>;
  createByteCollection?: Resolver<ResolversTypes['ByteCollection'], ParentType, ContextType, RequireFields<MutationCreateByteCollectionArgs, 'input'>>;
  createNewTidbitSpace?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationCreateNewTidbitSpaceArgs, 'spaceInput'>>;
  createSignedUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateSignedUrlArgs, 'input' | 'spaceId'>>;
  createSpace?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationCreateSpaceArgs, 'spaceInput'>>;
  createSummaryOfContent?: Resolver<ResolversTypes['OpenAITextResponse'], ParentType, ContextType, RequireFields<MutationCreateSummaryOfContentArgs, 'input'>>;
  createWebsiteScrapingInfo?: Resolver<ResolversTypes['WebsiteScrapingInfo'], ParentType, ContextType, RequireFields<MutationCreateWebsiteScrapingInfoArgs, 'baseUrl' | 'ignoreHashInUrl' | 'ignoreQueryParams' | 'scrapingStartUrl' | 'spaceId'>>;
  deleteAndPullCourseRepo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteAndPullCourseRepoArgs, 'courseKey' | 'spaceId'>>;
  deleteByteCollection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteByteCollectionArgs, 'byteCollectionId'>>;
  deleteChatbotCategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteChatbotCategoryArgs, 'id' | 'spaceId'>>;
  deleteChatbotFAQ?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteChatbotFaqArgs, 'id' | 'spaceId'>>;
  deleteChatbotUserQuestion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteChatbotUserQuestionArgs, 'id' | 'spaceId'>>;
  deleteGitCourseSubmission?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteGitCourseSubmissionArgs, 'courseKey' | 'spaceId'>>;
  deleteGuide?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteGuideArgs, 'spaceId' | 'uuid'>>;
  deleteTopic?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicArgs, 'spaceId' | 'topicInfo'>>;
  deleteTopicExplanation?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicExplanationArgs, 'explanationInfo' | 'spaceId'>>;
  deleteTopicQuestion?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicQuestionArgs, 'questionInfo' | 'spaceId'>>;
  deleteTopicSummary?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicSummaryArgs, 'spaceId' | 'summaryInfo'>>;
  deleteTopicVideo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationDeleteTopicVideoArgs, 'spaceId' | 'videoInfo'>>;
  downloadAndCleanContent?: Resolver<ResolversTypes['DownloadAndCleanContentResponse'], ParentType, ContextType, RequireFields<MutationDownloadAndCleanContentArgs, 'input'>>;
  dropPineconeNamespace?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDropPineconeNamespaceArgs, 'spaceId'>>;
  editArticleIndexingInfo?: Resolver<ResolversTypes['ArticleIndexingInfo'], ParentType, ContextType, RequireFields<MutationEditArticleIndexingInfoArgs, 'articleIndexingInfoId' | 'articleUrl' | 'spaceId'>>;
  editWebsiteScrapingInfo?: Resolver<ResolversTypes['WebsiteScrapingInfo'], ParentType, ContextType, RequireFields<MutationEditWebsiteScrapingInfoArgs, 'baseUrl' | 'ignoreHashInUrl' | 'ignoreQueryParams' | 'scrapingStartUrl' | 'spaceId' | 'websiteScrapingInfoId'>>;
  extractRelevantTextForTopic?: Resolver<ResolversTypes['OpenAITextResponse'], ParentType, ContextType, RequireFields<MutationExtractRelevantTextForTopicArgs, 'input'>>;
  generateImage?: Resolver<ResolversTypes['ImagesResponse'], ParentType, ContextType, RequireFields<MutationGenerateImageArgs, 'input'>>;
  generateImageEdit?: Resolver<ResolversTypes['GenerateImageResponse'], ParentType, ContextType, RequireFields<MutationGenerateImageEditArgs, 'input'>>;
  generateSharablePdf?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationGenerateSharablePdfArgs, 'byteId' | 'spaceId'>>;
  indexChatbotFAQs?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationIndexChatbotFaQsArgs, 'spaceId'>>;
  indexDiscoursePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationIndexDiscoursePostArgs, 'postId' | 'spaceId'>>;
  indexNeedsIndexingDiscoursePosts?: Resolver<ResolversTypes['DiscourseIndexRun'], ParentType, ContextType, RequireFields<MutationIndexNeedsIndexingDiscoursePostsArgs, 'spaceId'>>;
  initializeGitCourseSubmission?: Resolver<ResolversTypes['GitCourseSubmission'], ParentType, ContextType, RequireFields<MutationInitializeGitCourseSubmissionArgs, 'courseKey' | 'spaceId'>>;
  moveTopic?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicArgs, 'spaceId' | 'topicInfo'>>;
  moveTopicExplanation?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicExplanationArgs, 'explanationInfo' | 'spaceId'>>;
  moveTopicQuestion?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicQuestionArgs, 'questionInfo' | 'spaceId'>>;
  moveTopicSummary?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicSummaryArgs, 'spaceId' | 'summaryInfo'>>;
  moveTopicVideo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationMoveTopicVideoArgs, 'spaceId' | 'videoInfo'>>;
  reFetchDiscordChannels?: Resolver<Array<ResolversTypes['DiscordChannel']>, ParentType, ContextType, RequireFields<MutationReFetchDiscordChannelsArgs, 'serverId' | 'spaceId'>>;
  reFetchDiscordMessages?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationReFetchDiscordMessagesArgs, 'channelId' | 'spaceId'>>;
  reFetchDiscordServers?: Resolver<Array<ResolversTypes['DiscordServer']>, ParentType, ContextType>;
  refreshGitCourse?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRefreshGitCourseArgs, 'courseKey' | 'spaceId'>>;
  refreshGitCourses?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRefreshGitCoursesArgs, 'spaceId'>>;
  reloadAcademyRepository?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationReloadAcademyRepositoryArgs, 'spaceId'>>;
  sendEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendEmailArgs, 'input'>>;
  submitByte?: Resolver<ResolversTypes['ByteSubmission'], ParentType, ContextType, RequireFields<MutationSubmitByteArgs, 'submissionInput'>>;
  submitGitCourse?: Resolver<ResolversTypes['GitCourseSubmission'], ParentType, ContextType, RequireFields<MutationSubmitGitCourseArgs, 'input' | 'spaceId'>>;
  submitGitCourseTopic?: Resolver<ResolversTypes['GitCourseSubmission'], ParentType, ContextType, RequireFields<MutationSubmitGitCourseTopicArgs, 'gitCourseTopicSubmission' | 'spaceId'>>;
  submitGuide?: Resolver<ResolversTypes['GuideSubmission'], ParentType, ContextType, RequireFields<MutationSubmitGuideArgs, 'submissionInput'>>;
  triggerNewDiscourseIndexRun?: Resolver<ResolversTypes['DiscourseIndexRun'], ParentType, ContextType, RequireFields<MutationTriggerNewDiscourseIndexRunArgs, 'spaceId'>>;
  triggerSiteScrapingRun?: Resolver<ResolversTypes['SiteScrapingRun'], ParentType, ContextType, RequireFields<MutationTriggerSiteScrapingRunArgs, 'spaceId' | 'websiteScrapingInfoId'>>;
  updateArchivedStatusOfProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateArchivedStatusOfProjectArgs, 'archived' | 'projectId'>>;
  updateArchivedStatusOfProjectByte?: Resolver<ResolversTypes['ProjectByte'], ParentType, ContextType, RequireFields<MutationUpdateArchivedStatusOfProjectByteArgs, 'archived' | 'projectByteId' | 'projectId'>>;
  updateArchivedStatusOfProjectByteCollection?: Resolver<ResolversTypes['ProjectByteCollection'], ParentType, ContextType, RequireFields<MutationUpdateArchivedStatusOfProjectByteCollectionArgs, 'archived' | 'byteCollectionId' | 'projectId'>>;
  updateArchivedStatusOfProjectShortVideo?: Resolver<ResolversTypes['ProjectShortVideo'], ParentType, ContextType, RequireFields<MutationUpdateArchivedStatusOfProjectShortVideoArgs, 'archived' | 'projectId' | 'projectShortVideoId'>>;
  updateAuthSettings?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateAuthSettingsArgs, 'input' | 'spaceId'>>;
  updateByteCollection?: Resolver<ResolversTypes['ByteCollection'], ParentType, ContextType, RequireFields<MutationUpdateByteCollectionArgs, 'input'>>;
  updateByteSettings?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateByteSettingsArgs, 'input' | 'spaceId'>>;
  updateCourseBasicInfo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateCourseBasicInfoArgs, 'courseBasicInfo' | 'spaceId'>>;
  updateGuideSettings?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateGuideSettingsArgs, 'input' | 'spaceId'>>;
  updateIndexWithAllDiscordPosts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateIndexWithAllDiscordPostsArgs, 'spaceId'>>;
  updateIndexingOfDiscordChannel?: Resolver<ResolversTypes['DiscordChannel'], ParentType, ContextType, RequireFields<MutationUpdateIndexingOfDiscordChannelArgs, 'channelId' | 'shouldIndex' | 'spaceId'>>;
  updateSeoOfProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateSeoOfProjectArgs, 'projectId'>>;
  updateSeoOfProjectByte?: Resolver<ResolversTypes['ProjectByte'], ParentType, ContextType, RequireFields<MutationUpdateSeoOfProjectByteArgs, 'projectId'>>;
  updateSeoOfProjectByteCollection?: Resolver<ResolversTypes['ProjectByteCollection'], ParentType, ContextType, RequireFields<MutationUpdateSeoOfProjectByteCollectionArgs, 'projectId'>>;
  updateSeoOfProjectShortVideo?: Resolver<ResolversTypes['ProjectShortVideo'], ParentType, ContextType, RequireFields<MutationUpdateSeoOfProjectShortVideoArgs, 'projectId'>>;
  updateSocialSettings?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateSocialSettingsArgs, 'input' | 'spaceId'>>;
  updateSpace?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateSpaceArgs, 'spaceInput'>>;
  updateSpaceCreator?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateSpaceCreatorArgs, 'creator' | 'spaceId'>>;
  updateThemeColors?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpdateThemeColorsArgs, 'spaceId' | 'themeColors'>>;
  updateTopicBasicInfo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicBasicInfoArgs, 'spaceId' | 'topicInfo'>>;
  updateTopicExplanation?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicExplanationArgs, 'explanationInfo' | 'spaceId'>>;
  updateTopicQuestion?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicQuestionArgs, 'questionInfo' | 'spaceId'>>;
  updateTopicSummary?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicSummaryArgs, 'spaceId' | 'summaryInfo'>>;
  updateTopicVideo?: Resolver<ResolversTypes['GitCourse'], ParentType, ContextType, RequireFields<MutationUpdateTopicVideoArgs, 'spaceId' | 'videoInfo'>>;
  upsertAcademyTask?: Resolver<ResolversTypes['AcademyTask'], ParentType, ContextType, RequireFields<MutationUpsertAcademyTaskArgs, 'spaceId' | 'task'>>;
  upsertByte?: Resolver<ResolversTypes['Byte'], ParentType, ContextType, RequireFields<MutationUpsertByteArgs, 'input' | 'spaceId'>>;
  upsertByteSocialShare?: Resolver<ResolversTypes['ByteSocialShare'], ParentType, ContextType, RequireFields<MutationUpsertByteSocialShareArgs, 'input' | 'spaceId'>>;
  upsertChatbotCategory?: Resolver<ResolversTypes['ChatbotCategory'], ParentType, ContextType, RequireFields<MutationUpsertChatbotCategoryArgs, 'input' | 'spaceId'>>;
  upsertChatbotFAQ?: Resolver<ResolversTypes['ChatbotFAQ'], ParentType, ContextType, RequireFields<MutationUpsertChatbotFaqArgs, 'input' | 'spaceId'>>;
  upsertChatbotUserQuestion?: Resolver<ResolversTypes['ChatbotUserQuestion'], ParentType, ContextType, RequireFields<MutationUpsertChatbotUserQuestionArgs, 'input' | 'spaceId'>>;
  upsertCourseIntegrations?: Resolver<ResolversTypes['CourseIntegrations'], ParentType, ContextType, RequireFields<MutationUpsertCourseIntegrationsArgs, 'courseIntegrationInput' | 'spaceId'>>;
  upsertDomainRecords?: Resolver<ResolversTypes['DomainRecords'], ParentType, ContextType, RequireFields<MutationUpsertDomainRecordsArgs, 'spaceId'>>;
  upsertGitCourse?: Resolver<Maybe<ResolversTypes['SummarizedGitCourse']>, ParentType, ContextType, RequireFields<MutationUpsertGitCourseArgs, 'gitCourseInput' | 'spaceId'>>;
  upsertGitCourseTopicSubmission?: Resolver<ResolversTypes['GitCourseSubmission'], ParentType, ContextType, RequireFields<MutationUpsertGitCourseTopicSubmissionArgs, 'gitCourseTopicSubmission' | 'spaceId'>>;
  upsertGnosisSafeWallets?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertGnosisSafeWalletsArgs, 'spaceId' | 'wallets'>>;
  upsertGuide?: Resolver<ResolversTypes['Guide'], ParentType, ContextType, RequireFields<MutationUpsertGuideArgs, 'guideInput' | 'spaceId'>>;
  upsertGuideRating?: Resolver<ResolversTypes['GuideRating'], ParentType, ContextType, RequireFields<MutationUpsertGuideRatingArgs, 'spaceId' | 'upsertGuideRatingInput'>>;
  upsertProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpsertProjectArgs, 'input'>>;
  upsertProjectByte?: Resolver<ResolversTypes['ProjectByte'], ParentType, ContextType, RequireFields<MutationUpsertProjectByteArgs, 'input' | 'projectId'>>;
  upsertProjectByteCollection?: Resolver<ResolversTypes['ProjectByteCollection'], ParentType, ContextType, RequireFields<MutationUpsertProjectByteCollectionArgs, 'input' | 'projectId'>>;
  upsertProjectGalaxyAccessToken?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertProjectGalaxyAccessTokenArgs, 'accessToken' | 'spaceId'>>;
  upsertProjectShortVideo?: Resolver<ResolversTypes['ProjectShortVideo'], ParentType, ContextType, RequireFields<MutationUpsertProjectShortVideoArgs, 'projectId' | 'shortVideo'>>;
  upsertRoute53Record?: Resolver<ResolversTypes['Route53Record'], ParentType, ContextType, RequireFields<MutationUpsertRoute53RecordArgs, 'spaceId'>>;
  upsertShortVideo?: Resolver<ResolversTypes['ShortVideo'], ParentType, ContextType, RequireFields<MutationUpsertShortVideoArgs, 'shortVideo' | 'spaceId'>>;
  upsertSimulation?: Resolver<ResolversTypes['Simulation'], ParentType, ContextType, RequireFields<MutationUpsertSimulationArgs, 'input' | 'spaceId'>>;
  upsertSpaceAcademyRepository?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertSpaceAcademyRepositoryArgs, 'academyRepository' | 'spaceId'>>;
  upsertSpaceFeatures?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertSpaceFeaturesArgs, 'features' | 'spaceId'>>;
  upsertSpaceInviteLinks?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertSpaceInviteLinksArgs, 'spaceId' | 'spaceInviteArgs'>>;
  upsertSpaceLoaderInfo?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertSpaceLoaderInfoArgs, 'input' | 'spaceId'>>;
  upsertSummaryOfDiscoursePost?: Resolver<ResolversTypes['DiscoursePost'], ParentType, ContextType, RequireFields<MutationUpsertSummaryOfDiscoursePostArgs, 'input' | 'spaceId'>>;
  upsertTimeline?: Resolver<ResolversTypes['Timeline'], ParentType, ContextType, RequireFields<MutationUpsertTimelineArgs, 'input' | 'spaceId'>>;
  upsertVercelDomainRecord?: Resolver<ResolversTypes['VercelDomain'], ParentType, ContextType, RequireFields<MutationUpsertVercelDomainRecordArgs, 'spaceId'>>;
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

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  adminUsernames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  adminUsernamesV1?: Resolver<Array<ResolversTypes['UsernameAndName']>, ParentType, ContextType>;
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  cardThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discord?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  docs?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  excerpt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seoMeta?: Resolver<Maybe<ResolversTypes['SEOMeta']>, ParentType, ContextType>;
  telegram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectByteResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectByte'] = ResolversParentTypes['ProjectByte']> = {
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  byteStyle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postSubmissionStepContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seoMeta?: Resolver<Maybe<ResolversTypes['SEOMeta']>, ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['ByteStep']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectByteCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectByteCollection'] = ResolversParentTypes['ProjectByteCollection']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  byteIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  bytes?: Resolver<Array<ResolversTypes['ByteCollectionByte']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seoMeta?: Resolver<Maybe<ResolversTypes['SEOMeta']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectShortVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectShortVideo'] = ResolversParentTypes['ProjectShortVideo']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seoMeta?: Resolver<Maybe<ResolversTypes['SEOMeta']>, ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  academyTask?: Resolver<ResolversTypes['AcademyTask'], ParentType, ContextType, RequireFields<QueryAcademyTaskArgs, 'uuid'>>;
  academyTasks?: Resolver<Maybe<Array<ResolversTypes['AcademyTask']>>, ParentType, ContextType, RequireFields<QueryAcademyTasksArgs, 'spaceId'>>;
  articleIndexingInfo?: Resolver<ResolversTypes['ArticleIndexingInfo'], ParentType, ContextType, RequireFields<QueryArticleIndexingInfoArgs, 'articleIndexingInfoId' | 'spaceId'>>;
  articleIndexingInfos?: Resolver<Array<ResolversTypes['ArticleIndexingInfo']>, ParentType, ContextType, RequireFields<QueryArticleIndexingInfosArgs, 'spaceId'>>;
  byte?: Resolver<ResolversTypes['Byte'], ParentType, ContextType, RequireFields<QueryByteArgs, 'byteId' | 'spaceId'>>;
  byteCollection?: Resolver<ResolversTypes['ByteCollection'], ParentType, ContextType, RequireFields<QueryByteCollectionArgs, 'byteCollectionId' | 'spaceId'>>;
  byteCollections?: Resolver<Array<ResolversTypes['ByteCollection']>, ParentType, ContextType, RequireFields<QueryByteCollectionsArgs, 'spaceId'>>;
  byteSocialShare?: Resolver<Maybe<ResolversTypes['ByteSocialShare']>, ParentType, ContextType, RequireFields<QueryByteSocialShareArgs, 'byteId' | 'spaceId'>>;
  bytes?: Resolver<Array<ResolversTypes['Byte']>, ParentType, ContextType, RequireFields<QueryBytesArgs, 'spaceId'>>;
  chatbotCategories?: Resolver<Array<ResolversTypes['ChatbotCategory']>, ParentType, ContextType, RequireFields<QueryChatbotCategoriesArgs, 'spaceId'>>;
  chatbotFAQs?: Resolver<Array<ResolversTypes['ChatbotFAQ']>, ParentType, ContextType, RequireFields<QueryChatbotFaQsArgs, 'spaceId'>>;
  chatbotUserQuestions?: Resolver<Array<ResolversTypes['ChatbotUserQuestion']>, ParentType, ContextType, RequireFields<QueryChatbotUserQuestionsArgs, 'spaceId'>>;
  consolidatedGuideRating?: Resolver<Maybe<ResolversTypes['ConsolidatedGuideRating']>, ParentType, ContextType, RequireFields<QueryConsolidatedGuideRatingArgs, 'guideUuid' | 'spaceId'>>;
  courses?: Resolver<Array<ResolversTypes['GitCourse']>, ParentType, ContextType, RequireFields<QueryCoursesArgs, 'spaceId'>>;
  discordChannels?: Resolver<Array<ResolversTypes['DiscordChannel']>, ParentType, ContextType, RequireFields<QueryDiscordChannelsArgs, 'serverId' | 'spaceId'>>;
  discordMessages?: Resolver<Array<ResolversTypes['DiscordMessage']>, ParentType, ContextType, RequireFields<QueryDiscordMessagesArgs, 'channelId' | 'spaceId'>>;
  discordServer?: Resolver<ResolversTypes['DiscordServer'], ParentType, ContextType, RequireFields<QueryDiscordServerArgs, 'id' | 'spaceId'>>;
  discourseIndexRuns?: Resolver<Array<ResolversTypes['DiscourseIndexRun']>, ParentType, ContextType, RequireFields<QueryDiscourseIndexRunsArgs, 'spaceId'>>;
  discoursePostComments?: Resolver<Array<ResolversTypes['DiscoursePostComment']>, ParentType, ContextType, RequireFields<QueryDiscoursePostCommentsArgs, 'postId' | 'spaceId'>>;
  discoursePosts?: Resolver<Array<ResolversTypes['DiscoursePost']>, ParentType, ContextType, RequireFields<QueryDiscoursePostsArgs, 'spaceId'>>;
  getSpaceFromCreator?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType, Partial<QueryGetSpaceFromCreatorArgs>>;
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
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  projectByte?: Resolver<ResolversTypes['ProjectByte'], ParentType, ContextType, RequireFields<QueryProjectByteArgs, 'projectByteId' | 'projectId'>>;
  projectByteCollection?: Resolver<ResolversTypes['ProjectByteCollection'], ParentType, ContextType, RequireFields<QueryProjectByteCollectionArgs, 'byteCollectionId' | 'projectId'>>;
  projectByteCollections?: Resolver<Array<ResolversTypes['ProjectByteCollection']>, ParentType, ContextType, RequireFields<QueryProjectByteCollectionsArgs, 'projectId'>>;
  projectBytes?: Resolver<Array<ResolversTypes['ProjectByte']>, ParentType, ContextType, RequireFields<QueryProjectBytesArgs, 'projectId'>>;
  projectShortVideo?: Resolver<ResolversTypes['ProjectShortVideo'], ParentType, ContextType, RequireFields<QueryProjectShortVideoArgs, 'projectId' | 'projectShortVideoId'>>;
  projectShortVideos?: Resolver<Array<ResolversTypes['ProjectShortVideo']>, ParentType, ContextType, RequireFields<QueryProjectShortVideosArgs, 'projectId'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, Partial<QueryProjectsArgs>>;
  rawGitCourse?: Resolver<ResolversTypes['RawGitCourse'], ParentType, ContextType, RequireFields<QueryRawGitCourseArgs, 'key' | 'spaceId'>>;
  rawGitCourses?: Resolver<Array<ResolversTypes['RawGitCourse']>, ParentType, ContextType, RequireFields<QueryRawGitCoursesArgs, 'spaceId'>>;
  route53Record?: Resolver<Maybe<ResolversTypes['Route53Record']>, ParentType, ContextType, RequireFields<QueryRoute53RecordArgs, 'spaceId'>>;
  scrapedUrlInfo?: Resolver<ResolversTypes['ScrapedUrlInfo'], ParentType, ContextType, RequireFields<QueryScrapedUrlInfoArgs, 'scrapedUrlInfoId' | 'spaceId'>>;
  scrapedUrlInfos?: Resolver<Array<ResolversTypes['ScrapedUrlInfo']>, ParentType, ContextType, RequireFields<QueryScrapedUrlInfosArgs, 'spaceId' | 'websiteScrapingInfoId'>>;
  searchChatbotFAQs?: Resolver<Array<ResolversTypes['SearchedChatbotFAQ']>, ParentType, ContextType, RequireFields<QuerySearchChatbotFaQsArgs, 'query' | 'spaceId'>>;
  shortVideo?: Resolver<ResolversTypes['ShortVideo'], ParentType, ContextType, RequireFields<QueryShortVideoArgs, 'id' | 'spaceId'>>;
  shortVideos?: Resolver<Maybe<Array<ResolversTypes['ShortVideo']>>, ParentType, ContextType, RequireFields<QueryShortVideosArgs, 'spaceId'>>;
  simulation?: Resolver<ResolversTypes['Simulation'], ParentType, ContextType, RequireFields<QuerySimulationArgs, 'simulationId' | 'spaceId'>>;
  simulations?: Resolver<Array<ResolversTypes['Simulation']>, ParentType, ContextType, RequireFields<QuerySimulationsArgs, 'spaceId'>>;
  siteScrapingRuns?: Resolver<Array<ResolversTypes['SiteScrapingRun']>, ParentType, ContextType, RequireFields<QuerySiteScrapingRunsArgs, 'spaceId' | 'websiteScrapingInfoId'>>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType, Partial<QuerySpaceArgs>>;
  spaceDiscordGuild?: Resolver<Maybe<ResolversTypes['Any']>, ParentType, ContextType, RequireFields<QuerySpaceDiscordGuildArgs, 'spaceId'>>;
  spaces?: Resolver<Maybe<Array<ResolversTypes['Space']>>, ParentType, ContextType>;
  timeline?: Resolver<ResolversTypes['Timeline'], ParentType, ContextType, RequireFields<QueryTimelineArgs, 'spaceId' | 'timelineId'>>;
  timelines?: Resolver<Array<ResolversTypes['Timeline']>, ParentType, ContextType, RequireFields<QueryTimelinesArgs, 'spaceId'>>;
  vercelDomainRecord?: Resolver<Maybe<ResolversTypes['VercelDomain']>, ParentType, ContextType, RequireFields<QueryVercelDomainRecordArgs, 'spaceId'>>;
  websiteScrapingInfos?: Resolver<Array<ResolversTypes['WebsiteScrapingInfo']>, ParentType, ContextType, RequireFields<QueryWebsiteScrapingInfosArgs, 'spaceId'>>;
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

export type SeoMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['SEOMeta'] = ResolversParentTypes['SEOMeta']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  keywords?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScrapedUrlInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScrapedUrlInfo'] = ResolversParentTypes['ScrapedUrlInfo']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  textLength?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  textSample?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  websiteScrapingInfoId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchedChatbotFaqResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchedChatbotFAQ'] = ResolversParentTypes['SearchedChatbotFAQ']> = {
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShortVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShortVideo'] = ResolversParentTypes['ShortVideo']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type SiteScrapingRunResolvers<ContextType = any, ParentType extends ResolversParentTypes['SiteScrapingRun'] = ResolversParentTypes['SiteScrapingRun']> = {
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scrapingRunDate?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  scrapingStartUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  websiteScrapingInfo?: Resolver<ResolversTypes['WebsiteScrapingInfo'], ParentType, ContextType>;
  websiteScrapingInfoId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialSettings'] = ResolversParentTypes['SocialSettings']> = {
  linkedSharePdfBackgroundImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Space'] = ResolversParentTypes['Space']> = {
  adminUsernames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  adminUsernamesV1?: Resolver<Array<ResolversTypes['UsernameAndName']>, ParentType, ContextType>;
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  authSettings?: Resolver<ResolversTypes['AuthSettings'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  botDomains?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
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
  themeColors?: Resolver<Maybe<ResolversTypes['ThemeColors']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  loadersInfo?: Resolver<Maybe<ResolversTypes['SpaceLoadersInfo']>, ParentType, ContextType>;
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

export type SpaceLoadersInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpaceLoadersInfo'] = ResolversParentTypes['SpaceLoadersInfo']> = {
  discordServerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discourseUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type ThemeColorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThemeColors'] = ResolversParentTypes['ThemeColors']> = {
  bgColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockBg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  borderColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  headingColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linkColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  primaryColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  textColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  timelineStyle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type UsernameAndNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsernameAndName'] = ResolversParentTypes['UsernameAndName']> = {
  nameOfTheUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VercelDomainResolvers<ContextType = any, ParentType extends ResolversParentTypes['VercelDomain'] = ResolversParentTypes['VercelDomain']> = {
  apexName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTimeISO']>, ParentType, ContextType>;
  gitBranch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  redirect?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTimeISO']>, ParentType, ContextType>;
  verification?: Resolver<Maybe<Array<ResolversTypes['VercelVerification']>>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VercelVerificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['VercelVerification'] = ResolversParentTypes['VercelVerification']> = {
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebsiteScrapingInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebsiteScrapingInfo'] = ResolversParentTypes['WebsiteScrapingInfo']> = {
  baseUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ignoreHashInUrl?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ignoreQueryParams?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  scrapedUrlInfos?: Resolver<Array<ResolversTypes['ScrapedUrlInfo']>, ParentType, ContextType>;
  scrapingRuns?: Resolver<Array<ResolversTypes['SiteScrapingRun']>, ParentType, ContextType>;
  scrapingStartUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AcademyTask?: AcademyTaskResolvers<ContextType>;
  Any?: GraphQLScalarType;
  ArticleIndexingInfo?: ArticleIndexingInfoResolvers<ContextType>;
  AuthSettings?: AuthSettingsResolvers<ContextType>;
  Byte?: ByteResolvers<ContextType>;
  ByteCollection?: ByteCollectionResolvers<ContextType>;
  ByteCollectionByte?: ByteCollectionByteResolvers<ContextType>;
  ByteLinkedinPdfContent?: ByteLinkedinPdfContentResolvers<ContextType>;
  ByteLinkedinPdfContentStep?: ByteLinkedinPdfContentStepResolvers<ContextType>;
  ByteQuestion?: ByteQuestionResolvers<ContextType>;
  ByteSettings?: ByteSettingsResolvers<ContextType>;
  ByteSocialShare?: ByteSocialShareResolvers<ContextType>;
  ByteStep?: ByteStepResolvers<ContextType>;
  ByteStepItem?: ByteStepItemResolvers<ContextType>;
  ByteSubmission?: ByteSubmissionResolvers<ContextType>;
  ByteUserInput?: ByteUserInputResolvers<ContextType>;
  ChatbotCategory?: ChatbotCategoryResolvers<ContextType>;
  ChatbotFAQ?: ChatbotFaqResolvers<ContextType>;
  ChatbotFAQCommon?: ChatbotFaqCommonResolvers<ContextType>;
  ChatbotSubcategory?: ChatbotSubcategoryResolvers<ContextType>;
  ChatbotUserQuestion?: ChatbotUserQuestionResolvers<ContextType>;
  ConsolidatedGuideRating?: ConsolidatedGuideRatingResolvers<ContextType>;
  CourseIntegrations?: CourseIntegrationsResolvers<ContextType>;
  CourseReadingQuestion?: CourseReadingQuestionResolvers<ContextType>;
  CreateCompletionResponseChoice?: CreateCompletionResponseChoiceResolvers<ContextType>;
  DateTimeISO?: GraphQLScalarType;
  DiscordChannel?: DiscordChannelResolvers<ContextType>;
  DiscordMessage?: DiscordMessageResolvers<ContextType>;
  DiscordServer?: DiscordServerResolvers<ContextType>;
  DiscourseIndexRun?: DiscourseIndexRunResolvers<ContextType>;
  DiscoursePost?: DiscoursePostResolvers<ContextType>;
  DiscoursePostComment?: DiscoursePostCommentResolvers<ContextType>;
  DomainRecords?: DomainRecordsResolvers<ContextType>;
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
  Project?: ProjectResolvers<ContextType>;
  ProjectByte?: ProjectByteResolvers<ContextType>;
  ProjectByteCollection?: ProjectByteCollectionResolvers<ContextType>;
  ProjectShortVideo?: ProjectShortVideoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuestionChoice?: QuestionChoiceResolvers<ContextType>;
  RatingDistribution?: RatingDistributionResolvers<ContextType>;
  RawGitCourse?: RawGitCourseResolvers<ContextType>;
  Route53Record?: Route53RecordResolvers<ContextType>;
  SEOMeta?: SeoMetaResolvers<ContextType>;
  ScrapedUrlInfo?: ScrapedUrlInfoResolvers<ContextType>;
  SearchedChatbotFAQ?: SearchedChatbotFaqResolvers<ContextType>;
  ShortVideo?: ShortVideoResolvers<ContextType>;
  Simulation?: SimulationResolvers<ContextType>;
  SimulationStep?: SimulationStepResolvers<ContextType>;
  SiteScrapingRun?: SiteScrapingRunResolvers<ContextType>;
  SocialSettings?: SocialSettingsResolvers<ContextType>;
  Space?: SpaceResolvers<ContextType>;
  SpaceFilters?: SpaceFiltersResolvers<ContextType>;
  SpaceGitRepository?: SpaceGitRepositoryResolvers<ContextType>;
  SpaceIntegrations?: SpaceIntegrationsResolvers<ContextType>;
  SpaceInviteLinks?: SpaceInviteLinksResolvers<ContextType>;
  SpaceLoadersInfo?: SpaceLoadersInfoResolvers<ContextType>;
  SummarizedGitCourse?: SummarizedGitCourseResolvers<ContextType>;
  SummarizedGitCourseTopic?: SummarizedGitCourseTopicResolvers<ContextType>;
  ThemeColors?: ThemeColorsResolvers<ContextType>;
  Timeline?: TimelineResolvers<ContextType>;
  TimelineEvent?: TimelineEventResolvers<ContextType>;
  TopicConfig?: TopicConfigResolvers<ContextType>;
  UserDiscordConnect?: UserDiscordConnectResolvers<ContextType>;
  UserDiscordInfo?: UserDiscordInfoResolvers<ContextType>;
  UsernameAndName?: UsernameAndNameResolvers<ContextType>;
  VercelDomain?: VercelDomainResolvers<ContextType>;
  VercelVerification?: VercelVerificationResolvers<ContextType>;
  WebsiteScrapingInfo?: WebsiteScrapingInfoResolvers<ContextType>;
};


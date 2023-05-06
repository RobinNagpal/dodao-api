import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  JSON: any;
  JSONObject: any;
};

export type CreateSignedUrlInput = {
  contentType: Scalars['String'];
  imageType: Scalars['String'];
  name: Scalars['String'];
  objectId: Scalars['String'];
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

export type JwtResponse = {
  __typename?: 'JwtResponse';
  jwt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDiscordCredentials: Space;
  createSignedUrl: Scalars['String'];
  upsertGnosisSafeWallets: Space;
  upsertProjectGalaxyAccessToken: Space;
  upsertSpaceAcademyRepository: Space;
  upsertSpaceFeatures: Space;
  upsertSpaceGitGuideRepositories: Space;
  upsertSpaceInviteLinks: Space;
};

export type MutationAddDiscordCredentialsArgs = {
  code: Scalars['String'];
  redirectUri: Scalars['String'];
  spaceId: Scalars['String'];
};

export type MutationCreateSignedUrlArgs = {
  input: CreateSignedUrlInput;
  spaceId: Scalars['String'];
};

export type MutationUpsertGnosisSafeWalletsArgs = {
  spaceId: Scalars['String'];
  wallets: Array<GnosisSafeWalletInput>;
};

export type MutationUpsertProjectGalaxyAccessTokenArgs = {
  accessToken: Scalars['String'];
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

export type MutationUpsertSpaceGitGuideRepositoriesArgs = {
  gitGuideRepositories: Array<SpaceGitRepositoryInput>;
  spaceId: Scalars['String'];
};

export type MutationUpsertSpaceInviteLinksArgs = {
  spaceId: Scalars['String'];
  spaceInviteArgs: SpaceInviteArgs;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query';
  space?: Maybe<Space>;
  spaceDiscordGuild?: Maybe<Scalars['Any']>;
  spaces?: Maybe<Array<Space>>;
};

export type QuerySpaceArgs = {
  domain?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type QuerySpaceDiscordGuildArgs = {
  spaceId: Scalars['String'];
};

export type Space = {
  __typename?: 'Space';
  about?: Maybe<Scalars['String']>;
  admins: Array<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  blogSite?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  creator: Scalars['String'];
  discordInvite?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  features: Array<Scalars['String']>;
  filters?: Maybe<SpaceFilters>;
  github?: Maybe<Scalars['String']>;
  guidesBundlePageFooterContent?: Maybe<Scalars['String']>;
  guidesBundlePageHeaderContent?: Maybe<Scalars['String']>;
  guidesPageFooterContent?: Maybe<Scalars['String']>;
  guidesPageHeaderContent?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  inviteLinks?: Maybe<SpaceInviteLinks>;
  location?: Maybe<Scalars['String']>;
  members: Array<Scalars['String']>;
  mission: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  plugins?: Maybe<Scalars['Any']>;
  private?: Maybe<Scalars['Boolean']>;
  publicForumWebsite?: Maybe<Scalars['String']>;
  referenceDocsWebsite?: Maybe<Scalars['String']>;
  skin: Scalars['String'];
  spaceIntegrations?: Maybe<SpaceIntegrations>;
  symbol?: Maybe<Scalars['String']>;
  telegramInvite?: Maybe<Scalars['String']>;
  terms?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
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

export type SpaceWhere = {
  id?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Any: ResolverTypeWrapper<Scalars['Any']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateSignedUrlInput: CreateSignedUrlInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GnosisSafeWallet: ResolverTypeWrapper<GnosisSafeWallet>;
  GnosisSafeWalletInput: GnosisSafeWalletInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JwtResponse: ResolverTypeWrapper<JwtResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  Space: ResolverTypeWrapper<Space>;
  SpaceFilters: ResolverTypeWrapper<SpaceFilters>;
  SpaceGitRepository: ResolverTypeWrapper<SpaceGitRepository>;
  SpaceGitRepositoryInput: SpaceGitRepositoryInput;
  SpaceIntegrations: ResolverTypeWrapper<SpaceIntegrations>;
  SpaceInviteArgs: SpaceInviteArgs;
  SpaceInviteLinks: ResolverTypeWrapper<SpaceInviteLinks>;
  SpaceWhere: SpaceWhere;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Any: Scalars['Any'];
  Boolean: Scalars['Boolean'];
  CreateSignedUrlInput: CreateSignedUrlInput;
  Float: Scalars['Float'];
  GnosisSafeWallet: GnosisSafeWallet;
  GnosisSafeWalletInput: GnosisSafeWalletInput;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JwtResponse: JwtResponse;
  Mutation: {};
  Query: {};
  Space: Space;
  SpaceFilters: SpaceFilters;
  SpaceGitRepository: SpaceGitRepository;
  SpaceGitRepositoryInput: SpaceGitRepositoryInput;
  SpaceIntegrations: SpaceIntegrations;
  SpaceInviteArgs: SpaceInviteArgs;
  SpaceInviteLinks: SpaceInviteLinks;
  SpaceWhere: SpaceWhere;
  String: Scalars['String'];
};

export interface AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Any'], any> {
  name: 'Any';
}

export type GnosisSafeWalletResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GnosisSafeWallet'] = ResolversParentTypes['GnosisSafeWallet']
> = {
  chainId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tokenContractAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  walletAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  walletName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  addDiscordCredentials?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationAddDiscordCredentialsArgs, 'code' | 'redirectUri' | 'spaceId'>
  >;
  createSignedUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateSignedUrlArgs, 'input' | 'spaceId'>>;
  upsertGnosisSafeWallets?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationUpsertGnosisSafeWalletsArgs, 'spaceId' | 'wallets'>
  >;
  upsertProjectGalaxyAccessToken?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationUpsertProjectGalaxyAccessTokenArgs, 'accessToken' | 'spaceId'>
  >;
  upsertSpaceAcademyRepository?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationUpsertSpaceAcademyRepositoryArgs, 'academyRepository' | 'spaceId'>
  >;
  upsertSpaceFeatures?: Resolver<ResolversTypes['Space'], ParentType, ContextType, RequireFields<MutationUpsertSpaceFeaturesArgs, 'features' | 'spaceId'>>;
  upsertSpaceGitGuideRepositories?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationUpsertSpaceGitGuideRepositoriesArgs, 'gitGuideRepositories' | 'spaceId'>
  >;
  upsertSpaceInviteLinks?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationUpsertSpaceInviteLinksArgs, 'spaceId' | 'spaceInviteArgs'>
  >;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType, Partial<QuerySpaceArgs>>;
  spaceDiscordGuild?: Resolver<Maybe<ResolversTypes['Any']>, ParentType, ContextType, RequireFields<QuerySpaceDiscordGuildArgs, 'spaceId'>>;
  spaces?: Resolver<Maybe<Array<ResolversTypes['Space']>>, ParentType, ContextType>;
};

export type SpaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Space'] = ResolversParentTypes['Space']> = {
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admins?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blogSite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discordInvite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  features?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  filters?: Resolver<Maybe<ResolversTypes['SpaceFilters']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guidesBundlePageFooterContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guidesBundlePageHeaderContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guidesPageFooterContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guidesPageHeaderContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inviteLinks?: Resolver<Maybe<ResolversTypes['SpaceInviteLinks']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  mission?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  plugins?: Resolver<Maybe<ResolversTypes['Any']>, ParentType, ContextType>;
  private?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  publicForumWebsite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  referenceDocsWebsite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spaceIntegrations?: Resolver<Maybe<ResolversTypes['SpaceIntegrations']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telegramInvite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  terms?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceFiltersResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpaceFilters'] = ResolversParentTypes['SpaceFilters']> = {
  minScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  onlyMembers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceGitRepositoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceGitRepository'] = ResolversParentTypes['SpaceGitRepository']
> = {
  authenticationToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gitRepoType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  repoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceIntegrationsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceIntegrations'] = ResolversParentTypes['SpaceIntegrations']
> = {
  academyRepository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discordGuildId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gitGuideRepositories?: Resolver<Maybe<Array<ResolversTypes['SpaceGitRepository']>>, ParentType, ContextType>;
  gnosisSafeWallets?: Resolver<Maybe<Array<ResolversTypes['GnosisSafeWallet']>>, ParentType, ContextType>;
  projectGalaxyTokenLastFour?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceInviteLinksResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceInviteLinks'] = ResolversParentTypes['SpaceInviteLinks']
> = {
  discordInviteLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  showAnimatedButtonForDiscord?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  showAnimatedButtonForTelegram?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  telegramInviteLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Any?: GraphQLScalarType;
  GnosisSafeWallet?: GnosisSafeWalletResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JwtResponse?: JwtResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Space?: SpaceResolvers<ContextType>;
  SpaceFilters?: SpaceFiltersResolvers<ContextType>;
  SpaceGitRepository?: SpaceGitRepositoryResolvers<ContextType>;
  SpaceIntegrations?: SpaceIntegrationsResolvers<ContextType>;
  SpaceInviteLinks?: SpaceInviteLinksResolvers<ContextType>;
};

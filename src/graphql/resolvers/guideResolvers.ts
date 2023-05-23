import { isUserDiscordConnect, isUserInput } from '@/deprecatedSchemas/helpers/stepItemTypes';
import { GuideStepItem } from '@/deprecatedSchemas/models/GuideModel';
import { IResolvers } from '@graphql-tools/utils';

const guideResolvers: IResolvers | Array<IResolvers> = {
  GuideStepItem: {
    __resolveType(stepItem: GuideStepItem) {
      if (isUserInput(stepItem)) {
        return 'GuideUserInput';
      } else if (isUserDiscordConnect(stepItem)) {
        return 'UserDiscordConnect';
      } else {
        return 'GuideQuestion';
      }
    },
  },
};

export default guideResolvers;

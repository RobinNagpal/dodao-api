import { isUserDiscordConnect, isUserInput } from '@/deprecatedSchemas/helpers/stepItemTypes';
import { ByteStepItem } from '@/graphql/generated/graphql';
import { IResolvers } from '@graphql-tools/utils';

const byteResolvers: IResolvers | Array<IResolvers> = {
  ByteStepItem: {
    __resolveType(stepItem: ByteStepItem) {
      if (isUserInput(stepItem)) {
        return 'ByteUserInput';
      } else if (isUserDiscordConnect(stepItem)) {
        return 'UserDiscordConnect';
      } else {
        return 'ByteQuestion';
      }
    },
  },
};

export default byteResolvers;

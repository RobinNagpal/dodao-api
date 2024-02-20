import { QueryGetSpaceFromCreatorArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function getSpaceFromCreator(_: any, { creatorId }: QueryGetSpaceFromCreatorArgs) {
    return prisma.space.findFirstOrThrow(
        {
            where: {
                creator: creatorId!,
            }
        }
    );
}

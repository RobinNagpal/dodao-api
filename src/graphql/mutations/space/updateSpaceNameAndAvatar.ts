import { MutationUpdateSpaceNameAndAvatarArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateSpaceNameAndAvatar(_: unknown, args: MutationUpdateSpaceNameAndAvatarArgs, context: IncomingMessage) {
    const spaceById = await getSpaceById(args.spaceId);
    checkEditSpacePermission(spaceById, context);
    return prisma.space.update({
        data: {
            name: args.name,
            avatar: args.avatar
        },
        where: {
            id: args.spaceId,
        },
    });
}

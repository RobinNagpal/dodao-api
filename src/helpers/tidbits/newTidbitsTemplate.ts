import { ByteStep } from '@/graphql/generated/graphql';
import { Byte } from '@prisma/client';

type NewTidbitsTemplateStep = Omit<ByteStep, 'uuid'>;
type NewTidbitsTemplate = Omit<Byte, 'id' | 'spaceId' | 'steps'> & { steps: NewTidbitsTemplateStep[] };

export const WhatAreTidbitsTemplate: NewTidbitsTemplate = {
  name: 'What are Tidbits?',
  steps: [
    {
      name: 'What are Tidbits?',
      content: `Tidbits are small pieces of information that are useful for learning. `,
      stepItems: [],
    },
  ],
  created: new Date().toISOString(),
  content: `Tidbits are small pieces of information that are useful for learning.  `,
  admins: [],
  priority: 50,
  tags: [],
  videoUrl: null,
};

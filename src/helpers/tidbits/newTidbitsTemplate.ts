import { ByteStep } from '@/graphql/generated/graphql';
import { Byte } from '@prisma/client';

type NewTidbitsTemplateStep = Omit<ByteStep, 'uuid'>;
type NewTidbitsTemplate = Omit<Byte, 'id' | 'spaceId' | 'steps'> & { steps: NewTidbitsTemplateStep[] };

export const WhatAreTidbitsTemplate: NewTidbitsTemplate = {
  name: 'What are Tidbits?',
  steps: [
    {
      name: 'Understanding Tidbits"',
      content: `Tidbits are concise, informative pieces designed to facilitate easy learning and knowledge absorption. `,
      stepItems: [],
    },
    {
      name: 'Utilizing Tidbits',
      content: `Leverage Tidbits for crafting engaging guides, tutorials, or how-to articles, simplifying complex information into manageable segments.`,
      stepItems: [],
    },
    {
      name: 'The Value of Tidbits',
      content: `Tidbits effectively share knowledge and insights, helping to build a community that learns and shares together.`,
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

export const HowToCreateTidbitsTemplate: NewTidbitsTemplate = {
  name: 'How to Create Tidbits?',
  steps: [
    {
      name: 'Initiate Tidbit Creation',
      content: `Initiate the tidbit creation process by clicking the "+ Create" button located at the top right corner of your screen.`,
      stepItems: [],
    },
    {
      name: 'Select "Create Tidbit" from the modal',
      content: `A modal will appear on your screen. Proceed by selecting the "Create Tidbit" option to move forward. `,
      stepItems: [],
    },
    {
      name: 'Input Tidbit Details',
      content: `Enter all the necessary information into the form to accurately describe your tidbit.`,
      stepItems: [],
    },
    {
      name: 'Enhance Your Tidbit',
      content: `You can enrich your tidbit by adding additional steps. Simply click the "+" button to include more content. You can add text, images, and questions to each step.`,
      stepItems: [],
    },
    {
      name: 'Finalize and Save Your Tidbit',
      content: `Once you have completed customizing your tidbit, ensure to save your work by clicking the "Upsert" button. `,
      stepItems: [],
    },
  ],
  created: new Date().toISOString(),
  content:
    'A step-by-step process for creating Tidbits: From initiating creation, entering detailed information, adding further steps, to ultimately saving your content.',
  admins: [],
  priority: 50,
  tags: [],
  videoUrl: null,
};

export const UpdatingTidbitsSiteThemeTemplate: NewTidbitsTemplate = {
  name: 'How to update tidbits site theme?',
  steps: [
    {
      name: 'What are Tidbits?',
      content: `Click on your profile icon located at the top right corner of your screen.`,
      stepItems: [],
    },
    {
      name: 'Navigating to Manage Space',
      content: `From the dropdown menu, select "Manage Space" to proceed to space management options.`,
      stepItems: [],
    },
    {
      name: 'Editing Theme Details',
      content: `Scroll down to the "Theme Details" section. Click on the three vertical dots located at the top right corner of the Theme Details section. Select "Edit" from the dropdown menu. `,
      stepItems: [],
    },
    {
      name: 'Customizing Theme Settings',
      content: `In the Theme Setting modal, adjust your theme's appearance by selecting new colors for the primary, background, text, and headings using the color palette.`,
      stepItems: [],
    },
    {
      name: 'Saving Your Theme Changes',
      content: `After finalizing your adjustments, click the "Save" button to apply the changes to your theme settings.`,
      stepItems: [],
    },
  ],
  created: new Date().toISOString(),
  content: `Follow these simple steps to customize and update your site's theme to match your brand's aesthetics and preferences.`,
  admins: [],
  priority: 50,
  tags: [],
  videoUrl: null,
};

export const TidbitsTemplates: NewTidbitsTemplate[] = [WhatAreTidbitsTemplate, HowToCreateTidbitsTemplate, UpdatingTidbitsSiteThemeTemplate];

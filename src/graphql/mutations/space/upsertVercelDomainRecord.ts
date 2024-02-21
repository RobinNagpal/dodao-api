import { MutationUpsertVercelDomainRecordArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { getVercelDomain } from '@/graphql/queries/space/vercelDomainRecord';

import axios from 'axios';
import { IncomingMessage } from 'http';

async function upsertVercelDomain(spaceId: string): Promise<void> {
  const token = process.env.VERCEL_API_TOKEN!; // Replace with your Vercel API token
  const projectId = 'dodao-ui'; // Replace with your project's ID

  const endpoint = `https://api.vercel.com/v10/projects/dodao-ui/domains?teamId=robinnagpal-s-team`;

  const domainName: string = `${spaceId}.dodao.io`; // Replace with your domain name
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const data = {
    name: domainName,
  };

  try {
    // First, add the domain to your Vercel account
    const domainResponse = await axios.post(endpoint, data, { headers });

    if (domainResponse.data && domainResponse.data.uid) {
      // Then, link the domain to a specific project
      const linkEndpoint = `https://api.vercel.com/v9/projects/${projectId}/domains`;
      await axios.get(linkEndpoint, { headers });
      console.log(`Domain ${domainName} added successfully.`);
    } else {
      console.error('Error adding domain:', domainResponse.data);
    }
  } catch (error) {
    console.error('Error adding domain:', error);
  }
}
export default async function upsertVercelDomainRecord(_: unknown, args: MutationUpsertVercelDomainRecordArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  // checkIsCreator(spaceById, context);

  await upsertVercelDomain(spaceById.id);

  return await getVercelDomain(spaceById.id);
}

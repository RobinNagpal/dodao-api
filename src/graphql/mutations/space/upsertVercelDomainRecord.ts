import { MutationUpsertVercelDomainRecordArgs, VercelDomain, VercelVerification } from '@/graphql/generated/graphql';
import { createTxtVerificationRecord } from '@/graphql/mutations/space/upsertRoute53Record';
import { getSpaceById } from '@/graphql/operations/space';
import { getVercelDomainRecordBySpace } from '@/graphql/queries/space/vercelDomainRecord';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';

import axios from 'axios';
import { IncomingMessage } from 'http';

async function upsertVercelDomain(spaceId: string): Promise<void> {
  const token = process.env.VERCEL_API_TOKEN!; // Replace with your Vercel API token
  const projectId = 'dodao-ui'; // Replace with your project's ID

  const endpoint = `https://api.vercel.com/v10/projects/dodao-ui/domains?teamId=robinnagpal-s-team`;

  const domainName = `${spaceId}.tidbitshub.org`; // Replace with your domain name
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

  checkEditSpacePermission(spaceById, context);

  await upsertVercelDomain(spaceById.id);

  const domainRecord: VercelDomain | undefined = await getVercelDomainRecordBySpace(spaceById.id);
  const verifications = domainRecord?.verification;
  if (verifications?.length) {
    for (const verification of verifications!) {
      console.log('do verification', verification);
      const v = verification as VercelVerification;
      await createTxtVerificationRecord(v.domain, v.value, v.type);
    }
  }

  return domainRecord;
}

import { QueryVercelDomainRecordArgs, VercelDomain } from '@/graphql/generated/graphql';
import { IncomingMessage } from 'http';

export async function getVercelDomain(spaceId: string): Promise<VercelDomain | undefined | any> {
  const token = process.env.VERCEL_API_TOKEN!; // Replace with your Vercel API token
  const endpoint = `https://api.vercel.com/v9/projects/dodao-ui/domains/${spaceId}.dodao.io?teamId=robinnagpal-s-team`;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(endpoint, { headers });

    return (await response.json()) as VercelDomain | undefined;
  } catch (error) {
    console.error('Error fetching domains:', error);
  }
}
export default async function vercelDomainRecord(_: unknown, args: QueryVercelDomainRecordArgs, context: IncomingMessage) {
  // validateSuperAdmin(context);

  const response = await getVercelDomain(args.spaceId);
  if (!response.error) {
    console.log('response', response);
    return response;
  }
}

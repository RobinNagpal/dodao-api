import { VercelDomain } from '@/graphql/generated/graphql';
import { validateSuperAdmin } from '@/helpers/space/isSuperAdmin';
import axios from 'axios';
import { IncomingMessage } from 'http';

const token = process.env.VERCEL_API_TOKEN!; // Replace with your Vercel API token
const projectId = 'dodao-ui'; // Replace with your project's ID

async function addVercelDomain(token: string, projectId: string, domainName: string): Promise<void> {
  const endpoint = `https://api.vercel.com/v4/domains`;

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
async function getVercelDomains(token: string, projectId: string): Promise<VercelDomain[]> {
  const endpoint = `https://api.vercel.com/v9/now/projects/${projectId}/domains`;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(endpoint, { headers });
    console.log('response', response);
    const body = await response.json();
    if (body.domains) {
      return body.domains.map(
        (domain: any): VercelDomain => ({
          name: domain.name,
          apexName: domain.apexName,
          projectId: domain.projectId,
          redirect: domain.redirect,
          gitBranch: domain.gitBranch,
          updatedAt: domain.updatedAt,
          createdAt: domain.createdAt,
          verified: domain.verified,
        }),
      );
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching domains:', error);
    return [];
  }
}
export default async function vercelDomainRecords(_: unknown, args: any, context: IncomingMessage) {
  validateSuperAdmin(context);

  return getVercelDomains(token, projectId);
}

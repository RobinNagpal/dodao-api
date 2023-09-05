import axios from 'axios';
import { logError } from '@/helpers/adapters/errorLogger';

export async function appendToGalaxyCredentials(accessToken: string, credentialsId: string, address: string) {
  try {
    const variables = { credId: credentialsId, operation: 'APPEND', items: [address] };
    console.log('Project galaxy request variables :', JSON.stringify(variables));
    const response = await axios.post(
      'https://graphigo.prd.galaxy.eco/query',

      {
        operationName: 'credentialItems',
        variables,
        query:
          'mutation credentialItems($credId: ID!, $operation: Operation!, $items: [String!]!) {\n  credentialItems(input: {credId: $credId, operation: $operation, items: $items}) {\n    itemCount\n  }\n}\n',
      },
      {
        headers: {
          'access-token': accessToken,
        },
      },
    );
    console.log('Project galaxy response :', JSON.stringify(response.data));
  } catch (error) {
    await logError('Error updating project galaxy', { credentialsId, address }, null, null, null);
    console.error((error as any).response.data);
    console.error((error as any).response.status);
    console.error((error as any).response.headers);
  }
}

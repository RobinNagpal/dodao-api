import { MutationUpsertRoute53RecordArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { getRoute53RecordBySpace } from '@/graphql/queries/space/route53Record';
import { checkIsCreator } from '@/helpers/space/checkEditSpacePermission';

import * as AWS from 'aws-sdk';
import { IncomingMessage } from 'http';

// Setting the AWS region (for example, us-west-2)
AWS.config.update({ region: 'us-east-1' });

const route53 = new AWS.Route53();

/**
 * Creates a subdomain record in a specified hosted zone.
 *
 * @param {string} hostedZoneId - The ID of the hosted zone where the record will be added.
 * @param {string} subdomain - The name of the subdomain to create (e.g., "sub.example.com").
 * @param {string} target - The value for the record, such as the target DNS name for a CNAME record.
 * @param {string} recordType - The type of DNS record to create (e.g., "CNAME", "A").
 * @param {number} ttl - The Time To Live (TTL) of the record in seconds.
 * @returns {Promise<AWS.Route53.ChangeResourceRecordSetsResponse>} The response from the Route 53 API.
 */
async function createSubdomainRecord(hostedZoneId: string, spaceId: string, target: string, recordType = 'CNAME', ttl = 300) {
  const params = {
    HostedZoneId: hostedZoneId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'UPSERT', // Use 'UPSERT' to update an existing record or create a new one if it does not exist
          ResourceRecordSet: {
            Name: `${spaceId}.dodao.io`,
            Type: recordType,
            TTL: ttl,
            ResourceRecords: [{ Value: target }],
          },
        },
      ],
    },
  };

  try {
    const response = await route53.changeResourceRecordSets(params).promise();
    console.log('Subdomain record created:', response);
    return response;
  } catch (error) {
    console.error('Error creating subdomain record:', error);
    throw error;
  }
}

export default async function upsertRoute53Record(_: unknown, args: MutationUpsertRoute53RecordArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  // checkIsCreator(spaceById, context);

  await createSubdomainRecord('Z10350102V7MAUWYWINFH', spaceById.id, 'cname.vercel-dns.com');

  return await getRoute53RecordBySpace(spaceById.id);
}

import { QueryRoute53RecordArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import * as AWS from 'aws-sdk';
import { IncomingMessage } from 'http';

// Setting the AWS region (for example, us-west-2)
AWS.config.update({ region: 'us-east-1' });

const route53 = new AWS.Route53();

export async function getRoute53RecordBySpace(spaceId: string) {
  const hostedZoneId: string = 'Z10350102V7MAUWYWINFH';
  console.log('hostedZoneId', hostedZoneId);
  console.log('spaceId', spaceId);
  // Assuming the domain format is {spaceId}.dodao.io
  const domainName = `${spaceId}.dodao.io.`; // Note: DNS records often end with a dot

  const records = await route53
    .listResourceRecordSets({
      HostedZoneId: hostedZoneId,
      StartRecordName: domainName,
      StartRecordType: 'CNAME',
    })
    .promise();

  console.log('records', JSON.stringify(records, null, 2));
  const record = records.ResourceRecordSets.find((record) => record.Name === domainName && record.Type === 'CNAME');

  if (record) {
    return {
      name: record.Name,
      type: record.Type,
      ttl: record.TTL,
      records: record.ResourceRecords?.map((r) => r.Value),
    };
  }
}

export default async function route53Record(_: unknown, args: QueryRoute53RecordArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);
  // checkIsCreator(spaceById, context);

  const spaceId: string = spaceById.id;
  return await getRoute53RecordBySpace(spaceId);
}

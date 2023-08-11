import { validateSuperAdmin } from '@/helpers/space/isSuperAdmin';
import * as AWS from 'aws-sdk';
import { IncomingMessage } from 'http';

// Setting the AWS region (for example, us-west-2)
AWS.config.update({ region: 'us-east-1' });

const route53 = new AWS.Route53();

async function listRecordsForZone(hostedZoneId: string) {
  const records = await route53
    .listResourceRecordSets({
      HostedZoneId: hostedZoneId,
    })
    .promise();
  return records.ResourceRecordSets.filter((record) => record.Type === 'CNAME').filter(
    (record) => record.ResourceRecords?.find((r) => r.Value === 'cname.vercel-dns.com'),
  );
}

export default async function route53Records(_: unknown, args: any, context: IncomingMessage) {
  validateSuperAdmin(context);

  const resourceRecordSets = await listRecordsForZone('Z10350102V7MAUWYWINFH');
  return resourceRecordSets.map((record: AWS.Route53.ResourceRecordSet) => ({
    name: record.Name,
    type: record.Type,
    ttl: record.TTL,
    records: record.ResourceRecords?.map((r) => r.Value),
  }));
}

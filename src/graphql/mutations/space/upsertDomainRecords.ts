import { MutationUpsertDomainRecordsArgs, VercelVerification } from '@/graphql/generated/graphql';
import upsertRoute53Record, { createTxtVerificationRecord } from '@/graphql/mutations/space/upsertRoute53Record';
import upsertVercelDomainRecord from '@/graphql/mutations/space/upsertVercelDomainRecord';
import { getRoute53RecordBySpace } from '@/graphql/queries/space/route53Record';
import { getVercelDomainRecordBySpace } from '@/graphql/queries/space/vercelDomainRecord';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertDomainRecords(_: unknown, args: MutationUpsertDomainRecordsArgs, context: IncomingMessage) {
  const { space } = await verifySpaceEditPermissions(context, args.spaceId);
  let route53Record = await getRoute53RecordBySpace(space.id);

  if (!space.domains.includes(`${space.id}.tidbitshub.org`)) {
    await prisma.space.update({
      where: {
        id: space.id,
      },
      data: {
        domains: [...space.domains, `${space.id}.tidbitshub.org`],
      },
    });
  }

  if (!route53Record) {
    route53Record = await upsertRoute53Record(_, args, context);
  }

  let vercelDomainRecord = await getVercelDomainRecordBySpace(space.id);
  if (typeof vercelDomainRecord === 'string') {
    vercelDomainRecord = JSON.parse(vercelDomainRecord);
  }
  if (!vercelDomainRecord || vercelDomainRecord?.error) {
    vercelDomainRecord = await upsertVercelDomainRecord(_, args, context);
    console.log('vercelDomainRecord', JSON.stringify(vercelDomainRecord || { error: 'No vercelDomainRecord' }));
  }

  const verifications = vercelDomainRecord?.verification;
  if (verifications?.length) {
    for (const verification of verifications!) {
      console.log('do verification', verification);
      const v = verification as VercelVerification;
      await createTxtVerificationRecord(v.domain, v.value, v.type);
    }
  }

  return {
    route53Record,
    vercelDomainRecord,
  };
}

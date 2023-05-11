import { TimelineModel } from '@/deprecatedSchemas/models/timeline/TimelineModel';
import { Timeline } from '@/graphql/generated/graphql';

export function transformTimeline(dummyTimeline: TimelineModel): Timeline {
  const created = new Date(dummyTimeline.created).toISOString();
  const transformedEvents = dummyTimeline.events.map((event, order) => ({
    ...event,
    uuid: event.uuid,
    created,
    date: new Date(event.date).toISOString(),
    order,
  }));

  const transformedTimeline = {
    ...dummyTimeline,
    id: dummyTimeline.id,
    created,
    events: transformedEvents,
  };
  return transformedTimeline;
}

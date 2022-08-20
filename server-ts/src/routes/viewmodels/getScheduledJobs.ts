import {FastifyInstance} from 'fastify';
import {Type} from '@sinclair/typebox';
import {
  ScheduleDetails,
  ScheduleDetailsType,
} from 'src/schema/chronogolf/schedule';

export default async function getScheduledJobs(server: FastifyInstance) {
  server.get<{Reply: ScheduleDetails[]}>(
    '/scheduledJobs',
    {
      schema: {
        response: {
          200: Type.Array(ScheduleDetailsType),
        },
      },
    },
    async (request, reply) => {
      const jobs = await server.agenda.jobs({
        nextRunAt: {$ne: null},
      });

      const convertedData = jobs.map(job => {
        return job.attrs.data?.details as ScheduleDetails;
      });

      reply.send(convertedData);
    }
  );
}

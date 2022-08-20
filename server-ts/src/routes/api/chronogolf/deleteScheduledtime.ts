import {FastifyInstance} from 'fastify';

import {Static, Type} from '@sinclair/typebox';

const RequestBodyType = Type.Object({
  userId: Type.String(),
  courseId: Type.String(),
  date: Type.String(),
});

type RequestBody = Static<typeof RequestBodyType>;

const ResponseType = Type.Object({
  message: Type.String(),
});

type Response = Static<typeof ResponseType>;

export default async function deleteJob(server: FastifyInstance) {
  server.post<{Body: RequestBody; Reply: Response}>(
    '/deleteChronogolfJob',
    {
      schema: {
        body: RequestBodyType,
        response: {
          200: ResponseType,
        },
      },
    },
    async (request, reply) => {
      const taskId = `${request.body.userId};${request.body.courseId};${request.body.date}`;
      const jobs = await server.agenda.jobs({
        name: taskId,
        nextRunAt: {$ne: null},
      });

      if (jobs === null || jobs.length === 0) {
        reply.status(400);
        reply.send({message: 'Could not find matching job!'});
        return;
      }

      // Remove the job
      jobs.forEach(async j => {
        await j.remove();
      });
    }
  );
}

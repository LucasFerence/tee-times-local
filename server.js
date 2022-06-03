import Fastify from 'fastify'

import dbConnector from './ext_plugins/mongo.js'
import agenda from './ext_plugins/agenda.js'

import clubs from './plugins/clubs.js'
import teeTimes from './plugins/tee-times.js'
import bookTime from './plugins/book.js'

import schedule from './routes/schedule.js'

const fastify = Fastify({
  logger: true
})

// External plugins
fastify.register(dbConnector)
fastify.register(agenda)

// Internal plugins
fastify.register(clubs)
fastify.register(teeTimes)
fastify.register(bookTime)

// Routes
fastify.register(schedule)

// Run the server!
fastify.listen(3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
/* eslint-disable no-console */
/**
 * Ref: https://mongoosejs.com/docs/connections.html
 * Learn: https://documentation.progress.com/output/ua/OpenEdge_latest/index.html#page/dmadm%2Fdatabase-buffers.html%23
 * Performance: http://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs
 */

const mongoose = require('mongoose');

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  keepAlive: true,
  autoIndex: true, // Build indexes
  useFindAndModify: false,
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
  connectTimeoutMS: 30000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.ENABLE_MONGO_DEBUG === 'true'
) {
  // Enable debugging
  mongoose.set('debug', true);
}

// Handle initial connection errors
mongoose
  .connect(process.env.DB_CONN, opts)
  .then(() => {
    console.log('>> Database connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on('disconnected', () => {
  console.log('>> Database is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.warn(
      '== Mongoose default connection is disconnected due to application termination =='
    );

    // eslint-disable-next-line no-process-exit
    process.exit(0);
  });
});

module.exports = mongoose;

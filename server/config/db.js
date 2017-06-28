const mongoose = require('mongoose');
let URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pintrest-clone';
if (process.env.NODE_ENV === 'test') {
  URI = process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/pintrest-clone-test'
}
mongoose.connect(URI);

// Use native promises.
mongoose.Promise = global.Promise;

// Connection/error events

// Only log these messages outside of test environments
const log = (msg) => process.env.NODE_ENV !== 'test'
                     && console.log(msg);

mongoose.connection.on('connected', () => {
  log('Mongoose connection open to ' + URI);
});

mongoose.connection.on('error', (err) => {
  log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  log('Mongoose connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log('Mongoose connection closed');
    process.exit(0);
  });
});

require('../models/User');
module.exports = mongoose.connection;

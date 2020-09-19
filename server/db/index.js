const mongoose = require('mongoose');
const LOCAL_MONGO_URL = 'mongodb://localhost/abetteryou-db';
let MONGO_URL;

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
};

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, options);
  MONGO_URL = process.env.MONGODB_URI;
} else {
  mongoose.connect(LOCAL_MONGO_URL, options);
  MONGO_URL = LOCAL_MONGO_URL;
}

const db = mongoose.connection;
db.on('error', err => {
  console.log(`There was an error connection to the database: ${err}`);
});

db.once('open', () => {
  console.log(
    `You have successfully connected to your mongo database: ${MONGO_URL}`,
  );
});

module.exports = db;

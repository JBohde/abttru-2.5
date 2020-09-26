/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

const passport = require('./config/passport');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

require('./db');

dotenv.config();
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
  app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '../client/build/')); });
}

app.use(routes);

app.use((err, req, res) => {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const movieRouter = require('./routes/movieRouters/movieRouter');

const url = 'mongodb+srv://jrsalve77:Ruujeremy565+@cluster0-qaaa0.mongodb.net/video?retryWrites=true&w=majority';
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected correctly to server');
});

const app = express();

app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', movieRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;

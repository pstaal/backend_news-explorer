const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');

const errorMiddleware = require('./middleware/errorMiddleware');

const { limiter } = require('./utils/limiter');

const { requestLogger, errorLogger } = require('./middleware/logger');

// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/newsdb');

app.use(requestLogger); // enabling the request logger

app.use(router);

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

// error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});

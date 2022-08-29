const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const users = require('./routes/users');
const articles = require('./routes/articles');
const errorMiddleware = require('./middleware/errorMiddleware');
const { celebrate, Joi, errors } = require('celebrate');

const {
  login,
  createUser
} = require('./controllers/users');

const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');

// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/newsdb');

app.use(requestLogger); // enabling the request logger

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
}),
}), createUser);


app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/articles', articles);
app.use('/users', users);

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

//error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
})
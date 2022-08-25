const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const users = require('./routes/users');
const articles = require('./routes/articles');

const {
  login,
  createUser
} = require('./controllers/users');

const auth = require('./middleware/auth');

// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/newsdb');

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/articles', articles);
app.use('/users', users);


app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
})
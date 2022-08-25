const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');
const articles = require('./routes/articles');
// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/newsdb');

app.use('/articles', articles);
app.use('/users', users);

app.get('/', (req, res) => {
  res.send('app is working!')
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
})
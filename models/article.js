const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'a keyword is required'],
  },
  title: {
    type: String,
    required: [true, 'a title is required'],
  },
  text: {
    type: String,
    required: [true, 'a text is required'],
  },
  date: {
    type: String,
    required: [true, 'a date is required'],
  },
  source: {
    type: String,
    required: [true, 'a source is required'],
  },
  link: {
    type: String,
    required: [true, 'a link is required'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Sorry. This is not a valid url',
    },
  },
  image: {
    type: String,
    required: [true, 'an image is required'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Sorry. This is not a valid url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'an owner is required'],
    select: false,
  },
});

// create the model and export it
module.exports = mongoose.model('article', articleSchema);

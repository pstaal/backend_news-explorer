const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'an email address is required'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Sorry. This is not an email address',
    },
  },
  password: {
    type: String,
    required: [true, 'a password is required'],
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    default: "Peter",
    required: [true, 'a name is required'],
    minlength: [2, 'the minimum length of a name should be 2 characters'],
    maxlength: [30, 'the maximum length of a name should be 30 characters'],
  }
});

// create the model and export it
module.exports = mongoose.model('user', userSchema);
const User = require('../models/user');


const getUser = (req,res) => {
  User.findById(req.params.id)
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Error' }));
};

module.exports = { getUser };
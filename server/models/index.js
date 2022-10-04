const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/chat-db-pe2021-1')
  .then(() => console.log('Connection to mongobd OK'))
  .catch(err => {
    console.log(`err`, err);
  });

module.exports.Message = require('./message');

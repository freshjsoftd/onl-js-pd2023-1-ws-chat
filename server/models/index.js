const mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost:27017/chat-js-dpd2022-1')
.then(() => console.log(`Connection to chat-js-dpd2022-1 Ok`))
.catch(err => {
  console.log('err', err)
});

module.exports.Message = require('./message');
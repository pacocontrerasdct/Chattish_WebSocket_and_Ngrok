var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  chatLine: String
});

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
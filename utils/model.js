const mongoose = require("mongoose");

const modelChat = mongoose.model('chat', {
    username: String,
    message: String
});

module.exports = modelChat;
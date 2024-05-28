const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/tempoChat');

// const modelChat = require('./model');

// const chat = new modelChat({
//     username: "Joko",
//     message: "Halo Lagi"
// })

// chat.save().then(result => console.log(result));
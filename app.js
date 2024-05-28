const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
// const socket = require('/socket.io/socket.io.js');

require('./utils/db');
const modelChat = require('./utils/model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/login', (req,res) => {
    // res.render('login');
    res.render('login');
})

app.get('/tempo', (req,res) => {

    if(req.session.username == null){
        res.redirect('login');
    }

    io.on("connect", socket => console.log("Server Connected"));

    modelChat.find().then(resp => {
        // console.log(res.length);
        const data = resp;
        let username = req.session.username;
        res.render('chat', {username, data});
    });

})

app.post('/login', (req,res) => {
    if(req.session.username != null){
        req.session.username = null;
    } 
    // console.log("tes");
    console.log((req.body.username).length);
    req.session.username = req.body.username;
    res.redirect('/tempo');
})

app.post('/tempo', (req,res) => {
    const chat = req.body.chat;
    const username = req.session.username;
    // console.log(chat);

    const model = new modelChat({username, message : chat});
    model.save().then(res => console.log(res));
    res.redirect('/tempo');
})

app.use('/', (req,res) => {
    res.redirect('login');
})

io.on("connection", socket => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



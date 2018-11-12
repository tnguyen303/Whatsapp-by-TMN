const express = require('express');
const app = express();
//http package lets you run server without Express, socket.io requires more control that is provided with this package
const server = require('http').createServer(app);
//package to use socket io
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/realTimeChat', {useNewUrlParser: true});

require('./sockets/message-sockets')(io);

require('./routes/html-routes')(app);

require('./routes/api-routes')(app);

server.listen(PORT, () => {
    console.log('Server is listening at port', PORT);
})

const run = function(app){
    console.log('run');
}
//require path package so we can join directory names
const path = require('path');

module.exports = function(app){
    app.get('/chat', function(req,res){
        res.sendFile(path.join(__dirname, '../public/chat.html'));
    })

    app.get('/', function(req,res){
        res.sendFile(path.join(__dirname, '../public/login.html'));
    })
};


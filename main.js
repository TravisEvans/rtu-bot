//  Heroku
var PORT = process.env.PORT || 5000;

//  Express
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.use(express.static('client'))

server.listen(PORT, () =>   {
    console.log("Bot launched");
})

///////////////////////////////////////////////dont know what these are
// var io = require('socket.io')(server);

// io.on('connection', (socket) => {
    //     socket.on('message', (msg) => {
//         io.emit('message', msg);
//     })
// })
///////////////////////////////////////////////dont know what these are
        
//  Discord.js
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login('ODQzOTgyNDA4MDA0MDA5OTg1.YKLx3g.xPt65LmLhwugigkf72-vrfPK1hU');
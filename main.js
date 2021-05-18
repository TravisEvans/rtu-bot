//  dotenv
var dotenv = require('dotenv');
dotenv.config(); // loads? all environment variables
var BOT_TOKEN = process.env.BOT_TOKEN;  //  gets loaded env var
console.log(BOT_TOKEN);

//  Heroku
var PORT = process.env.PORT || 5000;

//  Express
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.use(express.static('client'))

server.listen(PORT, () =>   {
    console.log("SERVER:\tBot launched");
})

///////////////////////////////////////////////dont know what these are, believe is for exporting vars?
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
    console.log("DISCORD:\t${client.user.tag} logged in");
});

client.on('message', (msg) => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(BOT_TOKEN);
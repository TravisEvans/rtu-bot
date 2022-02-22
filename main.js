//  external files
var on_message = require('./on_message.js');

//  dotenv
var dotenv = require('dotenv');
dotenv.config(); // loads? all environment variables

//  Heroku
var PORT = process.env.PORT || 5000;
var BOT_TOKEN = process.env.BOT_TOKEN;  //  gets loaded env var (from heroku, it can set env vars)

//  Express
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.use(express.static('client'))

server.listen(PORT, () =>   {
    console.log("EXPRESS:\tBot launched");
})
        
//  Discord.js
const Discord = require('discord.js');
const Intents = new Discord.Intents(10110101);
const client = new Discord.Client({Intents});

//////////////

client.on('ready', () => {
    console.log(`DISCORD:\t ${client.user.tag} logged in`);
    client.channels.fetch('797492376888148008')
    .then(channel => channel.send("bot up"));  
    client.user.setActivity('The RTU bot for the boys', { type: '' });
})

client.on('message', (msg) => {
    on_message.checkMessage(msg);
});

client.login(BOT_TOKEN);
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
const { Client, Intents } = require('discord.js');
const botIntents = new Intents();
botIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES);
const client = new Client({intents: botIntents});

//////////////

client.on('ready', () => {
    console.log(`DISCORD:\t ${client.user.tag} logged in`);
    client.channels.fetch('797492376888148008')
    .then(channel => channel.send("bot up"));  
    client.user.setActivity('The RTU bot for the boys', { type: '' });
})

client.on('message', (msg) => {
    try {
        on_message.checkMessage(msg);
    } catch (err) {
        console.log(err);
    }
});

client.login(BOT_TOKEN);
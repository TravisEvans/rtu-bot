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
    console.log(`DISCORD:\t ${client.user.tag} logged in`);
});

//////////////
var celeryID = "171178377976348674"

// client.on('ready', () => {
    
// })

client.on('message', (msg) => {
    // .catch("error");
    // msg.channel.send(msg.author.id + msg.author.username)
    if (msg.author.id == celeryID) {
        console.log("DISCORD:\tDev functions accessed")
        //  help
        if (msg.content === "_help")    {
            msg.reply("Help has been sent!");
            msg.author.send("*Following this is a link directly to the documentation of this bot*:\n" +
            "https://github.com/TravisEvans/rtu-bot \n")
            msg.author.send("More specific help is to be implemented, but for now make do with the README at the bottom, " +
            "or send a message to the developer (celery#9490)");
        }

        //  

        //  database

    }
});

client.login(BOT_TOKEN);
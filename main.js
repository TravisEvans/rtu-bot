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
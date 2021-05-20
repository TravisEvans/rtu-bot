////////////////
////////////////


//  testing
function state(msg)  {
    msg.channel.send("Working for the moment!");
}

//  help
function help(msg) {
    msg.author.send("*Following this is a link directly to the documentation of this bot*:\n" +
        "https://github.com/TravisEvans/rtu-bot \n");
    msg.author.send("More specific help is to be implemented, but for now make do with the README at the bottom, " +
        "or send a message to the developer (celery#9490)");
}

//  reminder
function reminder(msg) {
    let filter = m => m.author.id == msg.author.id;
    msg.channel.send("Which user would you like to harass?\nExample:\tserverNickname, chadGamer23");
    msg.channel.awaitMessages(filter,{
        max: 1,
        time: 20000,
        errors: ['time']
    })
    .then(recievedMessage => {
        let guildCollection = msg.client.guilds;

        
        
        console.log(guildCollection.keys());
        

        // let guildMembers = guildCollection.cache.map(guild => guild.members.fetch()); // guildMembers is guild.members for all guilds
        // guildMembers.cache.map(guildMembers => console.log(guildMembers.fetch()));
        // guildMembers.forEach(guildMember => console.log(guildMember));


    })
    .catch(err => {
        // msg.channel.send("Guess you got bored. Nevermind!");
        let finMessage = `__Finished__: ${msg.content} function`;
        msg.channel.send(finMessage);
        // console.log("_reminder finished");
    })
    
    // console.log("reminder finished(?)\n");
}




module.exports.state = state;
module.exports.help = help;
module.exports.reminder = reminder;
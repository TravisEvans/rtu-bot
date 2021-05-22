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

        // let guildMembers = guildCollection.cache.map(guild => guild.members.fetch()); // guildMembers is guild.members for all guilds
        
        let guildIDs =  guildCollection.cache.map(guild => guild.id);
        
        guildIDs.forEach(id => {
            // console.log(client.guilds.cache.get(id));
            let guild = guildCollection.cache.get(id);
            // console.log(guild.name + " found");
            
            console.log(recievedMessage);
            let target = guild.members.cache.find(guildMember => {
                guildMember.user.username == recievedMessage || hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                guildMember.user.id == recievedMessage || 
                guildMember.user.tag == recievedMessage
            });

            // let target = guild.members.cache.find(guildMember => guildMember.user.tag == "celery#9490");

            if (!target)    {
                console.log("Not found in guild");
                // msg.channel.send("Target not found");
            } else {
                console.log("Found target: " + target.name);
                msg.channel.send("found em");
            }

        });

        // guildMembers.forEach(guildMember => console.log(guildMember));
        // guildMembers.forEach(guildMember => console.log(guildMember));
        // guildMembers.forEach(guildMember => console.log(Object.getOwnPropertyNames(guildMember)));
        
        
        // console.log(Object.keys(guildCollection.cache);  // not sure what it does, but it does sonething
        


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
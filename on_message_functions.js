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
        // console.log("LOOKING FOR MESSAGE INFO");
        // console.log(recievedMessage);
        // console.log("LOOKING FOR GUILD INFO");
        let guilds = msg.client.guilds
        // console.log(guilds);
        console.log("LOOKING FOR MEMBER INFO");
        guilds.forEach(guild => console.log("4"));
        console.log("hit");
        // console.log(guilds.forEach(members.forEach(member => console.log(member.user.username))));
        // console.log(guilds.forEach(members.fetch()));
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
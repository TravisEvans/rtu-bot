const Discord = require('discord.js');


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

async function add_role(msg) {
    messageSplit = msg.content.split(" ");
    let role;
    try {
        role = msg.guild.roles.cache.find(role => role.id === messageSplit[1] || msg.content.includes(" "+role.name+" "));
    } catch (err) {
        msg.channel.send("That role could not be found");
        return;
    }
    try {
        if (msg.mentions.members.first() != null) {
            member = msg.mentions.members.first();
            await Promise.all([
                member.roles.remove(role)
            ]);
        } else  {
            msg.channel.send("An issue occurred while finding that user.");
            return;
        }
    } catch (err) {
        msg.channel.send("An issue occurred while adding the role, perhaps the role is higher than the bot?");
        return;
    }
    // Or add it to yourself
    // msg.author.roles.add(role);

    msg.channel.send("Done!");
}

async function remove_role(msg) {
    messageSplit = msg.content.split(" ");
    let role;
    try {
        role = msg.guild.roles.cache.find(role => role.id === messageSplit[1] || msg.content.includes(" " + role.name + " "));
    } catch (err) {
        msg.channel.send("That role could not be found");
        return;
    }
    try {
        if (msg.mentions.members.first() != null) {
            member = msg.mentions.members.first();
            await Promise.all([
                member.roles.remove(role)
            ]);
        } else {
            msg.channel.send("An issue occurred while finding that user.");
            return;
        }
    } catch (err) {
        msg.channel.send("An issue occurred while removing the role, perhaps the user has a higher role than the bot?");
        return;
    }
    // Or remove it from yourself
    // msg.author.roles.remove(role);

    msg.channel.send("Done!");
}

function guild_role_list(msg) {
    let rolemap = msg.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");
    if (rolemap.length > 1024) rolemap = "To many roles to display";
    if (!rolemap) rolemap = "No roles";
    const embed = new Discord.MessageEmbed()
        .addField("Role List", rolemap)
    msg.channel.send(embed);
    msg.guild.roles.cache.each(role => console.log(role.name+", "+role.id));
}

function permissions(msg)   {
    console.log(msg.guild.me.permissions.toArray());
}

async function purge(msg) {
    content = msg.content.split(" ");
    let messagecount = parseInt(content[1])+1;
    try {   
        await msg.channel.bulkDelete(messagecount, false);
    } catch (err) {
        msg.channel.send("Can not delete messages 14+ days old.");
        console.log(err);
    }
}

//  reminder
function reminder(msg) {
    let target, reminderMessage; //  easymode globals
    let filter = m => m.author.id === msg.author.id;

    msg.channel.send("Which user would you like to harass?\nExample:\tserverNickname, chadGamer23");
    msg.channel.awaitMessages(filter,{
        max: 1,
        time: 20000,
        errors: ['time']
    })
        .then(recievedMessage => {
            let guildCollection = msg.client.guilds;        
            let guildIDs =  guildCollection.cache.map(guild => guild.id);
            
            for (let guildID of guildIDs)   {
                let guild = guildCollection.cache.get(guildID);
                let recMesContent = recievedMessage.first().content;
                // console.log(recMesContent);  //  THIS PRINTS THE RECIEVED MESSAGE CONTENT, LEAVE IT
                
                // let potTarget = guild.members.cache.find(guildMember => guildMember.user.tag == "celery#9490");    //  this returns the GuildMember object
                
                //  just listing where checking
                console.log(`\nChecking guild:\t${guild.name}`);
                //  searching
                //  target should be either false or populated here
                target = guild.members.cache.find(guildMember => 
                    guildMember.user.username == recMesContent || 
                    guildMember.user.id == recMesContent || 
                    guildMember.user.tag == recMesContent);
                    
                if (target) {
                    console.log(`--\tFound ${target.user.tag}`);
                    break;
                }
            }
            console.log("\n");

            //  validating ig
            if (!target)    {
                console.log("\nNo target found");
                // msg.channel.send("target not found");
                msg.channel.send("No target found, exiting...");
                return;
            } else {
                msg.channel.send("Found user!\nWhat would you like to __*let them know*__");
            }

            //  get their message
            msg.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            .then(recievedMessage => {
                //  spamming time
                msg.channel.send("Sending some love now.\nSend `_stop` to stop the lovin'");
                reminderMessage = recievedMessage.first().content;
                console.log("hit0");
                spam(msg, target, reminderMessage);
                console.log("hit4");
            })
            .catch(console.error);
            
            
        })
        .catch(err => {
            msg.channel.send("Guess you got bored. Nevermind!");
            console.log("reminder finished\n");
            // let finMessage = `__Finished__: ${msg.content} function`;
            // msg.channel.send(finMessage);
        });

    //  spamming time
        
}

function spam(callingMsg, target, spamMsg)  {
    //  send
    target.user.send(spamMsg);
    
    if (i >= 8) {
        console.log(callingMsg.channel.lastMessage.content);
        if (callingMsg.channel.lastMessage.content === "_stop") {
            console.log("hit3");
            msg.channel.send("Reminder stopped\n");
            console.log("reminder finished\n");
            return;
        }
        i = 0;
    }
}

// functions used externally
module.exports.state = state;
module.exports.help = help;
module.exports.add_role = add_role;
module.exports.remove_role = remove_role;
module.exports.guild_role_list = guild_role_list;
module.exports.permissions = permissions;
module.exports.purge = purge;
module.exports.reminder = reminder;
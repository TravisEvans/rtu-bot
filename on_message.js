//////////////
//////////////

//  external files
var functions = require('./on_message_functions.js');

////////////////////////////////
var celeryID = 171178377976348674;


function checkMessage(msg) {    // msg.channel.send(msg.author.id + msg.author.username)
    if (msg.author.id == celeryID) {    //  celery is Travis Evans, me, the developer
        console.log(`DISCORD:\tDev functions accessed by ${msg.author.tag}`)
    
        //  testing
        if (msg.content === "_state") {
            console.log(`running ${msg.content} function`);
            functions.state(msg);
            console.log(`${msg.content} function finished\n`);
        }
        
        //  help
        if (msg.content === "_help") {
            console.log(`running ${msg.content} function`);
            functions.help(msg);
            console.log(`${msg.content} function finished\n`);
            msg.reply("Help has been sent!");
        }
    
        //  reminder
        if (msg.content === "_reminder") {
            console.log("running reminder");
            functions.reminder(msg)
        }
    
        //  database
        if (msg.content === "_make_table") {
            console.log("running make_table");
            // await functions.make_table(client, msg)
            console.log("make_table finished\n");
            let finMessage = `__Finished__: ${msg.content} function`;
            msg.channel.send(finMessage);
        }
    
        if (msg.content === "_view_table") {
            console.log("running view_table");
            // await functions.view_table(client, msg);
            console.log("view_table finished\n");
            let finMessage = `__Finished__: ${msg.content} function`;
            msg.channel.send(finMessage);
        }
    
        if (msg.content === "_add_to_table") {
            console.log("running add_to_table");
            // await functions.add_to_table(client, msg)
            console.log("add_to_table finished\n");
            let finMessage = `__Finished__: ${msg.content} function`;
            msg.channel.send(finMessage);
        }
    
        if (msg.content === "_clear_table") {
            console.log("running clear_table");
            // await functions.clear_table(client, msg)
            console.log("clear_table finished\n");
            let finMessage = `__Finished__: ${msg.content} function`;
            msg.channel.send(finMessage);
        }
    
        if (msg.content === "_delete_table") {
            console.log("running delete_table");
            // await functions.delete_table(client, msg)
            console.log("delete_table finished\n");
            let finMessage = `__Finished__: ${msg.content} function`;
            msg.channel.send(finMessage);
        }
    
    }
}

module.exports.checkMessage = checkMessage;
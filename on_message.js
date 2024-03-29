//  external files
var functions = require('./on_message_functions.js');

////////////////////////////////
var celeryID = 171178377976348674;


async function checkMessage(msg) {    // msg.channel.send(msg.author.id + msg.author.username)
    if (msg.author.id == celeryID) {    //  celery is Travis Evans, me, the developer
        // console.log(`DISCORD:\tDev functions accessed by ${msg.author.tag}`)
    
        //  testing
        if (msg.content === "_state") {
            console.log(`running ${msg.content} function`);
            functions.state(msg);
            console.log(`${msg.content} function finished\n`);
        }
        
        
        //  reminder
        if (msg.content === "_reminder") {
            console.log("running reminder");
            functions.reminder(msg)
        }
        
        // give role
        if (msg.content.startsWith("_addrole")) {
            console.log("running giverole");
            functions.add_role(msg);
        }
        
        
        // remove role
        if (msg.content.startsWith("_removerole")) {
            console.log("running removerole");
            functions.remove_role(msg);
        }
        
        // get roles list
        if (msg.content.startsWith("_rolelist")) {
            console.log("running rolelist");
            functions.guild_role_list(msg);
        }

        // get permissions for me
        if (msg.content === "_perms") {
            console.log("running perms");
            functions.permissions(msg);
        }
        
        // purge
        if (msg.content.startsWith("_purge")) {
            console.log("running purge");
            functions.purge(msg);
        }


        // //  database
        // if (msg.content === "_make_table") {
            //     console.log("running make_table");
            //     // await functions.make_table(client, msg)
            //     console.log("make_table finished\n");
            //     let finMessage = `__Finished__: ${msg.content} function`;
            //     msg.channel.send(finMessage);
            // }
            
            // if (msg.content === "_view_table") {
                //     console.log("running view_table");
                //     // await functions.view_table(client, msg);
                //     console.log("view_table finished\n");
                //     let finMessage = `__Finished__: ${msg.content} function`;
                //     msg.channel.send(finMessage);
                // }
                
                // if (msg.content === "_add_to_table") {
                    //     console.log("running add_to_table");
                    //     // await functions.add_to_table(client, msg)
                    //     console.log("add_to_table finished\n");
                    //     let finMessage = `__Finished__: ${msg.content} function`;
                    //     msg.channel.send(finMessage);
                    // }
                    
                    // if (msg.content === "_clear_table") {
                        //     console.log("running clear_table");
                        //     // await functions.clear_table(client, msg)
                        //     console.log("clear_table finished\n");
                        //     let finMessage = `__Finished__: ${msg.content} function`;
                        //     msg.channel.send(finMessage);
                        // }
                        
                        // if (msg.content === "_delete_table") {
                            //     console.log("running delete_table");
        //     // await functions.delete_table(client, msg)
        //     console.log("delete_table finished\n");
        //     let finMessage = `__Finished__: ${msg.content} function`;
        //     msg.channel.send(finMessage);
        // }
        
    }
    
    //  help
    if (msg.content === "_help") {
        console.log(`running ${msg.content} function`);
        functions.help(msg);
        console.log(`${msg.content} function finished\n`);
        msg.reply("Help has been sent!");
    }
        
}

// functions used externally
module.exports.checkMessage = checkMessage;
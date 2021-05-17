import sys  #   to stop
# for the functions
import functions

async def receive_message(client, message):
    """
    Handles all our logic when we receive a message.

    :param client: Our discord client (discord.client)
    :param message: discord.message class
    """

    if message.author == client.user:  # check if it is me( bot ) messaging
        return

    if str(message.author) == "celery#9490" or str(message.author) == "Soviet Attack Puss#0033":
        if message.content == "_state":
            await message.channel.send("functional")

        #   reminder function   #   TEMPORARY, NEED TO STICK THIS INTO AN AUTOMATED THING
        if message.content == "_reminder":
            print("running reminder")
            await functions.reminder(client, message)
            print("reminder finished\n")
            finMessage = "__Finished__: " + message.content + " function"
            await message.channel.send(finMessage)

        if message.content == "_make_table":
            print("running make_table")
            await functions.make_table(client, message)
            print("make_table finished\n")
            finMessage = "__Finished__: " + message.content + " function"
            await message.channel.send(finMessage)

        if message.content == "_view_table":
            print("running view_table")
            await functions.view_table(client, message)
            print("view_table finished\n")
            finMessage = "__Finished__: " + message.content + " function"
            await message.channel.send(finMessage)

        if message.content == "_add_to_table":
            print("running add_to_table")
            await functions.add_to_table(client, message)
            print("add_to_table finished\n")
            finMessage = "__Finished__: " + message.content + " function"
            await message.channel.send(finMessage)

        if message.content == "_clear_table":
            print("running clear_table")
            await functions.clear_table(client, message)
            print("clear_table finished\n")
            finMessage = "__Finished__: " + message.content + " function"
            await message.channel.send(finMessage)

        if message.content == "_delete_table":
            print("running delete_table")
            await functions.delete_table(client, message)
            print("delete_table finished\n")
            finMessage = "__Finished__: " + message.content + " function"
            await message.channel.send(finMessage)
        
        if message.content == "_help":
            print("running help")
            await functions.help(client, message)
            print("help finished\n")
            finMessage = "__Help has been sent!__"
            await message.channel.send(finMessage)


        if message.content == "_stop":
            await client.get_channel(message.channel.id).send(
                """__***BOT SHUTTING DOWN***__""")
            sys.exit()

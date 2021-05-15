import discord
from discord.ext import commands

import os
import psycopg2

async def make_table(): #   works
    DATABASE_URL = os.environ['DATABASE_URL']
    # Connect to an existing database
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')

    # Open a cursor to perform database operations
    cur = conn.cursor()

    # Execute a command: this creates a new table
    cur.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")

    # Pass data to fill a query placeholders and let Psycopg perform
    # the correct conversion (no more SQL injections!)
    cur.execute("INSERT INTO test (num, data) VALUES (%s, %s)",(100, "abc'def"))
        
    # Query the database and obtain data as Python objects
    cur.execute("SELECT * FROM test;")
    cur.fetchone()
    (1, 100, "abc'def")

    # Make the changes to the database persistent
    conn.commit()

    # Close communication with the database
    cur.close()
    conn.close()


async def view_table(): #?might work?
    DATABASE_URL = os.environ['DATABASE_URL']
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    # Open a cursor to perform database operations
    cur = conn.cursor()
    print(cur.execute("SELECT * FROM test"))
    print(cur.execute("SELECT num FROM test"))


async def add_to_table():
    DATABASE_URL = os.environ['DATABASE_URL']
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    cur = conn.cursor()
    cur.execute("INSERT INTO test(num, data) VALUES (%s, %s)", (6969, "benis"));


async def reminder(client, message_called_from):
    #   for logging purposes at some point
    # get server the function is requested from
    guild_called_from = message_called_from.channel.guild
    print("guild called from:\t", guild_called_from.name, "\nguild ID:\t",
          guild_called_from.id)  # internal reminder of guild / server sent from

    #   prompt for target
    await message_called_from.channel.send("Which user would you like to harass?\nExample:\tserverNickname, chadGamer23")
    try:  # find target to harass
        # wait for message to be sent containing user ID
        target_request = await client.wait_for('message', check=lambda message: message.author == message_called_from.author, timeout=20.0)

        #   method of checking for target using either display name or member ID
        target_id = 0
        guildUserList = message_called_from.channel.guild.fetch_members()
        pot_target_id = target_request.content

        async for user in guildUserList:  # compare everyone within the guild the message was recieved from
            if pot_target_id == user.display_name or pot_target_id == user.id:
                target_id = user.id  # this is the correct target id
            else:  # in case no user found
                print("checking user: ", user.display_name)
                # raise Exception()
        # THIS IS THE ACTUAL TARGET (?)
        target = await message_called_from.channel.guild.fetch_member(int(target_id))
        print("\n--found target--\ntarget name: ", target.display_name, "\n")
    #TODO: for some reason the member.id isnt being checked, and is throwing an exception
    #       the display name works though, so thats a big pog

    except:  # no user to harass, or other error
        await message_called_from.channel.send("No user found. Exiting function...")
        print("no user found.\n\n--exiting reminder function...--\n\n")
        return

    #get a message to send to the target
    await message_called_from.channel.send("What would you like to remind them of?")
    try: 
        # wait for message to be sent containing message
        message_request = await client.wait_for('message', check=lambda message: message.author == message_called_from.author, timeout=20.0)

        print("\n--found message--")

    except:  # no user to harass, or other error
        await message_called_from.channel.send("No user found. Exiting function...")
        print("no user found.\n\n--exiting reminder function...--\n\n")
        return

    #   display that it is running
    await message_called_from.channel.send(f"Reminding {target.display_name} \n'stop reminder' to stop")

    #run the intinite loop of messages until broken by user
    while True:
        #   check for break request:
        fetch_message = await message_called_from.channel.history(limit=5).find(
            lambda stopper: stopper.content == "stop reminder" and
            stopper.author == message_called_from.author)  # check if user wants the reminder to stop
        if fetch_message is None:  # if they don't want the function to stop
            pass  # do nothing
        else:  # stop the function
            print("recieved from call:\t", fetch_message.content)
            await message_called_from.channel.send("Stopping reminder...")
            return

        #   spam target with messages:
        print("function working")  # internal reminder
        # time.sleep(1)  # "repeater"
        try:  # message person and send message saying so
            await target.send(message_request.content)
        except:  # If the user doesn't accept messages perhaps?
            await message_called_from.channel.send("Reminder failed, user may not allow messages")
            break

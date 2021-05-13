import discord
from discord.ext import commands
from on_message import receive_message
import functions
import os
from dotenv import load_dotenv
### Load environment variables ###
load_dotenv()
# Grab our client secret
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

####
####        IF YOU NEED HELP, LOOK UP THE discord.py DOCUMENTATION
####        https://discordpy.readthedocs.io/en/latest/index.html
####

description = "JACKBOT"
intents = discord.Intents.default()
intents.presences = True
intents.members = True
bot = commands.Bot(command_prefix="_", description=description, intents=intents)
client = discord.Client(intents=intents) 
# the above line is similar to client = discord.Client(intents=intents)

rtu_bot_channel = 842192748324585472;

@client.event
async def on_ready():  # when the bot is ready to do things (on discord)
    await client.wait_until_ready()
    bot_channel = client.get_channel(rtu_bot_channel)
    print('logged in as {0.user}'.format(client))
    await bot_channel.send("""
*__RTU BOT RUNNING__*\n
Now being hosted from a web server, therefore permanent.
""")

@client.event
async def on_message(message):
    # logic upon receiving a message is to be customised in on_message.py
    await receive_message(client, message)

@client.event
async def on_raw_reaction_add(payload: discord.RawReactionActionEvent):
    #   called when reaction added to message is received                       THIS IS WHY SOME FUNCTIONS ARE CALLED AT TIMES
    #   logic for what to do given x reaction, customized in role_functions.py
    await role_functions.give_reaction_role(client, payload);

@client.event
async def on_raw_reaction_remove(payload: discord.RawReactionActionEvent):
    #   called when reaction removed from message is received
    #   logic for what to do given x reaction removed, customized in role_functions.py
    await role_functions.remove_reaction_role(client, payload)


client.run(CLIENT_SECRET) #   correct, but cant get working rn. dont github push


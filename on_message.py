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

    if str(message.author) == "celery#9490":
        if message.content == "state":
            await message.channel.send("functional")

        if message.content == "stop":
            await client.get_channel(message.channel.id).send(
                """__***BOT SHUTTING DOWN***__""")
            sys.exit()

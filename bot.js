const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
require('dotenv').config();

const token = process.env.CLIENT_TOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content == "!start") {
        message.reply('Pomodoro iniciado!');
    }
});

client.login(token);
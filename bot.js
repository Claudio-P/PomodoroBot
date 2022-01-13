const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
require('dotenv').config();

const token = process.env.CLIENT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
    console.log('Bot online!');
});

client.login(token);
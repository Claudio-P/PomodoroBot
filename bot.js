const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const config = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
    console.log('Bot online!');
});

client.login(config.token);
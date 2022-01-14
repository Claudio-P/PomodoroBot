const { Client, Intents } = require('discord.js');
const { timeout } = require('nodemon/lib/config');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
require('dotenv').config();

const token = process.env.CLIENT_TOKEN;

setTimeout(() => {

}, 15);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', async message => {
    if (message.content.startsWith('!start')) {
        message.reply('Pomodoro iniciado!');

        const content = message.content;
        const convertedContent = content.split(' ');
        const quantity = convertedContent[1];
        const time = convertedContent[2];
        const rest = convertedContent[3];

        for (let i = 0; i < quantity; i++) {
            setTimeout(async () => await message.channel.send('Descanço Iniciado!'), parseInt(time) * 60000);
            setTimeout(async () => await message.channel.send('Pomodoro Iniciado!'), parseInt(rest) * 60000);
        }
    }
});

client.login(token);
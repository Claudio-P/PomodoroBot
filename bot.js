const { Client, Intents } = require('discord.js');
const { timeout } = require('nodemon/lib/config');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
require('dotenv').config();

const token = process.env.CLIENT_TOKEN;



function firstCommand(message) {
    const command = message.content.split(" ")
    return command[0]
}

function timeOut(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms * 60000)
    })
}

function muteAllChannel(message, isMute) {
    const { voice } = message.member

    voice.channel.members.map(user => {
        user.voice.setMute(isMute, "")
    })
}

async function time(message, ms, botMessage) {
    await timeOut(ms).then(() => {
        message.channel.send(`🍅 ${botMessage}`)
    })
}

async function startPomodoro(message) {
    message.reply('🍅 _**Olá, Seja bem-vindo. Me chamo **Focus** sou um **PomoBot** 🤖**_');

    const convert = message.content
    const convertedContent = convert.split(' ');
    const pomodoroQuantity = convertedContent[1];
    const pomodoroTime = convertedContent[2];
    const pomodoroRest = convertedContent[3];

    message.reply(`⏲️ **Start Pomodoro!** \n🔄 **Você iniciou um Ciclo de ${pomodoroQuantity} Pomodoro** \n🕐 **Com uma duração de ${pomodoroTime}:00 min (_Cada Ciclo_)** \n🕐 **Seus intervalos de descanso são de ${pomodoroRest}:00 min**`);

    for (let i = 0; i < pomodoroQuantity; i++) {
        muteAllChannel(message, true)
        await time(message, parseInt(pomodoroTime), `**Descanso merecido! Você terá 🕐 ${pomodoroRest}min para descansar** 🥱`)
        muteAllChannel(message, false)
        await time(message, parseInt(pomodoroRest), `**Vamos voltar. Temos mais um POMODORO de 🕐 ${pomodoroTime}min ** 🏁`)
    }
    console.log("Ended")
}


client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', async message => {
    const command = firstCommand(message)

    const { voice } = message.member

    if (!voice.channelId) {
        // FIX: SE O USUÁRIO NÃO ESTIVER EM UM CANAL DE VOZ, ELE NÃO IRÁ CONSEGUIR ACIONAR O BOT
        message.channel.send('Você deve estar em canal de Voz')
    } else {
        switch (command) {
            case '!start':
                startPomodoro(message)
                break;
        }
    }
    
});

client.login(token);
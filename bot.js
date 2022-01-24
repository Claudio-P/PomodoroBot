const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});
const MINUTE = 60000;

require("dotenv").config();

const token = process.env.CLIENT_TOKEN;

function firstCommand(message) {
  const command = message.content.split(" ");
  return command[0];
}

function timeOut(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms * MINUTE);
  });
}

function muteAllChannel(message, isMute) {
  const { voice } = message.member;

  voice.channel.members.map((user) => {
    user.voice.setMute(isMute, "");
  });
}

async function time(message, ms) {
  await timeOut(ms);
}

async function startPomodoro(message) {
  message.reply(
    "🍅 _**Olá, Seja bem-vindo. Me chamo **Focus** sou um **PomoBot** 🤖**_"
  );

  const convert = message.content;
  const convertedContent = convert.split(" ");
  const pomodoroQuantity = convertedContent[1];
  const pomodoroTime = convertedContent[2];
  const pomodoroRest = convertedContent[3];

  message.reply(
    `⏲️ **Start Pomodoro!** \n🔄 **Você iniciou um Ciclo de ${pomodoroQuantity} Pomodoro** \n🕐 **Com uma duração de ${pomodoroTime}:00 min (_Cada Ciclo_)** \n🕐 **Seus intervalos de descanso são de ${pomodoroRest}:00 min**`
  );

  let i = 0;

  do {
    i++;
    muteAllChannel(message, true);
    message.reply(
      `🍅 **Pomodoro Iniciado. 🕐 ${pomodoroTime}min para finalizar o Ciclo** 🏁`
    );
    await time(message, parseInt(pomodoroTime));
    muteAllChannel(message, false);

    if (i == pomodoroQuantity) break;

    message.reply(
      `🍅 **Descanso merecido! Você terá 🕐 ${pomodoroRest}min para descansar** 🥱`
    );
    await time(message, parseInt(pomodoroRest));
  } while (i < pomodoroQuantity);

  message.reply("🎉 **Parabéns!!!** ✨ Você concluiu seu 🍅 **POMODORO** 🔥");
  console.log("Ended");
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", async (message) => {
  const command = firstCommand(message);

  function channelMessage(text) {
    message.channel.send(text);
  }

  const { voice } = message.member;

  // if (!voice.channelId) {
  //     // FIX: SE O USUÁRIO NÃO ESTIVER EM UM CANAL DE VOZ, ELE NÃO IRÁ CONSEGUIR ACIONAR O BOT
  //     message.reply('🚫 Você deve estar em canal de Voz 🗣️')
  // } else {

  // }
  switch (command) {
    case "!start":
      startPomodoro(message);
      break;
    case "!help":
      channelMessage("ℹ️ Nossos commandos 👇");
      channelMessage(
        "**!start _<cliclos> <minutos dos ciclos> <minuto do descanso>_ Ex: !start _2 1 1_** \n**!contribuidores** - _Informações dos contribuidores e do projeto_"
      );
      break;
    case "!contribuidores":
      channelMessage(
        "**💾 Link do Repositório Github** https://github.com/Claudio-P/PomodoroBot \n **👨‍🦱 Claudio Pereira.** https://github.com/Claudio-P \n ** **👨‍🦱 Cleby Francisco.** https://github.com/ClebyFrancisco \n ** 👨‍🦰 Gabriel Silva.** https://github.com/gabriel-anjos \n **👨‍🦱 Lucas Vieira.** https://github.com/lucasarieiv \n **👨‍🦱 Samuel Filipe.** https://github.com/Samuel2049 \n **✨ Sinta-se à vontade para contribuir com o Projeto 👍**"
      );
      break;
  }
});

client.login(token);

const Discord = require("discord.js");
const config = require("./config/config.json");
const client = new Discord.Client(config.djs);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", async () => {
    console.clear();
    console.log(`[${client.user.username}] > Successfully connected to Discord gateway"`);
});

client.on("message", async msg => {
    if (!msg.channel.guild) return;
    if (msg.author.bot) return;
    if (!msg.content.startsWith(config.prefix)) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/[^\S\n]+/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd);

    if (cmd.length === 0) return;
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.onRun(client, msg, args);
    else return;
});

client.login(config.token);
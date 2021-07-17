const Discord = require("discord.js");
const colors = require("../../Config/colors");
const utils = require("../../Config/utils");

class mock {
  constructor() {
    this.name = "mock";
    this.aliases = ["spongebob"];
    this.description = "Spongebob-Text-ify some words!";
    this.usage = ["mock <msg>"];
    this.category = "Fun";
  }

  async onRun(client, msg, args) {
    
    if (!msg.member.permissions.has("MANAGE_MESSAGES")) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("You do not have permission to use this command.");
        
        return msg.channel.send(onDenied);
    }

    function spongebobText(str) {
        let newStr = '';
        str.split('').forEach((el, idx) => {
            newStr += idx % 2 === 0 ? el.toLowerCase() : el.toUpperCase()
        });
        return newStr;
    }

    const message = args.join(" ");

    msg.delete();
    msg.channel.send(spongebobText(message));
  }
}

module.exports = mock;
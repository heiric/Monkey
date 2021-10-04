const Discord = require("discord.js");
const colors = require("../../Config/colors");
const utils = require("../../Config/utils");

class nickname {
  constructor() {
    this.name = "nickname";
    this.aliases = ["nick"];
    this.description = "Set/reset your nickname";
    this.usage = ["nickname", "nickname [any]"];
    this.category = "Category";
  }

  async onRun(client, msg, args) {
    
    if (!msg.member.permissions.has("CHANGE_NICKNAME")) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("You do not have permission to use this command");

        return msg.channel.send(onDenied)
    }

    if (!msg.guild.me.permissions.has("MANAGE_NICKNAMES")) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I am missing permissions to Manage Nicknames");

        return msg.channel.send(onDenied);
    }

    if (msg.member.id === msg.guild.ownerID || msg.member.roles.highest.comparePositionTo(msg.guild.me.roles.highest) >= 0) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I cannot change your nickname");

        return msg.channel.send(onDenied);
    }

    if (!args[0]) {
        let onSuccess = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("Your nickname has been successfully reset");

        msg.member.setNickname("");
        let message = await msg.channel.send(onSuccess);
        message.delete({timeout: 10000});
        msg.delete({timeout:5000});
        return;
    }

    let onNick = args.join(" ");
    let onSuccess = new Discord.MessageEmbed()
    .setColor(colors.blank)
    .setDescription("Your nickname has been successfully changed");

    msg.member.setNickname(onNick);
    let message = await msg.channel.send(onSuccess);
    message.delete({timeout: 10000});
    msg.delete({timeout:5000});
  }
}

module.exports = nickname;
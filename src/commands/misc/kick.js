const Discord = require("discord.js");
const colors = require("../../Config/colors");
const utils = require("../../Config/utils");

class kick {
  constructor() {
    this.name = "kick";
    this.aliases = [];
    this.description = "Kick a member";
    this.usage = ["kick <member> [reason]"];
    this.category = "Miscellaneous";
  }

  async onRun(client, msg, args) {
    
    if (!msg.member.permissions.has("KICK_MEMBERS")) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("You do not have permission to use this command");
        return msg.channel.send(onDenied);
    }

    if (!args[0]) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("Provide a member to kick");
        return msg.channel.send(onDenied);
    }

    if (!msg.guild.me.permissions.has("KICK_MEMBERS")) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I do not have permission to kick members");
        return msg.channel.send(onDenied);
    }

    let onMember = utils.resolveMember(msg.guild, args.join(" "));
    let onReason = args[1] ? args.slice(1).join(" ") : "None";
    if (!onMember) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I could not find that member");
        return msg.channel.send(onDenied);
    }

    if (!onMember.kickable) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("This member cannot be kicked");
        return msg.channel.send(onDenied);
    }

    if (onMember.roles.highest.comparePositionTo(msg.guild.me.roles.highest) <= 0 || onMember.id === msg.guild.ownerID) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I cannot kick this member");

        return msg.channel.send(onDenied);
    }

    let onKicked = new Discord.MessageEmbed()
    .setColor(colors.blank)
    .setDescription(`${onMember.user.tag} has been successfully kicked`);

    onMember.kick(onReason);
    return msg.channel.send(onKicked);
  }
}

module.exports = kick;
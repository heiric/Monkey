const Discord = require("discord.js");
const colors = require("../../Config/colors");
const utils = require("../../Config/utils");

class ban {
  constructor() {
    this.name = "ban";
    this.aliases = [];
    this.description = "Ban a member";
    this.usage = ["ban <member>", "ban <member> [reason]"];
    this.category = "Miscellaneous";
  }

  async onRun(client, msg, args) {
    
    if (!msg.member.permissions.has("BAN_MEMBERS")) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("You do not have permission to use this command");
        return msg.channel.send(onDenied);
    }

    if (!args[0]) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("Provide a member to ban");
        return msg.channel.send(onDenied);
    }

    if (!msg.guild.me.permissions.has("BAN_MEMBERS")) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I am missing permissions to Ban Members");
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

    if (!onMember.bannable) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("This member cannot be banned");
        return msg.channel.send(onDenied);
    }

    if (onMember.roles.highest.comparePositionTo(msg.guild.me.roles.highest) <= 0 || onMember.id === msg.guild.ownerID) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I cannot ban this member");

        return msg.channel.send(onDenied);
    }

    let onBanned = new Discord.MessageEmbed()
    .setColor(colors.blank)
    .setDescription(`${onMember.user.tag} has been successfully banned`);

    onMember.ban(onReason);
    return msg.channel.send(onBanned);
  }
}

module.exports = ban;
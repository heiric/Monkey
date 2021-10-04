const Discord = require("discord.js");
const colors = require("../../Config/colors");
const utils = require("../../Config/utils");
const { inspect } = require("util");
const { cleanPerms } = require("../../Config/utils");

class roleinfo {
  constructor() {
    this.name = "roleinfo";
    this.aliases = ["ri"];
    this.description = "Detailed Role Information";
    this.usage = ["roleinfo <role|roleID>"];
    this.category = "Miscellaneous";
  }

  async onRun(client, msg, args) {

    if (!msg.member.permissions.has("MANAGE_ROLES")) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("You do not have permission to use this command");
        return msg.channel.send(onDenied);
    }
    if (!args[0]) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("Provide a role to get information");
        return msg.channel.send(onDenied);
    }

    let onRole = utils.resolveRole(msg.guild, args.join(" "));
    if (!onRole) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I could not find that role");
        return msg.channel.send(onDenied);
    }
    if (onRole.name === "@everyone" || onRole.managed) {
        let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setDescription("I could not find that role");
        return msg.channel.send(onDenied);
    }

    let onPositions = msg.guild.roles.cache
    .filter(r => r.name !== "@everyone" && !r.managed)
    .sort(function(a, b) {
      if (a.position > b.position) return -1;
      if (a.position < b.position) return 1;
      return 0;
    }).map(r => r.id);

    let onCreated = utils.formatDate(onRole.createdAt);
    let onID = onRole.id;

    let onMembers = onRole.members.size;
    let onHexColor = onRole.hexColor !== "#000000" ? onRole.hexColor.toUpperCase() : "None";
    let onDecimalColor = onRole.color !== 0 ? onRole.color : "None";

    let onMentionable = onRole.mentionable ? "Yes" : "No";
    let onHoisted = onRole.hoist ? "Yes" : "No";
    let onPosition = onPositions.indexOf(onRole.id) + 1;

    let perms = new Discord.Permissions(onRole.permissions);
    let onPerms = utils.cleanPerms(perms);

    let onEmbed = new Discord.MessageEmbed()
    .setColor(colors.blank)
    .addField("Role", onRole, true)
    .addField("Created At", onCreated, true)
    .addField("ID", onID, true)

    .addField("Members", onMembers, true)
    .addField("Hex Color", onHexColor, true)
    .addField("Decimal Color", onDecimalColor, true)

    .addField("Mentionable", onMentionable, true)
    .addField("Hoisted", onHoisted, true)
    .addField("Position", onPosition, true)

    .addField("Permissions", onPerms);

    return msg.channel.send(onEmbed);
  }
}

module.exports = roleinfo;
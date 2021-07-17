const Discord = require("discord.js");
const colors = require("../../config/colors.json");
const emojis = require("../../config/emojis.json");
const utils = require("../../config/utils");

class usr {
  constructor() {
    this.name = "usr";
    this.aliases = ["w", "user", "userinfo", "usrinfo", "whois"];
    this.description = "Detailed User Information";
    this.usage = ["usr", "usr [user]"];
    this.category = "Miscellaneous";
  }

  async onRun(client, msg, args) {
    
    let member;
    if (!args[0]) member = msg.member;
    else {
      member = utils.resolveMember(msg.guild, args.join(" "));
      if (!member) member = msg.member;
    }

      const statuses = {
        online: `Online`,
        idle: `Idle`,
        dnd: `Do Not Disturb`,
        offline: `Offline`,
      };
      const platforms = {
        web: "Web Client",
        mobile: "Mobile Client",
        desktop: "Desktop Client"
      }

      let onMention = member;
      let onNickname = member.nickname ? member.nickname : "None";
      let onUsername = member.user.tag;

      let onCreated = utils.formatDate(member.user.createdAt);
      let onJoined = utils.formatDate(member.joinedAt);
      let onPremium = member.premiumSince ? utils.formatDate(member.premiumSince) : "Not Boosting";

      let onHighest = member.roles.highest;
      let onStatus = statuses[member.user.presence.status];
      let onPlatform = member.user.presence.status == "offline" ? "Offline" : platforms[Object.keys(member.user.presence.clientStatus)];

      let onUser = new Discord.MessageEmbed()
      .setColor(colors.blank)
      .setThumbnail(member.user.displayAvatarURL({size: 256, format: "png", dynamic: true}))

      .addField("Mention", onMention, true)
      .addField("Nickname", onNickname, true)
      .addField("Username", onUsername, true)

      .addField("Created On", onCreated, true)
      .addField("Joined On", onJoined, true)
      .addField("Boosting Since", onPremium, true)

      .addField("Highest Role", onHighest, true)
      .addField("Status", onStatus, true)
      .addField("Platform", onPlatform, true);

      msg.channel.send(onUser);
  }
}

module.exports = usr;
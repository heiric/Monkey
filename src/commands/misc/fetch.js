const Discord = require("discord.js");
const colors = require("../../Config/colors");
const utils = require("../../Config/utils");

class fetch {
  constructor() {
    this.name = "fetch";
    this.aliases = ["f"];
    this.description = "Fetch a user";
    this.usage = [`fetch <userID>`];
    this.category = "Miscellaneous";
  }

  async onRun(client, msg, args) {
    if (!args[0]) {
      let onDenied = new Discord.MessageEmbed()
        .setColor(colors.error)
        .addField("Invalid Usage", "Supply a user's ID to fetch");
      return msg.channel.send(onDenied);
    }
    try {
      let user = await client.users.fetch(args[0]);
      if (!user) {
        let onDenied = new Discord.MessageEmbed()
          .setColor(colors.error)
          .addField("Invalid Argument", "I couldn't find that user");
        return msg.channel.send(onDenied);
      }
      let onInfo = new Discord.MessageEmbed()
        .setAuthor(
          user.tag,
          user.displayAvatarURL({ size: 512, format: "png", dynamic: true })
        )
        .setThumbnail(
          user.displayAvatarURL({ size: 512, format: "png", dynamic: true })
        )
        .addField("Username", user.tag, true)
        .addField("Created At", utils.formatDate(user.createdAt), true)
        .addField("ID", user.id, true);

      return msg.channel.send(onInfo);
    } catch (e) {
      console.log(e);
      let onDenied = new Discord.MessageEmbed()
        .setColor(colors.error)
        .addField(
          "Error Occurred",
          `\`\`\`\n${e.name} :\n\n${e.message}\n\`\`\``
        );
      return msg.channel.send(onDenied);
    }
  }
}

module.exports = fetch;
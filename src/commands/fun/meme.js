const Discord = require("discord.js");
const colors = require("../../Config/colors");
const utils = require("../../Config/utils");
const randomPuppy = require("random-puppy");

class meme {
  constructor() {
    this.name = "meme";
    this.aliases = [];
    this.description = "Generate a meme!";
    this.usage = ["meme"];
    this.category = "Fun";
  }

  async onRun(client, msg, args) {
    let subReddits = ["dankmemes", "me_irl", "memes"];
    let random = subReddits[Math.floor(Math.random() * subReddits.length)];

    try {
      let meme = await randomPuppy(random);
      let onMeme = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .setImage(meme)
        .setTitle(`r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);

      return msg.channel.send(onMeme);
    } catch (e) {
      console.log(e);
      let onDenied = new Discord.MessageEmbed()
        .setColor(colors.blank)
        .addField(
          "Error Occurred",
          "An unknown error occurred whilst generating this meme. Please try again later"
        );
      return msg.channel.send(onDenied);
    }
  }
}

module.exports = meme;
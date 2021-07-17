const Discord = require("discord.js");
const colors = require("../../Config/colors");
const utils = require("../../Config/utils");

class command {
  constructor() {
    this.name = "command";
    this.aliases = ["alias", "a"];
    this.description = "Description";
    this.usage = ["command <usage>"];
    this.category = "Category";
  }

  async onRun(client, msg, args) {
    
    
  }
}

module.exports = command;
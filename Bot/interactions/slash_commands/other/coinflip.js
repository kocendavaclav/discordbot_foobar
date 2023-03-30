const config = require("../../../data/config.json");
const db = require("../../../data/db");
const randomFunctions = require("../../../data/randomFunctions");

module.exports = {
  name: "coinflip",
  description: "coinflip",
  execute(client, Discord, interaction) {
    const result = Math.floor(Math.random() * 2);
    let resString;

    result === 0 ? (resString = "Heads") : (resString = "Tails");

    const embed = new Discord.EmbedBuilder()
      .setTitle(`**${resString}!**`)
      .setColor(randomFunctions.getMeAColor(client, interaction.guildId));
    interaction.reply({ embeds: [embed] });
  },
};

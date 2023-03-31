const db = require("../../../data/db");
const functions = require("../../../data/randomFunctions");
module.exports = {
  name: "auth",
  description: "auth",
  defaultPermissions: 1,
  options: [],
  execute(client, Discord, interaction) {
    if (client.logins.find((a) => a === interaction.guildId)) {
      console.log(client.logins.findKey((i) => i === interaction.guildId));
      const code1 = client.logins.findKey((i) => i === interaction.guildId);
      const embed1 = new Discord.EmbedBuilder()
        .setTitle("Your login code")
        .setURL("https://mpsdb.xyz")
        .setDescription("Your already have a valid code!")
        .setColor(functions.getMeAColor(client, interaction.guildId))
        .addFields({
          name: "Your code:",
          value: `**${code1}**`,
        })
        .setTimestamp(Date.now());
      return interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      let code;
      do {
        code = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0");
      } while (client.logins.has(code));
      client.logins.set(code, interaction.guildId);
      const embed = new Discord.EmbedBuilder()
        .setTitle("Your login code")
        .setURL("https://mpsdb.xyz")
        .setDescription("Use this code at [mpsdb.xyz](http://mpsdb.xyz).")
        .setColor(functions.getMeAColor(client, interaction.guildId))
        .addFields({
          name: "Your code:",
          value: `**${code}**`,
        })
        .setTimestamp(Date.now());
      setTimeout(() => {
        client.logins.delete(code);
      }, 5 * 60 * 1000);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};

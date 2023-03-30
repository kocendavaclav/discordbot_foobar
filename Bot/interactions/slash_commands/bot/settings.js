const db = require("../../../data/db");
const functions = require("../../../data/randomFunctions");
const BCP47 = require("../../../data/BCP47.json");
module.exports = {
  name: "settings",
  description: "Customize the bot for this guild!",
  options: [
    {
      name: "color",
      description:
        "Change the color the bot will use (in embeds), fot this guild",
      type: 1,
      options: [
        {
          name: "color",
          description: "The hex color",
          required: true,
          type: 3,
        },
      ],
    },
    {
      name: "time",
      description:
        "Use `/settings time list` to get the comple list of available locales to use.",
      type: 1,
      options: [
        {
          name: "offset",
          description: "time offset",
          required: true,
          type: 3,
        },
      ],
    },
  ],
  execute(client, Discord, interaction) {
    switch (interaction.options.getSubcommand()) {
      case "color":
        const reg = /^#[0-9A-F]{6}$/i;
        if (!reg.test(interaction.options.getString("color")))
          return interaction.reply({
            content:
              "That is not a hexadecimal color! (Hexadecimal colors start with # followed by 6 numbers 0-9 or letters A-F. Example: `#FC039D` - Hot Pink",
            ephemeral: true,
          });
        db.insert("color", [
          interaction.guildId,
          interaction.options.getString("color"),
        ]);
        client.colors.set(
          interaction.guildId,
          interaction.options.getString("color")
        );
        const embed = new Discord.EmbedBuilder()
          .setTitle(
            "Color changed to: " + interaction.options.getString("color")
          )
          .setColor(functions.getMeAColor(client, interaction.guildId));
        interaction.reply({ embeds: [embed2], ephemeral: true });
        break;
      default:
        interaction.reply({
          content: "What settings? (select a subcommand)",
          ephemeral: true,
        });
        break;
    }
  },
};

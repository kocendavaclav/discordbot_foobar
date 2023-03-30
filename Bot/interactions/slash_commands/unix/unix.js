const { GuildDefaultMessageNotifications } = require("discord.js");

module.exports = {
  name: "unix",
  description: "unix time to human time or the other way",
  options: [
    {
      name: "human",
      description: "unix -> human",
      type: 1,
      options: [
        {
          name: "value",
          description:
            "unix timestamp you would like to convert to human readable date (in seconds)",
          type: 4,
          required: true,
        },
      ],
    },
    {
      name: "unix",
      description: "human -> unix",
      type: 1,
      options: [
        {
          name: "value",
          description:
            "YYYY-MM-DD, YYYY-MM-DD HH:MM or YYYY-MM-DDTHH:mm:ss.sssZ format, leave empty for help",
          type: 3,
          required: false,
        },
      ],
    },
  ],

  execute(client, Discord, interaction) {
    switch (interaction.options.getSubcommand()) {
      case "human":
        const timestamp = interaction.options.getInteger("value");
        const dateObject = new Date(timestamp * 1000);
        const humanReadable = dateObject.toUTCString();
        interaction.reply({
          content: `**Human time:** \`${humanReadable}\``,
          ephemeral: true,
        });
        break;
      case "unix":
        if (!interaction.options.getString("value")) {
          return interaction.reply({
            content:
              "YYYY-MM-DD, YYYY-MM-DD HH:MM or YYYY-MM-DDTHH:mm:ss.sssZ format, more info at [tc39.es/ecma262/#sec-date-time-string-format](https://tc39.es/ecma262/#sec-date-time-string-format)",
          });
        } else {
          try {
            const inputTime = interaction.options.getString("value");
            const dateObject = new Date(inputTime);
            const unixTime = Math.floor(dateObject.getTime() / 1000);
            interaction.reply({
              content: `**Result:** \`${unixTime}\``,
              ephemeral: true,
            });
            break;
          } catch (err) {
            interaction.reply({ content: "unix time", ephemeral: true });
            break;
          }
        }
        break;
      default:
        interaction.reply({ content: "theres been an error", ephemeral: true });
        break;
    }
  },
};

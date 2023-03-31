const randomFunctions = require("../../../data/randomFunctions");
module.exports = {
  name: "avatar",
  description: "get users avatar",
  defaultPermissions: 0,
  options: [
    {
      name: "target",
      description: "whomst do you wish to target?",
      required: true,
      type: 6,
    },
  ],
  execute(client, Discord, interaction) {
    let user = interaction.options.getUser("target");
    const webp = user.avatarURL({ dynamic: true, format: "webp", size: 4096 });
    const png = user.avatarURL({ dynamic: true, format: "png", size: 4096 });
    const jpg = user.avatarURL({ dynamic: true, format: "jpg", size: 4096 });
    const jpeg = user.avatarURL({ dynamic: true, format: "jpeg", size: 4096 });
    const embed = new Discord.EmbedBuilder()
      .setTitle(`${user.tag}'s avatar`)
      .setColor(randomFunctions.getMeAColor(client, interaction.guildId))
      .setImage(user.avatarURL({ dynamic: true, size: 4096 }))
      .setFooter({
        text: new Date().toUTCString(),
        iconURL: client.user.avatarURL(),
      })
      .addFields({
        name: "Links:",
        value: `**[webp](${webp}) | [png](${png}) | [jpg](${jpg}) | [jpeg](${jpeg})**`,
      });
    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

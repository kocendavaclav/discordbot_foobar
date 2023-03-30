const randomFunctions = require("../../../data/randomFunctions");

module.exports = {
  name: "user",
  description: "Get some information about a user",
  options: [
    {
      name: "target",
      description: "whomst do you wish to target?",
      required: false,
      type: 6,
    },
  ],

  async execute(client, Discord, interaction) {
    if (interaction.options.getUser("target") == null) {
      const member = interaction.member;
      const user = interaction.user;
      let roles = [];
      member._roles.forEach((r) => {
        roles.push(`<@&${r}>`);
      });
      if (roles.length < 1) {
        roles.push("None");
      }
      let premium;
      if (member.premiumSince != null) {
        premium = `<t:${member.premiumSince}:R>`;
      } else {
        premium = "Doesn't own premium";
      }
      const embed = new Discord.EmbedBuilder()
        .setTitle(`**${user.username}#${user.discriminator}**'s details`)
        .setColor(randomFunctions.getMeAColor(client, interaction.guildId))
        .setThumbnail(user.avatarURL())
        .addFields(
          { name: "User id", value: member.user.id },
          {
            name: "Account age",
            value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
            inline: true,
          },
          {
            name: "Joined this guild:",
            value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`,
            inline: true,
          },
          { name: "Premium since:", value: premium, inline: true },
          { name: "Roles", value: roles.join(", ") },
          { name: "Bot?", value: `${member.user.bot}`, inline: true },
          { name: "System?", value: `${member.user.system}`, inline: true }
        )
        .setFooter({
          text: new Date().toUTCString(),
          iconURL: client.user.avatarURL(),
        });
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      const member = interaction.options.getUser("target");
      let user;
      await interaction.guild.members
        .fetch(member.id)
        .then((u) => {
          user = u;
        })
        .catch(console.log);
      let roles = [];
      user._roles.forEach((r) => {
        roles.push(`<@&${r}>`);
      });
      if (roles.length < 1) {
        roles.push("None");
      }
      let premium;
      if (user.premiumSince != null) {
        premium = `<t:${user.premiumSince}:R>`;
      } else {
        premium = "Doesn't own premium";
      }
      const embed = new Discord.EmbedBuilder()
        .setTitle(`**${member.username}#${member.discriminator}**'s details`)
        .setColor(randomFunctions.getMeAColor(client, interaction.guildId))
        .setThumbnail(member.avatarURL())
        .addFields(
          { name: "User id", value: member.id },
          {
            name: "Joined this guild:",
            value: `<t:${Math.floor(user.joinedTimestamp / 1000)}:R>`,
            inline: true,
          },
          { name: "Premium since:", value: premium, inline: true },
          { name: "Roles", value: roles.join(", ") },
          { name: "Bot?", value: `${member.bot}`, inline: true },
          { name: "System?", value: `${member.system}`, inline: true }
        )
        .setFooter({
          text: new Date().toUTCString(),
          iconURL: client.user.avatarURL(),
        });
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};

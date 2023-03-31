const config = require("../../data/config.json");
module.exports = (Discord, client, interaction) => {
  if (interaction.type == 2) {
    const command = client.slashCommands.get(interaction.commandName);

    if (command) {
      if (
        interaction.member.roles.cache.some(
          (role) =>
            role.name ===
            client.permissions.get(interaction.guildId)[command.name]
        )
      ) {
        command.execute(client, Discord, interaction);
      } else if (
        command.defaultPermissions === 1 &&
        interaction.author.id === interaction.guild.ownerId
      ) {
        command.execute(client, Discord, interaction);
      } else if (
        command.defaultPermissions === 0 &&
        !client.permissions.get(interaction.guildId)
      ) {
        command.execute(client, Discord, interaction);
      } else {
        interaction.reply({
          content: "You're not authorized to use this command!",
          ephemeral: true,
        });
      }
    } else {
      interaction.reply({
        content: "There was an error executing your command",
        ephemeral: true,
      });
    }
  }
  if (interaction.type == 3) {
    const cmd = interaction.customId.split("-")[0];
    const button = client.buttons.get(cmd);
    if (!button) return;
    const a = interaction.customId.split("-");
    a.shift();
    const id = a.join("-");
    button.execute(cmd, id, interaction, client, Discord);
  }
};

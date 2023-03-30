const config = require("../data/config.json");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

module.exports = (client, Discord) => {
  const dirs = fs
    .readdirSync(`./interactions/slash_commands`, { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .filter((dir) => !dir.name.startsWith("."));
  dirs.forEach((dir) => load_dir(dir.name));

  const rest = new REST({ version: "10" }).setToken(config.client.token);

  (async () => {
    try {
      console.log(`Registering slash commands`);
      await rest.put(Routes.applicationCommands(config.client.id), {
        body: client.slashCommands,
      });
      console.log("Successfuly registered slash commands");
    } catch (err) {
      console.log(err);
    }
  })();

  function load_dir(dir) {
    const commandFiles = fs
      .readdirSync(`./interactions/slash_commands/${dir}/`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../interactions/slash_commands/${dir}/${file}`);
      if (command.name) {
        console.log(`Loading (/) command ${dir}/${command.name}`);
        client.slashCommands.set(command.name, command);
      } else {
        continue;
      }
    }
  }
};

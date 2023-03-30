const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
const config = require("../../../data/config.json");
module.exports = {
  name: "calc",
  description: "calculate!",
  options: [
    {
      name: "private",
      description: "Send an ephemeral message? Default: false",
      required: false,
      type: 5,
    },
  ],
  getMeSomeComponents(disabled) {
    return getMeSomeComponents(disabled);
  },
  execute(client, Discord, interaction) {
    let ephemeral;
    if (interaction.options.getBoolean("private") == true) {
      ephemeral = true;
    } else {
      ephemeral = false;
    }

    let content = "`                                              0`";
    interaction.reply({
      content: content,
      components: getMeSomeComponents(true),
      ephemeral: ephemeral,
    });
  },
};
function getMeSomeComponents(disabled) {
  let on;
  if (disabled) {
    on = "ON";
  } else {
    on = "OFF";
  }

  const row0 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-1`)
        .setLabel("sin")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-2`)
        .setLabel("cos")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-3`)
        .setLabel("tan")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-4`)
        .setLabel("C")
        .setStyle(4)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder().setCustomId(`calc-5-${on}`).setLabel(on).setStyle(4)
    );

  const row1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-11`)
        .setLabel("x^y")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-12`)
        .setLabel("7")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-13`)
        .setLabel("8")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-14`)
        .setLabel("9")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-15`)
        .setLabel("÷")
        .setStyle(2)
        .setDisabled(disabled)
    );
  const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-21`)
        .setLabel("√")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-22`)
        .setLabel("4")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-23`)
        .setLabel("5")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-24`)
        .setLabel("6")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-25`)
        .setLabel("×")
        .setStyle(2)
        .setDisabled(disabled)
    );
  const row3 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-31`)
        .setLabel("±")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-32`)
        .setLabel("1")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-33`)
        .setLabel("2")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-34`)
        .setLabel("3")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-35`)
        .setLabel("+")
        .setStyle(2)
        .setDisabled(disabled)
    );
  const row4 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-41`)
        .setLabel(",")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-42`)
        .setLabel("0")
        .setStyle(2)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-43`)
        .setLabel(
          "\u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B = \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B \u200B"
        )
        .setStyle(3)
        .setDisabled(disabled)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`calc-45`)
        .setLabel("-")
        .setStyle(2)
        .setDisabled(disabled)
    );
  return [row0, row1, row2, row3, row4];
}

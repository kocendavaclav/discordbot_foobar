const config = require("../../data/config.json");
const calc = require("../slash_commands/math/calc");
module.exports = {
  name: "calc",
  private: "false",
  async execute(cmd, id, interaction, client, Discord) {
    const allowed = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "11",
      "15",
      "21",
      "25",
      "31",
      "35",
      "43",
      "45",
    ];
    const changers = ["1", "2", "3", "21"];
    const maxLength = 23;
    const func = {
      1: "x=``+Math.sin(x)",
      2: "x=``+Math.cos(x)",
      3: "x=``+Math.tan(x)",
      4: "",
      5: "",
      11: "y=x+`^`",
      12: "x+=`7`",
      13: "x+=`8`",
      14: "x+=`9`",
      15: "y=x+`÷`",
      21: "x=``+Math.sqrt(x)",
      22: "x+=`4`",
      23: "x+=`5`",
      24: "x+=`6`",
      25: "y=x+`×`",
      31: `if(x.startsWith('-')){
                      x=x.slice(1);
                  } else{
                      x='-'+x;
                  }`,
      32: "x+=`1`",
      33: "x+=`2`",
      34: "x+=`3`",
      35: "y=x+`+`",
      41: "x+=`.`",
      42: "x+=`0`",
      43: "",
      45: "y=`${x}-`",
    };
    let x = interaction.message.content.slice(1, -1).split(/ +/)[1];
    let y = interaction.message.content.slice(1, -1).split(/ +/)[0];
    const num = id.split("-")[0];
    if (
      interaction.message.content
        .slice(1, -1)
        .split(" ")
        .filter((a) => a != "").length < 2
    ) {
      y = "";
      x = interaction.message.content
        .slice(1, -1)
        .split(" ")
        .filter((a) => a != "")[0];
    }
    if (x.length >= maxLength && !allowed.includes(num)) {
      return interaction.reply({
        content: `That's too many numbers!`,
        ephemeral: true,
      });
    }
    if (num == 4) {
      x = "0";
      y = "";
    } else if (num == 43) {
      let a = `${y}${x}`.replace("×", "*").replace("÷", "/");
      if (a.split("^").length > 1) {
        x = "" + Math.pow(a.split("^")[0], a.split("^")[1]);
        y = "";
      } else {
        x = "" + eval(a);
        y = "";
      }
    } else if (num == 5) {
      let comps;
      const calc = require("../slash_commands/math/calc");
      if (id.split("-")[1] == "ON") {
        comps = await calc.getMeSomeComponents(false);
      } else {
        comps = await calc.getMeSomeComponents(true);
      }
      let spaces = 47 - y.length - x.length;
      return interaction.update({
        content: "`                                              0`",
        components: comps,
      });
    } else {
      eval(func[num]);
      if (x.startsWith("0") && !x.startsWith("0.")) {
        x = x.slice(1);
      }
    }
    if (num == 15 || num == 25 || num == 35 || num == 45 || num == 11) x = "0";
    return updateMessage(interaction, x, y);
    function updateMessage(interaction, x, y) {
      let spaces = 47 - y.length - x.length;
      interaction.update({ content: "`" + y + " ".repeat(spaces) + x + "`" });
    }
  },
};

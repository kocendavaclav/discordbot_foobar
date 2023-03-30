const steamUpdate = require("../../data/steamUpdate");
const express = require("express");
const db = require("../../data/db");
const cors = require("cors");
const https = require("https");
module.exports = (Discord, client) => {
  client.user.setPresence({
    activities: [{ name: `mpsdb.xyz` }],
    status: "online",
  });
  setInterval(() => {
    client.user.setPresence({
      activities: [{ name: `mpsdb.xyz` }],
      status: "online",
    });
  }, 600000);
  console.log("Bot is ready!");

  setInterval(() => {
    console.log(`Bot is currently in ${client.guilds.cache.size} guilds.`);
  }, 300000);

  setInterval(() => {
    let data;
    const updates = steamUpdate.checkForUpdates();
    updates.forEach((g) => {
      https.get(
        `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?key=2AA9DB92163243083E8A73A1056F3367?appid=${g}&count=1&maxlength=300&format=json`,
        (res) => {
          res.on("data", (a) => {
            data = a.toString();
          });
          res.on("error", (a) => {
            console.error(a);
          });
          res.on("end", () => {
            const gameInfo = JSON.parse(data).appnews.newsitems[0];
            console.log(gameInfo);
            const embed = new Discord.EmbedBuilder()
              .setTitle(gameInfo.title)
              .setURL(gameInfo.url)
              //.setDescription(gameInfo.contents)
              .setAuthor({ name: gameInfo.author })
              .addFields({
                name: gameInfo.feedlabel,
                value: gameInfo.contents,
              })
              .setTimestamp(gameInfo.date * 1000);

            db.getGuildsFollowingThisGame(g, (res) => {
              res.forEach(async (guildId) => {
                client.channels.fetch(guildId).then((channel) => {
                  channel.send({ embeds: [embed] });
                });
              });
            });
          });
        }
      );
    });
  }, 5 * 1000 * 60);

  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.post("/api/game", (req, res) => {
    const id = req.body.id;
    console.log("game id: " + id);
    console.log("app.post");
    db.getGameById(id, (i) => {
      if (i.length) {
        return res.send({ message: "already registered" });
      }
      getSteamInfo(id, (info) => {
        if (typeof info === "string") {
          return res.send({ error: info });
        }
        db.insert("game", [id, info.version]);
        res.send({ message: "success" });
      });
    });
  });
  app.post("/api/getgame", (req, res) => {
    const id = req.body.id;
    console.log("app.post");
    let games = [];
    db.getGames((a) => {
      a.forEach((e) => {
        games.push(e.game_id);
      });
      res.send(games);
    });
  });
  app.post("/api/login", (req, res) => {
    const login = req.body.id;
    console.log(req.body);
    if (client.logins.get(login)) {
      return res.send({ id: client.logins.get(login), success: true });
    } else {
      return res.send({ success: false });
    }
  });
  app.post("/api/getsettigns", (req, res) => {
    const guildId = req.body.guildId;
    db.getWebSettings(guildId, (result) => {
      let followedGames = [];
      result.forEach((e) => {
        followedGames.push(e.game_id);
      });
      const textChannel = result[0].update_channel;
      return res.send({
        textChannel: textChannel,
        followedGames: followedGames,
      });
    });
  });
  app.post("/api/submitchanges", (req, res) => {
    const guildId = req.body.guildId;
    const channelId = req.body.channelId;
    const games = req.body.followedGames;
    console.log(channelId);
    if (games.length < 1) {
      db.deleteAllFollowedGames(guildId, (a) => {
        db.insert("update_channel", [guildId, channelId]);
      });
    } else {
      db.deleteAllFollowedGames(guildId, (a) => {
        games.forEach((e) => {
          db.insert("guild_has_game", [guildId, e]);
        });
      });
      db.insert("update_channel", [guildId, channelId]);
    }
    return res.send({ message: "success" });
  });

  app.post("/api/textchannels", (req, res) => {
    const guildId = req.body.id;

    const channels = client.guilds.cache
      .get(guildId)
      .channels.cache.filter((channel) => channel.type === 0);

    return res.send({ channels: channels });
  });

  app.listen(3001, () => {
    console.log("API server started on port 3001");
  });
};

function getSteamInfo(id, callback) {
  let data;
  https.get(
    `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${id}?key=2AA9DB92163243083E8A73A1056F3367&count=1&maxlength=300&format=json`,
    (res) => {
      res.on("data", (a) => {
        data = a.toString();
      });
      res.on("error", (a) => {
        console.error(a);
      });
      res.on("end", () => {
        if (Object.keys(JSON.parse(data)).length === 0) {
          return "Not a Game";
        }
        const appnews = JSON.parse(data).appnews;

        return callback({ id: appnews.id, version: appnews.count });
      });
    }
  );
}

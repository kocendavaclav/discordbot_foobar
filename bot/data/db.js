const mysql = require("mysql2");
const config = require("./config");
module.exports = {
  query(q, callback) {
    query(q, function (res) {
      return callback(res);
    });
  },
  insert(table, values) {
    switch (table) {
      case "color":
        query(
          `INSERT INTO guild (guild_id, color) VALUES (${values[0]}, '${values[1]}') ON DUPLICATE KEY UPDATE color = '${values[1]}';`,
          function (res) {
            return res;
          }
        );
        break;
      case "update_channel":
        query(
          `INSERT INTO guild (guild_id, update_channel) VALUES (${values[0]}, '${values[1]}') ON DUPLICATE KEY UPDATE update_channel = '${values[1]}';`,
          function (res) {
            return res;
          }
        );
        break;
      case "time":
        query(
          `INSERT INTO guild (guild_id, time_offset) VALUES (${values[0]}, '${values[1]}') ON DUPLICATE KEY UPDATE time_offset = '${values[1]}';`,
          function (res) {
            return res;
          }
        );
        break;
      case "game":
        query(
          `INSERT INTO game (game_id, last_version) VALUES (${values[0]}, ${values[1]}) ON DUPLICATE KEY UPDATE last_version = ${values[1]};`,
          function (res) {
            return res;
          }
        );
        break;
      case "guild_has_game":
        query(
          `INSERT INTO guild_has_game (guild_guild_id, game_game_id) VALUES (${values[0]}, ${values[1]});`,
          (res) => {
            return res;
          }
        );
        break;
      case "permissions":
        query(
          `INSERT INTO permissions (settings, avatar, clear, user, coinflip, unix, auth, guild_id) VALUES ('${values.join(
            "', '"
          )}')`,
          (res) => {
            return res;
          }
        );
      default:
        query(
          `insert into ${table} values ("${values.join('", "')}")`,
          function (res) {
            return res;
          }
        );
        break;
    }
  },
  getPermissions(callback) {
    query(`SELECT * FROM permissions`, (res) => {
      return callback(res);
    });
  },
  getWebSettings(guildId, callback) {
    query(
      `SELECT game.game_id, guild.update_channel
    FROM guild
    JOIN guild_has_game ON guild.guild_id = guild_has_game.guild_guild_id
    JOIN game ON guild_has_game.game_game_id = game.game_id
    WHERE guild.guild_id = ${guildId};`,
      (res) => {
        return callback(res);
      }
    );
  },
  deleteAllFollowedGames(guildId, callback) {
    query(
      `DELETE FROM bot.guild_has_game WHERE guild_guild_id = ${guildId};`,
      (res) => {
        callback(res);
      }
    );
  },
  getGameById(id, callback) {
    query(`SELECT * FROM game WHERE game_id=${id}`, (a) => {
      return callback(a);
    });
  },
  getColors(callback) {
    query("SELECT `guild_id`, `color` FROM `guild`", function (res) {
      return callback(res);
    });
  },
  getGuildsFollowingThisGame(id, callback) {
    query(
      `SELECT g.*
    FROM bot.guild g
    INNER JOIN bot.guild_has_game gg ON g.guild_id = gg.guild_guild_id
    INNER JOIN bot.game gm ON gg.game_game_id = gm.game_id
    WHERE gm.game_id = ${id}`,
      function (res) {
        return callback(res);
      }
    );
  },
  getGames(callback) {
    query(`SELECT * FROM game`, (res) => {
      return callback(res);
    });
  },
};
function query(q, callback) {
  const host = config.db.host;
  const port = config.db.port;
  const db = config.db.database;
  const user = config.db.user;
  const passwd = config.db.password;
  const connection = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: passwd,
    database: db,
    rowsAsArray: false,
    supportBigNumbers: true,
    bigNumberStrings: true,
  });
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(q, function (err, result) {
      connection.end();
      if (err) {
        console.log(err);
      } else {
        return callback(result);
      }
    });
  });
}

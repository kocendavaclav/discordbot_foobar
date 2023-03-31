const db = require("./db");
const https = require("https");
module.exports = {
  checkForUpdates() {
    let newVersions = [];
    db.getGames((res) => {
      res.forEach((a) => {
        if (getNews(a.game_id) != a.last_version) {
          newVersions.push(a.game_id);
        }
      });
    });
    return newVersions;
  },
};
function getNews(a) {
  https.get(
    `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${a}?key=2AA9DB92163243083E8A73A1056F3367&count=0&maxlength=300&format=json`,
    (res) => {
      let dat;
      res.on("data", (e) => {
        dat = e.toString();
      });
      res.on("error", (e) => {
        console.error(a);
      });
      res.on("end", () => {
        const data = JSON.parse(dat);
        return data.appnews.count;
      });
    }
  );
}

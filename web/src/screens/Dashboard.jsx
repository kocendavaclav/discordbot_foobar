import "../styles/styles.css";
import GameCard from "../components/GameCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard(props) {
  const [addGame, setAddGame] = useState();
  const [followed, setFollowed] = useState([]);
  const [games, setGames] = useState([]);
  const [textChannel, setTextChannel] = useState();
  const [avaliableTextChannales, setAvaliableTextChannels] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    getTextChannels();
    async function getTextChannels() {
      const data = {
        id: props.guildId,
      };
      try {
        const response = await axios.post(
          "http://localhost:3001/api/textchannels",
          data
        );
        if (response.data.error) {
          console.error(response.data.error);
          return;
        }
        console.log(response.data);

        setAvaliableTextChannels([...response.data.channels]);
      } catch (err) {
        console.error(err);
      }
    }
  }, [props.guildId]);

  async function getGames() {
    try {
      const response = await axios.post("http://localhost:3001/api/getgame");
      if (response.data.error) {
        console.error(response.data.error);
        return;
      }
      console.log(response.data);

      setGames([...response.data]);
    } catch (err) {
      console.error(err);
    }
  }
  /*  async function getSettings() {
    const data = {
      guildId: props.guildId,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/getsettigns",
        data
      );
      if (response.data.error) {
        console.error(response.data.error);
        return;
      }

      console.log(response.data);

      setFollowed([...response.data.followedGames]);
      setTextChannel(response.data.textChannel);
    } catch (err) {
      console.error(err);
    }
  } */

  async function submitChanges() {
    if (typeof textChannel === "undefined") {
      return alert("You must select a text channel!");
    }
    const data = {
      guildId: props.guildId,
      channelId: textChannel,
      followedGames: followed,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/submitchanges",
        data
      );
      if (response.data.error) {
        console.error(response.data.error);
        return alert("there has been an error");
      }
      if (response.data.message === "success") {
        alert("Settigns updated");
      } else {
        alert("An error occurred while saving your settings");
      }
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function insertGame() {
    setAddGame("");
    const data = {
      id: addGame,
    };
    try {
      const response = await axios.post("http://localhost:3001/api/game", data);
      if (response.data.error) {
        console.error(response.data.error);
        return;
      }
      if (response.data.message === "success") {
        setGames([...games, data.id]);
      }
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="dashboardScreen">
      <div className="dashboardNavbar">
        <div className="row navbar">
          <div className="col-2">
            <button className="button switchScreen" onClick={() => {}}>
              Switch to permissions
            </button>
          </div>
          <div className="col-8">
            <text>Dashboard</text>
          </div>
          <div className="col-2">
            <button
              className="button logout"
              onClick={() => {
                props.setGuildId("0");
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="row header">
        <div className="followedGamesHeader col-4">Followed Games</div>
        <div className="gamesHeader col-8">
          games
          <div className="addGame">
            <input
              className="addGameInput"
              placeholder="game ID"
              value={addGame}
              onChange={(a) => {
                setAddGame(a.target.value);
              }}
            ></input>
            <button className="button" onClick={insertGame}>
              Add Game
            </button>
          </div>
        </div>
      </div>
      <div className="row games">
        <div className="games col-4">
          {followed.map((a, i) => {
            return (
              <GameCard
                key={i}
                text="Unfollow"
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${a}/header.jpg`}
                gameTitle=""
                click={() => {
                  const newFollowed = [...followed];
                  setGames([...games, newFollowed.splice(i, 1)[0]]);
                  setFollowed(newFollowed);
                }}
              />
            );
          })}
        </div>
        <div className="games col-8">
          {games.map((a, i) => {
            return (
              <GameCard
                key={i}
                text=""
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${a}/header.jpg`}
                gameTitle=""
                click={() => {
                  const newGames = [...games];
                  setFollowed([...followed, newGames.splice(i, 1)[0]]);
                  setGames(newGames);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="dashboardSaveBar col-12">
        <form className="selectTextChannel">
          <label>
            Text Channel:
            <select
              value={textChannel}
              className="textChannelDropdown"
              onChange={(e) => {
                setTextChannel(e.target.value);
              }}
            >
              {avaliableTextChannales.map((channel) => {
                return (
                  <option key={channel.id} value={channel.id}>
                    {channel.name}
                  </option>
                );
              })}
            </select>
          </label>
        </form>
        <button
          onClick={() => {
            submitChanges();
          }}
          className="dashboardSave button"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

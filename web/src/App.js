import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Dashboard from "./screens/Dashboard";
import "./styles/styles.css";

function App() {
  const [guildId, setGuildId] = useState("0");
  const [loggedIn, setLoggedIn] = useState(false);

  if (guildId !== "0") {
    return (
      <div className="dashboard">
        <Dashboard
          guildId={guildId}
          setGuildId={setGuildId}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm setGuildId={setGuildId} setLoggedIn={setLoggedIn} />
        </header>
      </div>
    );
  }
}

export default App;

import "../styles/styles.css";
import axios from "axios";
import React, { useState } from "react";
function LoginForm(props) {
  const [login, setLogin] = useState("");
  const [alertText, setAlertText] = useState("");
  return (
    <div className="loginDiv">
      <label>Server code</label>
      <input
        className="loginInput"
        placeholder="login"
        value={login}
        onChange={(a) => {
          setLogin(a.target.value);
        }}
        maxLength="6"
      ></input>
      <text className="alertText">{alertText}</text>
      <button
        className="button login"
        onClick={() => {
          submit(login);
        }}
      >
        Log in
      </button>
    </div>
  );
  async function submit(log) {
    const data = {
      id: log,
    };
    try {
      const response = await axios.post(
        "http://mpsdb.xyz:3001/api/login",
        data
      );
      if (response.data.error) {
        console.error(response.data.error);
        return;
      }
      console.log(response.data);
      if (response.data.success === true) {
        return props.setGuildId(response.data.id);
      } else {
        return setAlertText("Wrong Login");
      }
    } catch (err) {
      console.error(err);
    }
  }
}
export default LoginForm;

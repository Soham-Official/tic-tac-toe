import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Footer from "./Footer";
import "./Styles/joiningroom.css";
import uniqueString from "unique-string";
const ENDPT = "https://tic-tact-toe.herokuapp.com/";
const JoiningRoom = () => {
  const [name, setName] = useState("");
  const [joinroomId, setJoinroomId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let x = prompt("Please Enter Your Name :", "James bond");
    setName(x);
    localStorage.setItem("PlayerName", x);
    let id = uniqueString();
    localStorage.setItem("PlayerId", id);
  }, []);

  const history = useHistory();
  const createRoom = () => {
    fetch(`${ENDPT}create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PlayerName: name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        history.push("/join/" + result);
      })
      .catch((err) => console.log(err));
  };
  const joinRoom = (e) => {
    e.preventDefault();
    if (!joinroomId) return setError("Invalid Game Code");
    fetch(`${ENDPT}join`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: joinroomId,
        PlayerName: name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.err) {
          return setError(result.err);
        }
        setJoinroomId("");
        history.push("/join/" + result.roomId);
      })
      .catch((err) => setError(err));
  };
  if (name === null) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="homepage" id="joining">
        <div className="inputboxs">
          {" "}
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            ""
          )}
          <h3 style={{ color: "white" }}>Hello {name ? name : ""}</h3>
          <form id="room-form" onSubmit={(e) => joinRoom(e)}>
            <input
              type="text"
              id="join Room"
              placeholder="Enter game code"
              value={joinroomId}
              onChange={(e) => setJoinroomId(e.target.value)}
            />
            <button className="input-button" type="submit">
              Join Game
            </button>
          </form>
          <div style={{ color: "white", marginTop: "2vh", fontSize: "1vw" }}>
            OR
          </div>
          <button className="input-button mt-4" onClick={createRoom}>
            Create Game
          </button>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
};

export default JoiningRoom;

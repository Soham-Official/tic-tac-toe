import React, { useEffect, useState, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Footer from "./Footer";
import WaitingArena from "./WaitingArena";
import io from "socket.io-client";
import Sqaure from "./Sqaure";
import "./Styles/game.css";
import WinningLogic from "./WinningLogic";

const PlayingArena = ({ match }) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const PlayerName = localStorage.getItem("PlayerName");
  const PlayerId = localStorage.getItem("PlayerId");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [waiting, setWaiting] = useState(true);
  const [id, setId] = useState("");
  const Winner = WinningLogic(squares);
  const TurnIcon = useRef(true);
  const Turn = useRef("");
  const history = useHistory();
  const ENDPT = "https://tic-tact-toe.herokuapp.com/";
  const socket = io(ENDPT, {
    rejectUnauthorized: false,
  });
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  let playagain = "";
  useEffect(() => {
    if (!PlayerName) {
      return <Redirect to="/" />;
    }

    socket.emit("join", match.params.roomId);
  }, [ENDPT]);
  useEffect(() => {
    socket.on("ready", () => {
      setWaiting(false);
      fetch(`${ENDPT}getnames`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: match.params.roomId,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setPlayer1(result.Player1Name);
          setPlayer2(result.Player2Name);
        });
    });
  }, []);
  let status, colour;

  if (Winner) {
    // console.log(Winner);
    if (Winner === "Tie") {
      status = "Game Tied";
      colour = "white";
      playagain = "yes";
    } else {
      if (id === PlayerId) {
        status = "You Won!!!!!";
        colour = "green";
        playagain = "yes";
      } else {
        status = "Better Luck Next Time";
        colour = "red";
        playagain = "yes";
      }
    }
  } else {
    if (id !== PlayerId) {
      status = "Your Turn";
    } else {
      status = "Opponents Turn";
    }
  }
  useEffect(() => {
    socket.on("playAgainRecieved", () => {
      setSquares(Array(9).fill(null));
      forceUpdate();
    });
  }, []);
  useEffect(() => {
    socket.on("quitgameRecieved", () => {
      localStorage.removeItem("PlayerName");
      localStorage.removeItem("PlayerId");
      fetch(`${ENDPT}quit`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: match.params.roomId,
        }),
      })
        .then((res) => res.json())
        .then((res) => history.push("/"));
    });
  }, []);
  useEffect(() => {
    socket.on("clickRecieved", (click) => {
      const i = click.i;
      squares[i] = TurnIcon.current ? "O" : "X";
      TurnIcon.current = !TurnIcon.current;
      setSquares(squares);
      // status = click.id === PlayerId ? "Opponents Turn" : "Your Turn";
      // console.log(click.id);
      setId(click.id);
      if (click.id !== PlayerId) {
        Turn.current = 1;
      } else {
        Turn.current = -1;
      }
      // console.log(Turn.current);
      // console.log(click.id, PlayerId);
      // Turn.current = click.id;
      // if (Turn.current === 2) Turn.current = 1;
      // if (Turn.current === -1) Turn.current = 2;
      forceUpdate();
    });
  }, [squares, TurnIcon]);
  const clickedBox = (i) => {
    if (Turn.current === -1 || squares[i] || Winner) {
      return;
    } else {
      const click = {
        i,
        playerName: PlayerName,
        id: PlayerId,
        roomId: match.params.roomId,
      };
      socket.emit("clicked", click);
      Turn.current = -1;
    }
  };
  const onPlayagain = () => {
    socket.emit("playAgain", match.params.roomId);
  };
  const onQuitGame = () => {
    socket.emit("quitgame", match.params.roomId);
  };
  return (
    <div>
      <div className="homepage">
        {waiting ? (
          <WaitingArena roomId={match.params.roomId} />
        ) : (
          <div>
            <div id="Board">
              <div className="playername text-center">
                {player1} vs {player2}
              </div>
              <div className="status text-center" style={{ color: colour }}>
                {status}
              </div>

              <div id="Board_game">
                <div className="board-row">
                  <Sqaure
                    val={squares[0]}
                    idx={0}
                    onClick={() => clickedBox(0)}
                  />
                  <Sqaure
                    val={squares[1]}
                    idx={1}
                    onClick={() => clickedBox(1)}
                  />
                  <Sqaure
                    val={squares[2]}
                    idx={2}
                    onClick={() => clickedBox(2)}
                  />
                </div>
                <div className="board-row">
                  <Sqaure
                    val={squares[3]}
                    idx={3}
                    onClick={() => clickedBox(3)}
                  />
                  <Sqaure
                    val={squares[4]}
                    idx={4}
                    onClick={() => clickedBox(4)}
                  />
                  <Sqaure
                    val={squares[5]}
                    idx={5}
                    onClick={() => clickedBox(5)}
                  />
                </div>
                <div className="board-row">
                  <Sqaure
                    val={squares[6]}
                    idx={6}
                    onClick={() => clickedBox(6)}
                  />
                  <Sqaure
                    val={squares[7]}
                    idx={7}
                    onClick={() => clickedBox(7)}
                  />
                  <Sqaure
                    val={squares[8]}
                    idx={8}
                    onClick={() => clickedBox(8)}
                  />
                </div>{" "}
              </div>

              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                className="mt-5"
              >
                {" "}
                {playagain ? (
                  <>
                    <button
                      className="btn btn-success btn-lg"
                      onClick={onPlayagain}
                    >
                      Play Again
                    </button>
                    <button
                      className="btn btn-danger btn-lg"
                      onClick={onQuitGame}
                    >
                      Quit Game
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PlayingArena;

import React, { useState } from "react";
import "./Styles/game.css";
import WinningLogic from "./WinningLogic";
import Footer from "./Footer";

import Sqaure from "./Sqaure";
import SingleplayerWinningLogic from "./SingleplayerWinningLogic";
import { useHistory } from "react-router-dom";

const SinglePlayer = () => {
  let playagain = "";
  let status, colour;
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const Winner = WinningLogic(squares);
  const history = useHistory();
  const ComputersMove = (squares) => {
    if (WinningLogic(squares)) {
      return;
    }
    let bestScore = -Infinity;
    let ans;
    let board = [
      [squares[0], squares[3], squares[6]],
      [squares[1], squares[4], squares[7]],
      [squares[2], squares[5], squares[8]],
    ];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = "X";
          let score = minimax(board, 0, false);
          board[i][j] = null;
          if (score > bestScore) {
            bestScore = score;
            ans = { i, j };
          }
        }
      }
    }
    squares[ans.i + 3 * ans.j] = "X";
    setSquares(squares);
  };
  let scores = {
    X: 1,
    O: -1,
    Tie: 0,
  };
  const minimax = (board, depth, isMaximising) => {
    let result = SingleplayerWinningLogic(board);
    if (result !== null) {
      let score = scores[result];
      return score;
    }
    if (isMaximising) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = "X";
            let score = minimax(board, depth + 1, false);
            board[i][j] = null;
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = "O";
            let score = minimax(board, depth + 1, true);
            board[i][j] = null;
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
  };
  const clickedBox = (i) => {
    if (squares[i] || Winner) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = "O";
    setSquares(newSquares);
    // squares[i] = "O";
    // setSquares(squares);
    ComputersMove(newSquares);
    console.log(newSquares);
    // forceUpdate();
  };
  if (Winner) {
    if (Winner === "Tie") {
      status = "Game Tied";
      colour = "white";
      playagain = "yes";
    } else {
      if (Winner === "O") {
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
    status = "Your Turn";
  }
  const onPlayagain = () => {
    setSquares(Array(9).fill(null));
  };
  const onQuitGame = () => {
    history.push("/");
  };
  return (
    <div>
      <div className="homepage">
        <div>
          <div id="Board">
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
              className="mt-5 "
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
      </div>
      <Footer />
    </div>
  );
};

export default SinglePlayer;

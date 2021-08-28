import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
import Sqaure from "./Sqaure";
import "./Styles/game.css";
const PlayGame = ({ socket, roomId }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const PlayerId = localStorage.getItem("PlayerId");
  const PlayerName = localStorage.getItem("PlayerName");
  const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);
  const TurnIcon = useRef(true);
  const Turn = useRef("");
  // const ENDPT = "http://localhost:8000/";
  // const socket = io(ENDPT, {
  //   rejectUnauthorized: false,
  // });
  useEffect(() => {
    socket.on("clickRecieved", () => {
      console.log("1111");
      // const i = click.i;
      // squares[i] = TurnIcon.current ? "O" : "X";
      // TurnIcon.current = !TurnIcon.current;
      // setSquares(squares);
      // Turn.current = click.id;
      // if (Turn.current === 2) Turn.current = 1;
      // if (Turn.current === -1) Turn.current = 2;
      // console.log(squares);
      // forceUpdate();
    });
  }, [squares, TurnIcon, Turn.current]);
  const clickedBox = (i) => {
    if (Turn.current === 2 || Turn.current === -1 || squares[i]) {
      return;
    }
    const click = {
      i,
      playerName: PlayerName,
      id: PlayerId,
      roomId: roomId,
    };
    socket.emit("clicked", click);
    Turn.current = -1;
    console.log(i);
  };
  return (
    <div>
      <div id="Board">
        {/* <div className="status">{status}</div> */}
        <div id="Board_game">
          <div className="board-row">
            <Sqaure val={squares[0]} idx={0} onClick={() => clickedBox(0)} />
            <Sqaure val={squares[1]} idx={1} onClick={() => clickedBox(1)} />
            <Sqaure val={squares[2]} idx={2} onClick={() => clickedBox(2)} />
          </div>
          <div className="board-row">
            <Sqaure val={squares[3]} idx={3} onClick={() => clickedBox(3)} />
            <Sqaure val={squares[4]} idx={4} onClick={() => clickedBox(4)} />
            <Sqaure val={squares[5]} idx={5} onClick={() => clickedBox(5)} />
          </div>
          <div className="board-row">
            <Sqaure val={squares[6]} idx={6} onClick={() => clickedBox(6)} />
            <Sqaure val={squares[7]} idx={7} onClick={() => clickedBox(7)} />
            <Sqaure val={squares[8]} idx={8} onClick={() => clickedBox(8)} />
          </div>
        </div>
        {/* <button onClick={PlayAgain} className="input-button">
            Play Again
          </button> */}
      </div>
    </div>
  );
};

export default PlayGame;

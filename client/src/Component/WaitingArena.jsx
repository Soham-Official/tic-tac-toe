import React, { useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import "./Styles/waitingarena.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
const WaitingArena = (props) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="homepage">
      <div className="waiting text-center">
        {copied ? (
          <div className="alert alert-success" role="alert">
            Copied to Clipboard!
          </div>
        ) : (
          ""
        )}
        <SpinnerCircularFixed
          size={59}
          thickness={138}
          speed={100}
          color="rgba(57, 172, 60, 1)"
          secondaryColor="rgba(172, 57, 57, 0)"
        />{" "}
        <span className="waitingMessage">
          Waiting for another player to join
        </span>
        <CopyToClipboard text={props.roomId} onCopy={() => setCopied(true)}>
          <h1 className=" text-center mt-3 roomId">{props.roomId}</h1>
        </CopyToClipboard>
        <p className="mt-3 copymsg">
          Click to Copy the Game Code and share with your friend.
        </p>
      </div>
    </div>
  );
};

export default WaitingArena;

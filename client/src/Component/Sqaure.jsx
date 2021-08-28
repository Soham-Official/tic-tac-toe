import React from "react";

const Sqaure = ({ val, onClick, idx }) => {
  const boardStyle = (idx) => {
    if (idx === 0) return { borderTop: "none", borderLeft: "none" };
    if (idx === 1) return { borderLeft: "none" };
    if (idx === 2) return { borderBottom: "none", borderLeft: "none" };
    if (idx === 3) return { borderTop: "none" };
    if (idx === 5) return { borderBottom: "none" };
    if (idx === 6) return { borderTop: "none", borderRight: "none" };
    if (idx === 7) return { borderRight: "none" };
    if (idx === 8) return { borderBottom: "none", borderRight: "none" };
  };
  return (
    <div>
      <button className="square" onClick={onClick} style={boardStyle(idx)}>
        {val ? val : ""}
      </button>
    </div>
  );
};

export default Sqaure;

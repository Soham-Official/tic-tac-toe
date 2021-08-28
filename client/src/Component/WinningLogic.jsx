const WinningLogic = (squares) => {
  const grids = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < grids.length; i++) {
    const [x, y, z] = grids[i];
    if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
      return squares[x];
    }
  }
  let j = 0;
  for (let i = 0; i < 9; i++) {
    if (squares[i] === "X" || squares[i] === "O") {
      j++;
    }
  }
  if (j === 9) {
    return "Tie";
  }
  return null;
};

export default WinningLogic;

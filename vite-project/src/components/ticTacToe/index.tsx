import { useState, useLayoutEffect } from "react";

function checkWinner(board: string[][], size: number) {
  // This to check rows have same symbol
  for (let i = 0; i < size; i++) {
    const symbol = board[i][0];
    if (symbol) {
      let flag = true;
      for (let j = 1; j < size; j++) {
        if (symbol !== board[i][j]) {
          flag = false;
          break;
        }
      }
      if (flag) return symbol;
    }
  }

  //   This to check columns have same symbol
  for (let j = 0; j < size; j++) {
    const symbol = board[0][j];
    if (symbol) {
      let flag = true;
      for (let i = 1; i < size; i++) {
        if (symbol !== board[i][j]) {
          flag = false;
          break;
        }
      }
      if (flag) return symbol;
    }
  }

  //  This is to check diagonal have same symbol
  let symbol = board[0][0];
  if (symbol) {
    let flag = true;
    for (let i = 1; i < size; i++) {
      if (symbol !== board[i][i]) {
        flag = false;
        break;
      }
    }
    if (flag) return symbol;
  }

  // This is to check reverse diagonal have same symbol

  symbol = board[0][size - 1];
  if (symbol) {
    let flag = true;
    for (let i = 1; i < size; i++) {
      if (symbol !== board[i][size - 1- i]) {
        flag = false;
        break;
      }
    }
    if (flag) return symbol;
  }
  return null;
}
function TicTacToeChild({ size }: { size: number }) {
  const [board, setBoard] = useState(
    Array.from({ length: size }, () => new Array(size).fill(null)),
  );
  const [turn, setTurn] = useState<string>("X");

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--n", size.toString());
  }, [size]);

  const winner = checkWinner(board, size);

  const handleClick = (row: number, col: number) => {
    if (board[row][col] !== null || winner) return;
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = turn === "X" ? "X" : "O";
    setTurn(turn === "X" ? "O" : "X");
    setBoard(newBoard);
  };

  const handleReset = () => {
    setBoard(Array.from({ length: size }, () => new Array(size).fill(null)));
  };

  return (
    <>
      <h1 className="text-center font-bold mt-2 mb-10">Tic Tac Toe</h1>
      <div
        className="grid grid-cols-[repeat(var(--n),50px)] gap-[10px] mx-auto"
        style={{ width: `${size * 50}px`, height: `${size * 50}px` }}
      >
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="border-2 border-black w-[50px] h-[50px] flex items-center justify-center text-xl font-bold cursor-pointer bg-white hover:bg-gray-100 active:bg-gray-200 transition-colors"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {col}
            </div>
          )),
        )}
      </div>

      <div className=" mt-20 flex justify-center items-center flex-col mx-auto">
        <p>{winner ? `Winner is ${winner}.Please reset the game` : `Current Turn is of ${turn}`}</p>
        <button onClick={handleReset} className="mt-3 border border-black p-2">
          Reset
        </button>
      </div>
    </>
  );
}

export default function TicTacToe() {
  return <TicTacToeChild size={3} />;
}

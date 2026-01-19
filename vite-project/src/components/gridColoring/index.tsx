import { useCallback, useEffect, useRef, useState } from "react";

export default function GridColoring() {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => new Array(3).fill(false)),
  );

  const queueRef = useRef<Array<{ rowIndex: number; colIndex: number }>>([]);
  const timeIdRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const handleClick = useCallback(
    (rowIndex: number, colIndex: number, value: boolean) => {
      if (timeIdRef.current.length > 0 && value) return;
      if (grid[rowIndex][colIndex] && value) return;
      setGrid((prevGrid) => {
        const gridDeepCopy = prevGrid.map((row) => [...row]);
        gridDeepCopy[rowIndex][colIndex] = value;
        if (value) queueRef.current.push({ rowIndex, colIndex });
        return gridDeepCopy;
      });
    },
    [grid],
  );

  useEffect(() => {
    if (queueRef.current.length === 9) {
      queueRef.current.forEach((item, idx: number) => {
        const { rowIndex, colIndex } = item;
        timeIdRef.current[idx] = setTimeout(
          () => {
            handleClick(rowIndex, colIndex, false);
            if (idx === timeIdRef.current.length - 1) {
              timeIdRef.current = [];
            }
          },
          1000 * (idx + 1),
        );
      });
      queueRef.current = [];
    }
  }, [grid, handleClick]);

    useEffect(() => {
      timeIdRef.current.forEach((id) => clearTimeout(id));
    }, []);
  return (
    <>
      <h1 className="text-center font-bold mt-2 mb-10">Grid Coloring</h1>
      <div className="grid grid-cols-3 gap-2 w-[16rem] mx-auto">
        {grid.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`border border-black cursor-pointer w-[5rem] h-[5rem]  ${col ? "grid-color-cell-active" : ""}`}
                onClick={() => handleClick(rowIndex, colIndex, true)}
              ></div>
            );
          });
        })}
      </div>
    </>
  );
}



// single on click

// import { useCallback, useEffect, useRef, useState } from "react";

// export default function GridColoring() {
//   const [grid, setGrid] = useState(
//     Array.from({ length: 3 }, () => new Array(3).fill(false)),
//   );

//   const queueRef = useRef<Array<{ rowIndex: number; colIndex: number }>>([]);
//   const timeIdRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

//   const handleContainerClick = useCallback((e: React.MouseEvent) => {
//     const cell = e.target as HTMLElement;
//     if (!cell.classList.contains('grid-cell')) return;

//     const rowIndex = Number(cell.dataset.row);
//     const colIndex = Number(cell.dataset.col);
    
//     if (timeIdRef.current.length > 0) return;
//     if (grid[rowIndex][colIndex]) return;

//     setGrid((prevGrid) => {
//       const gridDeepCopy = prevGrid.map((row) => [...row]);
//       gridDeepCopy[rowIndex][colIndex] = true;
//       queueRef.current.push({ rowIndex, colIndex });
//       return gridDeepCopy;
//     });
//   }, [grid]);

//   useEffect(() => {
//     if (queueRef.current.length === 9) {
//       queueRef.current.forEach((item, idx) => {
//         const { rowIndex, colIndex } = item;
//         timeIdRef.current[idx] = setTimeout(() => {
//           setGrid((prevGrid) => {
//             const gridDeepCopy = prevGrid.map((row) => [...row]);
//             gridDeepCopy[rowIndex][colIndex] = false;
//             return gridDeepCopy;
//           });
//           if (idx === timeIdRef.current.length - 1) {
//             timeIdRef.current = [];
//           }
//         }, 1000 * (idx + 1));
//       });
//       queueRef.current = [];
//     }
//   }, [grid]);

//   // Cleanup timeouts on unmount
//   useEffect(() => {
//     return () => {
//       timeIdRef.current.forEach(clearTimeout);
//     };
//   }, []);

//   return (
//     <>
//       <h1 className="text-center font-bold mt-2 mb-10">Grid Coloring</h1>
//       <div 
//         className="grid grid-cols-3 gap-2 w-[16rem] mx-auto p-1"
//         onClick={handleContainerClick}
//       >
//         {grid.map((row, rowIndex) => 
//           row.map((col, colIndex) => (
//             <div
//               key={`${rowIndex}-${colIndex}`}
//               className={`grid-cell border border-black cursor-pointer w-[5rem] h-[5rem] transition-colors duration-200 ${
//                 col ? "grid-color-cell-active" : ""
//               }`}
//               data-row={rowIndex}
//               data-col={colIndex}
//             />
//           ))
//         )}
//       </div>
//     </>
//   );
// }

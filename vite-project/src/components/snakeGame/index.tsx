import React, { useEffect, useRef, useState, useCallback } from "react";

const GRIDSIZE = 15;
const INITIAL_POSITION = [[5, 5]];
const FOOD_INITIAL_POSITION = [[10, 10]];

const findFoodSpot = (snake: number[][]): [number, number] => {
  let spot: [number, number];
  do {
    const x = Math.floor(Math.random() * GRIDSIZE);
    const y = Math.floor(Math.random() * GRIDSIZE);
    spot = [x, y];
  } while (snake.some(([sx, sy]) => sx === spot[0] && sy === spot[1]));
  return spot;
};

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_POSITION);
  const [food, setFood] = useState<[number, number]>(
    findFoodSpot(FOOD_INITIAL_POSITION),
  );
  const directionRef = useRef<[number, number]>([1, 0]);
  const gameRef = useRef<NodeJS.Timeout | null>(null);

  const findSnakeBody = useCallback(
    (x: number, y: number) => {
      return snake.some(([sx, sy]) => sx === x && sy === y);
    },
    [snake],
  );

  // Game loop
  useEffect(() => {
    gameRef.current = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const next: [number, number] = [
          head[0] + directionRef.current[0],
          head[1] + directionRef.current[1],
        ];

        // Wall collision
        if (
          next[0] < 0 ||
          next[0] >= GRIDSIZE ||
          next[1] < 0 ||
          next[1] >= GRIDSIZE
        ) {
          directionRef.current = [1, 0];
          return INITIAL_POSITION;
        }

        // Self collision
        if (prev.some(([sx, sy]) => sx === next[0] && sy === next[1])) {
          directionRef.current = [1, 0];
          return INITIAL_POSITION;
        }

        const newSnake = prev.map((s) => [...s] as [number, number]);

        if (next[0] === food[0] && next[1] === food[1]) {
          // Eat food - grow
          newSnake.unshift(next);

          // Respawn food
          setFood(findFoodSpot(newSnake));
        } else {
          newSnake.pop();
          newSnake.unshift(next);
        }
        return newSnake;
      });
    }, 100);

    return () => {
      if (gameRef.current) clearInterval(gameRef.current);
    };
  }, [food]); // Re-run when food changes

  // Controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dir = directionRef.current;
      if (e.key === "ArrowUp" && dir[1] !== 1) directionRef.current = [0, -1];
      else if (e.key === "ArrowDown" && dir[1] !== -1)
        directionRef.current = [0, 1];
      else if (e.key === "ArrowLeft" && dir[0] !== 1)
        directionRef.current = [-1, 0];
      else if (e.key === "ArrowRight" && dir[0] !== -1)
        directionRef.current = [1, 0];
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <h1 className="text-center font-bold mt-2 mb-10">Snake Game</h1>
      <div className="grid grid-cols-15 grid-rows-15 h-[20rem] w-[20rem] border-2 border-black mx-auto box-border">
        {Array.from({ length: GRIDSIZE }, (_, y) =>
          Array.from({ length: GRIDSIZE }, (_, x) => {
            const isSnake = findSnakeBody(x, y);
            const isFood = food[0] === x && food[1] === y;
            return (
              <div
                key={`${x}-${y}`}
                className={`${isSnake ? "bg-green-500" : "bg-white"}
                  ${isFood ? "bg-red-500! border-0 rounded-full" : ""}`}
              />
            );
          }).flat(),
        )}
      </div>
    </>
  );
}

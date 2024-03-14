import { useCallback, useEffect, useState, useRef } from "react";
import { directionHandler, getFreeSpotsSet, getNextCoords, getRandomFoodCoord, isFreeSpace, toCoordsKey } from "./snakeUtils";
import { Direction, Coordinate } from "../../types";
import { useGameSessionCtx } from "../game/GameSessionContext";

export type SnakeHook = {
  setNumRows: React.Dispatch<React.SetStateAction<number>>;
  setNumCols: React.Dispatch<React.SetStateAction<number>>;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
  setFoodLocation: React.Dispatch<React.SetStateAction<Coordinate>>,
  setSnake: React.Dispatch<React.SetStateAction<Coordinate[]>>,
  tick: () => void;
  rows: number;
  cols: number;
  direction: Direction;
  snake: Coordinate[],
  foodLocation: Coordinate,
};

const DIRECTIONS: Record<Direction, Coordinate> = {
  [Direction.UP]: [-1, 0],
  [Direction.DOWN]: [1, 0],
  [Direction.RIGHT]: [0, 1],
  [Direction.LEFT]: [0, -1],
};

export default function useSnake(): SnakeHook {
  const [rows, setNumRows] = useState(10);
  const [cols, setNumCols] = useState(10);
  const [direction, setDirection] = useState(Direction.DOWN);
  const [snake, setSnake] = useState<Coordinate[]>([[0, 0]]);
  const freeSpots = useRef(getFreeSpotsSet(rows, cols, snake));
  const randomFoodCoord = getRandomFoodCoord(freeSpots.current);
  const [foodLocation, setFoodLocation] = useState<Coordinate>(randomFoodCoord);
  const { didFinishForm } = useGameSessionCtx();
  const timerIdRef = useRef<null | number>(null);

  const tick = useCallback(() => {
    setSnake((prevSnake) => {
      const [currRow, currCol] = prevSnake.at(-1) || [0, 0];
      const [deltaRow, deltaCol] = DIRECTIONS[direction];
      const [nextRow, nextCol] = getNextCoords([currRow + deltaRow, currCol + deltaCol], rows, cols, direction)

      // if (nextRow !== foodLocation[0] && nextCol !== foodLocation[1] && !isFreeSpace(nextRow, nextCol, freeSpots.current)) {
      // if (nextRow !== foodLocation[0] && nextCol !== foodLocation[1]) {
      //   return prevSnake; // Return the previous state if out of bounds
      // }

      const newSnake = [...prevSnake];
      if (nextRow === foodLocation[0] && nextCol === foodLocation[1]) {
        const newLocation = getRandomFoodCoord(freeSpots.current);
        setFoodLocation(newLocation);
      } else {
        newSnake.shift();
      }

      newSnake.push([nextRow, nextCol]);

      return newSnake;
    });
  }, [direction, foodLocation]);

  useEffect(() => {
    if (!didFinishForm) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp": setDirection(directionHandler(Direction.UP)); break;
        case "ArrowDown": setDirection(directionHandler(Direction.DOWN)); break;
        case "ArrowLeft": setDirection(directionHandler(Direction.LEFT)); break;
        case "ArrowRight": setDirection(directionHandler(Direction.RIGHT)); break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [didFinishForm]);

  useEffect(() => {
    if (!didFinishForm) return;
    clearInterval(timerIdRef.current ?? 0);
    timerIdRef.current = setInterval(tick, 500);
    return () => {
      clearInterval(timerIdRef.current ?? 0);
    };
  }, [tick, didFinishForm]);

  useEffect(() => {
    const newFreeSpots = getFreeSpotsSet(rows, cols, snake);
    newFreeSpots.delete(toCoordsKey(foodLocation));
    freeSpots.current = newFreeSpots;
  }, [snake, foodLocation, rows, cols]);

  return {
    setNumRows,
    setNumCols,
    setDirection,
    direction,
    rows,
    cols,
    snake,
    foodLocation,
    setFoodLocation,
    setSnake,
    tick
  };
}

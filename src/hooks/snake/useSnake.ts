import { useCallback, useEffect, useState, useRef } from 'react'
import {
  areCoordsSame,
  directionHandler,
  getFreeSpotsSet,
  getNextCoords,
  getRandomFoodCoord,
  toCoordsKey
} from '../../Snake/snakeUtils'
import { Direction, type Coordinate } from '../../types'
import { useGameSessionCtx } from '../../context/game/GameSessionContext'
import { useGameLoop } from '../gameloop/useGameLoop'

export interface SnakeHook {
  setDirection: React.Dispatch<React.SetStateAction<Direction>>
  setFoodLocation: React.Dispatch<React.SetStateAction<Coordinate>>
  setSnake: React.Dispatch<React.SetStateAction<Coordinate[]>>
  tick: () => void
  direction: Direction
  snake: Coordinate[]
  isCoordsInSnake: (coords: Coordinate) => boolean
  foodLocation: Coordinate
}

const ArrowKeyToDirection = {
  ArrowUp: Direction.UP,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
  ArrowRight: Direction.RIGHT
}

const DIRECTIONS: Record<Direction, Coordinate> = {
  [Direction.UP]: [-1, 0],
  [Direction.DOWN]: [1, 0],
  [Direction.RIGHT]: [0, 1],
  [Direction.LEFT]: [0, -1]
}

export default function useSnake(): SnakeHook {
  const { rows, cols, speed, setIsGameOver, isGameOver, setDidGameStart } = useGameSessionCtx()
  const [direction, setDirection] = useState(Direction.DOWN)
  const [snake, setSnake] = useState<Coordinate[]>([[0, 0]])
  const freeSpots = useRef(getFreeSpotsSet(rows, cols, snake))
  const randomFoodCoord = getRandomFoodCoord(freeSpots.current)
  const [foodLocation, setFoodLocation] = useState<Coordinate>(randomFoodCoord)
  const snakeRef = useRef(snake)
  const foodLocationRef = useRef(foodLocation)
  const directionRef = useRef(direction)
  const directionChangedRef = useRef(false)
  const snakeSetRef = useRef(new Set(snakeRef.current.map(toCoordsKey)))

  function isCoordsInSnake([rowIndex, colIndex]: Coordinate): boolean {
    return snakeSetRef.current.has(toCoordsKey([rowIndex, colIndex]))
  }

  useEffect(() => {
    snakeRef.current = snake
  }, [snake])

  useEffect(() => {
    foodLocationRef.current = foodLocation
  }, [foodLocation])

  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  const tick = useCallback(() => {
    const [currRow, currCol] = snakeRef.current.at(-1) ?? [0, 0]
    const [deltaRow, deltaCol] = DIRECTIONS[directionRef.current]
    const [nextRow, nextCol] = getNextCoords([currRow + deltaRow, currCol + deltaCol], rows, cols, directionRef.current)
    const nextCoord: Coordinate = [nextRow, nextCol]
    const nextCoordsKey = toCoordsKey(nextCoord)

    directionChangedRef.current = false

    if (snakeSetRef.current.has(nextCoordsKey)) {
      setIsGameOver(true)
      stopGameLoop()
      return
    }

    const newSnake = [...snakeRef.current]

    if (areCoordsSame([nextRow, nextCol], foodLocationRef.current)) {
      const newLocation = getRandomFoodCoord(freeSpots.current)
      setFoodLocation(newLocation)
    } else {
      snakeSetRef.current.delete(toCoordsKey(newSnake.shift() ?? [0, 0]))
    }

    newSnake.push(nextCoord)
    snakeSetRef.current.add(nextCoordsKey)
    setSnake(newSnake)
  }, [cols, rows])

  const { initGameLoop, stopGameLoop } = useGameLoop({
    ticksPerSecond: speed,
    render: tick
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const arrowKey = event.key as keyof typeof ArrowKeyToDirection
      const newDirection = ArrowKeyToDirection[arrowKey]
      if (!isGameOver && newDirection !== undefined && !directionChangedRef.current) {
        setDirection(directionHandler(newDirection))
        directionChangedRef.current = true
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isGameOver])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const arrowKey = event.key as keyof typeof ArrowKeyToDirection
      if (!isGameOver && ArrowKeyToDirection[arrowKey] !== undefined) {
        initGameLoop()
        setDidGameStart(true)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isGameOver])

  useEffect(() => {
    const newFreeSpots = getFreeSpotsSet(rows, cols, snake)
    newFreeSpots.delete(toCoordsKey(foodLocation))
    freeSpots.current = newFreeSpots
  }, [snake, foodLocation, rows, cols])

  return {
    setDirection,
    setFoodLocation,
    setSnake,
    direction,
    snake,
    isCoordsInSnake,
    foodLocation,
    tick
  }
}

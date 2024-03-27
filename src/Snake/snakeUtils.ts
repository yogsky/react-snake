import { type Coordinate, Direction } from '../types'

const DELIMITER = '-'
export function getFreeSpotsSet(rows: number, cols: number, snake: Coordinate[]): Set<string> {
  const set = new Set<string>()
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!snake.some(([r, c]) => r === row && c === col)) {
        set.add(toCoordsKey([row, col]))
      }
    }
  }
  return set
}

export function areCoordsSame([aRow, aCol]: Coordinate, [bRow, bCol]: Coordinate): boolean {
  return aRow === bRow && aCol === bCol
}

export function toCoordsKey([row, col]: Coordinate): string {
  return `${row}${DELIMITER}${col}`
}

const DirectionToReverseDirection = {
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT
}

export function directionHandler(targetDirection: Direction) {
  return (currentDir: Direction) => {
    const isTryingToMoveInOppositeDirection = DirectionToReverseDirection[targetDirection] === currentDir
    if (isTryingToMoveInOppositeDirection) return currentDir
    return targetDirection
  }
}
export function getRandomFoodCoord(freeSpots: Set<string>): Coordinate {
  const freeSpotArr = Array.from(freeSpots)
  const randIdx = Math.floor(Math.random() * freeSpotArr.length)
  const item = freeSpotArr[randIdx]
  const [r, c] = item.split(DELIMITER).map(Number)
  return [r, c]
}

export function getNextCoords(next: Coordinate, rows: number, cols: number, direction: Direction): Coordinate {
  const [nextRow, nextCol] = next

  if (nextCol === cols && direction === Direction.RIGHT) {
    return [nextRow, 0]
  }

  if (nextCol === -1 && direction === Direction.LEFT) {
    return [nextRow, cols - 1]
  }

  if (nextRow === -1 && direction === Direction.UP) {
    return [rows - 1, nextCol]
  }

  if (nextRow === rows && direction === Direction.DOWN) {
    return [0, nextCol]
  }

  return next
}

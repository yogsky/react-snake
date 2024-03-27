import { useSnakeCtx } from '../../context/snake/SnakeContext'
import { areCoordsSame } from '../snakeUtils'
import { GenericCellContainer } from './GenericCell'
import { type CellProps } from './interfaces'
import { SnakeCell } from './SnakeCell'
import { FoodCell } from './FoodCell'

export function Cell({ colIndex, rowIndex }: CellProps): JSX.Element {
  const { foodLocation, isCoordsInSnake } = useSnakeCtx()

  const isSnake = isCoordsInSnake([rowIndex, colIndex])
  if (isSnake) {
    return <SnakeCell rowIndex={rowIndex} colIndex={colIndex} />
  }

  const isFood = areCoordsSame(foodLocation, [rowIndex, colIndex])
  if (isFood) {
    return <FoodCell />
  }
  return <GenericCellContainer />
}

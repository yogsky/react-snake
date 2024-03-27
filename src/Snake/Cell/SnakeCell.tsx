import styled from 'styled-components'
import { Direction } from '../../types'
import { useSnakeCtx } from '../../context/snake/SnakeContext'
import { areCoordsSame } from '../snakeUtils'
import { GenericCellContainer } from './GenericCell'
import { type CellProps } from './interfaces'

const directionToRotation = {
  [Direction.UP]: 0,
  [Direction.DOWN]: 180,
  [Direction.LEFT]: 270,
  [Direction.RIGHT]: 90
}

const SnakeHeadContainer = styled(GenericCellContainer)`
  background-color: #4361ee;
`
const SnakeBodyContainer = styled(GenericCellContainer)`
  background-color: #7209b7;
`

const SnakeHeadContent = styled.div<{ $direction: Direction }>`
  transform: ${(props) => `rotate(${directionToRotation[props.$direction]}deg)`};
  transition: transform 0.2s ease;
  &::before {
    content: '\\2191';
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

function SnakeHead({ direction }: { direction: Direction }): JSX.Element {
  return (
    <SnakeHeadContainer>
      <SnakeHeadContent $direction={direction} />
    </SnakeHeadContainer>
  )
}

export function SnakeCell({ colIndex, rowIndex }: CellProps): JSX.Element {
  const { snake, direction } = useSnakeCtx()
  const snakeHeadCoords = snake.at(-1) ?? [0, 0]
  const isSnakeHead = areCoordsSame(snakeHeadCoords, [rowIndex, colIndex])
  if (isSnakeHead) {
    return <SnakeHead direction={direction} />
  }
  return <SnakeBodyContainer />
}

import styled from 'styled-components'
import { useGameSessionCtx } from '../context/game/GameSessionContext'
import { SnakeCtxProvider } from '../context/snake/SnakeContext'
import { Cell } from './Cell/Cell'
import { useGameLoop } from '../hooks/gameloop/useGameLoop'

interface BoardProps {
  m: number
  n: number
}

function Board({ m, n }: BoardProps): JSX.Element {
  const rows = Array.from({ length: m })
  const columns = Array.from({ length: n })
  return (
    <table>
      <tbody>
        {rows.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((_, columnIndex) => (
              <Cell key={columnIndex} rowIndex={rowIndex} colIndex={columnIndex} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Hint = styled.div`
  font-size: 1rem;
  color: #f72585;
  position: absolute;
  top: 30px;
  left: 30px;
`

export default function SnakeBoard(): JSX.Element {
  const { didFinishForm, didGameStart, cols, rows } = useGameSessionCtx()
  if (!didFinishForm) return <></>
  const possibleHint = !didGameStart ? <Hint>Click Arrow to start</Hint> : null
  return (
    <SnakeCtxProvider>
      {possibleHint}
      <Board m={rows} n={cols} />
    </SnakeCtxProvider>
  )
}

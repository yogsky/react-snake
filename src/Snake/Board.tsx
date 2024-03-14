import { useGameSessionCtx } from "../context/game/GameSessionContext";
import { useSnakeCtx } from "../context/snake/SnakeContext";

type MatrixProps = {
  m: number
  n: number
}
function Matrix({ m, n }: MatrixProps) {
  const { snake, foodLocation } = useSnakeCtx();
  const rows = Array.from({ length: m });
  const columns = Array.from({ length: n });
  const getBgColor = (row: number, col: number) => {
    if(foodLocation[0] === row && foodLocation[1] === col) return 'green'
    if (snake.some(([r, c]) => r === row && col === c)) return 'white'
    return ''
  }

  return (
    <table>
      <tbody>
        {rows.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((_, columnIndex) => (
              <td key={columnIndex} style={{ padding: '10px', border: '1px solid black', backgroundColor: getBgColor(rowIndex, columnIndex) }}>
                Cell {rowIndex + 1}-{columnIndex + 1}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default function SnakeBoard() {

  const { didFinishForm } = useGameSessionCtx();
  const { cols, rows } = useSnakeCtx();
  if (!didFinishForm) return null

  return (
    <div className="board">
      <Matrix m={rows} n={cols} />
    </div>
  )
}

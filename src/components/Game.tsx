import BoardConfigForm from './BoardConfigForm'
import SnakeBoard from '../Snake/SnakeBoard'
import { GameSessionCtxProvider } from '../context/game/GameSessionContext'
import { SnakeCtxProvider } from '../context/snake/SnakeContext'

function Game(): JSX.Element {
  return (
    <>
      <GameSessionCtxProvider>
        <SnakeCtxProvider>
          <BoardConfigForm />
          <SnakeBoard />
        </SnakeCtxProvider>
      </GameSessionCtxProvider>
    </>
  )
}

export default Game

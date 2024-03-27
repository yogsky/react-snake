import './App.css'
import BoardConfigForm from './components/BoardConfigForm'
import SnakeBoard from './Snake/SnakeBoard'
import { GameSessionCtxProvider } from './context/game/GameSessionContext'
import GameOverDialog from './components/GameOverDialog'

function App(): JSX.Element {
  return (
    <>
      <GameSessionCtxProvider>
        <BoardConfigForm />
        <SnakeBoard />
        <GameOverDialog />
      </GameSessionCtxProvider>
    </>
  )
}

export default App

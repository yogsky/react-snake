import './App.css';
import BoardConfigForm from './BoardConfigForm';
import SnakeBoard from './Snake/Board';
import { GameSessionCtxProvider } from './context/game/GameSessionContext';
import { SnakeCtxProvider } from './context/snake/SnakeContext';

function App() {

  return (
    <>
      <GameSessionCtxProvider>
        <SnakeCtxProvider>
          <BoardConfigForm />
          <SnakeBoard />
        </SnakeCtxProvider>
      </GameSessionCtxProvider>
    </>
  );
}

export default App;

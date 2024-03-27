import { createContext, useContext } from 'react'
import useGameSession, { type GameSession } from '../../hooks/game/useGameSession'

const GameSessionCtx = createContext<GameSession | null>(null)

export function useGameSessionCtx(): GameSession {
  const ctx = useContext(GameSessionCtx)
  if (ctx === null) throw new Error('useGameSessionCtx must be used within a gameSessionCtx.Provider')
  return ctx
}

export function GameSessionCtxProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const value = useGameSession()
  return <GameSessionCtx.Provider value={value}>{children}</GameSessionCtx.Provider>
}

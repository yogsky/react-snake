import { createContext, useContext } from 'react'
import useSnake, { type SnakeHook} from './useSnake'

const SnakeCtx = createContext<SnakeHook | null>(null)

export function useSnakeCtx (): SnakeHook {
  const ctx = useContext(SnakeCtx)
  if (ctx === null) throw new Error('useSnakeCtx must be used within a snakeCtx.Provider')
  return ctx
}

export function SnakeCtxProvider ({ children }: { children: React.ReactNode }) {
  const value = useSnake()
  return (
    <SnakeCtx.Provider value={value}>
      {children}
    </SnakeCtx.Provider>
  )
}

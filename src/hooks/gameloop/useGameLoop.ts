import { useRef } from 'react'

interface GameLoopParams {
  ticksPerSecond: number
  render: () => void
}

interface GameLoop {
  initGameLoop: () => void
  stopGameLoop: () => void
}

export function useGameLoop({ ticksPerSecond, render }: GameLoopParams): GameLoop {
  const lastRenderTime = useRef(0)
  const frameRequestId = useRef(0)
  function main(currentTime: number): void {
    frameRequestId.current = requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime.current) / 1000
    if (secondsSinceLastRender < 1 / ticksPerSecond) return
    render()
    lastRenderTime.current = currentTime
  }

  function initGameLoop(): void {
    frameRequestId.current = requestAnimationFrame(main)
  }

  function stopGameLoop(): void {
    cancelAnimationFrame(frameRequestId.current)
  }

  return {
    initGameLoop,
    stopGameLoop
  }
}

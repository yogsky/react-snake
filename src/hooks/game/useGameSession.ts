import { useState } from 'react'

export interface GameSession {
  setDidFinishForm: React.Dispatch<React.SetStateAction<boolean>>
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>
  setDidGameStart: React.Dispatch<React.SetStateAction<boolean>>
  setSpeed: React.Dispatch<React.SetStateAction<number>>
  setNumRows: React.Dispatch<React.SetStateAction<number>>
  setNumCols: React.Dispatch<React.SetStateAction<number>>
  isGameOver: boolean
  didGameStart: boolean
  didFinishForm: boolean
  rows: number
  cols: number
  speed: number
}

export default function useGameSession(): GameSession {
  const [didFinishForm, setDidFinishForm] = useState(false)
  const [didGameStart, setDidGameStart] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [rows, setNumRows] = useState(8)
  const [cols, setNumCols] = useState(8)
  const [speed, setSpeed] = useState(6)

  return {
    didGameStart,
    setDidGameStart,
    speed,
    setSpeed,
    isGameOver,
    setIsGameOver,
    setDidFinishForm,
    didFinishForm,
    rows,
    cols,
    setNumCols,
    setNumRows
  }
}

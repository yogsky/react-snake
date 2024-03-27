import React from 'react'
import { useGameSessionCtx } from '../context/game/GameSessionContext'
import styled from 'styled-components'

const FixedDialog = styled.dialog`
  position: fixed;
  top: 0;
  bottom: 0;
  min-width: 300px;
  margin: auto;
  left: 0;
  right: 0;
`

const GameOverDialog: React.FC = () => {
  const { isGameOver } = useGameSessionCtx()
  const onClose = (): void => {
    // lazy way to restart the game 🤣
    window.location.reload()
  }
  return (
    <FixedDialog open={isGameOver} onClose={onClose}>
      <h2>Game Over</h2>
      <p>Good job matey!</p>
      <button onClick={onClose}>Restart</button>
    </FixedDialog>
  )
}

export default GameOverDialog

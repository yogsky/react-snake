import React, { type ChangeEvent, type FormEvent } from 'react'
import styled from 'styled-components'
import { useGameSessionCtx } from '../context/game/GameSessionContext'

// Styled components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4361ee;
  color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #7209b7;
  }
`

export default function BoardConfigForm(): JSX.Element {
  const { cols, rows, setNumCols, setNumRows, didFinishForm, speed, setSpeed, setDidFinishForm } = useGameSessionCtx()

  if (didFinishForm) return <></>

  const onChange = (action: React.Dispatch<React.SetStateAction<number>>) => (event: ChangeEvent<HTMLInputElement>) => {
    action(Number(event.target.value))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setDidFinishForm(true)
  }

  return (
    <StyledForm onSubmit={onSubmit}>
      <div>
        <Label htmlFor="rows">How many rows?</Label>
        <Input type="number" value={rows} id="rows" placeholder="Rows" onChange={onChange(setNumRows)} />
      </div>

      <div>
        <Label htmlFor="cols">How many cols?</Label>
        <Input type="number" value={cols} id="cols" placeholder="Cols" onChange={onChange(setNumCols)} />
      </div>

      <div>
        <Label htmlFor="speed">Snake movements per second</Label>
        <Input type="number" value={speed} id="speed" placeholder="Speed" onChange={onChange(setSpeed)} />
      </div>

      <SubmitButton type="submit">Submit</SubmitButton>
    </StyledForm>
  )
}

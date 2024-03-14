import { useState } from "react";


export type GameSession = {
  setDidFinishForm: React.Dispatch<React.SetStateAction<boolean>>;
  didFinishForm: boolean;
};

export default function useGameSession(): GameSession {
  const [didFinishForm, setDidFinishForm] = useState(false);
  return {
    setDidFinishForm,
    didFinishForm,
  };
}

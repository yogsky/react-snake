import { ChangeEvent, FormEvent } from "react";
import { useSnakeCtx } from "./context/snake/SnakeContext";
import { useGameSessionCtx } from "./context/game/GameSessionContext";

export default function BoardConfigForm() {

  const { cols, rows, setNumCols, setNumRows } = useSnakeCtx();
  const { didFinishForm, setDidFinishForm } = useGameSessionCtx();

  if (didFinishForm) return null;

  const onChange = (action: React.Dispatch<React.SetStateAction<number>>) => (event: ChangeEvent<HTMLInputElement>) => {
    action(Number(event.target.value));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDidFinishForm(true);
  };


  return (
    <form onSubmit={onSubmit}>
      <div className="block">
        <label htmlFor="rows">How many rows ?</label>
        <input type="number" value={rows} id="rows" placeholder="Rows" onChange={onChange(setNumRows)} />
      </div>
      <br />
      <div className="block">
        <label htmlFor="cols">How many cols ?</label>
        <input type="number" value={cols} id="cols" placeholder="Cols" onChange={onChange(setNumCols)} />
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

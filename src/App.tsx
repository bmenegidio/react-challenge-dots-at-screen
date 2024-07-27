import { useState } from "react";
import "./App.css";

type Position = {
  clientX: number;
  clientY: number;
};

function App() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [undoPositions, setUndoPositions] = useState<Position[]>([]);
  const [redoPositions, setRedoPositions] = useState<Position[]>([]);

  function handleContainerOnClick(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;

    const availableToAdd =
      positions.findIndex(
        (positionToCheck) =>
          positionToCheck.clientX === clientX &&
          positionToCheck.clientY === clientY
      ) === -1;

    if (availableToAdd) {
      const objToAdd = { clientX, clientY };

      setUndoPositions((currentValues) => [...currentValues, objToAdd]);
      setPositions((currentPositions) => {
        return [...currentPositions, objToAdd];
      });
    }
  }

  function handleUndoClick() {
    const newPositions = [...positions];
    const removedPosition = newPositions.pop();
    if (!removedPosition) {
      return;
    }

    const newUndoPositions = [...undoPositions];
    newUndoPositions.pop();

    setRedoPositions((currentValues) => [...currentValues, removedPosition]);
    setUndoPositions(newUndoPositions);
    setPositions(newPositions);
  }

  function handleRedoClick() {
    const newRedoPositions = [...redoPositions];
    const removedUndoPosition = newRedoPositions.pop();
    if (!removedUndoPosition) {
      return;
    }

    setRedoPositions(newRedoPositions);
    setUndoPositions((currentValues) => [
      ...currentValues,
      removedUndoPosition,
    ]);
    setPositions((currentValues) => [...currentValues, removedUndoPosition]);
  }

  return (
    <div className="container">
      <div className="buttons-container">
        <button disabled={undoPositions.length === 0} onClick={handleUndoClick}>
          Undo
        </button>
        <button disabled={redoPositions.length === 0} onClick={handleRedoClick}>
          Redo
        </button>
      </div>

      <div className="container-click" onClick={handleContainerOnClick}>
        {positions.map((positionObj) => (
          <div
            key={`${positionObj.clientX}_${positionObj.clientY}`}
            className="circle"
            style={{ top: positionObj.clientY, left: positionObj.clientX }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;

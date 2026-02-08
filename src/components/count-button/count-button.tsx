import { useState } from "react";

interface CountButtonProps {
  onChange: (e: number) => void;
  startingValue?: number;
  increments?: number[];
}

function CountButton({ startingValue = 0, increments = [1], onChange }: CountButtonProps) {
  const [value, setValue] = useState(startingValue);

  function renderButtonIncrements(kind: "add" | "subtract" = "add") {
    const incrementButtons = increments.map((increment) => (
      <button
        onClick={() => {
          const updatedValue = kind === "add" ? value + increment : Math.max(value - increment, 0);
          onChange(updatedValue);
          setValue(updatedValue);
        }}
      >
        {kind === "add" ? "+" : "-"}
        {increment}
      </button>
    ));
    return kind === "add" ? incrementButtons : incrementButtons.reverse();
  }

  return (
    <div className="flex gap-2 justify-center">
      {renderButtonIncrements("subtract")}
      <input
        onChange={(e) => {
          const updatedValue = Number(e.target.value);
          onChange(updatedValue);
          setValue(updatedValue);
        }}
        className="border text-center font-bold border-white max-w-12 [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        value={value}
        min={0}
      />
      {renderButtonIncrements("add")}
    </div>
  );
}
export default CountButton;

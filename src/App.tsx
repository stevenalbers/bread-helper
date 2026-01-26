import { useState } from "react";
import "./App.css";

interface Recipe {
  starter: number;
  flour: number;
  water: number;
}
const largeJar = 426;
const smallJar = 246;

function App() {
  const [output, setOutput] = useState(300);
  const [ratio, setRatio] = useState<Recipe>({ starter: 1, flour: 1, water: 1 });
  const [jar, setJar] = useState(largeJar);

  // Only update these

  // These are calculated
  const shares = Object.values(ratio).reduce((a, b) => a + b, 0);
  const valuePerShare = output / shares;

  let startingWeight = jar;

  return (
    <div className="flex flex-col gap-4">
      <div>Starter helper</div>
      <p>Jar</p>
      <label>
        Large
        <input checked={jar === largeJar} name="jar" type="radio" onChange={() => setJar(largeJar)}></input>
      </label>
      <label>
        Small
        <input name="jar" type="radio" onChange={() => setJar(smallJar)}></input>
      </label>
      <label>
        <p>Amount needed</p>
        <input
          type="number"
          className="border"
          value={output}
          onChange={(e) => setOutput(e.target.valueAsNumber)}
        ></input>
      </label>
      Recipes
      <label>
        <p>Starter</p>
        <input
          type="number"
          className="border"
          value={ratio.starter}
          onChange={(e) => setRatio({ ...ratio, starter: e.target.valueAsNumber })}
        ></input>
      </label>
      <label>
        <p>Flour</p>
        <input
          type="number"
          className="border"
          value={ratio.flour}
          onChange={(e) => setRatio({ ...ratio, flour: e.target.valueAsNumber })}
        ></input>
      </label>
      <label>
        <p>Water</p>
        <input
          type="number"
          className="border"
          value={ratio.water}
          onChange={(e) => setRatio({ ...ratio, water: e.target.valueAsNumber })}
        ></input>
      </label>
      <div>Output</div>
      {Object.keys(ratio).map((ingredient) => {
        const componentWeight = ratio[ingredient as keyof Recipe] * valuePerShare;
        startingWeight += componentWeight;

        return (
          <div key={ingredient}>
            <div>{ingredient}</div>
            <div>{componentWeight}</div>
            <div>({startingWeight})</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

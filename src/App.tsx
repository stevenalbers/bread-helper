import { useState } from "react";
import "./App.css";
import CountButton from "./components/count-button/count-button";

interface Recipe {
  Starter: number;
  Flour: number;
  Water: number;
}
const xlJar = 726;
const largeJar = 426;
const smallJar = 246;

function App() {
  const [output, setOutput] = useState(300);
  const [ratio, setRatio] = useState<Recipe>({ Starter: 1, Flour: 2, Water: 2 });
  const [jar, setJar] = useState(largeJar);

  // Only update these

  // These are calculated
  const shares = Object.values(ratio).reduce((a, b) => a + b, 0);
  const valuePerShare = output / shares;

  let startingWeight = jar;

  return (
    <>
      <div className="mb-48">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <label className="flex flex-col justify">
              <h2 className="text-xl">How much starter do you need?</h2>
              <p className="mb-2">(Make sure you account for ~30-50g extra!)</p>
              <CountButton onChange={(e) => setOutput(e)} increments={[10, 100]} />
            </label>
            <h2 className="text-xl">Which jar?</h2>
            <div className="flex justify-around">
              <label>
                X-Large
                <input
                  className="ms-1"
                  checked={jar === xlJar}
                  name="jar"
                  type="radio"
                  onChange={() => setJar(xlJar)}
                ></input>
              </label>
              <label>
                Large
                <input
                  className="ms-1"
                  checked={jar === largeJar}
                  name="jar"
                  type="radio"
                  onChange={() => setJar(largeJar)}
                ></input>
              </label>
              <label>
                Small
                <input className="ms-1" name="jar" type="radio" onChange={() => setJar(smallJar)}></input>
              </label>
            </div>
            <div className="flex mt-4 gap-2">
              <div className="flex flex-col gap-2">
                <h2 className="mt-2 text-2xl">Ratio</h2>
                <label>
                  <p>Starter</p>
                  <CountButton startingValue={ratio.Starter} onChange={(e) => setRatio({ ...ratio, Starter: e })} />
                </label>
                <label>
                  <p>Flour</p>
                  <CountButton startingValue={ratio.Flour} onChange={(e) => setRatio({ ...ratio, Flour: e })} />
                </label>
                <label>
                  <p>Water</p>
                  <CountButton startingValue={ratio.Water} onChange={(e) => setRatio({ ...ratio, Water: e })} />
                </label>
              </div>
              <div className="w-full border-1">
                <h2 className="mt-2 text-2xl">You need</h2>
                <div className="flex justify-around w-full">
                  {Object.keys(ratio).map((ingredient) => {
                    const componentWeight = ratio[ingredient as keyof Recipe] * valuePerShare;
                    startingWeight += componentWeight;

                    return (
                      <div className="flex flex-col" key={ingredient}>
                        <div className="font-bold">{ingredient}</div>
                        <div className="font-bold text-xl">{Math.round(componentWeight)}</div>
                        <div>({Math.round(startingWeight)})</div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2">Note: the (number) is the total weight of the jar at each step</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

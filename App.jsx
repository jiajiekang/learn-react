import { useState } from "react";

import fetchResult from "./fetchResult";
import HandleNlp from "./nlp/NlpHandler";

export default function Dtone() {
  let [ids, setIds] = useState("");
  const [results, setResults] = useState({ ids: "", display: "", result: "" });

  function handleInput(nextIds) {
    setIds(nextIds);
  }

  function handleResults() {
    ids = ids || "+8613901007871";
    ids = "+" + ids.replace(/\D/g, "");

    const url = "http://localhost:3900/number";

    const handleFunc = (data) => {
      if (data.status !== 200) {
        ids = "Error";
      }
      const entries = Object.entries(JSON.parse(data.result));
      const result = [];
      for (const [key, value] of entries) {
        result.push(
          <li key={key}>
            <strong>{key}:</strong> {value}{" "}
          </li>,
        );
      }
      setResults({ ids, display: "Operator", result });
    };

    fetchResult(url, { ids }, handleFunc, "Operator", setResults);
  }

  return (
    <>
      <h1 className="title">Search Input</h1>
      <InputID ids={ids} onIdsChange={handleInput} onResults={handleResults} />
      <Results results={results} />
    </>
  );
}

function InputID({ ids, onIdsChange, onResults }) {
  return (
    <form>
      <label>
        Input the texts including IDs
        <textarea
          values={ids}
          onChange={(e) => onIdsChange(e.target.value)}
          rows="5"
          cols="60"
          placeholder="+8613901007871"
        />
        <button onClick={() => onIdsChange("")} className="reset" type="reset">
          Reset
        </button>
        <HandleNlp onResults={onResults} />
        <button className="storage load-ids" type="button">
          Load
        </button>
      </label>
    </form>
  );
}

function Results({ results }) {
  const { ids, display, result } = results;

  return (
    <div className="show">
      <p>{ids}</p>
      <p>{display}</p>
      <div className="result">
        {result}
        <br />
        <br />
      </div>
    </div>
  );
}

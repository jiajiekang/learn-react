import { useState } from "react";

import fetchResult from "./fetchResult";
import HandleNlp from "./nlp/NlpHandler";
import TrxColumn from "./trxColumn/TrxColumn";
import Platforms from "./search/Platforms";

export default function Dtone() {
  let [ids, setIds] = useState("");
  const [results, setResults] = useState({ ids: "", display: "", result: "" });
  const [checkboxes, setCheckboxes] = useState([
    { id: "cb1", checked: false, label: "OP", value: "operator_reference" },
    { id: "cb2", checked: true, label: "Status", value: "status" },
    { id: "cb3", checked: false, label: "Results", value: "results" },
    { id: "cb4", checked: false, label: "External_ID", value: "external_id" },
  ]);
  const [options, setOptions] = useState([
    { id: "pf1", checked: true, label: "DVS", value: "dvs" },
    { id: "pf2", checked: false, label: "Submitted", value: "submitted" },
    { id: "pf3", checked: false, label: "Airtime", value: "airtime" },
    { id: "pf4", checked: false, label: "External", value: "exteral" },
    { id: "pf5", checked: false, label: "SQL", value: "sql" },
  ]);

  function handleInput(nextIds) {
    setIds(nextIds);
  }

  function handleChecks(id, checked) {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked };
      }
      return checkbox;
    });

    setCheckboxes(updatedCheckboxes);
  }

  function handleSelectClear(selection) {
    setCheckboxes((prev) => {
      return prev.map((checkbox) => {
        return { ...checkbox, checked: selection };
      });
    });
  }

  function handleOptions(id, checked) {
    const updatedOptions = options.map((option) => {
      if (option.id === id) {
        return { ...option, checked };
      }
      return option;
    });

    setOptions(updatedOptions);
  }

  function handleSearch() {}

  function handleResults() {
    ids = ids || "+8613901007871";
    ids = "+" + ids.replace(/\D/g, "");

    const url = "http://localhost:3900/number";

    const handleFunc = (data) => {
      if (data.status !== 200) {
        ids = "Error";
        throw new Error(data.result);
      }
      const entries = Object.entries(JSON.parse(data.result));
      const result = [];
      for (const [key, value] of entries) {
        result.push(
          <li key={key}>
            <strong>{key}:</strong> {value}
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
      <TrxColumn
        checkboxes={checkboxes}
        onChangeCheck={handleChecks}
        onChangeSelectClear={handleSelectClear}
      />
      <Platforms options={options} onOptions={handleOptions} onSearch={handleSearch} />
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
      <div className="result">{result}</div>
    </div>
  );
}

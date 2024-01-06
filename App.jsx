import { useState } from "react";

import fetchResult from "./fetchResult";
import HandleNlp from "./nlp/NlpHandler";
import TrxColumn from "./trxColumn/TrxColumn";
import Platforms from "./search/Platforms";
import ExternalId from "./external/ExteralId";

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
    { id: "pf4", checked: false, label: "External", value: "external" },
    { id: "pf5", checked: false, label: "SQL", value: "sql" },
  ]);
  const [platform, setPlatform] = useState("dvs");
  const [exIdRegex, setExIdRegx] = useState("16\\d+");
  const [externalIds, setExternalIds] = useState("");

  function handleInput(nextIds) {
    setIds(nextIds);
  }

  function handleNlp() {
    ids = ids || "+8613901007871";
    ids = "+" + ids.replace(/\D/g, "");

    const url = "http://localhost:3900/number";

    const handleFunc = (res) => {
      if (res.status !== 200) {
        ids = "Error";
        throw new Error(res.result);
      }
      const entries = Object.entries(JSON.parse(res.result));
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
        setPlatform(option.value);
        return { ...option, checked };
      }
      return { ...option, checked: false };
    });

    setOptions(updatedOptions);
  }

  function handleSearch() {
    const url = "http://localhost:3900/search";

    if (platform === "external") {
      setIds(externalIds);
    }

    const handleFunc = (res) => {
      if (res.status !== 200) {
        throw new Error(res.result);
      }

      const data = res.result;
      checkboxes.forEach((cb) => {
        if (!cb.checked) {
          const index = data[0].indexOf(cb.value);
          if (index > -1) {
            data.forEach((row) => row.splice(index, 1));
          }
        }
      });

      const ids = data
        .slice(1)
        .map((row) => row[0])
        .join(",");

      const [rowHeader, ...rowData] = data;

      const header = rowHeader.map((cell) => <th key={cell}>{cell}</th>);
      const rows = rowData.map((row) => (
        <tr key={row[0]}>
          {row.map((cell) => (
            <td key={cell}>{cell}</td>
          ))}
        </tr>
      ));

      const result = (
        <table>
          <tbody>
            <tr>{header}</tr>
            {rows}
          </tbody>
        </table>
      );

      setResults({ ids, display: platform, result });
    };

    fetchResult(url, { ids, platform }, handleFunc, platform, setResults);
  }

  function handleExIdRegex(nextRegex) {
    setExIdRegx(nextRegex);
  }

  function handleFilter() {
    const url = "http://localhost:3900/filter";
    const externalRegex = externalIds || "16\\d+";

    const handleFunc = (res) => {
      if (res.status !== 200) {
        ids = "Error";
        throw new Error(res.result);
      }

      const data = res.result;
      const filteredIds = data
        .split(",")
        .map((id) => `'${id}'`)
        .join(",");

      setExternalIds(filteredIds);
      setResults({ ids: filteredIds, display: "External IDs", result: data });
    };

    fetchResult(url, { ids, externalRegex }, handleFunc, platform, setResults);
  }

  return (
    <>
      <h1 className="title">Search Input</h1>
      <InputID ids={ids} onIdsChange={handleInput} onResults={handleNlp} />
      <TrxColumn
        checkboxes={checkboxes}
        onChangeCheck={handleChecks}
        onChangeSelectClear={handleSelectClear}
      />
      <Platforms
        options={options}
        onOptions={handleOptions}
        onSearch={handleSearch}
        className="platform"
      />
      <ExternalId
        exIdRegex={exIdRegex}
        onExIdChange={handleExIdRegex}
        onFilter={handleFilter}
      />
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

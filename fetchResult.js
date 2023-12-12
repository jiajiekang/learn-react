export default function fetchResult(url, body, handleFunc, errorTitle, setResults) {
  const response = fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const displayError = (ids, display) => {
    if (ids.includes("HTTP Error")) {
      setResults({ ids, display, result: "Please check the input and try again." });
    } else if (ids.includes("Invalid Number")) {
      setResults({ ids, display, result: "Please check the number and try again." });
    } else {
      setResults({ ids, display, result: "Please start the express server first." });
    }
  };

  response
    .then(res => {
      setResults({ ids: "Loading...", display: "", result: "" });
      return res.json();
    })
    .then(data => {
      handleFunc(data);
    })
    .catch(e => {
      displayError(e.message, errorTitle);
    });
}

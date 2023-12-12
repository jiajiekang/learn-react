export default function fetchResult(url, body, handleFunc, errorTitle, setResults) {
  const response = fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  response
    .then((res) => {
      setResults({ ids: "Loading...", display: "", result: "" });
      return res.json();
    })
    .then((data) => {
      handleFunc(data);
    })
    .catch((e) => {
      displayError(e.message, errorTitle);
    });

  const displayError = (msg, title) => {
    if (msg.includes("HTTP Error")) {
      setResults(msg, title, "Please check the input and try again.");
    } else if (msg.includes("Invalid Number")) {
      setResults(msg, title, "Please check the number and try again.");
    } else {
      setResults(msg, title, "Please start the express server first.");
    }
  };
}

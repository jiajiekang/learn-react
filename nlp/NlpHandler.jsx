export default function HandleNlp({ onResults }) {
  return (
    <button onClick={onResults} className="search nlp-btn" type="button">
      NLP
    </button>
  );
}

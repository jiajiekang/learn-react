export default function HandleSearch({ onSearch }) {
  return (
    <div className="plf-btn">
      <button onClick={onSearch} type="button">
        Search
      </button>
    </div>
  );
}

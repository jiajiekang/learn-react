export default function HandleFilter({ onFilter }) {
  return (
    <div className="plf-btn">
      <button onClick={onFilter} type="button" className="search filter-btn">
        Filter
      </button>
    </div>
  );
}

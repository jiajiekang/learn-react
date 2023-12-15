export default function HandleSearch({ onSearch }) {
  return (
    <div className='plf-btn'>
      <button onClick={onSearch} type='button' className='search search-btn'>
        Search
      </button>
    </div>
  );
}

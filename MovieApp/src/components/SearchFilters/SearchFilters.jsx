import "./SearchFilters.css";

function SearchFilters({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies.."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="filters-row">
        <select className="filter-select">
          <option value="">Genre</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
        </select>

        <select className="filter-select">
          <option value="">Rating</option>
          <option value="8">8+</option>
          <option value="5-7">5–7</option>
          <option value="sub5">Sub 5</option>
        </select>

        <button className="sort-btn">A‑Z</button>
      </div>
    </div>
  );
}

export default SearchFilters;

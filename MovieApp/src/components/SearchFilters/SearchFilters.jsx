import "./SearchFilters.css";

function SearchFilters({ searchMovie, genre, rating, sort, setSearchMovie, setGenre, setRating, setSort }) {
  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies.."
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
        />
      </div>

      <div className="filters-row">
        <select className="filter-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Genre</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="fantasy">Fantasy</option>
        </select>

        <select className="filter-select" value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Rating</option>
          <option value="8">8+</option>
          <option value="5-7">5–7</option>
          <option value="sub5">Sub 5</option>
        </select>
        
        <button
          className={`sort-btn ${sort !== "none" ? "active" : ""}`}
          onClick={() => {
            if (sort === "none") setSort("asc");
            else if (sort === "asc") setSort("desc");
            else setSort("none");
          }}
        >
          {sort === "none" ? "Sort" : sort === "asc" ? "A‑Z" : "Z‑A"}
        </button>
      </div>
    </div>
  );
}

export default SearchFilters;

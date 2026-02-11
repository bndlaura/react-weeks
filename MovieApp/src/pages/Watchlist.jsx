import { useState } from "react";
import MovieList from "../components/MovieList/MovieList";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  function toggleWatchlist(movie) {
    const exists = watchlist.some((m) => m.id === movie.id);

    let updated;
    if (exists) {
      updated = watchlist.filter((m) => m.id !== movie.id);
    } else {
      updated = [...watchlist, movie];
    }

    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  return (
    <div className="watchlist-page">
 
      {watchlist.length === 0 ? (
        <p className="no-results">No movies added yet.</p>
      ) : (
        <MovieList
          movies={watchlist}
          watchlist={watchlist}
          toggleWatchlist={toggleWatchlist}
        />
      )}
    </div>
  );
}

export default Watchlist;

import { useWatchlist } from "../hooks/useWatchlist";
import MovieList from "../components/MovieList/MovieList";

function Watchlist() {
  const { watchlist, toggleWatchlist } = useWatchlist();
 
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

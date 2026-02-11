import MovieCard from "../MovieCard/MovieCard.jsx";
import "./MovieList.css";

function MovieList({ movies, watchlist, toggleWatchlist }) {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          isAdded={watchlist.some(m => m.id === movie.id)} 
          toggleWatchlist={toggleWatchlist} 
        />
      ))}
    </div>
  );
}

export default MovieList;

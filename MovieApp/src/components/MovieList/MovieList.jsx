import MovieCard from "../MovieCard/MovieCard.jsx";
import "./MovieList.css";

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;

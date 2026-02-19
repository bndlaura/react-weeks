import "./MovieCard.css";
import { Link } from "react-router-dom";

function MovieCard({ movie, isAdded, toggleWatchlist, setSelectedMovie }) {
    const getRatingColor = (rating) => { 
        const r = parseFloat(rating); 
        if (r >= 8) return "rating-green"; 
        if (r >= 5) return "rating-yellow"; 
        return "rating-red"; 
    };

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card-link">
      <div className="movie-card" id={`${movie.id}`} onClick={() => setSelectedMovie(movie)}>
        <div className="movie-image">
          <img src={`/assets/images/${movie.image}`} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-details">
              <p className="movie-genre">{movie.genre}</p>
              <p className={`movie-rating ${getRatingColor(movie.rating)}`}>
              <b>{movie.rating}</b>
            </p>
          </div>
        </div>

        <button className={`watchlist-btn ${isAdded ? "added" : ""}`} 
        onClick={(e) => {e.stopPropagation(); e.preventDefault(); toggleWatchlist(movie);}}
        >
          <span className="circle"></span>
          <span className="label">{isAdded ? "In Watchlist" : "Add to Watchlist"}</span>
        </button>
      </div>
    </Link>
  );
}

export default MovieCard;

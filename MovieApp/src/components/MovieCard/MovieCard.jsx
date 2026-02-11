import "./MovieCard.css";

function MovieCard({ movie, isAdded, toggleWatchlist }) {
    const getRatingColor = (rating) => { 
        const r = parseFloat(rating); 
        if (r >= 8) return "rating-green"; 
        if (r >= 5) return "rating-yellow"; 
        return "rating-red"; 
    };

  return (
    <div className="movie-card" id={`${movie.id}`}>
      <div className="movie-image">
        <img src={`assets/images/${movie.image}`} alt={movie.title} />
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
       onClick={() => {
        toggleWatchlist(movie);
       }}
       >
        <span className="circle"></span>
        <span className="label">{isAdded ? "In Watchlist" : "Add to Watchlist"}</span>
      </button>
    </div>
  );
}

export default MovieCard;

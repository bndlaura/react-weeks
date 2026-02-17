import "./MovieModal.css";

function MovieModal({ movie, isAdded, toggleWatchlist, onClose }) {

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-view-card" 
        id={`${movie.id}`}
        onClick={(e) => e.stopPropagation()}>
        <div className="modal-movie-image">
          <img src={`assets/images/${movie.image}`} alt={movie.title} />
        </div>

        <div className="modal-movie-info">
          <h3 className="modal-movie-title">{movie.title}</h3>
          <div className="modal-movie-details">
              <p className="modal-movie-genre">{movie.genre}</p>
              <p className={"modal-movie-rating"}>{movie.rating}</p>
          </div>
        </div>
        <button className={`modal-watchlist-btn ${isAdded ? "added" : ""}`}
          onClick={() => {
          toggleWatchlist(movie);
          }}
          >
          <span className="modal-circle"></span>
          <span className="modal-label">{isAdded ? "In Watchlist" : "Add to Watchlist"}</span>
        </button>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default MovieModal;
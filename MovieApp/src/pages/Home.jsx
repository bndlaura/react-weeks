import { useParams } from "react-router-dom";
import { useMemo, useCallback } from "react"; 
import { useState } from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import { useMovieFilters } from "../hooks/useMovieFilters";
import { useLoadMovies } from "../hooks/useLoadMovies";
import movies from "../data/movies.json";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchFilters from "../components/SearchFilters/SearchFilters.jsx";
import MovieModal from "../components/MovieModal/MovieModal.jsx";
import { filterAndSortMovies } from "../utils/filterMovies";

function Home() {
  const { id } = useParams();

  // Custom hook for loading movies with error handling
  const { loading, error } = useLoadMovies(movies);
 
  // Custom hook for managing filters and syncing with URL
  const {
  searchMovie,
  genre,
  rating,
  sort,
  setSearchMovie,
  setGenre,
  setRating,
  setSort
} = useMovieFilters();

  // Custom hook for watchlist management
  const { watchlist, toggleWatchlist } = useWatchlist();

  // State for selected movie in modal
  const [selectedMovie, setSelectedMovie] = useState(() => {
    if (!id) return null;
    return movies.find(m => m.id === parseInt(id)) || null;
  });

  // Memoized function to compute filtered and sorted movies
  const computeFilteredMovies = useCallback(() => {
    return filterAndSortMovies(movies, {
      searchMovie,
      genre,
      rating,
      sort
    });
  }, [searchMovie, genre, rating, sort]);

  const filteredMovies = useMemo(() => computeFilteredMovies(), [computeFilteredMovies]);

  if (loading) {
    return <p className="loading">Loading movies...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="home">
      <SearchFilters 
      searchMovie={searchMovie} 
      genre={genre} 
      rating={rating} 
      sort={sort} 
      setSearchMovie={setSearchMovie} 
      setGenre={setGenre} 
      setRating={setRating} 
      setSort={setSort} 
      />
      {filteredMovies.length === 0 ? (
        <p className="no-results">No movies found matching your criteria.</p>
      ) : (
        <MovieList 
        movies={filteredMovies} 
        watchlist={watchlist} 
        toggleWatchlist={toggleWatchlist} 
        setSelectedMovie={setSelectedMovie}
        />
      )}
       {selectedMovie && (
        <MovieModal 
        movie={selectedMovie}
        isAdded={watchlist.some(m => m.id === selectedMovie.id)}
        toggleWatchlist={toggleWatchlist}
        onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Home;

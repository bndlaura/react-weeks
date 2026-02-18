import { useParams } from "react-router-dom";
import { useState } from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import { useMovieFilters } from "../hooks/useMovieFilters";
import { useLoadMovies } from "../hooks/useLoadMovies";
import movies from "../data/movies.json";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchFilters from "../components/SearchFilters/SearchFilters.jsx";
import MovieModal from "../components/MovieModal/MovieModal.jsx";

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

  if (loading) {
    return <p className="loading">Loading movies...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  // Filter and sort movies based on current filters
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchMovie.toLowerCase()) ;
    const matchesGenre = genre ? movie.genre.toLowerCase() === genre.toLowerCase() : true;
    const matchesRating =
      rating === "8" ? movie.rating >= 8 :
      rating === "5-7" ? movie.rating >= 5 && movie.rating < 8 :
      rating === "sub5" ? movie.rating < 5 : true;
    return matchesSearch && matchesGenre && matchesRating;
  })
  .sort((a, b) => {
    if (sort === "asc") return a.title.localeCompare(b.title);
    if (sort === "desc") return b.title.localeCompare(a.title);
    return 0;
  });

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

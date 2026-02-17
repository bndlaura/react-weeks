import { useState, useEffect } from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import movies from "../data/movies.json";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchFilters from "../components/SearchFilters/SearchFilters.jsx";
import MovieModal from "../components/MovieModal/MovieModal.jsx";

import { useParams } from "react-router-dom";

function Home() {
  const { id } = useParams();
  // Load selected movie based on URL parameter
  useEffect(() => {
    if (id) {
      const movie = movies.find(m => m.id === parseInt(id));
      if (movie) {
        setSelectedMovie(movie);
      }
    }
  }, [id]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchMovie, setSearchMovie] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("none");

  // Custom hook for watchlist management
  const { watchlist, toggleWatchlist } = useWatchlist();

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    }, []);

  // Error handling for missing movies data
  useEffect(() => {
    try{
      if(!movies || movies.length === 0) {
        throw new Error("No movies found");
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  if (loading) {
    return <p className="loading">Loading movies...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

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

import { useState, useEffect } from "react";
import movies from "../data/movies.json";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchFilters from "../components/SearchFilters/SearchFilters.jsx";

function Home() {
  const [searchMovie, setSearchMovie] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("none");

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function toggleWatchlist(movie) {
  const exists = watchlist.some((m) => m.id === movie.id);

  if (exists) {
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
  } else {
    setWatchlist([...watchlist, movie]);
  }
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
        />
      )}
    </div>
  );
}

export default Home;

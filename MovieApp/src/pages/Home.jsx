import movies from "../data/movies.json";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchFilters from "../components/SearchFilters/SearchFilters.jsx";

function Home() {
  return (
    <div className="home">
      <SearchFilters />
      <MovieList movies={movies} />
    </div>
   
  );
}

export default Home;

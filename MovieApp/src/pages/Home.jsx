import movies from "../data/movies.json";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";

function Home() {
  return (
    <div className="home">
      <SearchBar />
      <MovieList movies={movies} />
    </div>
   
  );
}

export default Home;

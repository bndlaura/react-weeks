import movies from "../data/movies.json";
import MovieList from "../components/MovieList/MovieList.jsx";

function Home() {
  return (
    <MovieList movies={movies} />
  );
}

export default Home;

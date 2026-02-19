export function filterAndSortMovies(movies, { searchMovie, genre, rating, sort }) {
  const filtered = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchMovie.toLowerCase());
    const matchesGenre = genre ? movie.genre.toLowerCase() === genre.toLowerCase() : true;
    const matchesRating =
      rating === "8" ? movie.rating >= 8 :
      rating === "5-7" ? movie.rating >= 5 && movie.rating < 8 :
      rating === "sub5" ? movie.rating < 5 : true;

    return matchesSearch && matchesGenre && matchesRating;
  });

  return filtered.sort((a, b) => {
    if (sort === "asc") return a.title.localeCompare(b.title);
    if (sort === "desc") return b.title.localeCompare(a.title);
    return 0;
  });
}

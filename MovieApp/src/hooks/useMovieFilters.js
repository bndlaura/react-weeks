import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export function useMovieFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchMovie, setSearchMovie] = useState(() => searchParams.get("search") || "");
  const [genre, setGenre] = useState(() => searchParams.get("genre") || "");
  const [rating, setRating] = useState(() => searchParams.get("rating") || "");
  const [sort, setSort] = useState(() => searchParams.get("order") || "none");

  function updateFilters(updates) {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });

    setSearchParams(newParams);
  }

  return {
    searchMovie,
    genre,
    rating,
    sort,

    setSearchMovie: (v) => {
      setSearchMovie(v);
      updateFilters({ search: v });
    },

    setGenre: (v) => {
      setGenre(v);
      updateFilters({ genre: v });
    },

    setRating: (v) => {
      setRating(v);
      updateFilters({ rating: v });
    },

    setSort: (v) => {
      setSort(v);
      updateFilters({ order: v });
    },
  };
}

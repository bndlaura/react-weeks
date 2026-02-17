import { useState, useEffect } from "react";

export function useWatchlist() {
  // Load from localStorage once
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Add or remove a movie
  function toggleWatchlist(movie) {
    const exists = watchlist.some((m) => m.id === movie.id);

    const updated = exists
      ? watchlist.filter((m) => m.id !== movie.id)
      : [...watchlist, movie];

    setWatchlist(updated);
  }

  return {
    watchlist,
    toggleWatchlist
  };
}

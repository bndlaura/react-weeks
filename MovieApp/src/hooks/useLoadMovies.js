import { useState, useEffect } from "react";

export function useLoadMovies(movies) {
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

   // Error handling for missing movies data
  useEffect(() => {
    try {
      if (!movies || movies.length === 0) {
        throw new Error("No movies found");
      }
    } catch (err) {
      setError(err.message);
    }
  }, [movies]);

  return { loading, error, setError };
}

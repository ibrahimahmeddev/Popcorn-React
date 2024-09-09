import { useEffect, useState } from "react";
const KEY = "651687b7";

export function useFetchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorM, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    async function searchMovies() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie Not Found!");
        setMovies(data.Search);

        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
      }
    }
    // handleCloseMovie();
    searchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);
  return [movies, isLoading, errorM];
}

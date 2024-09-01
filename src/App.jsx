import { useEffect, useState } from "react";

import Navbar from "./components/NavbarCom/Navbar";
import ListMovies from "./components/ListMovies/ListMovies";
import WatchSummary from "./components/WatchMovies/WatchSummary";
import ListWatch from "./components/WatchMovies/ListWatch";
import NavResult from "./components/NavbarCom/NavResult";
import Main from "./components/Maincom/Main";
import Box from "./components/Maincom/Box/Box";
import Loader from "./components/Loader/Loader";
import NavSearch from "./components/NavbarCom/NavSearch";
import ErrorMessage from "./components/Error/ErrorMessage";
import MovieDetails from "./components/SelectedMovie/SelectedMovie";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "651687b7";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [errorM, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleDelelteMovie = (id) => {
    let filterWatched = watched.filter((watch) => watch.imdbID !== id);
    setWatched(filterWatched);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    console.log(movie);
  };

  const handleSearch = (setquery) => {
    setQuery(setquery);
  };

  const handleSelectedMovie = (id) => {
    setSelectedMovieId((selectedMovieId) =>
      id === selectedMovieId ? null : id
    );
  };

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
  };

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
    searchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <NavSearch handleSearch={handleSearch} query={query} />
        <NavResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {errorM && <ErrorMessage message={errorM} />}
          {!isLoading && !errorM && (
            <ListMovies
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummary watched={watched} />
              <ListWatch
                watched={watched}
                onDelelteMovie={handleDelelteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

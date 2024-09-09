import { useState } from "react";

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
import { useStorage } from "./customHooks/useStorage";
import { useFetchMovies } from "./customHooks/useFetchMovies";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// const KEY = "651687b7";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watched, setWatched] = useStorage([], "watched");
  const [movies, isLoading, errorM] = useFetchMovies(query);

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

  return (
    <>
      <Navbar>
        <NavSearch
          handleSearch={handleSearch}
          query={query}
          setQuery={setQuery}
        />
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

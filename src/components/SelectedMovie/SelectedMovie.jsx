import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Stars from "../Rating/Stars";
const KEY = "651687b7";
function MovieDetails({
  selectedMovieId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");

  // Check for do not repeat movie in watched movie list
  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);

  // Get user rating for exists movie
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAddWatched = () => {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title,
      poster,
      year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("CLOSING");
      }
    }

    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedMovieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "Popcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <Stars
                    maxRating={10}
                    size={24}
                    setUserRating={setUserRating}
                  />
                  {userRating && (
                    <button
                      className="btn-add"
                      onClick={() => handleAddWatched()}
                    >
                      Add Movie
                    </button>
                  )}
                </>
              ) : (
                <p>You rated with movie ⭐️{watchedUserRating} </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;

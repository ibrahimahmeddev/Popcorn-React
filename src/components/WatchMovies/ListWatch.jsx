import WatchedMovies from "./WatchedMovies";

function ListWatch({ watched, onDelelteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies
          movie={movie}
          key={movie.imdbRating}
          onDelelteMovie={onDelelteMovie}
        />
      ))}
    </ul>
  );
}

export default ListWatch;

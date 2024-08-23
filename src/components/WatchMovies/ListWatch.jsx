import WatchedMovies from "./WatchedMovies";

function ListWatch({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovies movie={movie} key={movie.imdbRating} />
      ))}
    </ul>
  );
}

export default ListWatch;

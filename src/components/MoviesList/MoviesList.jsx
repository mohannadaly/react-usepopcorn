import Movie from "./Movie/Movie";
import styles from "./style.module.css";
function MoviesList({ state: { movies }, dispatch }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onClick={() =>
            dispatch({ type: "selectMovie", payload: movie.imdbID })
          }
        />
      ))}
    </ul>
  );
}

export default MoviesList;

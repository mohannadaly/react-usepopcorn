import RatedMoviesSummary from "./RatedMoviesSummary/RatedMoviesSummary";
import PropTypes from "prop-types";
import styles from "./style.module.css";
RatedMoviesList.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
};
function RatedMoviesList({ dispatch, state: { ratedMovies } }) {
  const avgImdbRating = ratedMovies.reduce(
    (a, c) => a + Number(c.imdbRating),
    0
  );
  const avgUserRating = ratedMovies.reduce(
    (a, c) => a + Number(c.userRating),
    0
  );
  const avgTime = ratedMovies.reduce(
    (a, c) => a + Number(c.Runtime.replace("min", "")),
    0
  );
  return (
    <div className="box">
      <RatedMoviesSummary
        summary={{
          count: ratedMovies.length,
          avgImdbRating: Number(avgImdbRating).toFixed(1),
          avgUserRating: Number(avgUserRating).toFixed(1),
          avgTime: Number(avgTime).toFixed(1),
        }}
      />
      <ul className="list">
        {ratedMovies.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <div>
              <p>⭐ {movie.imdbRating}</p>
              <p>🌟 {movie.userRating}</p>
              <p>⌛ {movie.Runtime}</p>
            </div>
            <button
              className={styles.btnDelete}
              onClick={() => {
                dispatch({ type: "deleteMovie", payload: movie.imdbID });
                dispatch({ type: "saveState" });
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatedMoviesList;

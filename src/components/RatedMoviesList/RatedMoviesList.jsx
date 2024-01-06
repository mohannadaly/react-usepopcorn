import RatedMoviesSummary from "./RatedMoviesSummary/RatedMoviesSummary";
import styles from "./style.module.css";
function RatedMoviesList({ dispatch, state: { ratedMovies, selectedMovie } }) {
  return (
    <div className="box">
      <RatedMoviesSummary
        summary={{
          count: 0,
          avgImdbRating: 0,
          avgUserRating: 0,
          avgTime: 0,
        }}
      />
    </div>
  );
}

export default RatedMoviesList;

import styles from "./style.module.css";
function RatedMoviesSummary({
  summary: { count = 0, avgImdbRating = 0, avgUserRating = 0, avgTime = 0 },
}) {
  return (
    <div className={styles.summary}>
      <h2>Movies You Watched</h2>
      <div>
        <p>#️⃣ {count} Movies</p>
        <p>⭐ {avgImdbRating}</p>
        <p>✨ {avgUserRating}</p>
        <p>⌛ {avgTime} min</p>
      </div>
    </div>
  );
}

export default RatedMoviesSummary;

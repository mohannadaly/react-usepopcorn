import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Loader from "../ui/Loader/Loader";
import ErrorElement from "../ui/Error/ErrorElement";
import useKey from "../../hooks/useKey";

const API_KEY = "c27815d0";

function MovieDetails({ movieId, dispatch }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleBack = () => {
    dispatch({ type: "closeMovies" });
  };

  useEffect(() => {
    document.title = `${title}`;
    return () => {
      document.title = "usePopCorn";
    };
  }, [title]);

  useKey("escape", handleBack);

  useEffect(() => {
    const controller = new AbortController();
    async function getMovieData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movie data");
        const data = await res.json();
        setMovie(data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieData();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error.length > 0 && <ErrorElement>{error}</ErrorElement>}
      {!(isLoading || error.length > 0) && (
        <div className={styles.details}>
          <header>
            <button
              className={styles.btnBack}
              onClick={handleBack}
            >{`<`}</button>
            <img src={poster} alt={title} />
            <div className={styles.detailsOverview}>
              <h2>{title}</h2>
              <p>
                {released} • {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐{imdbRating} IMDB Rating</p>
            </div>
          </header>
          <section>
            <div className={styles.rating}></div>
            <p>{plot}</p>
            <p>{actors}</p>
            <p>{director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default MovieDetails;

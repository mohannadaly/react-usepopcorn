import "./index.css";
import { useReducer, useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/NavBar/Search/Search";
import ErrorElement from "./components/ui/Error/ErrorElement";
import Loader from "./components/ui/Loader/Loader";
import MoviesList from "./components/MoviesList/MoviesList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import RatedMoviesList from "./components/RatedMoviesList/RatedMoviesList";

const initialState = {
  movies: [],
  ratedMovies: [],
  searchQuery: "",
  error: "",
  loading: false,
  selectedMovie: "",
};
const API_KEY = "c27815d0";

function reducer(state, action) {
  switch (action.type) {
    case "search": {
      return { ...state, searchQuery: action.payload };
    }
    case "loading": {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case "ready": {
      return { ...state, movies: action.payload, error: "", loading: false };
    }
    case "error": {
      console.log(action.payload);
      return { ...state, error: action.payload, loading: false };
    }
    case "reset": {
      return { ...initialState, ratedMovies: state.ratedMovies };
    }
    case "selectMovie": {
      return {
        ...state,
        selectedMovie:
          action.payload === state.selectedMovie ? "" : action.payload,
      };
    }
    case "closeMovies": {
      return {
        ...state,
        selectedMovie: "",
      };
    }
    case "rateMovie": {
      const newState = {
        ...state,
        ratedMovies: [...state.ratedMovies, action.payload],
      };
      return newState;
    }
    case "deleteMovie": {
      const newRatedMovies = state.ratedMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
      return { ...state, ratedMovies: newRatedMovies };
    }
    case "loadState": {
      const storageItem = localStorage.getItem("ratedMovies");
      return JSON.parse(storageItem) || initialState;
    }
    case "saveState": {
      localStorage.setItem(
        "ratedMovies",
        JSON.stringify({ ...initialState, ratedMovies: state.ratedMovies })
      );
      return state;
    }
    default: {
      throw new Error(`Invalid action ${action.type}`);
    }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "loadState" });
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${state.searchQuery}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        dispatch({ type: "ready", payload: data.Search });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: "error", payload: err.message });
        }
      }
    }
    state.searchQuery.length > 2 && fetchData();
    return () => {
      controller.abort();
    };
  }, [state.searchQuery, dispatch]);
  return (
    <>
      <NavBar movieCount={state.movies.length}>
        <Search dispatch={dispatch} />
      </NavBar>

      <div className="main">
        <Box>
          {state.error?.length > 0 && (
            <ErrorElement>{state.error}</ErrorElement>
          )}
          {state.loading && <Loader />}
          {!state.loading && state.error?.length === 0 && (
            <MoviesList state={state} dispatch={dispatch} />
          )}
        </Box>
        <Box>
          {state.selectedMovie.length > 0 ? (
            <MovieDetails
              movieId={state.selectedMovie}
              dispatch={dispatch}
              ratedMovies={state.ratedMovies}
            />
          ) : (
            <RatedMoviesList dispatch={dispatch} state={state} />
          )}
        </Box>
      </div>
    </>
  );
}

function Box({ children }) {
  const [show, setShow] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => {
          setShow((s) => !s);
        }}
      >
        {show ? "-" : "+"}
      </button>
      {show && children}
    </div>
  );
}

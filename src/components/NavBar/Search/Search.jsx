import { useEffect, useRef } from "react";
import styles from "./style.module.css";

function Search({ dispatch }) {
  const searchRef = useRef();
  const handleSearch = (val) => {
    dispatch({ type: "search", payload: val });
  };
  useEffect(() => {
    const handleFocus = () => {
      searchRef.current.value = "";
      dispatch({ type: "reset" });
    };
    const element = searchRef.current;
    element.addEventListener("focus", handleFocus);
    return () => {
      element.removeEventListener("focus", handleFocus);
    };
  }, [dispatch]);
  return (
    <input
      type="text"
      placeholder="Search movies..."
      className={styles.search}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      ref={searchRef}
    />
  );
}

export default Search;

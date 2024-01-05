function Movie({ movie: { Title, Year, Poster }, onClick }) {
  return (
    <li onClick={onClick}>
      <img src={Poster} alt={Title} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;

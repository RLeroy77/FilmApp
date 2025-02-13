import React, { useContext } from "react";
import MovieItem from "./MovieItem";
import MovieContext from "../context/MovieContext";

const MovieList = () => {
  const { movies } = useContext(MovieContext);

  return (
    <div>
      {movies.length === 0 ? <p>Aucun film ajouté.</p> : movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;

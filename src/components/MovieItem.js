import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import MovieContext from "../context/MovieContext";

const MovieItem = ({ movie }) => {
  const { dispatch } = useContext(MovieContext);

  return (
    <div>
      <h3>{movie.title}</h3>
      <p>Note : {"⭐".repeat(movie.rating)}</p>
      <p>{movie.comment}</p>
      <Button
        variant="danger"
        onClick={() => dispatch({ type: "REMOVE_MOVIE", payload: movie.id })}
      >
        Supprimer
      </Button>
    </div>
  );
};

export default MovieItem;

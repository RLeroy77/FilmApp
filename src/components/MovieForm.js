import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import MovieContext from "../context/MovieContext";

const MovieForm = ({ movieToEdit }) => {
  const { dispatch } = useContext(MovieContext);
  const [title, setTitle] = useState(movieToEdit ? movieToEdit.title : "");
  const [rating, setRating] = useState(movieToEdit ? movieToEdit.rating : 3);
  const [comment, setComment] = useState(
    movieToEdit ? movieToEdit.comment : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const movie = {
      id: movieToEdit ? movieToEdit.id : Date.now(),
      title,
      rating,
      comment,
    };

    dispatch({
      type: movieToEdit ? "UPDATE_MOVIE" : "ADD_MOVIE",
      payload: movie,
    });
    setTitle("");
    setRating(3);
    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Titre du Film</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Note</Form.Label>
        <Form.Control
          as="select"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Commentaire</Form.Label>
        <Form.Control
          as="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {movieToEdit ? "Modifier" : "Ajouter"}
      </Button>
    </Form>
  );
};

export default MovieForm;

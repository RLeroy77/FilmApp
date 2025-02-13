import React, { useState, useContext } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import Filter from "../components/Filter";
import { MovieContext } from "../context/MovieContext"; 

const Home = () => {
  const { movies, dispatch } = useContext(MovieContext);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [editingMovie, setEditingMovie] = useState(null);

  const addMovie = () => {
    if (!title.trim()) return;

    const newMovie = {
      id: Date.now(),
      title,
      rating,
      comment,
    };

    dispatch({ type: "ADD_MOVIE", payload: newMovie });
    setTitle("");
    setRating(1);
    setComment("");
  };

  const deleteMovie = (id) => {
    dispatch({ type: "REMOVE_MOVIE", payload: id });
  };

  const startEditing = (movie) => {
    setEditingMovie(movie);
    setTitle(movie.title);
    setRating(movie.rating);
    setComment(movie.comment);
  };

  const saveEdit = () => {
    dispatch({
      type: "UPDATE_MOVIE",
      payload: { ...editingMovie, title, rating, comment },
    });
    setEditingMovie(null);
    setTitle("");
    setRating(1);
    setComment("");
  };

  const filteredMovies = filterRating
    ? movies.filter((movie) => movie.rating >= filterRating)
    : movies;

  return (
    <Container>
      <h2>Ma Cinémathèque 🎬</h2>

      <Form className="mb-4">
        <Form.Group>
          <Form.Label>Titre du Film</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Note</Form.Label>
          <Form.Select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} étoile{num > 1 ? "s" : ""} ⭐
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Commentaire</Form.Label>
          <Form.Control
            as="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button onClick={editingMovie ? saveEdit : addMovie} className="mt-3">
          {editingMovie ? "Modifier" : "Ajouter"} le Film
        </Button>
      </Form>

      <Filter filterRating={filterRating} setFilterRating={setFilterRating} />

      <Row className="mt-5">
        {filteredMovies.length === 0 ? (
          <p>Aucun film trouvé.</p>
        ) : (
          filteredMovies.map((movie) => (
            <Col key={movie.id} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p>Note : {"⭐".repeat(movie.rating)}</p>
                  {movie.comment && <p>Commentaire : {movie.comment}</p>}
                  <Button variant="primary" onClick={() => startEditing(movie)}>
                    Modifier
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Supprimer
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { fetchTrendingMovies } from "../utils/tmdb";
import { useWishlistContext } from "../context/WishlistContext";

const MoviesApi = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToWishlist } = useWishlistContext();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await fetchTrendingMovies(currentPage);
        if (Array.isArray(movieData)) {
          setMovies(movieData);
        } else {
          console.error("Données de films incorrectes :", movieData);
          setMovies([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
        setMovies([]);
      }
    };
    fetchMovies();
  }, [currentPage]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center" style={{ color: "#1d3557" }}>
        Films Populaires
      </h1>
      <Row>
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) => (
            <Col key={movie.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="h-100 shadow-lg rounded">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview.slice(0, 100)}...</Card.Text>
                  <div className="mt-auto">
                    <p>
                      <strong>Date de sortie:</strong> {movie.release_date}
                    </p>
                    <p>
                      <strong>Note:</strong> {movie.vote_average} / 10
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => addToWishlist(movie)}
                      className="w-100"
                    >
                      Ajouter à la Wishlist
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Aucun film disponible pour le moment.</p>
        )}
      </Row>
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Précédent
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default MoviesApi;

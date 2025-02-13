import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useWishlistContext } from "../context/WishlistContext";
import { fetchTrendingMovies } from "../utils/tmdb"; 

const MoviesApi = () => {
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const { wishlist, addToWishlist } = useWishlistContext();

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchTrendingMovies(currentPage);
      setMovies(data.results); 
      setTotalPages(data.total_pages); 
      setLoading(false);
    };

    getMovies();
  }, [currentPage]); 

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (movies.length === 0) {
    return <p>Aucun film disponible.</p>;
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Films Populaires</h1>
      <Row>
        {movies.map((movie) => {
          const isInWishlist = wishlist.some((item) => item.id === movie.id);

          return (
            <Col key={movie.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="h-100 d-flex flex-column">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>

                  <div className="mt-auto">
                    <div className="mb-2">
                      <strong>Date de sortie:</strong> {movie.release_date}
                    </div>
                    <div className="mb-3">
                      <strong>Note:</strong> {movie.vote_average} / 10
                    </div>

                    <Button
                      variant="primary"
                      onClick={() => addToWishlist(movie)}
                      disabled={isInWishlist}
                    >
                      {isInWishlist
                        ? "Déjà dans la wishlist"
                        : "Ajouter à la wishlist"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ms-2"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default MoviesApi;

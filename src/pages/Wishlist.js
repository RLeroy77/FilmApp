import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useWishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistContext();

  if (wishlist.length === 0) {
    return <p className="text-center mt-5">Votre wishlist est vide.</p>;
  }

  return (
    <div className="container">
      <h1 className="my-4 text-center">Ma Wishlist</h1>
      <Row>
        {wishlist.map((movie) => (
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
                    variant="danger"
                    onClick={() => removeFromWishlist(movie.id)}
                  >
                    Retirer de la wishlist
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Wishlist;

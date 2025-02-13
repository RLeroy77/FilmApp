import React, { useContext } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import WishlistContext from "../context/WishlistContext";

const WishlistList = () => {
  const { wishlist, dispatch } = useContext(WishlistContext);

  const removeFromWishlist = (id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  return (
    <Container>
      <h2>Ma Wishlist 📌</h2>
      <Row>
        {wishlist.length === 0 ? (
          <p>Aucun film dans la wishlist.</p>
        ) : (
          wishlist.map((movie) => (
            <Col key={movie.id} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => removeFromWishlist(movie.id)}
                  >
                    Retirer de la Wishlist
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

export default WishlistList;

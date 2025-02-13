import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FilmApp
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/wishlist">
            Wishlist
          </Nav.Link>
          <Nav.Link as={Link} to="/movies">
            Films API
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

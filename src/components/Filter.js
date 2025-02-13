import React from "react";
import { Form } from "react-bootstrap";

const Filter = ({ filterRating, setFilterRating }) => {
  return (
    <Form.Group controlId="filterRating">
      <Form.Label>Filtrer par note :</Form.Label>
      <Form.Select
        value={filterRating}
        onChange={(e) => setFilterRating(Number(e.target.value))}
      >
        <option value={0}>Toutes les notes</option>
        <option value={5}>5 étoiles ⭐⭐⭐⭐⭐</option>
        <option value={4}>4 étoiles et plus ⭐⭐⭐⭐</option>
        <option value={3}>3 étoiles et plus ⭐⭐⭐</option>
        <option value={2}>2 étoiles et plus ⭐⭐</option>
        <option value={1}>1 étoile et plus ⭐</option>
      </Form.Select>
    </Form.Group>
  );
};

export default Filter;

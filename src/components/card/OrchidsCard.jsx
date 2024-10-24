import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default function OrchidsCard({
  name,
  rating,
  image,
  color,
  origin,
  category,
  id,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card style={{ width: "300px" }}>
        <Card.Img
          style={{ alignSelf: "center", padding: "20px", borderRadius: "30px" }}
          variant="top"
          src={image}
        />
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>{name}</h4>
            <Button onClick={() => setShowModal(true)}>View Details</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{origin}</p>
          <p>{rating}</p>
          <p>{color}</p>
          <p>{category}</p>
          <p>{id}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

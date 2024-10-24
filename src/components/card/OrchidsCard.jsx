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
  video,
}) {
  const [showModal, setShowModal] = useState(false);
  const convertToEmbedLink = (videoUrl) => {
    return videoUrl ? videoUrl.replace("watch?v=", "embed/") : ""; // Kiểm tra videoUrl
  };
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
          <img src={image} alt={name} style={{ width: "300px" }} />
          <p>Category: {category}</p>
          <p>Color: {color}</p>
          <p>Origin: {origin}</p>
          <p>Rating: {rating}</p>

          {/* <iframe
            width="100%"
            height="315"
            src={convertToEmbedLink(video)}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          /> */}

          {video ? (
            <iframe
              width="100%"
              height="315"
              src={convertToEmbedLink(video)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <p>No video available.</p>
          )}
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

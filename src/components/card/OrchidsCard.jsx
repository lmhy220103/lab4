import { notification, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
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
  feedback,
  isSpecial,
}) {
  const [showModal, setShowModal] = useState(false);
  const [ratingStar, setRatingStar] = useState(0);
  const [comment, setComment] = useState("");
  const [hadFeedback, setHadFeedback] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const convertToEmbedLink = (videoUrl) => {
    return videoUrl ? videoUrl.replace("watch?v=", "embed/") : "";
  };

  useEffect(() => {
    const check = feedback.find((item) => item.author === user?.email);
    if (check) {
      setRatingStar(check.rating);
      setComment(check.comment);
      setHadFeedback(true);
    }
  }, [feedback, user]);

  async function handleFeedback() {
    feedback.push({
      rating: ratingStar,
      comment: comment,
      author: user.email,
      date: new Date(),
    });

    let orchid = {
      name,
      rating,
      isSpecial,
      image,
      color,
      origin,
      category,
      video,
      feedback,
    };

    fetch(`https://66ff148b2b9aac9c997e368a.mockapi.io/orchids/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orchid),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        notification.success({
          message: "Update user success",
        });
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Update user failed",
        });
      });
  }

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
            <h4 style={isSpecial ? { color: "red" } : {}}>{name}</h4>

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
          {video.includes("https://www.youtube.com/") ? (
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

          {user?.role !== 1 && (
            <>
              <h2>Your Feedback:</h2>
              <Rate
                value={ratingStar}
                onChange={(value) => setRatingStar(value)}
                disabled={hadFeedback}
              />
              <TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={hadFeedback}
              />
              <Button
                variant="dark"
                onClick={handleFeedback}
                disabled={hadFeedback}
              >
                Submit
              </Button>
            </>
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

import { notification } from "antd";
import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

export default function UserPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    number: user?.number || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    // Basic validation
    if (!profile.name || !profile.email) {
      setError("Name and email are required");
      setIsSubmitting(false);
      return;
    }

    fetch(`https://66ff148b2b9aac9c997e368a.mockapi.io/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        notification.success({
          message: "Update user success",
        });
        setIsSubmitting(false);
        localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Update user failed",
        });
      });
  };

  console.log(profile, user);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">Edit Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">Profile updated successfully!</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBio">
              <Form.Label>phone number</Form.Label>
              <Form.Control
                placeholder="enter your phone number"
                name="number"
                value={profile.number}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

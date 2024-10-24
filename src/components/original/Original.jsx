import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap"; // Nhập Row và Col từ react-bootstrap
import { ThemeContext } from "../../context/ThemeContext";

function Original({ orchids }) {
  const naturalOrchids = orchids.filter((orchid) => orchid.isSpecial);
  const { theme } = useContext(ThemeContext);

  return (
    <Row
      className="g-4"
      style={{
        padding: "30px",
        backgroundColor: theme == "light" ? "white" : "#121212",
        color: theme == "light" ? "black" : "white",
      }}
    >
      {" "}
      {/* Thêm khoảng cách giữa các hàng */}
      {naturalOrchids.map((orchid) => (
        <Col xs={12} sm={6} md={4} lg={3} key={orchid.id}>
          {" "}
          {/* Cấu hình kích thước cột */}
          <Card
            style={{
              marginTop: "30px",
              margin: "10px", // Thêm margin để tạo không gian giữa các card
            }}
          >
            <Card.Img variant="top" src={orchid.image} />
            <Card.Body>
              <Card.Title>{orchid.name}</Card.Title>
              <Card.Text>
                Origin: {orchid.origin} <br />
                Rating: {orchid.rating}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Original;

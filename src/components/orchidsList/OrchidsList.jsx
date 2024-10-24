import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { listOrchids } from "../../data/listOrchids";
import OrchidsCard from "../card/OrchidsCard";
import { Row, Col } from "react-bootstrap"; // Thêm Row và Col từ react-bootstrap
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

export const OrchidsList = () => {
  const [data, setData] = useState(listOrchids);
  const { theme } = useContext(ThemeContext); // Lấy theme hiện tại từ Context

  useEffect(() => {
    fetch("https://66ff148b2b9aac9c997e368a.mockapi.io/orchids")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);
  return (
    <Row
      className="g-4"
      style={{
        padding: "30px",
        backgroundColor: theme === "light" ? "white" : "#121212", // Chỉnh background dựa trên theme
        color: theme === "light" ? "black" : "white", // Chỉnh màu chữ dựa trên theme
      }}
    >
      {data.map((item) => (
        <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
          <OrchidsCard
            name={item.name}
            category={item.category}
            color={item.color}
            id={item.id}
            image={item.image}
            origin={item.origin}
            rating={item.rating}
            video={item.video}
          />
        </Col>
      ))}
    </Row>
  );
};

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { listOrchids } from "../../data/listOrchids";
import OrchidsCard from "../card/OrchidsCard";
import { Row, Col } from "react-bootstrap"; // Thêm Row và Col từ react-bootstrap
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

export const OrchidsList = () => {
  const [data, setData] = useState([]);
  const { theme } = useContext(ThemeContext); // Lấy theme hiện tại từ Context
  const [searchText, setSearchText] = useState("");

  const searchUserByName = async () => {
    try {
      const response = await fetch(
        `https://66ff148b2b9aac9c997e368a.mockapi.io/orchids?search=${searchText}`
      );
      const result = await response.json();

      if (response.ok) {
        console.log("Search results:", result); // Logs the filtered user list
        setData(result);
      } else {
        console.error("Error fetching users:", result.message);
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // const handleSearch = () => {
  //   if (onSearch) {
  //     onSearch(searchText);
  //   }
  // };

  console.log(data);

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
    <>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchText}
                onChange={handleInputChange}
                aria-label="Search by name"
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={searchUserByName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <Row
        className="g-4"
        style={{
          padding: "30px",
          backgroundColor: theme === "light" ? "white" : "#121212",
          color: theme === "light" ? "black" : "white",
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
              feedback={item?.feedback}
              isSpecial={item.isSpecial}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

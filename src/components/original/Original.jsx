// import React, { useContext } from "react";
// import { Card, Row, Col } from "react-bootstrap"; // Nhập Row và Col từ react-bootstrap
// import { ThemeContext } from "../../context/ThemeContext";

// function Original({ orchids }) {
//   const naturalOrchids = orchids.filter((item) => item.isSpecial);
//   const { theme } = useContext(ThemeContext);

//   return (
//     <Row
//       className="g-4"
//       style={{
//         padding: "30px",
//         backgroundColor: theme == "light" ? "white" : "#121212",
//         color: theme == "light" ? "black" : "white",
//       }}
//     >
//       {" "}
//       {/* Thêm khoảng cách giữa các hàng */}
//       {naturalOrchids.map((orchid) => (
//         <Col xs={12} sm={6} md={4} lg={3} key={orchid.id}>
//           {" "}
//           {/* Cấu hình kích thước cột */}
//           <Card
//             style={{
//               marginTop: "30px",
//               margin: "10px", // Thêm margin để tạo không gian giữa các card
//             }}
//           >
//             <Card.Img variant="top" src={orchid.image} />
//             <Card.Body>
//               <Card.Title>{orchid.name}</Card.Title>
//               <Card.Text>
//                 Origin: {orchid.origin} <br />
//                 Rating: {orchid.rating}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }

// export default Original;

import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col } from "react-bootstrap"; // Nhập Row và Col từ react-bootstrap
import { ThemeContext } from "../../context/ThemeContext";

function Original() {
  const [orchids, setOrchids] = useState([]); // State để lưu dữ liệu từ API
  const { theme } = useContext(ThemeContext);

  // Gọi API và lấy dữ liệu
  useEffect(() => {
    fetch("https://66ff148b2b9aac9c997e368a.mockapi.io/orchids")
      .then((response) => response.json())
      .then((data) => setOrchids(data)) // Lưu dữ liệu vào state
      .catch((error) => console.error("Error fetching orchids data:", error));
  }, []);

  // Lọc những dữ liệu có isSpecial = true
  const naturalOrchids = orchids.filter((item) => item.isSpecial);

  return (
    <Row
      className="g-4"
      style={{
        padding: "30px",
        backgroundColor: theme === "light" ? "white" : "#121212",
        color: theme === "light" ? "black" : "white",
      }}
    >
      {" "}
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

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/home");
  };
  return (
    <Navbar bg={theme} variant={theme === "light" ? "light" : "dark"}>
      <Container bg={theme} variant={theme === "light" ? "light" : "dark"}>
        <Navbar.Brand href="/home">OrchidsShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/natural">Original</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <button onClick={toggleTheme}>
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </button>
        </Nav>
        {accessToken ? (
          <div>
            <Nav.Link href="/admin/manager-orchid">Admin Page</Nav.Link>
            <hr />
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </Container>
    </Navbar>
  );
};

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Switch from "@mui/material/Switch";
// import { Link } from "react-router-dom";
// // import "./Navigationbar.css";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Contact", path: "/contact" },
//   { name: "Original", path: "/natural" },
// ];

// export const Header = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const handleThemeChange = () => {
//     setDarkMode((prevMode) => !prevMode);

//     if (!darkMode) {
//       document.body.style.backgroundColor = "#D4ADAD";
//       document.body.style.color = "#ffffff";
//     } else {
//       document.body.style.backgroundColor = "#ffffff";
//       document.body.style.color = "#000000";
//     }
//   };
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, textAlign: "left" }}
//           >
//             Orchids Garden
//           </Typography>
//           {navItems.map((item) => (
//             <Button
//               key={item.name}
//               sx={{ color: "#fff" }}
//               component={Link}
//               to={item.path}
//             >
//               {item.name}
//             </Button>
//           ))}
//           <Switch
//             checked={darkMode}
//             onChange={handleThemeChange}
//             inputProps={{ "aria-label": "controlled" }}
//           />
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default Header;

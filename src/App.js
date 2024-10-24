import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import Contact from "./components/orchidsList/Contact";
import OrchidDetail from "./components/orchidsList/OrchidDetail";
import { OrchidsList } from "./components/orchidsList/OrchidsList";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import About from "./components/about/About";
import Original from "./components/original/Original";
import { listOrchids } from "./data/listOrchids";
import { useContext, useEffect, useState } from "react";

function App() {
  const [orchids] = useState(listOrchids);
  // const { theme } = useContext(ThemeContext);

  // useEffect(() => {
  //   document.body.className = theme; // Thiết lập lớp cho body dựa trên theme
  // }, [theme]);
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<OrchidsList />} />
          <Route path="/home" element={<OrchidsList />} />
          <Route path="/orchid/:id" element={<OrchidDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/natural" element={<Original orchids={orchids} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

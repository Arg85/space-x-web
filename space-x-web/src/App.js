import logo from "./logo.svg";
import "./input.css";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import { MainContext } from "./ContextApi/MainContext";
import { useEffect, useState } from "react";
import MainContents from "./Components/MainContents";

function App() {
  const [data, setData] = useState([]);
  // Scroll to a section
  const handleScroll = () => {
    // console.log("called");
    const element = document.getElementById("section-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    fetch("http://localhost:80/Backend/index.php")
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        setData(data);
      }, 300);
    });
  }, []);
  return (
    <MainContext.Provider value={{data:data, scrolly: handleScroll }}>
      <Header />
      <Banner />
      <MainContents/>
    </MainContext.Provider>
  );
}

export default App;

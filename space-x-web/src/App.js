import logo from "./logo.svg";
import "./input.css";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import { MainContext } from "./ContextApi/MainContext";
import MainContents from "./Components/MainContents";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
function App() {
 
  // Scroll to a section
  const handleScroll = () => {
    // console.log("called");
    const element = document.getElementById("section-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
 
  return (
    <MainContext.Provider value={{ scrolly: handleScroll }}>
      <Header data-testid="app-id" />
      <Banner />
      <MainContents/>
    </MainContext.Provider>
  );
}

export default App;

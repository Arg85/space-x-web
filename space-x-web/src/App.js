import logo from './logo.svg';
import './input.css';
import Header from './Components/Header';
import Banner from './Components/Banner';

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
   <>
   <Header/>
<Banner/>
   </>
  );
}

export default App;

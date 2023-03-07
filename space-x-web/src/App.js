import "./input.css";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import { MainContext } from "./ContextApi/MainContext";
import MainContents from "./Components/MainContents";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useRef, useState } from "react";
import ScrollToTop from "./Components/ScrollToTop";
// import 'primeflex/primeflex.css';
function App() {
  const [values, setValues] = useState({
    status: "",
    type: "",
    launch: "",
    reset: 0,
  });
  const [launch, setLaunch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  // for formating data
  const formatData = (obj) => {
    if (typeof obj["type"] === "object") {
      obj["type"] = obj["type"].name;
    }
    if (typeof obj["status"] === "object") {
      obj["status"] = obj["status"].name;
    }
    if (typeof obj["launch"] === "object") {
      obj["launch"] = obj["launch"].name;
    }
    obj = obj.reset === 1 ? obj : { ...obj, reset: 0, };
    return obj;
  };
  const toast = useRef(null);
  // Scroll to a section
  const handleScroll = () => {
    // console.log("called");
    const element = document.getElementById("section-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MainContext.Provider
      value={{
        scrolly: handleScroll,
        values: values,
        setValues: setValues,
        data: data,
        setData: setData,
        loading: loading,
        setLoading: setLoading,
        limit: limit,
        setLimit: setLimit,
        page: page,
        setPage: setPage,
        totalRecords: totalRecords,
        setTotalRecords: setTotalRecords,
        formatData: formatData,
        toast: toast,
        setLaunch: setLaunch,
        launch: launch,
      }}
    >
      <Header data-testid="app-id" />
      <ScrollToTop/>
      <Banner />
      <MainContents />
    </MainContext.Provider>
  );
}

export default App;

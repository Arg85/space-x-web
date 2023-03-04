import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "../Styles/MainContents.css";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import { Paginator } from "primereact/paginator";

function MainContents() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [type, setType] = useState([
    { name: "Dragon 1.0" },
    { name: "Dragon 1.1" },
    { name: "Dragon 2.0" },
  ]);
  const [launch, setLaunch] = useState([]);
  const [status, setStatus] = useState([
    { name: "Active" },
    { name: "retired" },
    { name: "Unknown" },
    { name: "destroyed" },
  ]);
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    status: "",
    type: "",
    launch: "",
    reset: 0,
  });

  useEffect(() => {
    console.log("firstyyy usy");
    setLoading(true);
    fetch("http://localhost:80/Backend/index.php", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          const parsedData = JSON.parse(data);

          const LaunchList = parsedData.map((item) => {
            return { name: item.launches[0] };
          });

          setLaunch(LaunchList);
          setData(JSON.parse(data));
          setLoading(false);
        }, 300);
      });
  }, []);
  const sendRequest = async (obj) => {
    setLoading(true);
    if (typeof obj["type"] === "object") {
      obj["type"] = obj["type"].name;
    }
    if (typeof obj["status"] === "object") {
      obj["status"] = obj["status"].name;
    }
    if (typeof obj["launch"] === "object") {
      obj["launch"] = obj["launch"].name;
    }

    try {
      const res = await fetch("http://localhost:80/Backend/index.php", {
        method: "POST",
        body: JSON.stringify(obj.reset == 1 ? obj : { ...obj, reset: 0 }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      setLoading(false);
      if (obj.reset != 1) {
        if (data.docs) {
          setData(data.docs);
          setTotalRecords(data.totalDocs);
          setLimit(data.limit);
        }
        setData(data);
        setData(data.docs);
        setTotalRecords(data.totalDocs);
        setLimit(data.limit);
      }
    } catch (e) {
      setLoading(false);
      console.log(`Error Occured`);
    }
  };

  const setVal = (e) => {
    let obj = {
      status: values.status,
      type: values.type,
      launch: values.launch,
      limit: 10,
      page: 1,
    };
    setValues({ ...values, [e.target.name]: e.target.value });
    sendRequest({ ...obj, [e.target.name]: e.target.value });
  };

  const cardClick = () => {};
  const cardFooter = (item) => {
    return (
      <span>
        <button onClick={(e) => showDialog(item)}></button>
        <Button
          onClick={(e) => showDialog(item)}
          label="Show Details"
          icon="pi pi-info-circle"
        />
      </span>
    );
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);
  const handleReset = () => {
    const em = {
      status: "",
      type: "",
      launch: "",
      limit: 30,
      page: 1,
      reset: 1,
    };
    setValues(em);
    sendRequest(em);
  };
  const showDialog = (item) => {
    console.log(item, "sel");
    setSelectedItem(item);
    setVisible(true);
  };

  const hideDialog = () => {
    setSelectedItem(null);
    setVisible(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("kal--------");
      let obj = {
        status: values.status,
        type: values.type,
        launch: values.launch,
      };

      setLoading(true);
      if (typeof obj["type"] === "object") {
        obj["type"] = obj["type"].name;
      }
      if (typeof obj["status"] === "object") {
        obj["status"] = obj["status"].name;
      }
      if (typeof obj["launch"] === "object") {
        obj["launch"] = obj["launch"].name;
      }
      const fobj = [{ ...obj, limit: limit, page: page, reset: 0 }];
      console.log(fobj);
      const response = await fetch(`http://localhost:80/Backend/index.php`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(...fobj),
      });
      const d = await response.json();
      console.log(d, "--------");
      setData(d.docs);
      setTotalRecords(d.totalDocs);

      setLoading(false);
    };
    if (page != 0) {
      fetchData();
    }
  }, [page, limit]);
  return (
    <div id="section-1">
      <form>
        <div className="FilterHeader">
          <h2>Filters</h2>
        </div>
        <div className="row">
          <div className="inputfield">
            <span className="p-float-label">
              <Dropdown
                inputId="dd-type"
                name="type"
                value={values.type}
                onChange={setVal}
                options={type}
                optionLabel="name"
                className="w-full md:w-14rem"
              />
              <label htmlFor="dd-type">Select a Type</label>
            </span>
          </div>
          <div className="inputfield">
            <span className="p-float-label">
              <Dropdown
                inputId="dd-status"
                name="status"
                value={values.status}
                onChange={setVal}
                options={status}
                optionLabel="name"
                className="w-full md:w-14rem"
              />
              <label htmlFor="dd-status">Select a Status</label>
            </span>
          </div>
        </div>
        <div className="inputfield">
          <span className="p-float-label">
            <Dropdown
              inputId="dd-launch"
              name="launch"
              value={values.launch}
              onChange={setVal}
              options={launch}
              optionLabel="name"
              className="w-full md:w-14rem"
            />
            <label htmlFor="dd-launch">Select a Launch</label>
          </span>
        </div>
      </form>
      <Button onClick={handleReset}>Reset</Button>
      {loading ? (
        <div className="card flex justify-content-center">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="p-grid">
          {data.docs
            ? data?.docs.map((item) => {
                return (
                  <div key={item.serial} className="p-col-12 p-col-md-4 p-card">
                    <Card
                      title={item.serial}
                      subTitle={item.last_update}
                      footer={cardFooter(item)}
                    />
                  </div>
                );
              })
            : data?.map((item) => {
                return (
                  <div key={item.serial} className="p-col-12 p-col-md-4 p-card">
                    <Card
                      title={item.serial}
                      subTitle={item.last_update}
                      footer={cardFooter(item)}
                    />
                  </div>
                );
              })}
          {data.length === 0 && (
            <div className="text-center bg-white">
              <h5>No Capsules available </h5>
            </div>
          )}
        </div>
      )}
      <Dialog
        header={selectedItem?.serial}
        visible={visible}
        onHide={hideDialog}
      >
        <div>
          <div>
            {" "}
            Serial:{" "}
            {selectedItem?.serial ? selectedItem?.serial : "Not available"}
          </div>
          <div>
            {" "}
            last_update:{" "}
            {selectedItem?.last_update
              ? selectedItem?.last_update
              : "Not available"}
          </div>
          <div>
            {" "}
            water_landings:{" "}
            {selectedItem?.water_landings
              ? selectedItem?.water_landings
              : "Not available"}
          </div>
          <div>
            {" "}
            reuse_count:{" "}
            {selectedItem?.reuse_count
              ? selectedItem?.reuse_count
              : "Not available"}
          </div>
          <div>
            {" "}
            land_landings:{" "}
            {selectedItem?.land_landings
              ? selectedItem?.land_landings
              : "Not available"}
          </div>
          <div>
            {" "}
            type: {selectedItem?.type ? selectedItem?.type : "Not available"}
          </div>
        </div>
      </Dialog>

      <div className="card">
        <Paginator
          first={page * limit}
          rows={limit}
          totalRecords={totalRecords}
          onPageChange={(e) => {
            setPage(e.page + 1);
          }}
        />
      </div>
    </div>
  );
}

export default MainContents;

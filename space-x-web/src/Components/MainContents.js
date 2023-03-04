import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "../Styles/MainContents.css";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { ProgressSpinner } from "primereact/progressspinner";

import { Paginator } from "primereact/paginator";

function MainContents() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState({
    status: "",
    type: "",
    launch: "",
  });
  const [data, setData] = useState([]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:80/Backend/index.php")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setData(JSON.parse(data));
          setLoading(false);
          console.log(data);
        }, 300);
      });
  }, []);
  const sendRequest = async (obj) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:80/Backend/index.php", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      setLoading(false);
      console.log(data.docs, "docssss");
      if (data.docs) {
        console.log(data.docs, "docssss2");

        setData(data.docs);
        setTotalRecords(data.totalDocs);
        setLimit(data.limit);
      }
      setData(data);
      setData(data.docs);
      setTotalRecords(data.totalDocs);
      setLimit(data.limit);
    } catch (e) {
      setLoading(false);
      console.log(`Error Occured`);
    }
  };

  const handleSubmit = (ob) => {
    let obj = {
      status: values.status,
      type: values.type,
      launch: values.launch,
    };
    sendRequest({ ...obj, ...ob });
  };

  const setVal = (e) => {
    let obj = {
      status: values.status,
      type: values.type,
      launch: values.launch,
    };
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values, "vlal--------------");
    console.log({ ...obj, [e.target.name]: e.target.value.name });
    sendRequest({ ...obj, [e.target.name]: e.target.value.name });
  };

  const status = [
    { name: "Active" },
    { name: "retired" },
    { name: "Unknown" },
    { name: "destroyed" },
  ];

  const type = [
    { name: "Dragon 1.0" },
    { name: "Dragon 1.1" },
    { name: "Dragon 2.0" },
  ];

  const launch = [
    { name: "Falcon 1" },
    { name: "Falcon 9" },
    { name: "Falcon Heavy" },
  ];
  const cardClick = () => {};
  const cardFooter = (item) => {
    return (
      <span>
        <button onClick={(e) => showDialog(item)}></button>
        <Button  onClick={(e) => showDialog(item)} label="Show Details" icon="pi pi-info-circle" />

      </span>
    );
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);

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
      setLoading(true);
      const response = await fetch(
        `https://api.spacexdata.com/v4/capsules/query`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            options: { limit: limit, page: page },
          }),
        }
      );
      const d = await response.json();
      console.log(d, "--------");
      setData(d.docs);
      setTotalRecords(d.totalDocs);
      setPage(d.page);
      setLoading(false);
      //   setTotalLaunches(response.headers['spacex-api-count']);
    };
    if (page != 0) {
      fetchData();
    }
  }, [page, limit]);
  return (
    <div id="section-1">
      <form>
        <div className="FilterHeader"><h2>Filters</h2></div>
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
              {data.length===0 && <div className="text-center bg-white"><h5>No Capsules available </h5></div>}
        </div>
      )}
      <Dialog
        header={selectedItem?.serial}
        visible={visible}
        onHide={hideDialog}
      >
        <div>
          <div>  Serial: {selectedItem?.serial? (selectedItem?.serial): "Not available"}</div>
          <div> last_update:  {selectedItem?.last_update? (selectedItem?.last_update): "Not available"}</div>
          <div> water_landings: {selectedItem?.water_landings? (selectedItem?.water_landings): "Not available"}</div>
          <div> reuse_count:  {selectedItem?.reuse_count? (selectedItem?.reuse_count): "Not available"}</div>
          <div> land_landings:  {selectedItem?.land_landings? (selectedItem?.land_landings): "Not available"}</div>
          <div> type: {selectedItem?.type? (selectedItem?.type): "Not available"}</div>
        </div>
      </Dialog>

      <div className="card">
        <Paginator
          first={page * limit}
          rows={limit}
          totalRecords={totalRecords}
          onPageChange={(e) => {
            console.log(e);
            setPage(e.page + 1);
          }}
        />
      </div>
    </div>
  );
}

export default MainContents;

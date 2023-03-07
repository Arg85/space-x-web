/* eslint-disable */
import React, { useContext, useEffect, useRef, useState } from "react";
import "../Styles/MainContents.css";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import { Paginator } from "primereact/paginator";

import FIlter from "./FIlter";
import { MainContext } from "../ContextApi/MainContext";
import { Toast } from "primereact/toast";

function MainContents() {

  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);


  let { values,data,setData,loading,setLoading,setLaunch,limit,page,setTotalRecords,totalRecords,setPage,toast } = useContext(MainContext);


  useEffect((obj) => {
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

      const response = await fetch(`http://localhost:80/Backend/index.php`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(...fobj),
      });
      const d = await response.json();
      setData(d.docs);
      setTotalRecords(d.totalDocs);

      setLoading(false);
    };
    if (page != 0 && limit<30) {
      fetchData();
    }
  }, [page, limit]);
  return (
    <div id="section-1" data-testid="section-id">
      <Toast ref={toast} />
   <FIlter/>

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
          {(data?.length === 0 || data?.docs?.length===0) && (
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

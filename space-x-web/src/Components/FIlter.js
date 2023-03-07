/* eslint-disable */
import React, { useContext, useState } from 'react'
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { MainContext } from "../ContextApi/MainContext";

function FIlter() {
    const [type, setType] = useState([
        { name: "Dragon 1.0" },
        { name: "Dragon 1.1" },
        { name: "Dragon 2.0" },
      ]);
   
      const [status, setStatus] = useState([
        { name: "Active" },
        { name: "retired" },
        { name: "Unknown" },
        { name: "destroyed" },
      ]);
      let { values,setValues,setData,setLoading,formatData,setTotalRecords,setLimit,toast,launch,limit,page,setPage } = useContext(MainContext);
      const sendRequest = async (obj) => {
        setLoading(true);
      const obj2=formatData(obj)
    
        try {
          const res = await fetch("http://localhost:80/Backend/index.php", {
            method: "POST",
            // body: JSON.stringify(obj.reset == 1 ? obj : { ...obj, reset: 0 }),
            body: JSON.stringify(obj2),
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
           
            setTotalRecords(data.totalDocs);
            setLimit(data.limit);
          }
          else if (obj.reset == 1) {
            setData(data.docs);
            console.log("odi")
           
            setLimit(30);
            setTotalRecords(data.totalDocs);
    
          }
          
        } catch (e) {
          setLoading(false);
          console.log(`Error Occured`);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: e,
            life: 3000,
          });
        }
      };
  const handleReset = (e) => {
    e.preventDefault()
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
    const setVal = (e) => {
        console.log(page)
        let obj = {
            status: values.status,
            type: values.type,
            launch: values.launch,
            limit: 10,
            page: 1,
        };
        setValues({ ...values, [e.target.name]: e.target.value });
        sendRequest({ ...obj, [e.target.name]: e.target.value });
        console.log("called",limit,page)
      };
  return (
    <>
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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </form>
    </>
  )
}

export default FIlter
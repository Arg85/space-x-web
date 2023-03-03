import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../Styles/MainContents.css';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';

import { Paginator } from 'primereact/paginator';
        
function MainContents() {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
  const [values, setValues] = useState({
    status: '',
    type: '',
    launch: '',
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:80/Backend/index.php")
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        setData(JSON.parse(data));
        console.log(data)
      }, 300);
    });
  }, []);
  const sendRequest = async (obj) => {
    try {
      const res = await fetch('http://localhost:80/Backend/index.php', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      console.log(data.docs,"docssss")
      if(data.docs){
          console.log(data.docs,"docssss2")

          setData(data.docs);
          setTotalRecords(data.docs.totalPages)
        }
        setData(data);
    } catch (e) {
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
    
    
    setValues({ ...obj, [e.target.name]: e.target.value.name });
    console.log({ ...obj, [e.target.name]: e.target.value.name })
    sendRequest( { ...obj, [e.target.name]: e.target.value.name });
  };

  const status = [
    { name: 'Active' },
    { name: 'retired' },
    { name: 'Unknown' },
    { name: 'destroyed' },
  ];

  const type = [
    { name: 'Dragon 1.0' },
    { name: 'Dragon 1.1' },
    { name: 'Dragon 2.0' },
  ];

  const launch = [
    { name: 'Falcon 1' },
    { name: 'Falcon 9' },
    { name: 'Falcon Heavy' },
  ];
const cardClick=()=>{

}
const cardFooter = (
    <span>
      <button onClick={(e) => showDialog(e)}>Show Details</button>
    </span>
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);

  const showDialog = (item) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const hideDialog = () => {
    setSelectedItem(null);
    setVisible(false);
  };
  
  return (
    <div id="section-1">
      <form>
        <div className="row">
          <div className="inputfield">
            <span className="p-float-label">
              <Dropdown
                inputId="dd-status"
                name="status"
                value={values.status}
                onChange={(e) => setVal(e)}
                options={status}
                optionLabel="name"
                className="w-full md:w-14rem"
              />
              <label htmlFor="dd-status">Select a Status</label>
            </span>
          </div>
          <div className="inputfield">
            <span className="p-float-label">
              <Dropdown
                inputId="dd-type"
                name="type"
                value={values.type}
                onChange={(e) => setVal(e)}
                options={type}
                optionLabel="name"
                className="w-full md:w-14rem"
              />
              <label htmlFor="dd-type">Select a Type</label>
            </span>
          </div>
        </div>
        <div className="inputfield">
          <span className="p-float-label">
            <Dropdown
              inputId="dd-launch"
              name="launch"
              value={values.launch}
              onChange={(e) => setVal(e)}
              options={launch}
              optionLabel="name"
              className="w-full md:w-14rem"
            />
            <label htmlFor="dd-launch">Select a Launch</label>
          </span>
        </div>
      </form>
    <div className="p-grid">
      {data.docs?data?.docs.map((item)=>{
        return (
            <div key={item.serial} className="p-col-12 p-col-md-4 p-card">
  <Card title={item.serial} subTitle={item.last_update} footer={cardFooter} /></div>
)
      }):(data?.map((item)=>{
        return (
            <div key={item.serial} className="p-col-12 p-col-md-4 p-card">
  <Card title={item.serial} subTitle={item.last_update} footer={cardFooter} /></div>
)
      }))
    }
      <Dialog header={selectedItem?.serial} visible={visible} onHide={hideDialog}>
        {selectedItem ? <p>{selectedItem.details}</p> : null}
      </Dialog>
    </div>
    <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
        </div>
    </div>
  );
}

export default MainContents;

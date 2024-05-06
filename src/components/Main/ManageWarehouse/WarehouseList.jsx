import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import "../../commonForAll/MainTable.css";
import "../../../css/Table.css";
import ContentHeader from "../../header/ContentHeader";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"


export default function WarehouseList() {
  useEffect(() => {
    fetchData();
  }, []);
  const [WarehouseData, setWarehouseData] = useState([]);
  const tableRef = useRef(null);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8081/warehouse");
      // console.log(result);
      setWarehouseData(result.data);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };

  const downloadExcel = () => {
    const tableEl = tableRef.current;  // Accessing the table DOM element
    if (tableEl) {
      const workbook = XLSX.utils.table_to_book(tableEl);  // Converts a table DOM element to a workbook
      XLSX.writeFile(workbook, 'warehoseList.xlsx');  // Writing the file
    }
  };
  const reload = () => {
    location.reload();
  }

  const [warehousetype, setWarehousetype] = useState('None');
  const [state, setState] = useState('None');

  const handleWarehousetype = (event) => {
    setWarehousetype(event.target.value);
  };

  const handleState = (event) => {
    // console.log(event.target.value);
    setState(event.target.value);
  };

  return (
    <>
      <div className="main_con">
        <ContentHeader
          name="Warehouse List"
          sub_content="Information about Warehouses"
        />
        <div className="layout2">
          <div className="res-form res-form2">
            <div className="form-box form-box2">
              <div className="select1">
                <select
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                  value={warehousetype}
                  onChange={handleWarehousetype}
                >
                  <option className="form-control form-control2  " value="None">
                    Select Type
                  </option>
                  <option className="form-control form-control2 " value="Center warehouse">
                    Center warehouse
                  </option>
                  <option
                    className="form-control form-control2 "
                    value="Sub warehouse"
                  >
                    Sub warehouse
                  </option>
                  <option
                    className="form-control form-control2 "
                    value="Outlet"
                  >
                    Outlet
                  </option>

                </select>
              </div>
              <div className="select2">
                <select
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                  value={state}
                  onChange={handleState}
                >
                  <option className="form-control form-control2 " value="None">
                    Select State
                  </option>
                  <option className="form-control form-control2 " value="Bihar">
                    Bihar
                  </option>
                  <option className="form-control form-control2 " value="Uttar Pradesh">
                    Uttar Pradesh
                  </option>
                  <option className="form-control form-control2 " value="Gujarat">
                    Gujarat
                  </option>
                  <option className="form-control form-control2 " value="Haryana">
                    Haryana
                  </option>
                  <option className="form-control form-control2 " value="Punjab">
                    Punjab
                  </option>
                  <option className="form-control form-control2 " value="Maharashtra">
                    Maharashtra
                  </option>

                </select>
              </div>

              <div
                className="input-group  mainSearch mb-3"
              >
                <input
                  type="search"
                  className="form-control  form-control2 search-table"
                  tabIndex="-1"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i
                  className="bi bi-search Icon searchIconTable"
                />

                <i onClick={reload}
                  className="bi Icon reloadIcon bi-arrow-clockwise"

                />
                <i
                  onClick={downloadExcel}
                  className="fa-solid download Icon fa-arrow-down"
                />

              </div>
            </div>
            <div className="table2 responsive-table">

              <table className="table table-bordered" ref={tableRef}>
                <thead className="table-success">
                  <tr>
                    <th>Sr. no</th>
                    <th>Warehouse_id</th>
                    <th>Warehouse_type</th>
                    <th>State</th>
                    <th>city</th>
                    <th>area</th>
                    <th>SuperiorWarehouse</th>


                  </tr>
                </thead>
                <tbody>
                  {WarehouseData.filter((item) => {
                    //filter
                    if (warehousetype !== 'None' && item.Warehouse_type !== warehousetype) return false;
                    if (state !== 'None' && item.State !== state) return false;


                    if (search.trim() === '') return true;  // Return all items if search is empty

                    // Convert search term to lowercase
                    const lowerCaseSearch = search.toLowerCase();

                    // Check if any of the specified fields include the search term
                    return (
                      (item.Warehouse_id && item.Warehouse_id.toString().toLowerCase().includes(lowerCaseSearch)) ||
                      (item.Warehouse_type && item.Warehouse_type.toLowerCase().includes(lowerCaseSearch)) ||
                      (item.State && item.State.toString().toLowerCase().includes(lowerCaseSearch)) ||
                      (item.city && item.city.toString().toLowerCase().includes(lowerCaseSearch)) ||
                      (item.area && item.area.toString().toLowerCase().includes(lowerCaseSearch)) ||
                      (item.SuperiorWarehouse && item.SuperiorWarehouse.toString().toLowerCase().includes(lowerCaseSearch))

                    );
                  }).map((warehouse, i) => {
                    return (
                      <tr key={i}>
                        <td> {i + 1} </td>
                        <td> {warehouse.Warehouse_id} </td>
                        <td> {warehouse.Warehouse_type} </td>
                        <td> {warehouse.State} </td>
                        <td> {warehouse.city} </td>
                        <td> {warehouse.area} </td>
                        <td> {warehouse.SuperiorWarehouse} </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>


              <div className="plusIcon">
                <Link to="/add-warehouse">
                  <i className="fa-solid fa-circle-plus"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>









      {/* 
      <div id="mainTables">
        <div className="horizontal-scroll2">
          <div className="scrollable-table-container2">
            <table>
              <thead>
                <tr>
                  <th>Sr. no</th>
                  <th>Warehouse_id</th>
                  <th>Warehouse_type</th>
                  <th>State</th>
                  <th>city</th>
                  <th>area</th>
                  <th>SuperiorWarehouse</th>
                  
                  
                </tr>
              </thead>
              <tbody>
                {WarehouseData.map((warehouse, i) => {
                  return (
                    <tr key={i}>
                      <td> {i + 1} </td>
                      <td> {warehouse.Warehouse_id} </td>
                      <td> {warehouse.Warehouse_type} </td>
                      <td> {warehouse.State} </td>
                      <td> {warehouse.city} </td>
                      <td> {warehouse.area} </td>
                      <td> {warehouse.SuperiorWarehouse} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
      <div className="plusIcon">
        <Link to='/add-warehouse'>
          <i className="fa-solid fa-circle-plus"></i>
          </Link>
      </div>
        </div>
      </div> */}
    </>
  );
}

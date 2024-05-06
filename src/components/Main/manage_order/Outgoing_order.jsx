import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import "../../commonForAll/MainTable.css";
// import { Link } from "react-router-dom";
// import Invoice from "../../invoice/Invoice";
import "../../../css/Table.css";
import ContentHeader from "../../header/ContentHeader";
import * as XLSX from "xlsx";

export default function Outgoing_order() {
  const [OrderData, setOrderData] = useState([]);
  const [search, setSearch] = useState("");
  const [productlist, setproductlist] = useState([]);
  const [managerlist, setmanager] = useState([]);

  const [user, setUser] = useState(window.localStorage.getItem("user"));

  const fetchmanager = async () => {
    const username = window.localStorage.getItem("user");

    try {
      const result = await axios.get("http://localhost:8081/getManager", {
        params: {
          username: username,
        },
      });
      // const data = await setOrderData(result.data);
      setmanager(result.data);
      // console.log(OrderData);
    } catch (err) {
      console.log("Error occurred while fetching order data:", err);
    }
  };

  const fetchProductlist = async () => {
    try {
      const result = await axios.get("http://localhost:8081/products");
      // console.log(result);
      setproductlist(result.data);
      console.log(productlist);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };

  const tableRef = useRef(null);
  const [productFilter, setProductFilter] = useState("None");

  const handleProductFilterChange = (event) => {
    // console.log(event.target.value);
    setProductFilter(event.target.value);
  };

  const downloadExcel = () => {
    const tableEl = tableRef.current; // Accessing the table DOM element
    if (tableEl) {
      const workbook = XLSX.utils.table_to_book(tableEl); // Converts a table DOM element to a workbook
      XLSX.writeFile(workbook, "outgoing_order.xlsx"); // Writing the file
    }
  };
  const fetchData = async () => {
    const username = window.localStorage.getItem("user");

    try {
      const result = await axios.get("http://localhost:8081/outgoingorder", {
        params: {
          username: username === "Admin" ? user : username,
        },
      });
      // console.log(result);
      setOrderData(result.data);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const reload = () => {
    location.reload();
  };
  useEffect(() => {
    fetchData();
    fetchProductlist();
    fetchmanager();
  }, [user]);

  return (
    <>
      <div className="main_con">
        <ContentHeader
          name="Outgoing Orders"
          sub_content="Information about Outgoing Orders"
        />
        <div className="layout2">
          <div className="res-form res-form2">
            <div className="form-box form-box2">
              <div className="select1">
                <select
                  disabled={localStorage.getItem("user") !== "Admin"}
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                >
                  <option className="form-control form-control2 " value="None">
                    Select warehouse
                  </option>
                  {managerlist.map((manager, index) => (
                    <option value={manager.User_id} key={index}>
                      {manager.User_id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select2">
                <select
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                  value={productFilter}
                  onChange={handleProductFilterChange}
                >
                  <option className="form-control form-control2  " value="None">
                    Select Product
                  </option>

                  {productlist.map((product, index) => (
                    <option value={product.Product_name} key={index}>
                      {product.Product_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group  mainSearch mb-3">
                <input
                  type="search"
                  className="form-control  form-control2 search-table"
                  tabIndex="-1"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="bi bi-search Icon searchIconTable" />

                <i
                  onClick={reload}
                  className="bi Icon reloadIcon bi-arrow-clockwise"
                />
                <i
                  onClick={downloadExcel}
                  className="fa-solid download Icon fa-arrow-down"
                />
              </div>
            </div>
            <div className="table2 ">
              <table className="table table-bordered" ref={tableRef}>
                <thead className="table-success">
                  <tr>
                    <th>Sr. no</th>
                    <th>Order_id</th>
                    <th>Product_name</th>
                    <th>Quantity</th>
                    <th>Order_status</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderData.filter((item) => {
                    //filter
                    if (
                      productFilter !== "None" &&
                      item.Product_name !== productFilter
                    )
                      return false;
                    // if (warehouse !== 'None' && item.User_id !== warehouse) return false;

                    //search
                    if (search.trim() === "") return true; // Return all items if search is empty

                    // Convert search term to lowercase
                    const lowerCaseSearch = search.toLowerCase();

                    // Check if any of the specified fields include the search term
                    return (
                      (item.Order_id &&
                        item.Order_id.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Product_name &&
                        item.Product_name.toLowerCase().includes(
                          lowerCaseSearch
                        )) ||
                      (item.Quantity &&
                        item.Quantity.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Order_status &&
                        item.Order_status.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Description &&
                        item.Description.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch))
                    );
                  }).map((Order, i) => {
                    const status = Order.Order_status==="Recieved" ? "Delivered":Order.Order_status; 
                    return (
                      <tr key={Order.Order_id}>
                        <td> {i + 1} </td>
                        <td> {Order.Order_id} </td>
                        <td> {Order.Product_name} </td>
                        <td> {Order.Quantity} </td>
                        <td
                          className={
                            Order.Order_status === "Returned"
                              ? "badge rounded-pill text-bg-warning m-2"
                              : Order.Order_status === "Recieved"
                              ? "badge rounded-pill text-bg-info m-2"
                              : Order.Order_status === "pending"
                              ? "badge rounded-pill text-bg-secondary  m-2"
                              : Order.Order_status === "Accepted"
                              ? "badge rounded-pill text-bg-success  m-2"
                              : Order.Order_status === "Rejected"
                              ? "badge rounded-pill text-bg-danger  m-2"
                              : ""
                          }
                        >
                          {" "}
                          {status}{" "}
                        </td>
                        <td> {Order.Description} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import ContentHeader from "../../header/ContentHeader";
import "../../../css/history.css";
import axios from "axios";
import * as XLSX from "xlsx";

const History = () => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const tableRef = useRef(null);
  const [search, setSearch] = useState("");

  const [OrderData, setOrderData] = useState([]);

  const downloadExcel = () => {
    const tableEl = tableRef.current; // Accessing the table DOM element
    if (tableEl) {
      const workbook = XLSX.utils.table_to_book(tableEl); // Converts a table DOM element to a workbook
      XLSX.writeFile(workbook, "History.xlsx"); // Writing the file
    }
  };

  const reload = () => {
    location.reload();
  };

  const fetchData = async () => {
    const username = window.localStorage.getItem("user");
    try {
      const result = await axios.get("http://localhost:8081/history", {
        params: {
          username: username,
        },
      });
      // console.log(result);
      setOrderData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="main_con">
        <ContentHeader
          name={"History"}
          sub_content={"Here are history of orders"}
        />
        {/* <div className="main_table_contanier">
                    <div className="table-content">
                        <table className="table table-hover table-bordered table-responsive" id='collapse1'>
                            <thead className='table-primary'>
                                <tr>
                                    <th scope='col'>Sr. no</th>
                                    <th>Order_id</th>
                                    <th>Product_name</th>
                                    <th>Quantity</th>
                                    <th>Order_status</th>
                                    <th>Order_date</th>
                                    <th>Due_date</th>
                                    <th>Received_date</th>
                                    <th>Return_date</th>
                                    <th>Sender_id</th>
                                    <th>Receiver_id</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {OrderData.map((Order, i) => {
                                    return (
                                        <tr key={Order.Order_id}>
                                            <td> {i + 1} </td>
                                            <td> {Order.Order_id} </td>
                                            <td> {Order.Product_name} </td>
                                            <td> {Order.Quantity} </td>
                                            <td> {Order.Order_status} </td>
                                            <td> {Order.Order_date} </td>
                                            <td> {Order.Due_date} </td>
                                            <td> {Order.Order_received_date} </td>
                                            <td> {Order.Return_date} </td>
                                            <td> {Order.Sender_id} </td>
                                            <td> {Order.Reciever_id} </td>
                                            <td> {Order.Description} </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> */}
        <div className="layout2">
          <div className="res-form res-form2">
            <div className="form-box form-box2">
              <div className="select1">
                <select
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                  // value={productFilter}
                  // onChange={handleProductFilterChange}
                >
                  <option value="None">Select Product Name</option>
                  {/* {
                                        OrderData.map((item, key) => (
                                          <option className="form-control form-control2" value={item.Product_name.toString()} key={key}>
                                            {item.Product_name}
                                          </option>
                                        ))
                                    } */}
                  {/* {productlist.map((product, index) => (
                                        <option value={product} key={index}>{product}</option>
                                    ))} */}

                  {/* <option className="form-control form-control2  " value="None">
                    Select Product
                  </option>
                  <option className="form-control form-control2 " value="COCO powder">
                    COCO powder
                  </option>
                  <option
                    className="form-control form-control2 "
                    value="Powder"
                  >
                    Powder
                  </option>
                  <option
                    className="form-control form-control2 "
                    value="Bottles"
                  >
                    Bottles
                  </option>
                  <option className="form-control form-control2 " value="Syrup">
                    Syrup
                  </option> */}
                </select>
              </div>
              <div className="select2 ">
                <select
                  disabled
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                >
                  <option className="form-control form-control2 " value="None">
                    Select Category
                  </option>
                  <option className="form-control form-control2 " value="Brew">
                    Brew
                  </option>
                  <option
                    className="form-control form-control2 "
                    value="Powder"
                  >
                    Powder
                  </option>
                  <option
                    className="form-control form-control2 "
                    value="Bottles"
                  >
                    Bottles
                  </option>
                  <option className="form-control form-control2 " value="Syrup">
                    Syrup
                  </option>
                </select>
              </div>

              <div className="input-group  mainSearch mb-3">
                <input
                  type="text"
                  className="form-control  form-control2 search-table"
                  tabIndex="-1"
                  placeholder="Search"
                  // onChange={handleInputChange}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="bi bi-search Icon searchIconTable" />

                <i
                  onClick={reload}
                  className="bi Icon reloadIcon bi-arrow-clockwise"
                />
                {/* <DownloadTableExcel 
                  filename="users table"
                  sheet="users"
                  currentTableRef={tableRef.current}
                  > */}
                {/* <button> */}

                <i
                  className="fa-solid download Icon fa-arrow-down"
                  onClick={downloadExcel}
                />
                {/* </DownloadTableExcel> */}
                {/* </button> */}
              </div>
            </div>
            <div className="table2 " style={{ marginLeft: "-35px" }}>
              <table
                className="table table-bordered"
                id="myTable"
                ref={tableRef}
              >
                <thead className="table-success">
                  <tr>
                    <th scope="col">Sr. no</th>
                    <th>Order_id</th>
                    <th>Product_name</th>
                    <th>Quantity</th>
                    <th>Order_status</th>
                    <th>Order_date</th>
                    <th>Due_date___</th>
                    <th>Received_date</th>
                    <th>Return_date</th>
                    <th>Sender_id</th>
                    <th>Receiver_id</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody className="">
                  {OrderData.filter((item) => {
                    // return search.toLowerCase() === ''
                    // ? item
                    // : (item.Product_name || item.Quantity).toLowerCase().includes(search);
                    // if (productFilter !== 'None' && item.Product_name !== productFilter) return false;
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
                      (item.Order_date &&
                        item.Order_date.toLowerCase().includes(
                          lowerCaseSearch
                        )) ||
                      (item.Due_date &&
                        item.Due_date.toLowerCase().includes(
                          lowerCaseSearch
                        )) ||
                      (item.Order_status &&
                        item.Order_status.toLowerCase().includes(
                          lowerCaseSearch
                        )) ||
                      (item.Description &&
                        item.Description.toLowerCase().includes(
                          lowerCaseSearch
                        )) ||
                      (item.Sender_id &&
                        item.Sender_id.toLowerCase().includes(
                          lowerCaseSearch
                        )) ||
                      (item.Reciever_id &&
                        item.Reciever_id.toLowerCase().includes(
                          lowerCaseSearch
                        ))
                    );
                  }).map((Order, i) => {
                    const Order_date = formatDate(Order.Order_date);
                    const Due_date = formatDate(Order.Due_date);
                    const Return_date = formatDate(Order.Return_date);
                    const Order_received_date = formatDate(
                      Order.Order_received_date
                    );
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
                          {Order.Order_status}{" "}
                        </td>
                        <td> {Order_date} </td>
                        <td> {Due_date} </td>
                        {/* <td> {Order.Due_date} </td> */}
                        <td> {Order_received_date} </td>
                        <td> {Return_date} </td>
                        <td> {Order.Sender_id} </td>
                        <td> {Order.Reciever_id} </td>
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
};

export default History;

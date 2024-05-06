import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import "../../commonForAll/MainTable.css";
import "../../../css/Table.css";
import ContentHeader from "../../header/ContentHeader";
// import CsvDownloader from "react-csv-downloader";
import Model from "../../commonForAll/model";
import * as XLSX from "xlsx";
// import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"


export default function Incoming_order() {
  const [OrderData, setOrderData] = useState([]);
  const [StockData, setStockData] = useState([]);
  let [lowStock, setLowStockData] = useState([]);
  // let [inStock, setinStockData] = useState();
  const [productlist, setproductlist] = useState([]);
  const [managerlist, setmanager] = useState([]);
  // const [alldata, setalldata] = useState([])
  const [search, setSearch] = useState("");

  const tableRef = useRef(null);
  const downloadExcel = () => {
    const tableEl = tableRef.current; // Accessing the table DOM element
    if (tableEl) {
      const workbook = XLSX.utils.table_to_book(tableEl); // Converts a table DOM element to a workbook
      XLSX.writeFile(workbook, "incoming_order.xlsx"); // Writing the file
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
  const fetchDataOrder = async () => {
    const username = window.localStorage.getItem("user");

    try {
      const result = await axios.get("http://localhost:8081/incomingorder", {
        params: {
          username: username === "Admin" ? user : username,
        },
      });
      // const data = await setOrderData(result.data);
      setOrderData(result.data);
      console.log(OrderData);
    } catch (err) {
      console.log("Error occurred while fetching order data:", err);
    }
  };

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

  const fetchDataStock = async () => {
    const username = window.localStorage.getItem("user");

    try {
      const result = await axios.get("http://localhost:8081/stock", {
        params: {
          username: username,
        },
      });
      setStockData(result.data);
    } catch (err) {
      console.log("Error occurred while fetching stock data:", err);
    }
  };

  const checkQuantity = () => {
    for (let i = 0; i < OrderData.length; i++) {
      // console.log(OrderData[i].Order_id);
      let quantity=0;
      for (let j = 0; j < StockData.length; j++) {
        if (OrderData[i].Product_name === StockData[j].Product_name) {
          quantity += StockData[j].quantity;
        }
      }
      if (OrderData[i].Quantity > quantity) {
        console.log(OrderData[i].Order_id);
        // setLowStockData(OrderData[i].Order_id);
        setLowStockData((prevLowStock) => [
          ...prevLowStock,
          OrderData[i].Order_id,
        ]);
        console.log(lowStock);
      }
    }
  };

  useEffect(() => {
    fetchDataOrder();
    fetchDataStock();
    fetchProductlist();
    fetchmanager();
    // fetchAlldata();
  }, [user]); // Empty dependencies array to trigger the effect only once

  useEffect(() => {
    checkQuantity();
  }, [StockData]); // Call checkQuantity whenever StockData changes

  const [productFilter, setProductFilter] = useState("None");

  const handleProductFilterChange = (event) => {
    // console.log(event.target.value);
    setProductFilter(event.target.value);
  };
  async function accept(Order) {
    try {
      await axios.post("http://localhost:8081/acceptReject", {
        Order,
        mode: "Accepted",
        // stock:StockData.quantity,
      });
      toast.success("Order Accpted...");

      console.log(Order);
    } catch (err) {
      console.error(err);
    }
  }

  async function reject(Order) {
    try {
      await axios.post("http://localhost:8081/acceptReject", {
        Order,
        mode: "Rejected",
      });
      console.log(Order);
      // toast.success("Order Rejected...");

      // location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  const reload = () => {
    location.reload();
  };

  const isOrderLowStock = (orderId) => {
    return lowStock.includes(orderId);
  };
  return (
    <>
      <div className="main_con">
        <ContentHeader
          name="Incoming Orders"
          sub_content="Information about Warehouses"
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
                  className="fa-solid  download Icon fa-arrow-down"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
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
                    <th>Order_date</th>
                    <th>Due_date</th>
                    {/* <th>Order_status</th> */}
                    {localStorage.getItem("user") === "Admin" && (
                      <>
                        <th>Description</th>
                        <th>Sender_id</th>
                        <th>Receiver_id</th>
                      </>
                    )}
                    {localStorage.getItem("user") !== "Admin" && (
                      <>
                        <th>Descripiton</th>
                        <th>Accept or Reject</th>
                      </>
                    )}
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
                    if (user !== "None" && item.Reciever_id !== user)
                      return false;
                    // console.log(user);

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
                      (item.Order_date &&
                        item.Order_date.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Due_date &&
                        item.Due_date.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Description &&
                        item.Description.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Sender_id &&
                        item.Sender_id.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch)) ||
                      (item.Reciever_id &&
                        item.Reciever_id.toString()
                          .toLowerCase()
                          .includes(lowerCaseSearch))
                    );
                  }).map((Order, i) => {
                    return (
                      <tr
                        key={Order.Order_id}
                        className={
                          isOrderLowStock(Order.Order_id) ? "disabled" : ""
                        }
                      >
                        <td> {i + 1} </td>
                        <td> {Order.Order_id} </td>
                        <td> {Order.Product_name} </td>
                        <td> {Order.Quantity} </td>
                        <td> {Order.Order_date} </td>
                        <td> {Order.Due_date} </td>
                        {/* <td> {Order.Order_status} </td> */}
                        <td> {Order.Description} </td>
                        {localStorage.getItem("user") !== "Admin" && (
                          <>
                            <td className={"accepteReject"}>
                              <button
                                // data-bs-toggle="modal"
                                // data-bs-target="#staticBackdrop"
                                className={" btn accept"}
                                id="accept"
                                onClick={() => accept(Order)}
                              >
                                <i className="fa-solid fa-circle-check"></i>
                              </button>
                              <button
                                className=" btn reject"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                id="Reject"
                                onClick={() => reject(Order)}
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </td>
                          </>
                        )}

                        {localStorage.getItem("user") === "Admin" && (
                          <>
                            <td>{Order.Sender_id}</td>
                            <td>{Order.Reciever_id}</td>
                            {/* <td>{Order.Return_date}</td> */}
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Model message="Order Cancled"/>
      <Toaster/>
      
    </>
  );
}

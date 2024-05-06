import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
// import "../../commonForAll/MainTable.css";
import { Link } from "react-router-dom";
import "../../../css/Table.css";
import ContentHeader from "../../header/ContentHeader";
import Model from "../../commonForAll/model";
import Return_reason_modal from "../../commonForAll/Return_reason_modal";
import toast, { Toaster } from "react-hot-toast";

export default function Your_order() {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const tableRef = useRef(null);

  const downloadExcel = () => {
    const tableEl = tableRef.current; // Accessing the table DOM element
    if (tableEl) {
      const workbook = XLSX.utils.table_to_book(tableEl); // Converts a table DOM element to a workbook
      XLSX.writeFile(workbook, "invoiceData.xlsx"); // Writing the file
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [OrderData, setOrderData] = useState([]);
  const [search, setSearch] = useState("");
  const [productlist, setproductlist] = useState([]);

  const fetchData = async () => {
    const username = window.localStorage.getItem("user");

    try {
      const result = await axios.get("http://localhost:8081/yourorder", {
        params: {
          username: username,
        },
      });
      // console.log(result);
      setOrderData(result.data);
      const uniqueProducts = [
        ...new Set(result.data.map((item) => item.Product_name)),
      ];

      // Update the product options state
      setproductlist(uniqueProducts);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const handleProductFilterChange = (event) => {
    console.log(event.target.value);
    setProductFilter(event.target.value);
  };
  const [productFilter, setProductFilter] = useState("None");

  const cancel = (order) => {
    try {
      axios.post("http://localhost:8081/cancel-order", {
        order,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const delivered = (order) => {
    const username = window.localStorage.getItem("user");
    try {
      axios.post("http://localhost:8081/delivered-order", {
        order,
        username,
      });
      toast.success("Order Received...");
    } catch (err) {
      console.error(err);
    }
  };

  const reload = () => {
    location.reload();
  };
  const [selectedOrderId, setselectedOrderId] = useState(null);
  const handleModalOpen = (OrderID) => {
    setselectedOrderId(OrderID);
  };
  return (
    <>
      <div className="main_con">
        <ContentHeader
          name="Your Orders"
          sub_content="Information about Your Orders"
        />
        <div className="layout2">
          <div className="res-form res-form2">
            <div className="form-box form-box2">
              <div className="select1">
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
                    <option value={product} key={index}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select2">
                <select
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
                  // tabindex="-1"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="bi bi-search Icon searchIconTable" />

                <i
                  onClick={reload}
                  className="bi Icon reloadIcon bi-arrow-clockwise"
                />
                <i
                  className="fa-solid download Icon fa-arrow-down"
                  onClick={downloadExcel}
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
                    <th>Order_status</th>
                    <th>Description</th>
                    <th>Cancel</th>
                    <th>Received</th>
                    <th>Return</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderData.filter((item) => {
                    if (
                      productFilter !== "None" &&
                      item.Product_name !== productFilter
                    )
                      return false;
                    if (search.trim() === "") return true;
                    const lowerCaseSearch = search.toLowerCase();

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
                        ))
                    );
                  }).map((Order, i) => {
                    let Order_date = formatDate(Order.Order_date);
                    let Due_date = formatDate(Order.Due_date);
                    let status_forCancel =
                      Order.Order_status === "pending" ? false : true;
                    let status_forDelivered =
                      Order.Order_status === "Accepted" ? false : true;
                    let status_forReturn =
                      Order.Order_status === "Recieved" ? false : true;
                    

                    return (
                      <tr key={i}>
                        <td> {i + 1} </td>
                        <td> {Order.Order_id} </td>
                        <td> {Order.Product_name} </td>
                        <td> {Order.Quantity} </td>
                        <td>{Order_date}</td>
                        <td>{Due_date}</td>
                        <td
                          className={
                            Order.Order_status === "Returned"
                              ? "badge rounded-pill text-bg-warning ms-4"
                              : Order.Order_status === "Recieved"
                              ? "badge rounded-pill text-bg-info ms-4"
                              : Order.Order_status === "pending"
                              ? "badge rounded-pill text-bg-secondary  ms-4"
                              : Order.Order_status === "Accepted"
                              ? "badge rounded-pill text-bg-success  ms-4"
                              : Order.Order_status === "Rejected"
                              ? "badge rounded-pill text-bg-danger  ms-4"
                              : ""
                          }
                        >
                          {" "}
                          {Order.Order_status}{" "}
                        </td>
                        <td> {Order.Description} </td>
                        <td
                          className="d-flex justify-content-center "
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          <Link
                            className={status_forCancel ? "disabled" : ""}
                            onClick={() => cancel(Order.Order_id)}
                          >
                            <i className="fa-regular fa-rectangle-xmark text-danger"></i>
                          </Link>
                        </td>

                        <td>
                          <Link
                            className={`m-4 ${
                              status_forDelivered ? "disabled" : ""
                            }`}
                            onClick={() => delivered(Order)}
                          >
                            <i className="fa-solid fa-circle-check text-success"></i>
                          </Link>
                        </td>

                        <td>
                          <Link
                            className={`m-4 ${
                              status_forReturn ? "disabled" : ""
                            }`}
                            data-bs-toggle="modal"
                            data-bs-target="#ReasonForReturn"
                            // onClick={() => return_order(Order)}
                            onClick={() => handleModalOpen(Order.Order_id)}
                          >
                            <i className="fa-solid fa-arrow-left"></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* <div className="plusIcon">
                <Link to="/add-user">
                  <i className="fa-solid fa-circle-plus"></i>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Model message="Order Canceled Successfully.." />
      <Toaster />
      <Return_reason_modal Order_ID={selectedOrderId} />
    </>
  );
}

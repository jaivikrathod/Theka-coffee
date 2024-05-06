import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import "../../commonForAll/MainTable.css";
import { Link } from "react-router-dom";
import "../../../css/Table.css";
import ContentHeader from "../../header/ContentHeader";
import * as XLSX from "xlsx";
import Model from "../../commonForAll/model";
import Edit_stock_InputModal from "../../commonForAll/Edit_stock_InputModal";

export default function StockList() {
  const [StockData, setStockData] = useState([]);
  const tableRef = useRef(null);
  const [search, setSearch] = useState("");
  const [productlist, setproductlist] = useState([]);
  const [warehouseid, setWarehouseid] = useState([]);
  const [user, setUser] = useState(window.localStorage.getItem("user"));

  function check() {
    const username = window.localStorage.getItem("user");
    if (username === "admin") {
      document.querySelector(".plusIcon").style.display = "none";
    }
  }

  const downloadExcel = () => {
    const tableEl = tableRef.current; // Accessing the table DOM element
    if (tableEl) {
      const workbook = XLSX.utils.table_to_book(tableEl); // Converts a table DOM element to a workbook
      XLSX.writeFile(workbook, "stock_list.xlsx"); // Writing the file
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const fetchData = async () => {
    const username = window.localStorage.getItem("user");
    try {
      const result = await axios.get("http://localhost:8081/stock", {
        params: {
          username: username === "Admin" ? user : username,
        },
      });
      // console.log(result);
      setStockData(result.data);
      const uniqueProducts = [
        ...new Set(result.data.map((item) => item.Product_name)),
      ];

      // Update the product options state
      setproductlist(uniqueProducts);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };

  const reload = () => {
    location.reload();
  };

  const fetchWarehouseid = async () => {
    const username = window.localStorage.getItem("user");

    try {
      const result = await axios.get("http://localhost:8081/getManager", {
        params: {
          username: username,
        },
      });
      setWarehouseid(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [productFilter, setProductFilter] = useState("None");

  const [selectedStockId, setSelectedStockId] = useState(null);

  const handleModalOpen = (stockId) => {
    setSelectedStockId(stockId);
  };
  // const [warehouse, setWarehouse] = useState('None');

  const handleProductFilterChange = (event) => {
    console.log(event.target.value);
    setProductFilter(event.target.value);
  };

  useEffect(() => {
    fetchData();
    fetchWarehouseid();
    check();
  }, [user]);

  return (
    <>
      <div className="main_con">
        <ContentHeader
          name="Stock List"
          sub_content="Information about Stock"
        />
        <div className="layout2">
          <div className="res-form res-form2">
            <div className="form-box form-box2">
              <div className="select1">
                <select
                  // style={{opacity:"0"}}
                  disabled={localStorage.getItem("user") !== "Admin"}
                  className="form-control form-control2 form-select"
                  name=""
                  id="exampleFormControlInput1"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                >
                  <option className="form-control form-control2  " value="None">
                    Select warehouse
                  </option>
                  {warehouseid.map((item, key) => (
                    <option
                      value={item.User_id}
                      hidden={item.User_id === "Admin"}
                      key={key}
                    >
                      {item.User_id}
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
                  <option className="form-control form-control2 " value="None">
                    Select Product name
                  </option>
                  {productlist.map((product, index) => (
                    <option value={product} key={index}>
                      {product}
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
              <table className="table table-bordered responsive-table">
                <thead className="table-success">
                  <tr>
                    <th>Sr. no</th>
                    {localStorage.getItem("user") === "Admin" && (
                      <th>Warehouse manager id</th>
                    )}
                    <th>Stock_id</th>
                    <th>Product_name</th>

                    <th>Quantity</th>
                    <th>Manufacture_date</th>
                    <th>Expiry_date</th>
                    <th>Edit or Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {StockData.map((stock, i) => {
                    let manufacture_date = formatDate(stock.manufacture_date);
                    let expiry_date = formatDate(stock.expiry_date);

                    return (
                      <tr key={i}>
                        <td className={stock.quantity < 20 ? "warning" : ""}>
                          {" "}
                          {i + 1}{" "}
                        </td>
                        {localStorage.getItem("user") === "Admin" && (
                          <td>{stock.User_id}</td>
                        )}
                        <td className={stock.quantity < 20 ? "warning" : ""}>
                          {" "}
                          {stock.stock_id}{" "}
                        </td>
                        <td className={stock.quantity < 20 ? "warning" : ""}>
                          {" "}
                          {stock.Product_name}{" "}
                        </td>

                        <td className={stock.quantity < 20 ? "warning" : ""}>
                          {" "}
                          {stock.quantity}{" "}
                        </td>
                        <td className={stock.quantity < 20 ? "warning" : ""}>
                          {" "}
                          {manufacture_date}{" "}
                        </td>
                        <td className={stock.quantity < 20 ? "warning" : ""}>
                          {" "}
                          {expiry_date}{" "}
                        </td>
                        <td className={"editDelete"}>
                          <button
                            className={"btn edit"}
                            id="edit"
                            data-bs-toggle="modal"
                            data-bs-target="#EditStock"
                            onClick={() => handleModalOpen(stock.stock_id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            className=" btn delete"
                            id="delete"
                            onClick={() => Delete(stock.stock_id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="plusIcon">
                <Link to="/add-stock">
                  <i className="fa-solid fa-circle-plus"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Model message="Stock Deleted Successfully.." />
      <Edit_stock_InputModal StockId={selectedStockId} />
    </>
  );
}

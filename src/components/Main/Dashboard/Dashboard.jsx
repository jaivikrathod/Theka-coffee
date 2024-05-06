import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../../../css/dashboard.css";
import { useSelector } from "react-redux";
import { PieChart } from "react-chartkick";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  // const username = useSelector((state) => state.username.value);
  // const username2 ="2"
  // alert(useSelector((state)=>state.username.value))
  const [userData, setUserData] = useState([]);
  const [warehouseData, setwarehouseData] = useState([]);
  const [productData, setproductData] = useState([]);
  const [totalstock, settotalstock] = useState([0]);
  const [Messages, setMessages] = useState([]);
  const [incomingtotal, setincomingtotal] = useState([0]);
  const [outgoingtotal, setoutgoingtotal] = useState([0]);
  const [yourordertotal, setyourordertotal] = useState([0]);
  const [ChartData, setChartData] = useState([]);
  const [OrderData, setOrderData] = useState([]);



  useEffect(() => {
    fetchUsers();
    fetchWarehouse();
    fetchProduct();
    fetchStock();
    getMessage();
    fetchTotalIncomingOrders();
    fetchTotalOutgoingOrders();
    fetchTotalYourOrders();
    fetcgReportData();
  }, []);

  const aggregateDataForChart = (data) => {
    let aggregatedData = {};
    data.forEach(({ Product_name, Quantity }) => {
      if (aggregatedData[Product_name]) {
        aggregatedData[Product_name] += Quantity;
      } else {
        aggregatedData[Product_name] = Quantity;
      }
    });
    setChartData(Object.entries(aggregatedData).map(([Product_name, Quantity]) => [Product_name, Quantity]));
  };

  const fetcgReportData = async () => {
    const username = window.localStorage.getItem("user");
    console.log(username);
    try {


      const result = await axios.get(`http://localhost:8081/incomingorder`, {
        params: {
          username: username,
        },
      });
      setOrderData(result.data);
      aggregateDataForChart(result.data);
      // console.log(OrderData);
    } catch (err) {
      console.log("Error occurred while fetching order data:", err);
    }
  };

  const fetchTotalYourOrders = async () => {
    const username = window.localStorage.getItem("user");
    try {
      const result = await axios.get("http://localhost:8081/getTotalYourOrders", {
        params: {
          username: username,
        },
      });
      // console.log(result);
      setyourordertotal(result.data);
      console.log(result.data);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const fetchTotalOutgoingOrders = async () => {
    const username = window.localStorage.getItem("user");
    try {
      const result = await axios.get("http://localhost:8081/getTotalOutgoingOrders", {
        params: {
          username: username,
        },
      });
      // console.log(result);
      setoutgoingtotal(result.data);
      console.log(result.data);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const fetchTotalIncomingOrders = async () => {
    const username = window.localStorage.getItem("user");
    try {
      const result = await axios.get("http://localhost:8081/getTotalIncomigOrders", {
        params: {
          username: username,
        },
      });
      // const data = await setOrderData(result.data);
      setincomingtotal(result.data);
      console.log(incomingtotal);

    } catch (err) {
      console.log("Error occurred while fetching order data:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8081/users");
      // console.log(result.data);
      setUserData(result.data);
      console.log(userData);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const fetchWarehouse = async () => {
    try {
      const result = await axios.get("http://localhost:8081/warehouse");
      // console.log(result);
      setwarehouseData(result.data);
      console.log(warehouseData);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const fetchProduct = async () => {
    try {
      const result = await axios.get("http://localhost:8081/products");
      // console.log(result);
      setproductData(result.data);
      console.log(productData);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const fetchStock = async () => {
    try {

      if (localStorage.getItem("user") === "Admin") {

        const result = await axios.get("http://localhost:8081/getTotalStock");
        // console.log(result);
        settotalstock(result.data);
        console.log(result.data);
      }
      else {
        const username = localStorage.getItem("user");
        const result = await axios.get("http://localhost:8081/stock", {
          params: {
            username: username,
          },
        });
        settotalstock(result.data);
        console.log(result.data);
      }
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const getMessage = async () => {
    try {
      const username = localStorage.getItem("user");
      const result = await axios.get("http://localhost:8081/getMessage", {
        params: {
          username: username,
        },
      });
      console.log(result.data);
      // setManagers(result.data);
      setMessages(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="dashboard-main" className="res-main-content main_con card">
        <section className="main">
          <h2 className="main-header m-3">Dashboard</h2>

          <div className="grid-container">
            <div className="box" id="b1">
              <div className="box-content">
                {
                  localStorage.getItem("user") === "Admin" &&
                  <h3 className="quantity">{userData.length}</h3>
                }
                {
                  localStorage.getItem("user") !== "Admin" &&
                  <h3 className="quantity">{incomingtotal.totalRows}</h3>
                }
                {/* <i className="bi bi-people-fill"></i> */}
                <div className="users">
                  <svg
                    id="main-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    height="50"
                    width="50"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="#fff"
                      d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                    />
                  </svg>
                </div>
                {
                  localStorage.getItem("user") === "Admin" &&
                  <>
                    <span className="box-content-head">Total Users</span>
                    <Link to="/users" className="text-white sub-content">View more</Link>
                  </>
                }
                {
                  localStorage.getItem("user") !== "Admin" &&
                  <>
                    <span className="box-content-head">Total Incoming order</span>
                    <Link to="/incoming-order" className="text-white sub-content">View more</Link>
                  </>
                }
              </div>
            </div>
            <div className="box" id="b2">
              <div className="box-content">
                {
                  localStorage.getItem("user") === "Admin"
                  &&
                  <h3 className="quantity">{productData.length}</h3>
                }
                {
                  localStorage.getItem("user") !== "Admin" &&
                  <h3 className="quantity">{outgoingtotal.totalRows}</h3>

                }
                <div className="products">
                  <svg
                    id="main-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    height="45"
                    width="45"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fff"
                      d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"
                    />
                  </svg>
                </div>
                {
                  localStorage.getItem("user") === "Admin" &&
                  <>
                    <span className="box-content-head">Total Products</span>
                    <Link className="text-white sub-content" to="/products">View more</Link>

                  </>
                }
                {
                  localStorage.getItem("user") !== "Admin" &&
                  <>
                    <span className="box-content-head">Total Outgoing orders</span>
                    <Link className="text-white sub-content" to="/Outgoing-order">View more</Link>

                  </>
                }
              </div>
            </div>
            <div className="box" id="b3">
              <div className="box-content">
                {localStorage.getItem("user") === "Admin" &&
                  <h3 className="quantity">{warehouseData.length}</h3>
                }
                {localStorage.getItem("user") !== "Admin" &&
                  <h3 className="quantity">{yourordertotal.totalRows}</h3>
                }
                <div className="warehouses">
                  <svg
                    id="main-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    height="45"
                    width="45"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z"
                    />
                  </svg>
                </div>
                {
                  localStorage.getItem("user") === "Admin" &&
                  <>
                    <span className="box-content-head">Total Warehouses</span>
                    <Link to="/WarehouseList" className="text-white sub-content">View more</Link>
                  </>
                }

                {
                  localStorage.getItem("user") !== "Admin" &&
                  <>
                    <span className="box-content-head">Total Your orders</span>
                    <Link to="/your-order" className="text-white sub-content">View more</Link>
                  </>
                }
              </div>
            </div>
            <div className="box" id="b4">
              <div className="box-content">
                {/* <h3 className="quantity"> */}
                {localStorage.getItem("user") === "Admin" && totalstock && (
                  <h3 className="quantity">{totalstock[0].total_rows}</h3>
                )}
                {
                  localStorage.getItem("user") !== "Admin" &&
                  <>
                    <h3 className="quantity">
                      {totalstock.length}
                    </h3>
                  </>
                }
                <div className="stocks">
                  <svg
                    id="main-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    height="45"
                    width="45"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"
                    />
                  </svg>
                </div>
                {
                  localStorage.getItem("user") === "Admin" &&
                  <>
                    <span className="box-content-head">Total Stock</span>
                    <Link to="/stockList" className="text-white sub-content">View more</Link>
                  </>
                }

                {
                  localStorage.getItem("user") !== "Admin" &&
                  <>
                    <span className="box-content-head">Total Stock</span>
                    <Link to="/stockList" className="text-white sub-content">View more</Link>
                  </>
                }
              </div>
            </div>
          </div>
          <div className="d-flex m-3">
            {
              localStorage.getItem("user") === "Admin" &&
              <>

                <div className="horizontal-scroll">
                  <div className="scrollable-table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Sr. no</th>
                          <th>User_id</th>
                          <th>Dedicared Warehouse</th>
                          <th>Superior Warehouse</th>
                          {/* <th>Header 3</th>  */}
                        </tr>
                      </thead>
                      <tbody>
                        {userData.map((user, i) => {
                          return (
                            <tr key={i}>
                              <td> {i + 1} </td>
                              <td> {user.User_id} </td>
                              <td> {user.Dedicated_Warehouse} </td>
                              <td> {user.Superior_Manager} </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="horizontal-scroll">
                  <div className="scrollable-table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Sr. no</th>
                          <th>Warehouse_id</th>
                          <th>Warehouse_type</th>
                          <th>SuperiorWarehouse	</th>
                          {/* <th>Header 3</th>  */}
                        </tr>
                      </thead>
                      <tbody>
                        {warehouseData.map((warehouse, i) => {
                          return (
                            <tr key={i}>
                              <td> {i + 1} </td>
                              <td> {warehouse.Warehouse_id} </td>
                              <td> {warehouse.Warehouse_type} </td>
                              <td> {warehouse.SuperiorWarehouse} </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            }
            {
              localStorage.getItem("user") !== "Admin" &&
              <>
                <div className="container_fluid mx-5 mt-3 bg-light d-flex align-items-center justify-content-center flex-column"

                  style={{ width: "35vw", height: "50vh", border: "0.6px solid grey" }}>
                  {/* <PieChart data={[["Blueberry", 44], ["Strawberry", 23]]} /> */}
                  <PieChart data={ChartData} />
                  <br />
                  <h4>Report</h4>
                </div>
                <div className="container_fluid  mt-3  d-flex  flex-column"

                  style={{ width: "40vw", height: "50vh" }}>
                  <div className="horizontal-scroll">
                    <div className="scrollable-table-container">
                      <table className="">
                        <thead>
                          <tr>
                            <th>Message</th>
                            <th>Sender id</th>
                            <th>Receiver id</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Messages.map((item, key) => (
                              <tr key={key}>
                                <td>{item.Message}</td>
                                <td>{item.Sender_id}</td>
                                <td>{item.Receiver_id}</td>
                              </tr>
                            )
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </>
            }
          </div>

        </section>
      </div>
    </>
  );
}

export default Dashboard;

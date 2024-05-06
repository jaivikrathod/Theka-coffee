import React,{useEffect,useState} from "react";
import "../../css/Table.css";
// import "../../../css/Form.css";
import axios from "axios";

import ContentHeader from "../header/ContentHeader";
export default function Table() {
  useEffect(() => {
    fetchData();
    // check();
  }, []);
  const [OrderData, setOrderData] = useState([]);

  const username = window.localStorage.getItem("user");
  const fetchData = async () => {

    try {
      const result = await axios.get("http://localhost:8081/incomingorder", {
        params: {
          username: username,
        },
      });
      console.log(OrderData);
      console.log(result.data);
      setOrderData(result.data);
    } catch (err) {
      console.log(err + "eeeee");
    }
  };
  return (
    <>
      <div className="main_con">
      
      <ContentHeader name="Incoming Orders" 
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
              >
                <option className="form-control form-control2  " value="None">
                  Select Location
                </option>
                <option className="form-control form-control2 " value="Brew">
                  Brew
                </option>
                <option className="form-control form-control2 " value="Powder">
                  Powder
                </option>
                <option className="form-control form-control2 " value="Bottles">
                  Bottles
                </option>
                <option className="form-control form-control2 " value="Syrup">
                  Syrup
                </option>
              </select>
            </div>
            <div className="select2">
              <select
                className="form-control form-control2 form-select"
                name=""
                id="exampleFormControlInput1"
              >
                <option className="form-control form-control2 " value="None">
                  Select type
                </option>
                <option className="form-control form-control2 " value="Brew">
                  Brew
                </option>
                <option className="form-control form-control2 " value="Powder">
                  Powder
                </option>
                <option className="form-control form-control2 " value="Bottles">
                  Bottles
                </option>
                <option className="form-control form-control2 " value="Syrup">
                  Syrup
                </option>
              </select>
            </div>

            <div
              className="input-group  mb-3"
              style={{
                "margin-left": "18vw",
                width: "14.8vw",
                // position: "relative",
              }}
            >
              <input
                type="text"
                className="form-control form-control2 search-table"
                tabindex="-1"
                placeholder="Search"
              />
              <i
                className="bi bi-search"
                style={{
                  "margin-left": "15vw",
                  padding: "19px",
                  background: "#04AA6D",
                  width: "2.7vw",
                  height:"5vh",
                  "font-size": "22px",
                  color: "white",
                  position: "absolute",
                  cursor: "pointer",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center"
                }}
              />

              <i
                className="bi bi-arrow-clockwise"
                style={{
                  "margin-left": "19vw",
                  padding: "19px",
                  background: "#04AA6D",
                  width: "2.7vw",
                  "font-size": "22px",
                  color: "white",
                  position: "absolute",
                  cursor: "pointer",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  height:"5vh"
                }}
              />
            </div>
          </div>
          <div className="table2">
            <table className="table table-bordered">
              <thead className="">
                <tr className="green-row">
                  <th scope="col">Sender ID </th>
                  <th scope="col">Receiver ID</th>
                  <th scope="col">Product ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Quantity</th>
                  <th scope="col">Product Order Date</th>
                  <th scope="col">Product Order Due Date</th>
                  <th scope="col">Order Approval</th>
                </tr>
              </thead>
              {/* <tbody>
                <tr >
                  <td>SWMAH1</td>
                  <td>CWMGU1</td>
                  <td>101</td>
                  <td>PT Brew</td>
                  <td>10</td>
                  <td>04/04/2024</td>
                  <td>07/04/2024</td>
                  <td>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-check-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "green",
                        }}
                      ></i>
                    </button>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-x-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "red",
                        }}
                      ></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>SWMAH2</td>
                  <td>CWMGU1</td>
                  <td>102</td>
                  <td>CJ Brew</td>
                  <td>20</td>
                  <td>04/04/2024</td>
                  <td>08/04/2024</td>
                  <td>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-check-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "green",
                        }}
                      ></i>
                    </button>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-x-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "red",
                        }}
                      ></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>SWMAH3</td>
                  <td>CWMGU1</td>
                  <td>103</td>
                  <td>PT Brew</td>
                  <td>15</td>
                  <td>04/04/2024</td>
                  <td>07/04/2024</td>
                  <td>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-check-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "green",
                        }}
                      ></i>
                    </button>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-x-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "red",
                        }}
                      ></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>SWMAH4</td>
                  <td>CWMGU1</td>
                  <td>104</td>
                  <td>CJ Brew</td>
                  <td>30</td>
                  <td>04/04/2024</td>
                  <td>07/04/2024</td>
                  <td>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-check-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "green",
                        }}
                      ></i>
                    </button>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-x-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "red",
                        }}
                      ></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>SWMAH5</td>
                  <td>CWMGU1</td>
                  <td>105</td>
                  <td>PT Brews</td>
                  <td>20</td>
                  <td>17/04/2024</td>
                  <td>20/04/2024</td>
                  <td>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-check-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "green",
                        }}
                      ></i>
                    </button>
                    <button style={{ background: "white", border: "none" }}>
                      <i
                        className="bi bi-x-circle-fill"
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "red",
                        }}
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody> */}
                 <tbody>
                {OrderData.map((Order, i) => {
                  return (
                    <tr key={Order.Order_id}>
                      <td> {i + 1} </td>
                      <td> {Order.Order_id} </td>
                      <td> {Order.Product_name} </td>
                      <td> {Order.Quantity} </td>
                      <td> {Order.Order_date} </td>
                      <td> {Order.Due_date} </td>
                      <td> {Order.Order_status} </td>
                      <td> {Order.Description} </td>
                      <td className="accepteReject">
                        <button id="accept" onClick={()=>accept(Order.Order_id)} ><i className="fa-solid fa-circle-check"></i></button>
                        <button id="Reject" onClick={()=>reject(Order.Order_id)}><i className="fa-solid fa-xmark"></i></button>
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="download">
              <button
                className="form-button"
                style={{ "margin-top": ".1vh", "border-radius": "15px" }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
    
  );
}

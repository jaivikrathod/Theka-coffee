import { ColumnChart, PieChart } from "react-chartkick";
import "chartkick/chart.js";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ContentHeader from '../../header/ContentHeader';
import "../../../css/Reports.css";
export default function Reports() {

  const [OrderData, setOrderData] = useState([]);
  const [choice, setChoice] = useState('');
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [managerlist, setmanager] = useState([]);
  const [ChartData, setChartData] = useState([]);


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

  const fetchDataOrder = async () => {
    const username = window.localStorage.getItem("user");
    console.log(username);
    try {
      console.log(choice);

      const result = await axios.get(`http://localhost:8081/${choice}`, {
        params: {
          username: username === 'Admin' ? user : username,
        },
      });
      setOrderData(result.data);
      aggregateDataForChart(result.data);
      console.log(OrderData);
    } catch (err) {
      console.log("Error occurred while fetching order data:", err);
    }
  };

  console.log(OrderData);

  const exportToExcel = () => {
    // const ws = XLSX.utils.json_to_sheet(pieChartData);
    // const ws = XLSX.utils.json_to_sheet(formattedData.map(item => ({
    //   "Product Name": item[0],
    //   "Quantity": item[1]
    // })));
    const ws = XLSX.utils.json_to_sheet(ChartData.map(([ProductName, Quantity]) => ({
      "Product Name": ProductName,
      "Quantity": Quantity
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "reports.xlsx");
  };

  // const formattedData = OrderData.map((item) => (
  //   [item.Product_name,
  //   item.Quantity
  //   ]
  // ));

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

  // console.log(formattedData);
  useEffect(() => {
    fetchDataOrder();
    fetchmanager();
  }, [choice, user]);

  // console.log(formattedData);

  return (
    <>
      <div className="main_con">
        <ContentHeader name="Reports" sub_content="Information about report" />

        {/* <div className="report-container">
          Reports */}
        <div className="report-con-boxes report-container">
          <div className="report-con-boxe1 ms-5">
            <div className="conatiner margin-top-big">

              <ColumnChart 
                xtitle="Product items"
                ytitle="Quantity"
                stacked={true}
                height="400px"
                // data={[
                //   ["Sun", 32],
                //   ["Mon", 46],
                //   ["Tue", 128],
                //   ["Wed", 28],
                //   ["Thus", 28],
                //   ["Fri", 28],
                //   ["Fri", 28],
                //   ["sat", 28],
                //   ["sun", 28],
                // ]}
                data={
                  ChartData
                }

              />
            </div>
          </div>
          <div className="report-con-boxes">
            <div className="report-con-boxe2">
              <div className="loc-div">
                {
                  localStorage.getItem("user") === "Admin" &&
                  <select disabled={localStorage.getItem("user") !== "Admin"}
                    className="form-control form-control2 form-select report-buttons"
                    name=""
                    id="exampleFormControlInput1"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  >
                    <option className="form-control form-control2 " value="None">
                      Select warehouse
                    </option>
                    {managerlist.map((manager, index) => (
                      <option value={manager.User_id} key={index}>{manager.User_id}</option>
                    ))}
                  </select>
                }
              </div>

              <div className="order-div">
                <select name="order-type" id="" className="report-buttons"
                  value={choice}
                  onChange={(e) => setChoice(e.target.value)}>
                  <option value="None">
                    Select order
                  </option>
                  {
                    !localStorage.getItem("user").includes("CWM") &&
                    <>
                      <option value="yourorder">Your order</option>
                    </>
                  }
                  <option value="Return order">Return order</option>
                  <option value="incomingorder">Incoming order</option>
                  <option value="outgoingorder">Outgoing order</option>
                </select>
              </div>
              <div className="report-download-div">
                <button className="report-buttons btn btn-primary" onClick={exportToExcel}>Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

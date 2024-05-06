import React from "react";
import "../../../css/Sidebar.css";
import "../../../css/dashboard.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Sidebar() {

  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();

  const logout = (e) => {
    removeCookie("token");
    e.preventDefault();
    window.localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  const closediv = () => {
    // const visibility = document.getElementById("wholeside");
    // const visibility2 = document.getElementById("dashboard-main");
    // console.log(visibility2);
    // visibility.classList.add('hidden');
    // visibility.classList.remove('visible');
    // document.getElementById("menuIcon").style.display = "block";
    // document.getElementsByClassName("main_con")[0].style.marginLeft = "80px";
    // document.getElementsByClassName("card")[0].style.width = "100vw";
    const visibility = document.getElementById("wholeside");
    const visibility2 = document.getElementById("dashboard-main");
    console.log(visibility2);
    visibility.classList.add("hidden");
    visibility.classList.remove("visible");
    document.getElementById("menuIcon").style.display = "block";
    document.getElementsByClassName("main_con")[0].style.marginLeft = "0px";

    if (document.getElementsByClassName("res-form")[0]) {
      document.getElementsByClassName("res-form")[0].style.marginLeft = "3vw";
      document.getElementsByClassName("res-form")[0].style.width = "95vw";

      if (document.getElementsByClassName("plusIcon")[0]) {
        document.getElementsByClassName("plusIcon")[0].style.marginLeft = "83vw";
      }
    }

    if (document.getElementsByClassName("report-container")[0]) {
      document.getElementsByClassName("report-container")[0].style.width = "99vw";
      document.getElementsByClassName("report-con-boxe1")[0].style.marginLeft = "8vw"
      document.getElementsByClassName("report-con-boxe1")[0].style.width = "65vw"
      document.getElementsByClassName("report-con-boxe2")[0].style.marginLeft = "1vw"
    }

    if (document.getElementById("manager-container")) {
      document.getElementById("manager-container").style.justifyContent = "space-around";

    }

    if (document.getElementById("notify-container")) {
      document.getElementById("notify-container").style.marginLeft = "5vw";
      document.getElementById("notify-container").style.width = "90vw";
      document.getElementsByClassName("search-table")[0].style.marginLeft = "21vw";
      document.getElementById("messageTable").style.marginLeft ="45vw";

    }
    if (document.getElementsByClassName("layout3")[0]) {
      document.getElementsByClassName("layout3")[0].style.width ="91vw";
      document.getElementsByClassName("layout3")[0].style.marginLeft ="4vw";
      document.getElementsByClassName("Submit_buttons")[0].style.marginRight ="12vw";
    }
    document.getElementsByClassName("card")[0].style.width = "99vw";
  };

  const showdiv = () => {
    if (document.getElementsByClassName("layout3")[0]) {
      document.getElementsByClassName("layout3")[0].style.width ="82vw";
      document.getElementsByClassName("layout3")[0].style.marginLeft ="2vw";
      // document.getElementsByClassName("Submit_buttons")[0].style.marginRight ="12vw";
    }
    if (document.getElementById("notify-container")) {
      document.getElementById("notify-container").style.marginLeft = "3vw";
      document.getElementById("notify-container").style.width = "82vw";
      document.getElementById("messageTable").style.marginLeft ="38vw";

    }
    if (document.getElementsByClassName("res-form")[0]) {
      document.getElementsByClassName("res-form")[0].style.marginLeft = "3.5vw";
      document.getElementsByClassName("res-form")[0].style.width = "78vw";
      if (document.getElementsByClassName("plusIcon")[0]) {
        document.getElementsByClassName("plusIcon")[0].style.marginLeft = "67vw";
      }
    }
    if (document.getElementsByClassName("report-container")[0]) {
      document.getElementsByClassName("report-container")[0].style.width = "85vw";
      document.getElementsByClassName("report-con-boxe1")[0].style.marginLeft = "0";
      document.getElementsByClassName("report-con-boxe2")[0].style.marginLeft = "0"
      document.getElementsByClassName("report-con-boxe1")[0].style.width = "55vw"
    }
    document.getElementsByClassName("card")[0].style.width = "85vw";
    document.getElementsByClassName("main_con")[0].style.marginLeft = "220px";
    document.getElementById("wholeside").style.display = "block";
    document.getElementById("menuIcon").style.display = "none";
    document.getElementById("wholeside").classList.remove("hidden");
    document.getElementById("wholeside").classList.add("visible");
  };

  const drop_order = () => {
    const visibility2 = document.getElementById("dropOrders");
    const SetBelowIcon = document.getElementById("belowIconsID");
    if (visibility2.style.display === "none") {
      visibility2.style.display = "block";
      SetBelowIcon.style.marginTop = "65px";
    } else {
      visibility2.style.display = "none";
      SetBelowIcon.style.marginTop = "167px";
    }
  };
  return (
    <>
      <div id="menuIcon" onClick={showdiv}>
        <button className="btn text-white">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div id="wholeside" className="res-sidebar">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block">
          <div className="close-div">
            <button
              id="closeIcon"
              type="button"
              className=" btn btn-close btn-close-white close-icon"
              onClick={closediv}
            />
          </div>
          <div className=" all-side-items">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" to="">
                  <i id="sidebar-logos" className="fa-solid fa-house m-2"></i>
                  <span id="sidebar-textID" className="sidebar-text m-2">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="users">
                  <i
                    id="sidebar-logos"
                    className="fa-solid fa-user-group m-2"
                  ></i>
                  <span className="sidebar-text m-2">Manage_Users</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="WarehouseList">
                  <i
                    id="sidebar-logos"
                    className="fa-solid fa-warehouse m-2"
                  ></i>
                  <span className="sidebar-text m-2">Manage_Warehouses</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="stockList">
                  <i
                    id="sidebar-logos"
                    className="fa-solid fa-layer-group m-2"
                  ></i>
                  <span className="sidebar-text m-2">Master_of_stocks</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="products">
                  <i
                    id="sidebar-logos"
                    className="fa-solid fa-database m-2"
                  ></i>

                  <span className="sidebar-text m-2">Manage_Products</span>
                </Link>
              </li>
              <li className="nav-item" id="orders">
                <Link className="nav-link " to="#" onClick={drop_order}>
                  <i id="sidebar-logos" className=" fa-solid fa-table m-2"></i>

                  <span className="sidebar-text m-2">Orders</span>
                </Link>
              </li>
              <ul>
                <div className="dropOrdersClass">
                  <div id="dropOrders">

                    <Link to="incoming-order" className="nav-link">
                      <li>Incoming Orders</li>
                    </Link>
                    <Link to="Outgoing-order" className="nav-link">
                      <li>Outgoing Orders</li>
                    </Link>
                    <Link to="return-order" className="nav-link">
                      <li>Return Orders</li>
                    </Link>
                  </div>
                </div>
              </ul>
              <li className="nav-item">
                <Link className="nav-link" to="/report">
                  <i
                    id="sidebar-logos"
                    className="fa-solid fa-chart-line m-2"
                  ></i>
                  <span className="sidebar-text m-2">Reports</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/notification">
                  <i id="sidebar-logos" className="fa-solid fa-message m-2"></i>

                  <span className="sidebar-text m-2">Notification</span>
                </Link>
              </li>
              <li className="nav-item below-items-forResponsive">
                <Link className="nav-link" to="#">
                  <i
                    id="sidebar-logos"
                    className="fa-solid fa-clock-rotate-left m-2"
                  ></i>
                  <span className="sidebar-text m-2">History</span>
                </Link>
              </li>

              <li className="nav-item below-items-forResponsive">
                <Link className="nav-link" to="#">
                  <i id="sidebar-logos" className="fa-solid fa-gear m-2"></i>

                  <span className="sidebar-text m-2">Settings</span>
                </Link>
              </li>

              <li className="nav-item below-items-forResponsive">
                <Link className="nav-link" onClick={(e) => logout(e)} to="#">
                  <i
                    id="sidebar-logos"
                    className="fa-solid fa-power-off m-2"
                  ></i>
                  <span className="sidebar-text m-2">logout</span>
                </Link>
              </li>
            </ul>
            {/* </div> */}
          </div>

          <div id="belowIconsID" className="belowIcons">
            <Link to="#" className="nav-link">
              <i
                id="sidebar-logos"
                className="fa-solid fa-clock-rotate-left m-2"
              ></i>
            </Link>
            <Link to="/update-profile" className="nav-link">
              <i id="sidebar-logos" className="fa-solid fa-gear m-2"></i>
            </Link>
            <Link to="#" className="nav-link" onClick={(e) => logout(e)}>
              <i id="sidebar-logos" className="fa-solid fa-power-off m-2"></i>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import "../../commonForAll/MainTable.css";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import "../../../css/Table.css";
import ContentHeader from "../../header/ContentHeader";

export default function UserList() {
  useEffect(() => {
    fetchData();
  }, []);
  const [userData, setUserData] = useState([]);
  const tableRef = useRef(null);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8081/users");
      // console.log(result);
      setUserData(result.data);
    } catch (err) {
      console.log("Wrong!!!");
    }
  };
  const reload = () => {
    location.reload();
  };

  const downloadExcel = () => {
    const tableEl = tableRef.current; // Accessing the table DOM element
    if (tableEl) {
      const workbook = XLSX.utils.table_to_book(tableEl); // Converts a table DOM element to a workbook
      XLSX.writeFile(workbook, "user_list.xlsx"); // Writing the file
    }
  };

  return (
    <>
      <div className="main_con">
        <ContentHeader
          name="Users List"
          sub_content="Information about Users"
        />
        <div className="layout2 ">
          <div className="res-form res-form2">
            <div className="form-box form-box2">
              <div className="select1">
                <select
                  style={{ opacity: "0" }}
                  disabled
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
              <div className="select2">
                <select
                  style={{ opacity: "0" }}
                  disabled
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

              <div className="input-group search-reload-download mainSearch mb-3">
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
            <div className="table2 responsive-table">
              <div className="">
                <table className="table table-bordered " ref={tableRef}>
                  <thead className="table-success">
                    <tr>
                      <th>Sr. no</th>
                      <th>User_id</th>
                      <th>First Name</th>
                      <th>Dedicated Warehouse</th>
                      <th>Superior Manager</th>
                      {/* <th>Header 3</th>  */}
                    </tr>
                  </thead>
                  <tbody>
                    {userData
                      .filter((item) => {
                        if (search.trim() === "") return true; // Return all items if search is empty

                        // Convert search term to lowercase
                        const lowerCaseSearch = search.toLowerCase();

                        // Check if any of the specified fields include the search term
                        return (
                          (item.User_id &&
                            item.User_id.toString()
                              .toLowerCase()
                              .includes(lowerCaseSearch)) ||
                          (item.First_Name &&
                            item.First_Name.toLowerCase().includes(
                              lowerCaseSearch
                            )) ||
                          (item.Dedicated_Warehouse &&
                            item.Dedicated_Warehouse.toString()
                              .toLowerCase()
                              .includes(lowerCaseSearch)) ||
                          (item.Superior_Manager &&
                            item.Superior_Manager.toLowerCase().includes(
                              lowerCaseSearch
                            ))
                        );
                      })
                      .map((user, i) => {
                        return (
                          <tr key={i}>
                            <td> {i + 1} </td>
                            <td> {user.User_id} </td>
                            <td> {user.First_Name} </td>
                            <td> {user.Dedicated_Warehouse} </td>
                            <td> {user.Superior_Manager} </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              </div>
              <div className="plusIcon">
                <Link to="/add-user">
                  <i className="fa-solid fa-circle-plus"></i>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

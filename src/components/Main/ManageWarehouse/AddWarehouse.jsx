import React, { useState,useEffect } from "react";
import axios from "axios";
import ContentHeader from "../../header/ContentHeader";
import {states} from "./Location"
import { useForm } from "react-hook-form";
import "../../../css/AddWarehouse.css";
import Model from "../../commonForAll/model";
import toast, { Toaster } from "react-hot-toast"

export default function WarehouseForm() {


  const [warehouses, setWarehouse] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/add_warehouse")
      .then(response => {
        setWarehouse(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const user_types = ["Center warehouse","Sub warehouse","Outlet"];

  
  const Add = (data) => {
    // e.preventDefault();
    axios
      .post("http://localhost:8081/add-warehouse", data)
      .then((res) => {
        toast.success("Warehouse Added Successfully...");
        console.log(data.type);
        console.log(res);
        reset();
      })
      .catch((err) => console.log(err));
  };
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchTerm2, setSearchTerm2] = useState("");
  const [selectedstates, setSelectedstates] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlestatesClick = (states) => {
    setSelectedstates("");
    setSearchTerm(states);
    // setSearchTerm2(states);
    document.querySelector(".scrollable-Search-container").style.display="none";
  };

  const filteredstatess = states.filter((states) =>
    states.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="main_con">
        <ContentHeader
          name="Add WareHouse"
          sub_content="Information about Warehouses"
        />
        <form action="" onSubmit={handleSubmit(Add)}>
          <div className="res-form">
            <div className="form-box">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Enter Warehouse Type
                </label>
                <select
                  className="form-control form-select"
                  name=""
                  id="exampleFormControlInput1"
                  {...register("type")}
                >
                  {user_types.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Superior Warehouse
                </label>
                <select
                  className="form-control form-select"
                  name=""
                  id="exampleFormControlInput1"
                  {...register("Superior")}
                >
                  <option key="-" value="-">--</option>
                  {warehouses.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>
             
             
              {/* <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Superior Warehouse
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Superior Warehouse"
                  
                  {...register("Superior")}
                />
              </div> */}
              {/* <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Location * State Name
                </label>

                <select
                  className="form-control form-select"
                  name=""
                  id="exampleFormControlInput1"
                  {...register("state")}
                >
                  {states.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div> */}

              <div className="mb-3 SelectState">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Location * State Name
                </label>

                <input required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Search State..."
                  {...register("state")}
                  value={searchTerm}
                  onChange={handleSearchChange}

                />
                {searchTerm && (
                  <ul
                    className="scrollable-Search-container"
                    // style={{ maxHeight: "200px", maxWidth: "500px" }}
                  >
                    {filteredstatess.map((states, index) => (
                      <a
                        href="#"
                        key={index}
                        onClick={() => handlestatesClick(states)}
                      >
                        <li className="innerList">
                          {states}
                        </li>
                      </a>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Enter City
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter City"
                  
                  {...register("city")}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Enter Area
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Area"
                  
                  {...register("Area")}
                />
              </div>



              <div className="submit_buttons">
                <div className="mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <input required type="submit" value={"Add"} className="form-button" />
                </div>
                <div className="mb-3">
                  <input required type="reset" value={"Clear"} className="form-button" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Toaster/>

{/* <Model message="Warehouse added successfully.."/> */}

    </>
  );
}

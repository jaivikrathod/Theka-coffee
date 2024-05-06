import React, { useState ,useEffect} from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useForm } from "react-hook-form";
import ContentHeader from "../../header/ContentHeader";
import "../../../css/Form.css";
import Model from "../../commonForAll/model";
import toast, { Toaster } from "react-hot-toast"

function AddUser() {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();                    

  const user_types = [
    "Center warehouse manager",
    "Sub warehouse manager",
    "Outlet manager",
  ];

  const add_user = (data) => {
    // e.preventDefault();
    axios
      .post("http://localhost:8081/add-user", data)
      .then((res) => {
        console.log(res);
        toast.success("User Added Successfully...");
        reset();
      })
      .catch((err) => console.log(err));
  };


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

  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      <div className="main_con">
        <ContentHeader name="Add Users" sub_content="Information about users" />
        <form action="" onSubmit={handleSubmit(add_user)}>
          <div className="res-form">
            <div className="form-box">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  First Name
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter First Name"
                  {...register("firstname")}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Last Name
                </label>
                <input required
                  type="mail"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Last Name"
                  maxLength={"10"}
                  {...register("lastname")}

                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                 Enter Email
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Email"
                  {...register("email")}

                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Mobile Number
                </label>
                <input required
                  type="text"
                  maxLength="10"
                  minLength="10"
                  pattern="[0-9]{10}"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Mobile Number"
                  {...register("mobilenumber")}

                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Posistion
                </label>
                <select
                  className="form-control form-select"
                  name=""
                  id="exampleFormControlInput1"
                  {...register("position")}

                >
                  {user_types.map((item, index) =>
                  <option key={index} >
                    {item}
                  </option>
                )}
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Asign Warehouse
                </label>
                <select
                  className="form-control form-select"
                  name=""
                  id="exampleFormControlInput1"
                  {...register("warehouse")}

                >
                  {warehouses.map((item, index) =>
                  <option key={index} >
                    {item}
                  </option>
                )}
                </select>
              </div>
             
              {/* <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Mobile Number
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Mobile Number"
                  maxLength={"10"}
                />
              </div> */}
            <div className="d-flex gap-4">
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
{/* <Model message="User added successfully.."/> */}
<Toaster/>

    </>
  );
}

export default AddUser;

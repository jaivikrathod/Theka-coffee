import products2 from "../../commonForAll/export_product";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useForm } from "react-hook-form";
import ContentHeader from "../../header/ContentHeader";
import Model from "../../commonForAll/model";
import "../../../css/Form.css";
import toast, { Toaster } from "react-hot-toast"

function MakeOrder() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  

  // const product = Object.keys(products2);
  

  const add = (data) => {
    // e.preventDefault();
     data.sender =window.localStorage.getItem("user");

    axios
      .post("http://localhost:8081/MakeOrder", data)
      .then((res) => {
        console.log(res);
        toast.success("Order placed Successfully...");

        reset();
      })
      .catch((err) => console.log("error"));
  };
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/get_product")
      .then(response => {
        setProduct(response.data.data);
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
        <ContentHeader name="Make Order" sub_content="Information about Order" />
        <form action="" onSubmit={handleSubmit(add)}>
          <div className="res-form">
            <div className="form-box">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Product Name 
                </label>
                <select
                  className="form-control form-select"
                  name=""
                  id="exampleFormControlInput1"
                  {...register("productname")}
                >
                  {product.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>

           

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Quantity
                </label>
                <input required
                  type="number"
                  min='1'
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Quantity"
                  {...register("Quantity")}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Order Due Date
                </label>
                <input required
                  type="date"
                  className="form-control"
                  id="exampleFormControlInput1"
                  {...register("DueDate")}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                 Description
                </label>
                <textarea
                required
                  cols='4'
                  className="form-control"
                  id="exampleFormControlInput1"
                  {...register("Description")}
                />
              </div>

              <div className="d-flex Submit_buttons">
                <div data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <input required type="submit" value={"Add"} className="form-button" />
                </div>
                <div>
                  <input required type="reset" value={"Clear"} className="form-button" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
{/* <Model message="Order placed successfully.."/> */}
<Toaster />

    </>
  );
}

export default MakeOrder;

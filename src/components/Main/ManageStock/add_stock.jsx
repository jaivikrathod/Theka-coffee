import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useForm } from "react-hook-form";
import ContentHeader from "../../header/ContentHeader";
import "../../../css/Form.css";
import products2 from "../../commonForAll/export_product";
import { json } from "react-router-dom";
import Model from "../../commonForAll/model";
import toast, { Toaster } from "react-hot-toast"

function AddStock() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  // const product = Object.keys(products2);

  const add = (data) => {
    // e.preventDefault();
    data.username = window.localStorage.getItem("user");
    console.log(data.productname);

    axios

      .post("http://localhost:8081/add-stock", data)
      .then((res) => {
        console.log(res);
        toast.success("Stock Added Successfully...");
        reset();
      })
      .catch((err) => console.log(err));
  };

  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/get_product")
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      <div className="main_con">
        <ContentHeader name="Add Stock" sub_content="Information about Stock" />
        <form action="" id="myForm" onSubmit={handleSubmit(add)}>
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
                  {...register("productname", { required: true })}
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
                  {...register("Quantity", { required: true })}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Manufacture Date
                </label>
                <input required
                  type="date"
                  className="form-control"
                  id="exampleFormControlInput1"
                  {...register("Manufacture_Date", { required: true })}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Expiry Date
                </label>
                <input required
                  type="date"
                  className="form-control"
                  id="exampleFormControlInput1"
                  {...register("Expiry_Date", { required: true })}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Supplier Name
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Supplier name"
                  {...register("Supplier_Name", { required: true })}
                />
              </div>

              <div className="d-flex Submit_buttons">
                <div>
                  <input required
                    type="submit"
                    value="Add"
                    className="form-button"
                    // data-bs-toggle={!isValid ? "" : "modal"}
                    // data-bs-target="#staticBackdrop"
                    // disabled={!isValid}
                  />
                </div>
                <div>
                  <input required type="reset" value={"Clear"} className="form-button" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* <Model message="Stock added successfully.." /> */}
      <Toaster />
    </>
  );
}

export default AddStock;

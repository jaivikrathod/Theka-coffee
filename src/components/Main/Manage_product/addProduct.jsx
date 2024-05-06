import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useForm } from "react-hook-form";
import ContentHeader from "../../header/ContentHeader";
import "../../../css/Form.css";
import products2 from "../../commonForAll/export_product";
import Model from "../../commonForAll/model";
import toast, { Toaster } from "react-hot-toast";

function AddProduct() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const [isProductAdded, setIsProductAdded] = useState(false);

  const category = [
    "Brew",
    "Powder",
    "Lable",
    "Bottle",
    "caps",
    "Sleevs",
    "Syrup",
    "Other",
  ];

  // const product = Object.keys(products2);
  // let productname = watch("productname");
  // const id = products2[productname];
  // console.log(id);

  const add_user = async (data) => {
    // data.id= id;

    axios
      .post("http://localhost:8081/add-product", data)
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          setIsProductAdded(true);
          toast.success("Product Added Successfully...");
        }
        reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      <div className="main_con">
        <ContentHeader
          name="Add Product"
          sub_content="Information about Product"
        />
        <form action="" onSubmit={handleSubmit(add_user)}>
          <div className="res-form">
            <div className="form-box">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Product Name
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter ProductName"
                  {...register("productname")}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Expiry limit(in Days)
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Expiry limit"
                  {...register("ExpiryLimit")}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Select category
                </label>
                <select
                  required
                  className="form-control form-select"
                  name=""
                  id="exampleFormControlInput1"
                  {...register("category")}
                >
                  {category.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  weight(in grams)
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Weight"
                  {...register("weight")}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Product description
                </label>
                <textarea
                  required
                  rows="2"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Description"
                  {...register("description")}
                />
              </div>

              <div
                className="mb-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <input
                  required
                  type="submit"
                  value={"Add"}
                  className="form-button"
                />
              </div>
              <div className="mb-3">
                <input
                  required
                  type="reset"
                  value={"Clear"}
                  className="form-button"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Message!!</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Product Added successfully
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" data-bs-dismiss="modal">OK</button>
        
      </div>
    </div>
  </div>
</div>  */}
      {/* <Model message="Product added successfully.."/> */}
      <Toaster />
    </>
  );
}

export default AddProduct;

import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Edit_product(argument) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  // const [value, setvalue] = useState("hello");
  const [description, setDescription] = useState("");
  const [Expiry, setExpiry] = useState("");
  const [Category, setCategory] = useState("");
  const [Weight, setWeight] = useState("");

  useEffect(() => {
    setDescription(argument.product.Product_descripiton);
    setExpiry(argument.product.Expire_limit);
    setCategory(argument.product.category);
    setWeight(argument.product.weight);
  });

  // const handleDescriptionChange = (event) => {
  //   setDescription(event.target.value);
  //   console.log(description);
  // };
  // const handleExpiryChange = (event) => {
  //   setExpiry(event.target.value);
  // };
  // const handleCategoryChange = (event) => {
  //   setCategory(event.target.value);
  // };
  // const handleWeightChange = (event) => {
  //   setWeight(event.target.value);
  // };
  // console.log(value);
  const edit_product = (data) => {
    const product_id = argument.product.Product_id;
    data.description = data.description === '' ? description : data.description;
    data.Expiry_Limit = data.Expiry_Limit === '' ? Expiry : data.Expiry_Limit;
    data.Category = data.Category === '' ? Category : data.Category;
    data.Weight = data.Weight === '' ? Weight : data.Weight;
    try {
      console.log(data);
      axios.post("http://localhost:8081/edit-product", {
        data,
        product_id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="editproduct"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-lg ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Product..
              </h1>
              <div></div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form action="" onSubmit={handleSubmit(edit_product)}>
              <div className="modal-body  mx-auto d-flex justify-content-center">
                <label htmlFor="" className="m-2 me-4">
                  Product description :-
                </label>

                <input
                  
                  className="ms-4"
                  defaultValue={description}
                  {...register("description")}
                ></input>
              </div>
              <div className="modal-body  mx-auto d-flex justify-content-center">
                <label htmlFor="" className="m-2 me-4">
                  Product Expiry Limit(in days) :-
                </label>

                <input
                  
                  className="ms-4"
                  defaultValue={Expiry}
                  {...register("Expiry_Limit")}
                ></input>
              </div>
              <div className="modal-body  mx-auto d-flex justify-content-center">
                <label htmlFor="" className="m-2 me-4">
                  Product Category :-
                </label>

                <input
                  
                  className="ms-4"
                  defaultValue={Category}
                  {...register("Category")}
                ></input>
              </div>
              <div className="modal-body  mx-auto d-flex justify-content-center">
                <label htmlFor="" className="m-2 me-4">
                  Product Weight :-
                </label>

                <input
                  
                  type="number"
                  className="ms-4"
                  defaultValue={Weight}
                  {...register("Weight")}
                ></input>
              </div>

              <div className="modal-footer">
                {/* <input  type="submit" value="submit" /> */}
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss={!isValid ? "" : "modal"}
                  disabled={!isValid}
                >
                  Edit
                </button>
                {/* <button type="button" className="btn btn-primary">Understood</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

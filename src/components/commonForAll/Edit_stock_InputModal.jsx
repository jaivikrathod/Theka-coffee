import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Edit_stock_InputModal(argument) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  const [StockID, setStockID] = useState("");

  const update = (data) => {
    // console.log(argument);

    try {
      // console.log(data.updatedQuntity);
      axios.post("http://localhost:8081/update-Quantity", {
        data,
        argument,
      });
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="EditStock"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Stock
              </h1>
              <div></div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form action="" onSubmit={handleSubmit(update)}>
              <div className="modal-body m-2">
                <label htmlFor="" className="m-2">
                  Enter new Quantity for {argument.StockId}:-
                </label>
                {/* {argument.StockId} */}
                <input
                  type="number"
                  min='1'
                  className="m-2"
                  required
                  {...register("updatedQuntity", { required: true })}
                />
              </div>

              <div className="modal-footer">
                {/* <input type="submit" value="submit" /> */}
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss={!isValid ? "" : "modal"}
                  disabled={!isValid}
                >
                  Update
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

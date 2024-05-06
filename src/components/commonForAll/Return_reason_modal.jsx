import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Return_reason_modal(argument) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const return_order = (data) => {
    
    try {
      axios.post("http://localhost:8081/return-order", {
        data,
        argument,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="ReasonForReturn"
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
                Return Order!!..
              </h1>
              <div></div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form action="" onSubmit={handleSubmit(return_order)}>
              <div className="modal-body d-flex m-4 mx-auto">
                <label htmlFor="" className="m-2">
                 Enter The Reason for Return Order {argument.Order_ID}:-
                </label>
                
                <textarea  name="" id="" cols="30" rows="2" {...register("Reason", { required: true })}></textarea>
              </div>

              <div className="modal-footer">
                {/* <input type="submit" value="submit" /> */}
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss={!isValid ? "" : "modal"}
                  disabled={!isValid}
                >
                  Return
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

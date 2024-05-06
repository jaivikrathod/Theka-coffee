import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { useForm } from 'react-hook-form'
function AddUser() {

  // const [addUserValues, setaddUserValues] = useState({
  //   firstname: null,
  //   lastname: null,
  //   warehouse_location: null,
  //   position: null,
  //   mobile_no: null,
  //   email: null,
  // });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const user_types = [
    "Center warehouse manager",
    "Sub warehouse manager",
    "Outlet manager"
  ]

  const add_user = (data) => {
    // e.preventDefault();
    axios.post("http://localhost:8081/add-user", data)
      .then((res) => {
        console.log(res);
        reset();

      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container add_user_top p-4">
        <div className="text-white">
          <h2 className=''>
            Add Users
          </h2>
          <p>Information about users</p>
        </div>
      </div>
      <div className="container add_user_form ">
        <div className="adding_user container_fluid p-5 mx-5">
          <form className="row g-4 needs-validation" method="POST"  onSubmit={handleSubmit(add_user)} >
            <div className="col-md-5">
              <label htmlFor="firstname" className="form-label font-weight-bold">First Name</label>
              <input type="text" className="form-control"  {...register("firstname")} />
            </div>
            <div className="col-md-5">
              <label htmlFor="lastname" className="form-label">Last Name</label>
              <input type="text" className="form-control" {...register("lastname")} />
            </div>
            {/* <div className="col-md-5">
              <label htmlFor="warehouse-location" className="form-label">Warehouse Location</label>
              <input type="text" className="form-control" {...register("location")} placeholder="" />
            </div> */}
            <div className="col-md-5">
              <label htmlFor="warehouse-location" className="form-label">Position</label>
              {/* <input type="text" className="form-control" id="" placeholder=""/> */}
              <select id="" className="form-select" {...register("position")} >

                {/* <option selected> Select Position</option>
                <option> Center Warehouse Manager</option>
                <option> Sub Warehouse Manager</option>
                <option> Outlet Manager</option> */}
                {user_types.map((item, index) =>
                  <option key={index} >
                    {item}
                  </option>
                )}
              </select>
            </div>
            <div className="col-md-5">
              <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
              <input type="tel" className="form-control" {...register("mobilenumber",{pattern:{value:/^[0-9]+$/},required:true})}  />
            </div>
            <div className="col-md-5">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" {...register("email")} />
            </div>

            <div className="col-md-4">
              <button type="submit" className="btn text-white text-center px-3"
                disabled={isSubmitting}
                style={{ backgroundColor: "green" }}>Add</button>
              {/* </div> */}
              {/* <div className="col-md-1"> */}
              &nbsp;
              &nbsp;
              <button type="reset" className="btn text-white " style={{ backgroundColor: "green" }}>Clear</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddUser

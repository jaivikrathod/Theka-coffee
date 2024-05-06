import ContentHeader from "../../header/ContentHeader";
import "../../../css/updateProfile.css"
import profileIcon from "../../../assets/profileicon.jpg"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function UpdateProfile() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isSubmitting, isValid },
    } = useForm();

    const [userData, setUserData] = useState([]);


    const fetchData = async () => {
        try {
            const username = window.localStorage.getItem("user");
            console.log(username);
            const result = await axios.get("http://localhost:8081/getUser", {
                params: {
                    username: username,
                }
            });
            // console.log(result);
            setUserData(result.data);
            console.log(userData);

            // console.log(userData);
        } catch (err) {
            console.log("Wrong!!!");
        }
    };

    useEffect(() => {
        fetchData();
        // setUserData();
    }, []);

    const update = async (data) => {
        try {
            const updatedData = {
               username: userData[0].User_id, // Assuming User_id is the field representing UserId
                First_Name: data.firstname !== '' ? data.firstname : userData[0].First_Name,
                Last_Name: data.lastname !== '' ? data.lastname : userData[0].Last_Name,
                Email: data.email !== '' ? data.email : userData[0].Email,
                Mobile_number: data.mobilenumber !== '' ? data.mobilenumber : userData[0].Mobile_number
            };

            // Update user data if there are changes
            if (Object.keys(updatedData).length > 0) {
                const result = await axios.put("http://localhost:8081/updateUser", updatedData);
                console.log("User data updated successfully!");
                console.log(updatedData);
                if (result) {
                    console.log("User updated");
                    
                    toast.success("Profile updated successfully...");
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                }
            } else {
                console.log("No changes to update.");
                // toast("No updates to be changed for...");
            }
        } catch (err) {
            console.log("Error updating user data:", err);
        }
    }

    const sendpass = async (data) => {
        try {
            data.sender = localStorage.getItem("user");
            const result = await axios.post("http://localhost:8081/checkPass", data);
            if (result) {
                console.log("Correct username and old password...");
            }
            else {
                console.log("Incorrect password..");
            }
        } catch (error) {
            // toast("Correct old password...")
            console.log(error);
        }
    }
    return (
        <>
            <div className="main_con">

                <ContentHeader
                    name="Update Profile"
                    sub_content="Information about users"
                />
                <div className="layout3">
                    <div className="image-design ">
                        <img src={profileIcon} alt="" className="profile-logo" />
                    </div>

                    <form action="" onSubmit={handleSubmit(update)}>
                        <div className="res-form mt-3">
                            <div className="form-box">
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Username
                                    </label>
                                    <input disabled
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        // placeholder="Enter Quantity"
                                        defaultValue={userData[0] ? userData[0].User_id : ''}
                                        {...register("username")}
                                    />
                                </div>



                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        First Name
                                    </label>
                                    <input required={true}
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        // placeholder="Enter Quantity"
                                        // defaultValue={userData[0].First_Name}
                                        defaultValue={userData[0] ? userData[0].First_Name : ''}
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
                                    <input required={true}
                                        defaultValue={userData[0] ? userData[0].Last_Name : ''}
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        // defaultValue={userData[0].Last_Name}
                                        {...register("lastname")}
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
                                        type="tect"
                                        minLength={10}
                                        maxLength={10}
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        pattern="[0-9]{10}" 
                                        // defaultValue={userData[0].Mobile_number}
                                        defaultValue={userData[0] ? userData[0].Mobile_number : ''}
                                        {...register("mobilenumber")}

                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Dedicated warehouse
                                    </label>
                                    <input disabled
                                        defaultValue={userData[0] ? userData[0].Dedicated_Warehouse : ''}
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                    // defaultValue={userData[0].Dedicated_Warehouse}

                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Superior Warehouse
                                    </label>
                                    <input disabled
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        defaultValue={userData[0] ? userData[0].Superior_Manager : ''}

                                    // defaultValue={userData[0].Superior_Manager}

                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input required
                                        type="email"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                        // defaultValue={userData[0].Email}
                                        defaultValue={userData[0] ? userData[0].Email : ''}

                                        {...register("email")}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        User Type
                                    </label>
                                    <input disabled
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        defaultValue={userData[0] ? userData[0].User_type : ''}
                                    // defaultValue={userData[0].User_type}

                                    />
                                </div>



                                <div className="d-flex Submit_buttons">
                                    {/* <div data-bs-toggle="modal" data-bs-target="#staticBackdrop"> */}
                                    <input disabled={isSubmitting} type="submit" value="Update" className="form-button" />
                                    {/* </div> */}
                                    <div>
                                        <input type="reset" defaultValue={"Clear"} className="form-button" />

                                        {/* <input type="button" className="form-button" style={{ marginLeft: "2vw", padding: "5px" }} value={"Change Password"}
                                            data-bs-target="#exampleModalToggle" data-bs-toggle="modal" /> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <Toaster />

                    </form>
                    {/* <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                        <div className="modal-dialog ">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Old password</h1>

                                    <button type="submit" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form action="" method="post" onSubmit={handleSubmit(sendpass)}>
                                        <label htmlFor="inputPassword5" className="form-label"
                                        >Enter old password</label>
                                        <input type="password" id="inputPassword5" className="form-control" style={{ marginLeft: "0.2vw", width: "30vw" }} aria-describedby="passwordHelpBlock"
                                            required={true}
                                            {...register("oldpassword", { required: { value: true, message: "This is required field" } })}
                                        />

                                        <div className="modal-footer">
                                            <button className="btn btn-success" type="submit"
                                                data-bs-toggle="modal"
                                                // disabled={!isValid}
                                                data-bs-target="#exampleModalToggle2"
                                            >Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">New Password</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form action="" method="post">
                                        <label htmlFor="newpass" className="form-label mt-1"
                                        >Enter new password</label>
                                        <input type="password" id="inputPassword5" className="form-control" style={{ marginLeft: "0.3vw", width: "30vw" }} aria-describedby="passwordHelpBlock"
                                            {...register("newpass", { required: true })} />
                                            <label htmlFor="conpassword" className="form-label mt-1"
                                            >Confirm password</label>
                                        <input type="password" id="inputPassword5" className="form-control" style={{ marginLeft: "0.3vw", width: "30vw" }} aria-describedby="passwordHelpBlock"
                                        {...register("conpass", { required: true })} />
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success" data-bs-target="#exampleModalToggle2" data-bs-dismiss="modal"
                                        disabled={!isValid}>Change password</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Open first modal</button> */}
                </div>
            </div >
        </>
    );
}

export default UpdateProfile;
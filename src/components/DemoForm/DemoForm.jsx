import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


function DemoForm() {
    const [data, setdata] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate()
    const signUp = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/demo", data)
            .then((res) => {
                if (res.data.Status === "Success") {
                    navigate('/')
                }
                else {
                    alert("Error...")
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="container mt-5">
                <h1>
                    Sign Up
                </h1>
                <form onSubmit={signUp}>
                    <div className="form-group ">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="UsernameHelp" placeholder="Enter username"
                            onChange={e => setdata({ ...data, username: e.target.value })} />
                        <small id="UsernameHelp" className="form-text text-muted"> Well never share your email with anyone else.</small>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                            onChange={e => setdata({ ...data, password: e.target.value })} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default DemoForm

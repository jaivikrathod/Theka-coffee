import React from "react";
import { Link } from "react-router-dom";
// import "../../../css/navbar.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { useSelector, useDispatch } from "react-redux"
import { setUsername } from "../../redux/username/usernameSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const logout = (e) => {
    removeCookie("token");
    e.preventDefault();
    window.localStorage.clear();
    window.location.reload();
    navigate("/");

  };
  // const username = useSelector((state) => state.username.value);
  // console.log(username);
  const username =window.localStorage.getItem("user");


  return (
    <>
     
        <nav className="sticky-top navbar wholenav navbar-expand-lg navbar-light bg-dark">
          <div className="container-fluid ">
            <Link className="navbar-brand ms-3 text-light">ThekaCoffee</Link>

            {/* <i className="user_logo fa-solid  fa-bell"></i> */}

            {/* <div className="container-fluid"> */}
            {/* <a className="navbar-brand" href="#">
            Navbar w/ text
          </a> */}

            <div className="icons justify-content-end">
              <div className="search-container ">
                <form action="/search" method="get">
                  <input
                    className="search expandright"
                    id="searchright"
                    type="search"
                    name="q"
                    placeholder="Search"
                  />
                  <label className="button searchbutton" htmlFor="searchright">
                    <span className="mglass">&#9906;</span>
                  </label>
                </form>
              </div>

              <div className="dropdown">
                <button
                  className="btn btn-secondary btn-light text-dark  rounded-pill nav-drop  "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="adminText">
                    <i className="user_logo fa-solid mt-1  fa-circle-user"></i>
                    {/* <span> {username}</span> */}
                    
                    <span className="dropdown-toggle "></span>
                  </div>
                </button>
                {/* <div className="afterDrop"> */}

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      My profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Help & Support
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Give Feedback
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={(e) => logout(e)}
                      to="#"
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
                {/* </div> */}
              </div>
            </div>
          </div>
        </nav>
      
    </>
  );
}

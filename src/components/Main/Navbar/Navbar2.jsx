import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../../../css/navbar2.css";

export default function Navbar() {
  const pages = [
    { id: 1, title: 'Dashborad', url: '/' },
    { id: 2, title: 'Incoming Order', url: '/incoming-order' },
    { id: 3, title: 'Outgoing order', url: '/Outgoing-order' },
    { id: 4, title: 'Your order', url: '/your-order' },
    { id: 5, title: 'Reports', url: '/report' },
    { id: 6, title: 'Messages', url: '/notification' },
    // Add more pages as needed
  ];
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    
  };

  // Filter pages based on search query
  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const logout = (e) => {
    removeCookie("token");
    e.preventDefault();
    window.localStorage.clear();
    // sessionStorage.clear(lowStockAlertShown);
    sessionStorage.removeItem("lowStockAlertShown");
    window.location.reload();
    navigate("/");
  };
  // const username = useSelector((state) => state.username.value);
  // console.log(username);
  const username = window.localStorage.getItem("user");

  return (
    <>
      <div className="nav-main sticky-top ">
        <div className="nav-left ms-4">
          <Link className="nav-text ">ThekaCoffee</Link>
        </div>
        <div className="nav-right">

          <div className="search-container ">
            <form action="/search" method="get">
              <input
                className="search expandright"
                id="searchright"
                type="search"
                name="q"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery.trim() !== '' && (
                <ul style={{
                  // width:"100%",
                  listStyle: "none",
                  position: 'absolute',
                  // bottom: '-15vh',
                  top:50,
                  left: -250,
                  // right:-110,
                  // right:"10%",
                  marginRight: "-300px",
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '8px',
                  zIndex: 1000,
                }}>
                  {filteredPages.map(page => (
                    <li key={page.id} >
                      <Link to={page.url}>{page.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
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
                <span> {username}</span>
                <span className="dropdown-toggle "></span>
              </div>
            </button>
            {/* <div className="afterDrop"> */}

            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/update-profile">
                  My profile
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

    </>
  );
}

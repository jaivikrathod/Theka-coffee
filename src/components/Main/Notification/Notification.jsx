import React, { useState, useEffect } from "react";
import ContentHeader from "../../header/ContentHeader";
import "../../../css/notification.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

function Notification() {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors, isSubmitting, isValid },
  } = useForm();

  useEffect(() => {
    getManagers();
    getMessage();
  }, []);

  const send_message = (data) => {
    data.sender = window.localStorage.getItem("user");
    axios
      .post("http://localhost:8081/sendMessage", data)
      .then((res) => {
        console.log(res);
        reset();
        toast.success("Message has been sent..");
        // location.reload();
      })
      .catch((err) => console.log("error" + err));
  };

  const [managers, setManagers] = useState([]);
  const [messages, setMessages] = useState([]);
  const getManagers = async () => {
    try {
      const username = localStorage.getItem("user");
      const result = await axios.get("http://localhost:8081/getManager", {
        params: {
          username: username,
        },
      });
      console.log(result.data);
      setManagers(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMessage = async () => {
    try {
      const username = localStorage.getItem("user");
      const result = await axios.get("http://localhost:8081/getMessage", {
        params: {
          username: username,
        },
      });
      console.log(result.data);
      // setManagers(result.data);
      setMessages(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [search, setSearch] = useState("");

  return (
    <>
      <div className="main_con">
        <ContentHeader
          name={"Notification"}
          sub_content={"Here are all the notifications"}
        />

        <div className="notify-container" id="notify-container">
          <form
            action=""
            className="mt-4"
            onSubmit={handleSubmit(send_message)}
          >
            <div className="notify-form-header1">Send to :-</div>

            <div className="notify-box2">
              <select
                required
                className="select-manager select-notify focus-ring"
                name=""
                id="exampleFormControlInput1"
                {...register("receiver")}
              >
                <option className="" value="None">
                  Select Manager
                </option>

                {localStorage.getItem("user") !== "Admin" ? (
                  <>
                    <option selected value={"Admin"}>Admin</option>
                    {!localStorage.getItem("user").includes("CWM") &&
                      managers.length > 0 &&
                      managers.map((manager, index) => (
                        <option key={index} value={manager.Superior_Manager}>
                          {manager.Superior_Manager}
                        </option>
                      ))}
                  </>
                ) : (
                  <>
                    {managers.length > 0 &&
                      managers.map((manager, index) => (
                        <option key={index} value={manager.User_id}>
                          {manager.User_id}
                        </option>
                      ))}
                  </>
                )}
              </select>
            </div>
            <div className="notify-box3">
              <div className="product-des-head">
                <label htmlFor="" className="notify-form-header2">
                  Message:-
                </label>
              </div>
              <div className="product-des">
                <textarea
                  {...register("message", {
                    validate: {
                      pattern: (value) => !/[!]/.test(value),
                    },
                  })}
                  required
                  className="product-text"
                  cols={65}
                  rows={3}
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="notify-buttons-con">
              <div className="mb-3">
                <input
                  type="submit"
                  disabled={isSubmitting}
                  value={"Send"}
                  className="notify-buttons"
                />
              </div>
              <div className="mb-3">
                <input
                  type="reset"
                  value={"Clear"}
                  className="notify-buttons"
                />
              </div>
            </div>
          </form>

          <div className="searchMsg d-flex">
            <input
              type="search"
              className="form-control  form-control2 search-table"
              tabIndex="-1"
              placeholder="Search"
              style={{
                width: "40vw",
                position: "absolute",
                right: "40px",
                top: "35px",
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="messageTable responsive-table" id="messageTable">
            <table className="table table-responsive table-hover mt-3 table-bordered lesswidth">
              <thead>
                <tr className="table-success">
                  <th scope="col">Message</th>
                  <th scope="col">Sender</th>
                  <th scope="col">Receiver</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {managers.length > 0 &&
                  messages
                    .filter((item) => {
                      if (search.trim() === "") return true; // Return all items if search is empty

                      // Convert search term to lowercase
                      const lowerCaseSearch = search.toLowerCase();

                      // Check if any of the specified fields include the search term
                      return (
                        (item.Message &&
                          item.Message.toString()
                            .toLowerCase()
                            .includes(lowerCaseSearch)) ||
                        (item.Sender_id &&
                          item.Sender_id.toLowerCase().includes(
                            lowerCaseSearch
                          )) ||
                        (item.Receiver_id &&
                          item.Receiver_id.toString()
                            .toLowerCase()
                            .includes(lowerCaseSearch))
                      );
                    })
                    .map((item, key) => (
                      <tr key={key}>
                        <td>{item.Message}</td>
                        <td>{item.Sender_id}</td>
                        <td>{item.Receiver_id}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Notification;

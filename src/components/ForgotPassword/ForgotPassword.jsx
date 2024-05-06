import user_logo3 from "../../assets/user_logo3.jpeg";
// import { useForm } from "react-hook-form"
import axios from "axios";
import { authentication } from "../firebaseAuth/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../redux/username/usernameSlice";
import toast, { Toaster } from "react-hot-toast";
export default function ForgotPassword() {
  const c_code = "+91";
  const navigate = useNavigate();
  const username = useSelector((state) => state.username.value);
  const dispatch = useDispatch();
  // phone number
  // const [username, setUsername] = useState('');

  const [phoneNumber, setphoneNumber] = useState(c_code);
  const [otp, setotp] = useState("");

  const generate_recaptch = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      authentication,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
      },
      authentication
    );
  };
  const mobile = phoneNumber.slice(3, phoneNumber.length);
  console.log(mobile);

  const requestOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 12) {
      generate_recaptch();
      // window.localStorage.setItem('username', username);
      axios
        .post("http://localhost:8081/forgot", { username, mobile })
        .then((res) => {
          console.log(res);
          if (res.data.message === "User not found") {
            toast.error("Mobile number and username didn't match");
          } else {
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
              .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
              })
              .catch((error) => {
                // Error; SMS not sent
                // ...
                console.log(error);
              });
          }
        })
        .catch((err) => {
          // toast.error("Mobile number and username does not match")
          console.log(err);
        });
    }
  };

  const verifyotp = (e) => {
    e.preventDefault();
    // let otp = e.target.value;

    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        localStorage.setItem("user", username);
        navigate("/newpass");
        console.log(result);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
      });
  };

  return (
    <>
      <div className="right-inner">
        <h1>Forgot Password</h1>

        <div className="user-logo">
          <img src={user_logo3} alt="logo" />
        </div>

        <div className="formlogin">
          <form action="" method="POST" onSubmit={requestOtp}>
            <input
              type="text"
              className="focus-ring focus-ring-light"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // onChange={(e) => dispatch(setUsername(e.target.value))}
              placeholder="Enter your Username"
            />
            <br />
            <input
              type="text"
              className="focus-ring focus-ring-light"
              maxLength="10"
              required
              style={{ width: "13.5vw" }}
              onChange={(e) => setphoneNumber(c_code + e.target.value)}
              pattern="[0-9]{10}"
              placeholder="Enter your Mobile Number"
            />

            <button
              id="send_otp"
              type="submit"
              className="btn btn-light btn-sm"
            >
              Send OTP
            </button>
          </form>
          {/* <br /> */}
          <form action="" method="post" onSubmit={verifyotp}>
            <input
              type="number"
              className="focus-ring focus-ring-light"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              id="otp"
              placeholder="Enter OTP"
            />
            <br />
            <button type="submit" className="btn btn-light" id="submit_form">
              Submit
            </button>
            <div id="recaptcha-container"></div>
          </form>
        </div>

        <Toaster />
      </div>
    </>
  );
}

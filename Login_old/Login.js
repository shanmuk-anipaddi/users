import React, { useState } from "react";
import classes from "./Login.module.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [error, setError] = useState("");
  //const [validPassword,setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const enteredName = (event) => {
    setUserName(event.target.value);
    //console.log(event.target.value);
  };
  const enteredPassword = (event) => {
    setUserPwd(event.target.value);
    //console.log(event.target.value);
  };

  const validateEmailHandler = () => {
      console.log(userName);
      console.log("EMail check "+userName.includes("@"));
      console.log("EMail check 2"+!userName.includes("@"));
    setValidEmail(!userName.includes("@"));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //console.log("Form Submit");
    if (userName.length === 0 || userPwd.length === 0) {
      //console.log("Invalid Details");
      setError("Invalid Details ! Please Enter All the details");
      return;
    }



    if (userPwd.length < 6) {
      setError(
        "Invalid Pwd ! Password length should be grater than or equal to 6"
      );
      return;
    }

    if (userName.length > 0 && userPwd.length >= 6 ) {
      setError("");
    }
  };

  return (
    <div>
      <div className={classes.error}>{error}</div>
      <form onSubmit={submitHandler}>
        <div className={classes.container}>
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            onChange={enteredName}
            onBlur={validateEmailHandler}
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={enteredPassword}
          />
{console.log(validEmail)}
          <button type="submit" disabled={validEmail}>
            Login
          </button>
        </div>

        <div className={classes.container}>
          <button type="button" className={classes.cancelbtn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  //console.log(state);
  switch (action.type) {
    case "INPUT_EVENT":
      return {
        value: action.payload.value,
        isValid: action.payload.value.trim().includes("@"),
      };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.trim().includes("@") };

    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_PASSWORD":
      return {
        value: action.payload.value,
        isValid: action.payload.value.trim().length > 6,
      };
    case "INPUT_PWD_BLUR":
      return { value: state.value, isValid: state.value.trim() > 6 };
    default:
      return { value: "", isValid: false };
  }
};

const Login = (props) => {
  //const [enteredEmail,setEnteredEmail] = useState('');
  //const [emailIsValid,setEmailValid] = useState('');
  //const [enteredPassword,setEnteredPassword] = useState('');
  //const [passwordIsValid,setPasswordIsValid] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("Effect Running");

    return () => {
      console.log("Effect CleanUP");
    };
  }, []);
  //},[enteredPassword])
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const {isValid:emailValid} = emailState;
  const {isValid:passwordValid} = passwordState

  useEffect(()=>{
      //console.log("Check Validation");
      const timeIndenfier = setTimeout(()=>{
          console.log("Inside setTimeout");
          setFormIsValid(
            emailValid && passwordValid
          );
      },500);

      return ()=>{
          console.log("CleanUp");
          clearTimeout(timeIndenfier);
      }
  },[emailValid,passwordValid]);



  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({
      type: "INPUT_EVENT",
      payload: { value: event.target.value },
    });
    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.value.length > 6
    // );
  };

  const validateEmailHandler = () => {
    //setEmailValid(emailState.value.includes('@'));
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({
      type: "INPUT_PASSWORD",
      payload: { value: event.target.value },
    });
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.value.includes("@")
    // );
  };
  const submitHandler = (event) => {
    event.preventDefault();
    
    props.onLogin(emailState.value, passwordState.value);
  };
  const validatePasswordhandler = () => {
    //setPasswordIsValid(passwordState.value.length > 6);
    dispatchPassword({ type: "INPUT_PWD_BLUR" });
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordhandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

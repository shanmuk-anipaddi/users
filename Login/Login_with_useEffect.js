import React,{ useState,useEffect } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Login.module.css';

const Login = (props) => {
    const [enteredEmail,setEnteredEmail] = useState('');
    const [emailIsValid,setEmailValid] = useState('');
    const [enteredPassword,setEnteredPassword] = useState('');
    const [passwordIsValid,setPasswordIsValid] = useState('');
    const [formIsValid,setFormIsValid] = useState(false);

    useEffect(()=>{
        //console.log("Check Validation");
        const timeIndenfier = setTimeout(()=>{
            console.log("Inside setTimeout");
            setFormIsValid(
                enteredEmail.includes('@') && enteredPassword.trim().length > 6
            );
        },500);
        
        return ()=>{
            console.log("CleanUp");
            clearTimeout(timeIndenfier);
        }
    },[enteredEmail,enteredPassword]);



    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.length > 6
        );
    }

    const validateEmailHandler = () => {
        setEmailValid(enteredEmail.includes('@'));
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        setFormIsValid(event.target.value.trim().length > 6 && enteredEmail.includes('@'));
    }
    const submitHandler = (event) => {
        event.preventDefault();
       // console.log(enteredEmail);
        //console.log(enteredPassword);
        props.onLogin(enteredEmail,enteredPassword);
    }

    const validatePasswordhandler = () => {
         setPasswordIsValid(enteredPassword.length > 6);

    }


    return (
            <Card className = {classes.login}>
                <form onSubmit={submitHandler}>
                    <div className={`${classes.control} ${emailIsValid===false ? classes.invalid : ''}`}>
                        <label htmlFor='userEmail'>Email</label>
                        <input type='email' id='userEmail' value={enteredEmail} onChange={emailChangeHandler} onBlur={validateEmailHandler} /> 
                    </div>
                    <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid:''}`}>
                        <label htmlFor='password'>Password</label>
                        <input type = 'password' id="password" value={enteredPassword} onChange={passwordChangeHandler} onBlur={validatePasswordhandler} />
                    </div>
                    <div className={classes.actions}>
                        <Button type='submit' className={classes.btn} disabled = {!formIsValid}>Login</Button>
                    </div>
                </form>
            </Card>

    );
}

export default Login;

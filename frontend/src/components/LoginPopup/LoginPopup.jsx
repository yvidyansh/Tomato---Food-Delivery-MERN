import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
  const {url, settoken} = useContext(StoreContext)
  const [currState, setcurrState] = useState("Sign Up")
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setdata(data => ({...data,[name] : value}))
  }
  const onLogin = async(event) => {
    event.preventDefault();
    let newurl = url;
    if(currState === "Login"){
      newurl += "/api/user/login"
    }else{
      newurl += "/api/user/register"
    }
    const response = await axios.post(newurl, data);
    if(response.data.success){
      settoken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message)
    }
  }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)}/>
        </div>
        <div className="login-popup-input">
          {currState==="Login"?<></>:<input type="text" placeholder='Your Name' required name = 'name' onChange={onChangeHandler} value={data.name}/>}
          <input type="email" placeholder='Your email' required name = 'email' onChange={onChangeHandler} value={data.email}/>
          <input type="password" placeholder='Password' required name = 'password' onChange={onChangeHandler} value={data.password}/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, i agree to accept T&C & privacy policy</p>
        </div>
        {currState==="Login"?<p>Create a new account <span onClick={() =>setcurrState("Sign Up")}>Click Here</span></p>:<p>Already have an account <span onClick={() =>setcurrState("Login")}>Login</span></p>}
      </form>
    </div>
  )
}
export default LoginPopup

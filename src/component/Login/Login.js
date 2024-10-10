import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
const Login=()=>{
    const [data,setData]=useState({
        email:"",
        password:""
    })
    const [msg,setMsg]=useState('')
    const navigate=useNavigate();
    const eml=process.env.REACT_APP_EMAIL;
    const pass=process.env.REACT_APP_PASS;
    const logIn=process.env.REACT_APP_LOGIN;

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
   const handleSubmit=async (e)=>{
    e.preventDefault();
    if(eml===data.email && pass===data.password)
    {
        await sessionStorage.setItem('login',logIn)
        navigate('/admin')
    }
    else
    {
        setMsg("Invalid Admin Details...")
    }
    }
    return(
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Admin Email..." id="eml" name="email" value={data.email} onChange={handleChange} required/>
        <input type="text" placeholder="Enter Admin Password..." id="pss" name="password" value={data.password} onChange={handleChange} required/>
        <p>{msg}</p>
        <button>Enter</button>
    </form>
    </>
    )
}
export default Login;
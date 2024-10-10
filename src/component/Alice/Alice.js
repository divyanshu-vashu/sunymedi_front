import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Alice.css'; // Importing CSS for styling
import axios from 'axios';

const Alice = () => {
    const [aliceDetails, setAliceDetails] = useState({
        name: "",
        mobile: "",
        alice: ""
    });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("login");
        navigate("/"); 
    };

    const handleChange = (e) => {
        setAliceDetails({ ...aliceDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (!aliceDetails.alice.includes(" ")) {
                setMsg("Loading...")
                const url = 'https://sunymedi-backend.onrender.com/api/alice-auth';
                const { data: res } = await axios.post(url, aliceDetails);
                console.log(res);
                setMsg("New Alice created successfully.");
            } else {
                setMsg("Alice number should not contain spaces. Please enter it without spaces.");
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setMsg(error.response.data.message);
            }
        }
    };

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="mainpage-container">
            
            <button className="back-button" onClick={handleBack}>
                &#8592; Back
            </button>

            <h1>Main Page</h1>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>

            <div className="create-alice-form">
                <h2>Create New Alice</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={aliceDetails.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={aliceDetails.mobile}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="aliceNumber">Alice Number:</label>
                    <input
                        type="text"
                        id="aliceNumber"
                        name="alice"
                        value={aliceDetails.alice}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="submit-button">Create Alice</button>
                </form>
                <p>{msg}</p>
            </div>
        </div>
    );
};

export default Alice;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Mainpage.css'; // Import CSS for styling if needed
import axios from "axios";

const Mainpage = () => {
    const [aliceNumber, setAliceNumber] = useState("");
    const [msg,setMsg]=useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("login"); 
        navigate("/"); 
    };

    const handleAliceNumberChange = (e) => {
        setAliceNumber(e.target.value); 
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
            try {
                setMsg("Loading...")
                const { data } = await axios.get(`https://sunymedi-backend.onrender.com/api/alice-details/details/${aliceNumber}`);
                if(data)
                {
                    sessionStorage.setItem('alice',aliceNumber)
                    navigate('/alice-details')
                    setAliceNumber("");
                    
                }
                
            } catch (error) {
                setMsg(error.response.data);

                console.log(error);
            }
        };
    

    return (
        <div className="mainpage-container">
            <h1>Welcome to the Main Page</h1>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
            <Link to="/add-alice" ><button className="add-button">
                Add Alice
            </button></Link>
            <Link to="/details" ><button className="add-button">
                View
            </button></Link>
            <form onSubmit={handleSubmit} className="alice-number-form">
                <label htmlFor="aliceNumber" className="alice-number-label">Enter Alice Number:</label>
                <input
                    type="text"
                    id="aliceNumber"
                    value={aliceNumber}
                    onChange={handleAliceNumberChange}
                    className="alice-number-input"
                    required
                />
                <p>{msg}</p>
                <button type="submit" className="alice-number-submit">Submit</button>
            </form>
        </div>
    );
};

export default Mainpage;

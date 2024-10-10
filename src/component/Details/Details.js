import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import './Details.css'; 
import axios from "axios";

const Details = () => {
    const [aliceDetails, setAliceDetails] = useState([]); 
    const [data, setData] = useState({
        date: ""
    }); 
    const [msg, setMsg] = useState(""); 
    const alice = sessionStorage.getItem('alice');

    useEffect(() => {
        const getUserDetail = async () => {
            try {
                const { data } = await axios.get(`https://sunymedi-backend.onrender.com/api/alice-details/details/${alice}`);
                setAliceDetails(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserDetail();
    }, [alice]);

    const handleDateChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = `https://sunymedi-backend.onrender.com/api/alice/add-transaction/${alice}`;
            const { data: res } = await axios.put(url, data);
            console.log(res);
            setMsg("Date Added Successfully.");
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setMsg(error.response.data.message);
            }
        }
    };

    return ( 
        <div className="alice-details-container">
            <h1>Alice Details</h1>
            <Link to="/admin" className="back-button">&#8592; Back</Link> 
            {aliceDetails && (
                <div className="alice-info">
                    <p><strong>Name:</strong> {aliceDetails.name}</p>
                    <p><strong>Mobile:</strong> {aliceDetails.mobile}</p>
                    <p><strong>Alice Number:</strong> {aliceDetails.alice}</p>

                    <div className="date-selection">
                        <label htmlFor="date">Choose Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={data.date}
                            name="date"
                            onChange={handleDateChange}
                            required
                        />
                        {msg && <p className="message">{msg}</p>}
                        <button className="fetch-button" onClick={handleSubmit}>
                            Add Transaction    
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;

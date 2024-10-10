import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './TransactionViewer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const TransactionViewer = () => {
    const [date, setDate] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [msg, setMsg] = useState('');
    const [details, setDetails] = useState([]); 
    const navigate = useNavigate(); // Initialize the navigate hook

    useEffect(() => {
        const getUserDetail = async () => {
            try {
                setMsg("Please wait...")
                const { data } = await axios.get(`http://localhost:5000/api/details`);
                setDetails(data);
                setMsg("")
            } catch (error) {
                console.log(error);
            }
        };
        getUserDetail(); 
    }, []);

    const isDateInTransactions = (transactions, dateToCheck) => {
        return transactions.some(trans => {
            const transactionDate = new Date(trans).toISOString().split('T')[0];
            return transactionDate === dateToCheck;
        });
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const showTransactions = () => {
        if(date==="")
        {
            setMsg("Please, Select a date...")
        }
        else{
        const result = details
            .filter(detail => isDateInTransactions(detail.transactions, date))
            .map(detail => ({
                alice: detail.alice,
                name: detail.name,
                phone: detail.mobile,
                date: date
            }));

        if (result.length === 0) {
            setMsg("No transactions found on this date.");
        } else {
            setMsg('');
        }
        setFilteredTransactions(result);
    }};

    const downloadExcel = () => {
        if (filteredTransactions.length === 0) {
            setMsg("No data to download.");
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, `transactions_${date}.xlsx`);
    };

    return (
        <div className="transaction-viewer">
            <button className="back-button" onClick={() => navigate(-1)}>
                &#8592; Back
            </button>

            <h2>Transaction Viewer</h2>
            <div className="input-section">
                <label>Select Date:</label>
                <input type="date" value={date} onChange={handleDateChange} />
                <button onClick={showTransactions}>Show Transactions</button>
            </div>
            {msg && <p className="message">{msg}</p>}
            <div className="transaction-list">
                {filteredTransactions.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Alice ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.alice}</td>
                                    <td>{transaction.name}</td>
                                    <td>{transaction.phone}</td>
                                    <td>{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {filteredTransactions.length > 0 && (
                <button onClick={downloadExcel}>Download as Excel</button>
            )}
        </div>
    );
};

export default TransactionViewer;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [bids, setBids] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Electronics");
    const [startingPrice, setStartingPrice] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers();
        fetchBids();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchBids = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/bids`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            console.log("Bids API Response:", response.data); // Add this log
            console.error("Full response:", response);
            if (!response.data || typeof response.data !== "object") {
                console.error("Unexpected response format. Setting bids to an empty array.");
                setBids([]); // Set bids to an empty array as a fallback
                return;
            }
            if (!Array.isArray(response.data)) {
                console.error("Expected an array for bids, but received:", response.data);
                setBids([]); // Set bids to an empty array as a fallback
                return;
            }
            setBids(response.data);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const deleteBid = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/bids/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchBids();
        } catch (error) {
            console.error("Error deleting bid:", error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/admin/bids`,
                { 
                    title, 
                    description, 
                    category, 
                    startingPrice, 
                    currentPrice: startingPrice, 
                    startTime, 
                    endTime, 
                    seller: localStorage.getItem("userId") || "defaultSellerId" 
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setMessage("Bid uploaded successfully!");
            setTitle("");
            setDescription("");
            setCategory("Electronics");
            setStartingPrice("");
            setStartTime("");
            setEndTime("");
            fetchBids(); // Refresh the bids list after a new bid is uploaded
        } catch (error) {
            setMessage("Failed to upload bid. Please try again.");
        }
    };

    const clearAllBids = async () => {
        if (window.confirm("⚠️ WARNING: This will delete ALL old bid data and start fresh with new format. Continue?")) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/bids/clear-all`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setMessage(`✅ ${response.data.message}`);
                fetchBids();
            } catch (error) {
                setMessage("❌ Failed to clear bids. Please try again.");
                console.error("Error clearing bids:", error);
            }
        }
    };

    const categorizeBids = (bids) => {
        if (!Array.isArray(bids)) {
            console.error("Expected an array for bids, but received:", bids);
            return { ongoing: [], upcoming: [], past: [] };
        }

        const now = new Date();
        const ongoing = bids.filter((bid) => new Date(bid.startTime) <= now && new Date(bid.endTime) >= now);
        const upcoming = bids.filter((bid) => new Date(bid.startTime) > now);
        const past = bids.filter((bid) => new Date(bid.endTime) < now);

        return { ongoing, upcoming, past };
    };

    const editBid = async (id, updatedBid) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/bids/${id}`, updatedBid, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchBids(); // Refresh the bids list after editing
        } catch (error) {
            console.error("Error editing bid:", error);
        }
    };

    const { ongoing, upcoming, past } = categorizeBids(bids);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            
            {/* Simple Admin Controls */}
            <div style={{backgroundColor: '#f8f9fa', padding: '15px', margin: '20px 0', borderRadius: '8px'}}>
                <h3>� Admin Controls</h3>
                <button 
                    onClick={clearAllBids}
                    style={{backgroundColor: '#dc3545', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginRight: '10px'}}
                >
                    �️ Clear All Old Data & Start Fresh
                </button>
                <p style={{margin: '10px 0', fontSize: '14px', color: '#666'}}>
                    Use this to delete all old format data and start with clean new format only.
                </p>
            </div>

            <h2>Users</h2>
            <ul>
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <li key={user._id}>
                            {user.username} - {user.email}
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </ul>
            <h2>Bids</h2>
            <h3>Ongoing Bids</h3>
            <ul>
                {ongoing.length === 0 ? (
                    <p>No ongoing bids</p>
                ) : (
                    ongoing.map((bid) => (
                        <li key={bid._id} style={{marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px'}}>
                            <strong>{bid.title}</strong> - <span style={{color: 'green'}}>${bid.currentPrice}</span>
                            <div style={{marginTop: '5px'}}>
                                <button onClick={() => deleteBid(bid._id)} style={{backgroundColor: '#dc3545', color: 'white', marginRight: '5px', padding: '5px 10px', border: 'none', borderRadius: '3px'}}>Delete</button>
                                <button onClick={() => editBid(bid._id, { title: bid.title, startingPrice: bid.startingPrice })} style={{backgroundColor: '#007bff', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '3px'}}>Edit</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <h3>Upcoming Bids</h3>
            <ul>
                {upcoming.length === 0 ? (
                    <p>No upcoming bids</p>
                ) : (
                    upcoming.map((bid) => (
                        <li key={bid._id}>
                            {bid.title} - ${bid.currentPrice}
                        </li>
                    ))
                )}
            </ul>
            <h3>Past Bids</h3>
            <ul>
                {past.length === 0 ? (
                    <p>No past bids</p>
                ) : (
                    past.map((bid) => (
                        <li key={bid._id} style={{marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px'}}>
                            <strong>{bid.title}</strong> - <span style={{color: 'gray'}}>${bid.currentPrice}</span>
                        </li>
                    ))
                )}
            </ul>
            <h2>Upload New Bid</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label>Item Name:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Electronics">Electronics</option>
                        <option value="Antiques">Antiques</option>
                        <option value="Art">Art</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Starting Price:</label>
                    <input
                        type="number"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminDashboard;

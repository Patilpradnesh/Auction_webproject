import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [bids, setBids] = useState([]);
    const [item, setItem] = useState("");
    const [startingBid, setStartingBid] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers();
        fetchBids();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/admin/users", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchBids = async () => {
        try {
            const response = await axios.get("/admin/bids", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setBids(response.data);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const deleteBid = async (id) => {
        try {
            await axios.delete(`/admin/bids/${id}`, {
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
                "/admin/bids",
                { item, startingBid },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setMessage("Bid uploaded successfully!");
            setItem("");
            setStartingBid("");
            fetchBids(); // Refresh the bids list after a new bid is uploaded
        } catch (error) {
            setMessage("Failed to upload bid. Please try again.");
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {users.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    users.map((user) => (
                        <li key={user._id}>
                            {user.username} - {user.email}
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>
            <h2>Bids</h2>
            <ul>
                {bids.length === 0 ? (
                    <h3>No Bids for now</h3>
                ) : (
                    bids.map((bid) => (
                        <li key={bid._id}>
                            {bid.item} - ${bid.yourBid}
                            <button onClick={() => deleteBid(bid._id)}>Delete</button>
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
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Starting Bid:</label>
                    <input
                        type="number"
                        value={startingBid}
                        onChange={(e) => setStartingBid(e.target.value)}
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

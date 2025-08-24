import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [bids, setBids] = useState([]);

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

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} - {user.email}
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Bids</h2>
            <ul>
                {bids.map((bid) => (
                    <li key={bid._id}>
                        {bid.item} - ${bid.yourBid}
                        <button onClick={() => deleteBid(bid._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;

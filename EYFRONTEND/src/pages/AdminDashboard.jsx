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
            await axios.put(`/admin/bids/${id}`, updatedBid, {
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
                        <li key={bid._id}>
                            {bid.item} - ${bid.leading}
                            <button onClick={() => deleteBid(bid._id)}>Delete</button>
                            <button onClick={() => editBid(bid._id, { item: "Updated Item", startingBid: 100 })}>Edit</button>
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
                            {bid.item} - ${bid.leading}
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
                        <li key={bid._id}>
                            {bid.item} - ${bid.leading}
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

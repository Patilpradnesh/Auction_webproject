import React, { useEffect, useState } from "react";
import axios from "axios";
import AuctionBox from "../components/AuctionBox";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [bids, setBids] = useState([]);
    const getLocalDatetime = (offsetHours = 0) => {
        const now = new Date();
        now.setHours(now.getHours() + offsetHours);
        const tzOffset = now.getTimezoneOffset() * 60000;
        return new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Electronics");
    const [startingPrice, setStartingPrice] = useState("");
    const [minimumIncrement, setMinimumIncrement] = useState("1");
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [startTime, setStartTime] = useState(getLocalDatetime(0));
    const [endTime, setEndTime] = useState(getLocalDatetime(24));
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers();
        fetchBids();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchBids = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/bids`);
            setBids(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching bids:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const deleteBid = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/bids/${id}`);
            fetchBids();
        } catch (error) {
            console.error("Error deleting bid:", error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (new Date(endTime) <= new Date(startTime)) {
            return setMessage("❌ End time must be after start time.");
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("startingPrice", startingPrice);
            formData.append("currentPrice", startingPrice);
            formData.append("minimumIncrement", minimumIncrement);
            
            // Convert local datetime to UTC ISO string to prevent timezone offset bugs
            formData.append("startTime", new Date(startTime).toISOString());
            formData.append("endTime", new Date(endTime).toISOString());
            
            if (imageFile) {
                formData.append("image", imageFile);
            }

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/admin/bids`,
                formData,
                { 
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true 
                }
            );
            setMessage("✅ Bid published successfully!");
            setTitle("");
            setDescription("");
            setCategory("Electronics");
            setStartingPrice("");
            setMinimumIncrement("1");
            setImageFile(null);
            setPreviewUrl("");
            setStartTime("");
            setEndTime("");
            fetchBids();
        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
            const errorMsg = error.response?.data?.message || "Please try again.";
            setMessage(`❌ Failed to publish bid: ${errorMsg}`);
        }
    };

    const clearAllBids = async () => {
        if (window.confirm("⚠️ WARNING: This will delete ALL old bid data and start fresh with new format. Continue?")) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/bids/clear-all`);
                setMessage(`✅ ${response.data.message}`);
                fetchBids();
            } catch (error) {
                setMessage("❌ Failed to clear bids. Please try again.");
                console.error("Error clearing bids:", error);
            }
        }
    };

    const categorizeBids = (bids) => {
        if (!Array.isArray(bids)) return { ongoing: [], upcoming: [], past: [] };
        const now = new Date();
        const ongoing = bids.filter((bid) => new Date(bid.startTime) <= now && new Date(bid.endTime) >= now);
        const upcoming = bids.filter((bid) => new Date(bid.startTime) > now);
        const past = bids.filter((bid) => new Date(bid.endTime) < now);
        return { ongoing, upcoming, past };
    };

    const editBid = async (id, updatedBid) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/bids/${id}`, updatedBid);
            fetchBids();
        } catch (error) {
            console.error("Error editing bid:", error);
        }
    };

    const getPreviewStatus = () => {
        if (!startTime || !endTime) return "upcoming";
        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (now < start) return "upcoming";
        if (now >= start && now <= end) return "ongoing";
        return "sold";
    };

    const { ongoing, upcoming, past } = categorizeBids(bids);

    return (
        <div className="min-h-screen flex flex-col items-center bg-slate-50 pt-28 pb-20">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Header */}
                <div className="glass-panel p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>
                    <h1 className="text-4xl font-black mb-2 relative z-10">Admin Control Center</h1>
                    <p className="text-slate-300 relative z-10">Manage users, oversee live auctions, and publish new inventory.</p>
                </div>

                {/* System Controls */}
                <div className="glass-panel p-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Database Management</h3>
                        <p className="text-slate-500 text-sm">Purge legacy data to maintain high performance.</p>
                    </div>
                    <button
                        className="px-6 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl border border-rose-200 hover:bg-rose-100 transition shadow-sm"
                        onClick={clearAllBids}
                    >
                        Clear All Bid Data
                    </button>
                </div>

                {/* Main Grids */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Left Col: Users */}
                    <div className="glass-panel p-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 h-96 flex flex-col">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900 border-b border-slate-100 pb-2">Registered Users</h2>
                        <div className="overflow-y-auto flex-grow pr-2 custom-scrollbar">
                            <ul className="space-y-3">
                                {Array.isArray(users) && users.length > 0 ? (
                                    users.map((user) => (
                                        <li key={user._id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                                            <div>
                                                <span className="block font-bold text-slate-800">{user.username || user.name}</span>
                                                <span className="block text-xs text-slate-500">{user.email}</span>
                                            </div>
                                            <button
                                                className="text-xs font-bold text-rose-500 hover:text-rose-700 px-3 py-1 bg-rose-50 rounded-lg transition"
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Revoke
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-slate-400 italic text-sm">No users found</p>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Col: Active Bids Overview */}
                    <div className="glass-panel p-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 h-96 flex flex-col">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900 border-b border-slate-100 pb-2">Active Auctions</h2>
                        <div className="overflow-y-auto flex-grow pr-2 custom-scrollbar">
                            <ul className="space-y-3">
                                {ongoing.length === 0 ? (
                                    <p className="text-slate-400 italic text-sm">No ongoing bids</p>
                                ) : (
                                    ongoing.map((bid) => (
                                        <li key={bid._id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                                            <div>
                                                <span className="block font-bold text-slate-800 line-clamp-1">{bid.title}</span>
                                                <span className="block text-xs font-bold text-emerald-600">Current: ${bid.currentPrice}</span>
                                            </div>
                                            <div className="flex gap-2 mt-2 sm:mt-0">
                                                <button
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1 bg-blue-50 rounded-lg transition"
                                                    onClick={() => editBid(bid._id, { title: bid.title, startingPrice: bid.startingPrice })}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-xs font-bold text-rose-500 hover:text-rose-700 px-3 py-1 bg-rose-50 rounded-lg transition"
                                                    onClick={() => deleteBid(bid._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Professional Creation Workflow */}
                <div className="glass-panel p-8 rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 mt-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900">Publish New Auction</h2>
                        <p className="text-slate-500 mt-1">Fill out the parameters below to instantly deploy a real-time auction.</p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                        {/* Form Section */}
                        <div className="xl:col-span-7">
                            <form className="space-y-6" onSubmit={handleUpload}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">Item Title</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                                            placeholder="e.g., 1969 Ford Mustang Mach 1"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700">Description</label>
                                        <textarea
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white h-24 resize-none"
                                            placeholder="Provide detailed condition, history, and specifications..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Category</label>
                                        <select
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50 focus:bg-white appearance-none"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="Electronics">Electronics</option>
                                            <option value="Antiques">Antiques</option>
                                            <option value="Art">Art</option>
                                            <option value="Vehicles">Vehicles</option>
                                            <option value="Real Estate">Real Estate</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Upload Image</label>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setImageFile(file);
                                                if (file) {
                                                    setPreviewUrl(URL.createObjectURL(file));
                                                } else {
                                                    setPreviewUrl("");
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Starting Price ($)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50 focus:bg-white"
                                            placeholder="e.g., 500"
                                            value={startingPrice}
                                            onChange={(e) => setStartingPrice(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Min. Bid Increment ($)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50 focus:bg-white"
                                            placeholder="e.g., 10"
                                            value={minimumIncrement}
                                            onChange={(e) => setMinimumIncrement(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Start Time</label>
                                        <input
                                            type="datetime-local"
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50 focus:bg-white"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">End Time</label>
                                        <input
                                            type="datetime-local"
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50 focus:bg-white"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                                    <div className="text-sm font-medium">
                                        {message && (
                                            <span className={message.includes("✅") ? "text-emerald-600" : "text-rose-600"}>
                                                {message}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition active:scale-[0.98]"
                                        type="submit"
                                    >
                                        Deploy Auction
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Live Preview Section */}
                        <div className="xl:col-span-5 hidden md:block">
                            <div className="sticky top-24">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Live Interface Preview</h3>
                                <div className="pointer-events-none transform scale-[0.95] origin-top">
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden flex flex-col">
                                        <AuctionBox 
                                            status={getPreviewStatus()}
                                            title={title || "Your Item Title"}
                                            price={`$${startingPrice || "0"}`}
                                            timeLeft={endTime ? "Ready to deploy" : "Set timeline..."}
                                            imageUrl={previewUrl || "https://images.unsplash.com/photo-1584844055273-05c091d3ccf3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                            id="preview"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;

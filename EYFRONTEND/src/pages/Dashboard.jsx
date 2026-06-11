import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ActiveBidCard from "../components/ActiveBidCard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeBids, setActiveBids] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bidsRes, profileRes, historyRes] = await Promise.all([
          axios.get("/api/bids"),
          axios.get("/api/users/me"),
          axios.get("/api/users/me/bids")
        ]);

        setActiveBids(bidsRes.data.data || []);
        setUserDetails(profileRes.data.data);
        setBidHistory(historyRes.data.data.bids || []);
      } catch (error) {
        console.error("Dashboard data sync error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const winningCount = activeBids.filter(bid => 
      String(bid.currentWinner?._id || bid.currentWinner) === String(user?.id)
    ).length;

    const totalSpent = bidHistory.reduce((sum, bid) => sum + (bid.amount || 0), 0);

    return { winningCount, totalSpent, activeCount: activeBids.length };
  }, [activeBids, bidHistory, user]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & User Profile */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Member Dashboard</h1>
            <p className="text-slate-500 font-medium">Manage your active bids and track your collection.</p>
          </div>
          
          <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-4 bg-white/50 ring-1 ring-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl uppercase">
              {user?.name?.[0] || "U"}
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-none mb-1">{user?.name}</div>
              <div className="text-xs text-slate-400 font-medium">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel p-8 rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 flex items-center justify-between group hover:border-blue-500/50 transition-all">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Live Bidding</span>
              <div className="text-4xl font-black text-slate-900">{stats.activeCount}</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 flex items-center justify-between group hover:border-emerald-500/50 transition-all">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Winning Bids</span>
              <div className="text-4xl font-black text-emerald-600">{stats.winningCount}</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 flex items-center justify-between group hover:border-amber-500/50 transition-all sm:col-span-2 lg:col-span-1">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Total Investment</span>
              <div className="text-4xl font-black text-amber-600">${stats.totalSpent.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Live Marketplace Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">Live Marketplace</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider shadow-sm">Real-time Updates On</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeBids.length > 0 ? (
              activeBids.map((bid) => (
                <div key={bid._id} className="h-full">
                  <ActiveBidCard bid={bid} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Auctions</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-6">There are currently no live items to bid on. Check back soon for new drops!</p>
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors">
                  Explore Future Drops
                </button>
              </div>
            )}
          </div>
        </section>

        {/* History / Activity Log */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900">Your Activity History</h2>
            <p className="text-slate-500 text-sm">Full log of all bids you've placed across the platform.</p>
          </div>

          <div className="glass-panel rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden">
            <div className="p-8">
              {bidHistory.length > 0 ? (
                <div className="space-y-4">
                  {bidHistory.map((bid, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{bid.title || 'Bid Placed'}</div>
                          <div className="text-xs text-slate-400 font-medium">Transaction ID: {bid.auctionId?.slice(-8).toUpperCase() || 'TXN-000'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-slate-900">${bid.amount.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(bid.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 italic text-slate-400 font-medium">
                  Your bid history will appear here once you place your first bid.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

export default function Dashboard() {
    const activeBids = [
      { id: 1, item: 'Vintage Camera', yourBid: '$150', leading: true },
      { id: 2, item: 'Rare Painting', yourBid: '$900', leading: false },
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
      {/* Your existing Navbar component here */}
    
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-8">Your Dashboard</h1>
    
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Active Bids</h3>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Winning</h3>
          <p className="text-3xl font-bold mt-2">2</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Spent</h3>
          <p className="text-3xl font-bold mt-2">$1,240</p>
        </div>
        </div>
    
        {/* Active Bids Table */}
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Your Active Bids</h2>
        <table className="w-full" border={}>
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Item</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Your Bid</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {activeBids.map((bid) => (
            <tr key={bid.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bid.item}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bid.yourBid}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {bid.leading ? (
                        <span className="text-green-600">Winning</span>
                      ) : (
                        <span className="text-red-600">Outbid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
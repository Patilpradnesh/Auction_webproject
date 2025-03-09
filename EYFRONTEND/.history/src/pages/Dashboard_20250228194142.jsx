export default function Dashboard() {
  const activeBids = [
    { id: 1, item: "Vintage Camera", yourBid: "$150", leading: true },
    { id: 2, item: "Rare Painting", yourBid: "$900", leading: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      /* Your existing Navbar component here */}

        <div className="max-w-6xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-8">Your Dashboard</h1>

          {/* Quick Stats */}
          <table className="table-auto w-full mb-12">
            <thead>
          <tr>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Value</th>
          </tr>
            </thead>
            <tbody>
          <tr>
            <td className="border px-4 py-2">Active Bids</td>
            <td className="border px-4 py-2">5</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Winning</td>
            <td className="border px-4 py-2">2</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total Spent</td>
            <td className="border px-4 py-2">$1,240</td>
          </tr>
            </tbody>
          </table>

          {/* Active Bids Table */}}

        <div className="bg-white rounded-lg shadow  border border-black">
          <h2 className="text-xl font-semibold p-6 border-b">
            Your Active Bids
          </h2>
          <table className="table table-striped table-dark ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Your Bid
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeBids.map((bid) => (
                <tr key={bid.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bid.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bid.yourBid}
                  </td>
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

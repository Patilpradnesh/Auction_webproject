export default function AuctionBox({
  status,
  title,
  price,
  timeLeft,
  imageUrl,
}) {
  const statusStyles = {
    ongoing: { bg: "bg-blue-100", text: "text-blue-800", badge: "Live Now" },
    upcoming: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      badge: "Coming Soon",
    },
    sold: { bg: "bg-green-100", text: "text-green-800", badge: "Sold" },
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow mx-2">
        <div className="h-48 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
          <span
            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status].bg} ${statusStyles[status].text}`}
          >
            {statusStyles[status].badge}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 truncate">{title}</h3>

          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm text-gray-500">
                {status === "sold"
                  ? "Sold Price"
                  : status === "ongoing"
                  ? "Current Bid"
                  : "Starting Bid"}
              </p>
              <p className="text-lg font-bold text-gray-800">{price}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                {status === "sold"
                  ? "Sold On"
                  : status === "ongoing"
                  ? "Time Left"
                  : "Starts In"}
              </p>
              <p
                className={`font-medium ${
                  status === "ongoing" ? "text-red-600" : "text-gray-700"
                }`}
              >
                {timeLeft}
              </p>
            </div>
          </div>

          <button
            className={`w-full py-2 rounded-lg font-medium transition-colors ${
              status === "sold"
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : status === "ongoing"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {status === "sold"
              ? "View Details"
              : status === "ongoing"
              ? "Place Bid"
              : "Notify Me"}
          </button>
        </div>
      </div>
    </div>
  );
}

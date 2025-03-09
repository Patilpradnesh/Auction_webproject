import { Link } from "react-router-dom";

function AuctionCard({ auction }) {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{auction.title}</h2>
            <p>Starting Price: ${auction.startingPrice}</p>
            <Link to={`/auction/${auction.id}`} className="text-blue-500">View Details</Link>
        </div>
    );
}

export default AuctionCard;

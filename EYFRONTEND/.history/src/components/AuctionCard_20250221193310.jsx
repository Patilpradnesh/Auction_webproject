import { Link } from "react-router-dom";

function AuctionCard({ auction }) {
    return (
<div className="auction-card">
    <img src={auction.image} alt={auction.title} className="auction-card__image" />
    <div className="auction-card__details">
    <h2 className="auction-card__title">{auction.title}</h2>
    <p className="auction-card__description">{auction.description}</p>
    <p className="auction-card__price">Starting bid: ${auction.startingBid}</p>
    <Link to={`/auction/${auction.id}`} className="auction-card__link">View Auction</Link>
    </div>
</div></div></div>
    );
}

export default AuctionCard;

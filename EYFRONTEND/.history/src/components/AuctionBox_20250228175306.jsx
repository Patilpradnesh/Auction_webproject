const AuctionBox = ({ status, title, price, timeLeft, imageUrl }) => {
  const statusColors = {
    ongoing: "bg-primary",
    upcoming: "bg-warning",
    sold: "bg-secondary"
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <span className={`position-absolute top-0 end-0 m-2 badge ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">Current Bid:</span>
          <span className="text-success fw-bold">{price}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">Time Left:</span>
          <span className="text-primary">{timeLeft}</span>
        </div>
      </div>
    </div>
  );
};
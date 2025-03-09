export default function AuctionBox({ status, title, price, timeLeft, imageUrl }) {
  const statusStyles = {
    ongoing: { 
      bg: "bg-primary", 
      text: "text-white", 
      badge: "Live Now",
      button: "btn-primary"
    },
    upcoming: {
      bg: "bg-warning", 
      text: "text-dark", 
      badge: "Coming Soon",
      button: "btn-outline-secondary"
    },
    sold: { 
      bg: "bg-secondary", 
      text: "text-white", 
      badge: "Sold",
      button: "btn-success"
    }
  };

  return (
    <div className="card h-100 ml-3" style={{ minWidth: "300px" }}>
      <div className="card-img-top position-relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="img-fluid"
            style={{ height: "200px", objectFit: "cover" }}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center bg-light" 
               style={{ height: "200px" }}>
            <span className="text-muted">No Image Available</span>
          </div>
        )}
        <span className={`position-absolute top-0 end-0 m-2 badge ${statusStyles[status].bg} ${statusStyles[status].text}`}>
          {statusStyles[status].badge}
        </span>
      </div>

      <div className="card-body">
        <h5 className="card-title text-truncate">{title}</h5>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <small className="text-muted">
              {status === "sold" ? "Sold Price" : 
               status === "ongoing" ? "Current Bid" : "Starting Bid"}
            </small>
            <div className="h5 text-success">{price}</div>
          </div>
          
          <div>
            <small className="text-muted">
              {status === "sold" ? "Sold On" : 
               status === "ongoing" ? "Time Left" : "Starts In"}
            </small>
            <div className={`fw-bold ${status === "ongoing" ? "text-danger" : "text-primary"}`}>
              {timeLeft}
            </div>
          </div>
        </div>

        <button 
          className={`btn w-100 ${statusStyles[status].button}`}
          disabled={status === "sold"}
        >
          {status === "sold" ? "View Details" : 
           status === "ongoing" ? "Place Bid" : "Notify Me"}
        </button>
      </div>
    </div>
  );
}
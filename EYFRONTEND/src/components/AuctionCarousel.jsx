import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AuctionCarousel = () => {
  const auctionItems = [
    {
      id: 1,
      url: "https://wallup.net/wp-content/uploads/2015/12/237950-vintage-car-Headlights-photography.jpg",
      title: "Luxury Car Auction",
      description: "Bid on high-end luxury cars!",
    },
    {
      id: 2,
      url: "https://jerrysantiquesandestates.com/wp-content/uploads/2023/05/The-4-Most-Popular-Collectible-Vintage-Items.jpg",
      title: "Rare Antique Collection",
      description: "Exclusive antique items up for auction.",
    },
    {
      id: 3,
      url: "https://i.ytimg.com/vi/LLV4lxAfp3g/maxresdefault.jpg",
      title: "Real Estate Deals",
      description: "Premium real estate properties available.",
    },
  ];

  return (
    <div className="container mt-4">
      <Carousel>
        {auctionItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100 rounded img-fluid p-1"
              src={item.url}
              alt={item.title}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 p-2 rounded">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default AuctionCarousel;

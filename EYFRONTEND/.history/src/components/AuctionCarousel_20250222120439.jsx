import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AuctionCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

const auctionItems = [
    {
        id: 1,
        url: "src/assets/auctioncar.jpg",
        title: "Luxury Car Auction",
        description: "Bid on high-end luxury cars!",
    },
    {
        id: 2,
        url: "src/assets/Antique.jpg",
        title: "Rare Antique Collection",
        description: "Exclusive antique items up for auction.",
    },
    {
        id: 3,
        url: "src/assets/real",
        title: "Real Estate Deals",
        description: "Premium real estate properties available.",
    },
];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Slider {...settings}>
        {auctionItems.map((item) => (
          <div key={item.id} className="relative">
            <img src={item.image} alt={item.title} className="w-full rounded-lg" />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-lg">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AuctionCarousel;

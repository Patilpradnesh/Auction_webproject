import React from "react";
import AuctionCarousel from "../components/AuctionCarousel";
import AuctionBox from "../components/AuctionBox";
import index.

const Home = () => {
  const auctions = [
    {
      status: 'ongoing',
      title: 'Vintage Camera Collection',
      price: '$450',
      timeLeft: '2h 45m',
      imageUrl: 'https://example.com/camera.jpg'
    },
    {
      status: 'upcoming',
      title: 'Rare Oil Painting',
      price: '$1,200',
      timeLeft: '3d 2h',
      imageUrl: 'https://example.com/painting.jpg'
    },
    {
      status: 'sold',
      title: 'Antique Pocket Watch',
      price: '$980',
      timeLeft: '15 Jan 2024',
      imageUrl: 'https://example.com/watch.jpg'
    }
  ];

  return (
    <div className="container-fluid p-0">
      <AuctionCarousel />
      
      <div className="container py-5">
        <h1 className="text-center mb-4">Welcome to Our Auction Platform</h1>
        <h2 className="mb-4 text-center">Auction Showcase</h2>

        {/* Horizontal Scroll Row */}
        <div className="row flex-nowrap overflow-auto pb-3">
          {auctions.map((auction, index) => (
            <div key={index} className="col-md-4 col-lg-3 col-xl-2 mb-4">
              <AuctionBox
                status={auction.status}
                title={auction.title}
                price={auction.price}
                timeLeft={auction.timeLeft}
                imageUrl={auction.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
import React from "react";
import AuctionCarousel from "../components/AuctionCarousel";
import AuctionBox from "../components/AuctionBox";

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
        <div className="auction-scroll-container">
          {auctions.map((auction, index) => (
            <div key={index} className="auction-card">
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

      {/* Custom Styles */}
      <style jsx>{`
        .auction-scroll-container {
          display: flex;
          overflow-x: auto;
          gap: 16px;
          padding-bottom: 10px;
          scrollbar-width: thin;
          scrollbar-color: #aaa transparent;
        }

        .auction-scroll-container::-webkit-scrollbar {
          height: 8px;
        }

        .auction-scroll-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .auction-card {
          flex: 0 0 auto;
          width: 300px;
          height: 100%;
          transition: transform 0.3s ease-in-out;
        }

        .auction-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default Home;
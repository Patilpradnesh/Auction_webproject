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
      imageUrl: 'http://2.bp.blogspot.com/_lB2e68ciARM/TDliRap5a6I/AAAAAAAAAbs/A4scnnMagPw/s1600/three_old_cameras.jpg'
    },
    {
      status: 'upcoming',
      title: 'Rare Oil Painting',
      price: '$1,200',
      timeLeft: '3d 2h',
      imageUrl: 'https://www.regentantiques.com/product_images/900X600/08456-Antique-Oil-Painting-At-The-Mouth-of-The-Grand-Canal-Venice-J.Vivian-1.jpg'
    },
    {
      status: 'sold',
      title: 'Antique Pocket Watch',
      price: '$980',
      timeLeft: '15 Jan 2024',
      imageUrl: 'http://thumbs.dreamstime.com/z/vintage-pocket-watch-antique-35091687.jpg'
    }
  ];

  return (
    <div className="container-fluid p-0">
      <AuctionCarousel />
      
      <div className="container py-5 text-center">
        <h1 className="mb-4">Welcome to Our Auction Platform</h1>
        <h2 className="mb-4">Auction Showcase</h2>

        {/* Centered Auction Cards with Horizontal Scroll */}
        <div className="auction-wrapper">
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
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .auction-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .auction-scroll-container {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 15px 0;
          max-width: 80%;
          justify-content: center;
          scrollbar-width: thin;
          scrollbar-color: #aaa transparent;
        }

        .auction-scroll-container::-webkit-scrollbar {
          height: 6px;
        }

        .auction-scroll-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .auction-card {
          flex: 0 0 auto;
          width: 280px;
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

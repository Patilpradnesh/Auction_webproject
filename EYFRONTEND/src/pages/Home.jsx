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
    <div className="container-fluid">
      <AuctionCarousel />
      
      <div className="container py-3 py-md-5 text-center">
        <h1 className="mb-3 mb-md-4 display-5 display-md-4">Welcome to Our Auction Platform</h1>
        <h2 className="mb-3 mb-md-4 h3 h-md-2">Auction Showcase</h2>

        {/* Responsive Auction Cards Grid */}
        <div className="row g-3 g-md-4">
          {auctions.map((auction, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="auction-card h-100">
                <AuctionBox
                  status={auction.status}
                  title={auction.title}
                  price={auction.price}
                  timeLeft={auction.timeLeft}
                  imageUrl={auction.imageUrl}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Responsive Styles */}
      <style>{`
        .auction-card {
          transition: transform 0.3s ease-in-out;
          height: 100%;
        }

        .auction-card:hover {
          transform: translateY(-5px);
        }

        /* Mobile First Responsive Design */
        @media (max-width: 576px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          h1 {
            font-size: 1.8rem;
          }
          
          h2 {
            font-size: 1.4rem;
          }
        }

        @media (min-width: 768px) {
          .auction-card:hover {
            transform: translateY(-8px);
          }
        }

        @media (min-width: 992px) {
          .container {
            max-width: 1140px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

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
    <div>
      <AuctionCarousel />
      <h1 className="text-center text-2xl font-bold mt-6">Welcome to Our Auction Platform</h1>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Auction Showcase</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {auctions.map((auction, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={auction.imageUrl} alt={auction.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{auction.title}</h3>
                  <p className="text-gray-700 mb-2">Status: {auction.status}</p>
                  <p className="text-gray-700 mb-2">Price: {auction.price}</p>
                  <p className="text-gray-700">Time Left: {auction.timeLeft}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

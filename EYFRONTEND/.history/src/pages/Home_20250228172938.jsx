import React from "react";
import AuctionCarousel from "../components/AuctionCarousel";
import AuctionBox from "../components/AuctionBox";

const Home = () => {
  const auctions = [
    {
      status: "ongoing",
      title: "Vintage Camera Collection",
      price: "$450",
      timeLeft: "2h 45m",
      imageUrl: "https://example.com/camera.jpg",
    },
    {
      status: "upcoming",
      title: "Rare Oil Painting",
      price: "$1,200",
      timeLeft: "3d 2h",
      imageUrl: "https://example.com/painting.jpg",
    },
    {
      status: "sold",
      title: "Antique Pocket Watch",
      price: "$980",
      timeLeft: "15 Jan 2024",
      imageUrl: "https://example.com/watch.jpg",
    },
  ];
  return (
    <div>
      <AuctionCarousel />
      <h1 className="text-center text-2xl font-bold mt-6">
        Welcome to Our Auction Platform
      </h1>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Auction Showcase
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              {auctions.map((auction, index) => (
                <AuctionBox
                  key={index}
                  status={auction.status}
                  title={auction.title}
                  price={auction.price}
                  timeLeft={auction.timeLeft}
                  imageUrl={auction.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";

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

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === auctionItems.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [auctionItems.length]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group bg-slate-900">
      {auctionItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={item.url}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${
              index === currentIndex ? "scale-105" : "scale-100"
            }`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 px-6">
            <div className={`max-w-3xl text-center transform transition-all duration-700 delay-300 ${index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-lg border border-blue-400/30">
                Featured Auction
              </span>
              <h3 className="font-display text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
                {item.title}
              </h3>
              <p className="text-lg md:text-2xl text-slate-200 font-medium drop-shadow-lg max-w-2xl mx-auto">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? auctionItems.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev === auctionItems.length - 1 ? 0 : prev + 1))}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {auctionItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuctionCarousel;

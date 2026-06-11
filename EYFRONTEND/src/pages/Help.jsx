import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  const faqs = [
    {
      question: "How do I place a bid?",
      answer: "Navigate to an active auction, enter an amount higher than the current price (plus the minimum increment), and click 'Place Bid'. You must be logged in.",
    },
    {
      question: "What happens if I win an auction?",
      answer: "If you are the highest bidder when the timer expires, you win the auction. The item will appear in your Dashboard under 'Winning Bids', and the seller will contact you for fulfillment.",
    },
    {
      question: "Can I cancel a bid?",
      answer: "Bids are binding. Once placed, you cannot retract them. Please ensure you are ready to purchase before bidding.",
    },
    {
      question: "How does the anti-snipe feature work?",
      answer: "If a bid is placed within the last 5 minutes of an auction, the timer is automatically extended by 5 minutes to allow other bidders a fair chance.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Help Center & Rules</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about bidding, winning, and using AuctionPro.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Contact */}
        <div className="glass-panel p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
          <p className="text-slate-300 mb-8">Our support team is available 24/7 to assist you with any issues.</p>
          <Link
            to="/Contact"
            className="inline-block px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Help;

import React from 'react'


export default function About() {
return (
    <>
        <div className="container mt-5">
            <h1 className="text-center">About Us</h1>
            <p className="text-center">
                Welcome to AuctionPro, a next-generation online auction platform designed for seamless and secure bidding. Whether you're a buyer looking for exclusive deals or a seller aiming to reach a wide audience, our platform ensures a fair, transparent, and real-time auction experience.
            </p>
            <h3 className="mt-4">Why Choose AuctionPro?</h3>
            <ul className="list-group">
                <li className="list-group-item">Real-Time Bidding – Engage in fast, competitive auctions with live updates.</li>
                <li className="list-group-item">Secure Transactions – Enjoy safe payments with advanced security protocols.</li>
                <li className="list-group-item">User-Friendly Interface – Easily navigate and participate in auctions.</li>
                <li className="list-group-item">Scalable & Reliable – Powered by cutting-edge MERN stack technology for high performance.</li>
            </ul>
        </div>
    </>
)
}

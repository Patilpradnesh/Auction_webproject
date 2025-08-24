import React from 'react'


export default function About() {
return (
    <>
        <div className="container py-4 py-md-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8">
                    <div className="text-center mb-4 mb-md-5">
                        <h1 className="display-5 display-md-4 fw-bold mb-3">About Us</h1>
                        <p className="lead px-2 px-md-0">
                            Welcome to AuctionPro, a next-generation online auction platform designed for seamless and secure bidding. Whether you're a buyer looking for exclusive deals or a seller aiming to reach a wide audience, our platform ensures a fair, transparent, and real-time auction experience.
                        </p>
                    </div>
                    
                    <div className="mb-4 mb-md-5">
                        <h3 className="h4 h-md-3 mb-3 mb-md-4 text-primary">Why Choose AuctionPro?</h3>
                        <div className="row g-3 g-md-4">
                            <div className="col-12 col-md-6">
                                <div className="list-group-item border-0 bg-light rounded p-3 p-md-4 h-100">
                                    <div className="d-flex align-items-start">
                                        <div className="me-3">
                                            <i className="fas fa-bolt text-warning fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2">Real-Time Bidding</h5>
                                            <p className="mb-0 text-muted">Engage in fast, competitive auctions with live updates.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-12 col-md-6">
                                <div className="list-group-item border-0 bg-light rounded p-3 p-md-4 h-100">
                                    <div className="d-flex align-items-start">
                                        <div className="me-3">
                                            <i className="fas fa-shield-alt text-success fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2">Secure Transactions</h5>
                                            <p className="mb-0 text-muted">Enjoy safe payments with advanced security protocols.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-12 col-md-6">
                                <div className="list-group-item border-0 bg-light rounded p-3 p-md-4 h-100">
                                    <div className="d-flex align-items-start">
                                        <div className="me-3">
                                            <i className="fas fa-user-friendly text-info fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2">User-Friendly Interface</h5>
                                            <p className="mb-0 text-muted">Easily navigate and participate in auctions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-12 col-md-6">
                                <div className="list-group-item border-0 bg-light rounded p-3 p-md-4 h-100">
                                    <div className="d-flex align-items-start">
                                        <div className="me-3">
                                            <i className="fas fa-server text-primary fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2">Scalable & Reliable</h5>
                                            <p className="mb-0 text-muted">Powered by cutting-edge MERN stack technology for high performance.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}

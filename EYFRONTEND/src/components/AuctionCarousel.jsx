import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

  return (
    <div className="container-fluid px-0">
      <div className="position-relative">
        <Carousel 
          indicators={true} 
          controls={true}
          interval={5000}
          className="carousel-responsive"
        >
          {auctionItems.map((item) => (
            <Carousel.Item key={item.id}>
              <div className="position-relative">
                <img
                  className="d-block w-100"
                  src={item.url}
                  alt={item.title}
                  style={{ 
                    height: "300px",
                    objectFit: "cover"
                  }}
                />
                <div className="carousel-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"></div>
              </div>
              <Carousel.Caption className="position-absolute bottom-0 start-0 end-0 text-white p-3 p-md-4">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-8 text-center">
                      <h3 className="h4 h-md-3 fw-bold mb-2 text-shadow">{item.title}</h3>
                      <p className="d-none d-sm-block mb-0 text-shadow">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      
      <style>{`
        .carousel-responsive {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        /* Mobile carousel adjustments */
        @media (max-width: 575.98px) {
          .carousel-responsive img {
            height: 250px !important;
          }
          
          .carousel-caption {
            padding: 1rem !important;
          }
          
          .carousel-caption h3 {
            font-size: 1.2rem !important;
          }
        }
        
        /* Tablet carousel adjustments */
        @media (min-width: 576px) and (max-width: 767.98px) {
          .carousel-responsive img {
            height: 350px !important;
          }
        }
        
        /* Desktop carousel adjustments */
        @media (min-width: 768px) {
          .carousel-responsive img {
            height: 400px !important;
          }
        }
        
        /* Large desktop carousel adjustments */
        @media (min-width: 1200px) {
          .carousel-responsive img {
            height: 450px !important;
          }
        }
        
        /* Carousel controls responsive */
        .carousel-control-prev,
        .carousel-control-next {
          width: 5%;
        }
        
        @media (max-width: 767.98px) {
          .carousel-control-prev,
          .carousel-control-next {
            width: 8%;
          }
        }
        
        /* Carousel indicators responsive */
        .carousel-indicators {
          margin-bottom: 1rem;
        }
        
        @media (max-width: 575.98px) {
          .carousel-indicators {
            margin-bottom: 0.5rem;
          }
          
          .carousel-indicators [data-bs-target] {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default AuctionCarousel;

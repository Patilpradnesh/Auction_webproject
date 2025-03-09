import React, { useState, useEffect } from 'react';

function Home() {
  return (
    <>
      <h1>its home page </h1>
      const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        // Add more image paths here
      ];

      function Home() {
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          }, 3000); // Change image every 3 seconds
          return () => clearInterval(interval);
        }, []);

        const prevImage = () => {
          setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        };

        const nextImage = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        return (
          <>
            <h1>its home page </h1>
            <div style={{ position: 'relative', width: '300px', height: '200px', overflow: 'hidden' }}>
              <img
                src={images[currentIndex]}
                alt="sliding"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease-in-out' }}
              />
              <button
                onClick={prevImage}
                style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}
              >
                &#9664;
              </button>
              <button
                onClick={nextImage}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
              >
                &#9654;
              </button>
            </div>
          </>
        );
      }

      export default Home;
    </>
  );
}
export default Home;

import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Add styles here or inline

// Import images from the assets folder
// import shape1 from './Assets/shape1.png';
// import shape2 from './Assets/shape2.png';
//import shape23 from './Assets/shape23.jpg';
import shape4 from './Assets/shape4.jpeg';

const Carousel = () => {
  const images = [shape4]; 
  const texts = [" A few days ago Prime Minister Narendra Modi introduced actor-politician Pawan Kalyan in a meeting of NDA MPs: Yeh Pawan nahi hai, aandhi hai (He is not a breeze, but a storm). Amid thunderous applause, this remark came as Kalyans Jana Sena Party took the political arena by storm with a historic victory in the recently-concluded Lok Sabha elections 2024 and Andhra Pradesh assembly elections by winning all the seats it contested."];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={image} alt={`Slide ${index + 1}`} />
          <div className="carousel-text">
            <p>{texts[index]}</p>
          </div>
        </div>
      
      ))}
    </div>
    
  );
};

export default Carousel;

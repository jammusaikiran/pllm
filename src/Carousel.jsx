// import React, { useState, useEffect } from 'react';
// import './Carousel.css'; // Add styles here or inline

// // Import images from the assets folder
// import shape4 from './Assets/shape4.jpeg';
// import shape7 from './Assets/shape7.png';

// const Carousel = () => {
//   const images = [shape7];
//   const texts = [" A few days ago Prime Minister Narendra Modi introduced actor-politician Pawan Kalyan in a meeting of NDA MPs: Yeh Pawan nahi hai, aandhi hai (He is not a breeze, but a storm). Amid thunderous applause, this remark came as Kalyans Jana Sena Party took the political arena by storm with a historic victory in the recently-concluded Lok Sabha elections 2024 and Andhra Pradesh assembly elections by winning all the seats it contested."];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [images.length]);

//   return (
//     <div className="carousel">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
//           style={{ backgroundImage: `url(${image})`}}
//         >
//           <div className="carousel-text">
//             <p>{texts[index]}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Carousel;



// Carousel.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { Navigation, Autoplay } from 'swiper/modules';

import './Carousel.css'; // Import custom styles

const Carousel = () => {
  return (
    <div className="carousel-container">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{ delay: 2000 }} // Auto-slide every 2 seconds
      >
        <SwiperSlide>
          <img
            src="images/Screenshot 2024-07-13 225238.png"
            alt="Description of the first carousel image"
            width={"100%"}
            height={"500px"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="images/Screenshot 2024-07-13 225238.png"
            alt="Description of the second carousel image"
            width={"100%"}
            height={"500px"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="images/Screenshot 2024-07-13 225238.png"
            alt="Description of the third carousel image"
            width={"100%"}
            height={"500px"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;

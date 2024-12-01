"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/bannar3.jpeg",
  "/images/bannar4.png",
  "/images/bannar5.jpg",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000); // Change image every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Flex container for the images */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              layout="intrinsic" // Use intrinsic layout for better responsiveness
              width={1920} // Adjust width as needed
              height={800} // Adjust height as needed
              className="object-cover w-full h-auto" // Ensure image is responsive
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black focus:outline-none lg:left-8 md:left-6 sm:left-4"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black focus:outline-none lg:right-8 md:right-6 sm:right-4"
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;

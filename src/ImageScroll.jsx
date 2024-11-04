// ImageScroll.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageScroll = () => {
  const containerRef = useRef(null);
  const images = [
    'https://via.placeholder.com/800x600?text=Image+1',
    'https://via.placeholder.com/800x600?text=Image+2',
    'https://via.placeholder.com/800x600?text=Image+3',
    // Add more image URLs as needed
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imageElements = containerRef.current.children;
      const totalImages = imageElements.length;

      // Create a ScrollTrigger for the images
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalImages * 100}`, // Adjust this to control the scroll distance
        pin: true,
        scrub: 1,
        markers: false, // Set to true for debugging
        onEnter: () => {
          gsap.to(imageElements, {
            opacity: 1,
            stagger: 0.2,
            duration: 0.5,
            ease: 'power1.inOut',
          });
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup the context
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-screen overflow-hidden">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          className="w-full h-auto max-h-[100vh] object-cover opacity-0 transition-opacity duration-500"
        />
      ))}
    </div>
  );
};

export default ImageScroll;

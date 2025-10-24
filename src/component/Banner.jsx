import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiBook, FiUsers, FiMonitor, FiCoffee } from 'react-icons/fi';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const libraryImages = [
    {
      url: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      alt: 'Modern library interior',
      caption: 'Explore Our Vast Collection',
      description: 'Discover thousands of books across all genres',
      icon: <FiBook className="w-6 h-6" />
    },
    {
      url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
      alt: 'Bookshelves with many books',
      caption: 'Endless Titles Available',
      description: 'From classics to contemporary bestsellers',
      icon: <FiUsers className="w-6 h-6" />
    },
    {
      url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'Reading area in library',
      caption: 'Comfortable Reading Spaces',
      description: 'Relax and immerse yourself in knowledge',
      icon: <FiCoffee className="w-6 h-6" />
    },
    {
      url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'Students using library computers',
      caption: 'Modern Technology',
      description: 'Access digital resources and research tools',
      icon: <FiMonitor className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === libraryImages.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? libraryImages.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (slideIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(slideIndex);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-full ">
      {/* Main Banner */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-2xl shadow-2xl">
        {/* Background Images with Parallax Effect */}
        {libraryImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            } ${isTransitioning ? 'blur-sm' : 'blur-0'}`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl ml-8 md:ml-16 text-white space-y-6">
                {/* Icon */}
                {/* <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  {image.icon}
                </div> */}
                
                {/* Text Content */}
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {image.caption}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-200 font-light max-w-md">
                    {image.description}
                  </p>
                </div>
                
                {/* CTA Button */}
                {/* <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explore Now
                </button> */}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 border border-white/30 shadow-lg"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 border border-white/30 shadow-lg"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          {/* Dots */}
          <div className="flex space-x-3">
            {libraryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slide Counter */}
          <div className="flex items-center space-x-2 text-white/80">
            <span className="text-sm font-medium">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/50">/</span>
            <span className="text-sm">
              {String(libraryImages.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center mt-6 space-x-4">
        {libraryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-20 h-16 md:w-24 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
              index === currentIndex 
                ? 'border-white scale-105 shadow-lg' 
                : 'border-transparent hover:border-white/50'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
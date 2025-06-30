import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Events = () => {
  useEffect(() => {
    // Trigger animations after component mounts
    const elements = document.querySelectorAll('.animate-slide-in');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(assets/events.jpg)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-6xl md:text-8xl font-bold text-red-500 animate-slide-in opacity-0">
            Events
          </h1>
        </div>
      </section>

      {/* Punarutthan Section */}
      <section className="w-full bg-black min-h-[80vh] flex items-center justify-center">
        <div className="w-full">
          <div className="relative w-full h-full">
            {/* Event Card */}
            <div className="relative bg-black rounded-lg p-8 overflow-hidden w-full min-h-[70vh] flex items-center justify-center">

              {/* Enhanced Wavy Scrolling Text */}
              <div className="absolute top-5 left-0 right-0 overflow-hidden py-4 h-16 z-0">
                <div className="wave-scroll-container text-xl text-white tracking-wider">
                  {Array(20).fill("Punarutthan").join("").split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block wave-char"
                      style={{
                        animationDelay: `${i * 0.1}s`
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Main content container */}
              <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-8 md:gap-12 py-8 md:py-12 z-10 relative">
                {/* Responsive Image Container */}
                <div className="w-full md:w-1/2 lg:w-2/3 flex justify-center z-10 px-4">
                  <div className="
                    w-full max-w-[300px] sm:max-w-[400px] 
                    md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]
                    aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/9]
                    rounded-lg overflow-hidden 
                    shadow-[0_0_25px_8px_rgba(239,68,68,0.6)]
                    transition-all duration-300 hover:shadow-[0_0_30px_10px_rgba(239,68,68,0.8)]
                  ">
                    <div className="w-full h-full relative">
                      <img
                        src="/assets/tedx.png"
                        alt="TEDx Event"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '';
                          const parent = e.target.parentElement;
                          parent.classList.add(
                            'bg-gradient-to-br',
                            'from-gray-700',
                            'to-gray-900',
                            'flex',
                            'items-center',
                            'justify-center'
                          );
                          parent.innerHTML = '<span class="text-gray-300 text-lg md:text-xl">Image Not Available</span>';
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Text content */}
                <div className="flex flex-col items-center ml-20 md:items-start justify-center text-center md:text-left w-full md:w-auto">
                  <h2 className="text-6xl md:text-7xl lg:text-5xl font-bold text-white mb-6 animate-slide-in opacity-0 translate-x-[-50px]">
                    Punarutthan
                  </h2>
                  <p className="text-gray-400 text-3xl lg:text-4xl mb-8 animate-slide-in opacity-0 translate-x-[-50px]">
                    2023
                  </p>
                  {/* See More Button */}
                  <Link 
                    to="/punaruthan"
                    className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 text-xl animate-slide-in opacity-0 translate-y-[30px]"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped Styles */}
      <style jsx>{`
        .wave-scroll-container {
          display: flex;
          white-space: nowrap;
          animation: scrollX 40s linear infinite;
        }

        .wave-char {
          animation: waveY 2s ease-in-out infinite;
          display: inline-block;
        }

        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }

        @keyframes waveY {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(10px);
          }
        }

        @keyframes scrollX {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px) translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Events;
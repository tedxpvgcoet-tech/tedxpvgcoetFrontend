import React, { useEffect } from 'react';

const TalksSection = () => {
  const speakers = [
    { 
      name: 'Vasant Shinde', 
      image: '/assets/vasantshinde.jpg',
      width: 'w-64',
      height: 'h-80'
    },
    { 
      name: 'Vasant Shinde', 
      image: '/assets/vasantshinde.jpg',
      width: 'w-72',
      height: 'h-96'
    },
    { 
      name: 'Vasant Shinde', 
      image: '/assets/vasantshinde.jpg',
      width: 'w-60',
      height: 'h-88'
    },
    { 
      name: 'Vasant Shinde', 
      image: '/assets/vasantshinde.jpg',
      width: 'w-68',
      height: 'h-92'
    }
  ];

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in');
          if (entry.target.classList.contains('stagger-child')) {
            const delay = entry.target.dataset.delay;
            entry.target.style.animationDelay = `${delay}ms`;
          }
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-view');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Title with animation */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-left text-white pl-4 sm:pl-6 animate-on-view opacity-0 -translate-x-10">
          Talks
        </h2>

        {/* Speaker Cards with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {speakers.map((speaker, index) => (
            <div 
              key={index}
              className={`group relative ${speaker.width} ${speaker.height} mx-auto border-2 border-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 animate-on-view stagger-child opacity-0 translate-y-10`}
              data-delay={100 * index}
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/30">
                <h3 className="text-3xl font-bold text-white text-center p-4 rounded-lg animate-on-view opacity-0 translate-y-5">
                  {speaker.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .animate-slide-in {
          animation: slideIn 0.7s ease-out forwards;
        }
        
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        
        .animate-on-view {
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        
        .animate-on-view.animate-slide-in {
          opacity: 1;
          transform: translateX(0) translateY(0);
        }
      `}</style>
    </section>
  );
};

export default TalksSection;
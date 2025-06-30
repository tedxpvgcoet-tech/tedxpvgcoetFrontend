import React, { useEffect } from 'react';

const PunarutthanSection = () => {
  useEffect(() => {
    // Trigger animations after component mounts
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">      
      <main className="flex-grow">
        <section 
          className="relative min-h-screen flex items-center justify-start text-white px-6 py-20 bg-black overflow-hidden"
          style={{
            backgroundImage: "url('/assets/phoniex.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          
          <div className="relative z-10 max-w-4xl mx-12 md:mx-24 text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-red-500 tracking-wide animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Punarutthan
            </h2>
            
            <div className="text-lg md:text-xl leading-relaxed space-y-6">
              <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                At TEDxPVGCOET, <span className="text-red-500 font-semibold">"Punarutthan"</span> signifies our commitment to renewing ideas, creativity, and hope. It's about catalyzing a renaissance within our community—reviving meaningful conversations, fostering innovation, and empowering action.
              </p>
              <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                This theme resonates deeply with our mission to awaken fresh perspectives and inspire transformation, much like the mythical phoenix rising from its ashes to begin anew.
              </p>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .animate-slide-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default PunarutthanSection;
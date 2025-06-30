import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#e62b1e] text-black relative overflow-hidden px-6 py-8">
      {/* Wavy top shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="black" 
            className="shape-fill"
          ></path>
        </svg>
      </div>

      {/* Circular left shape */}
      <div className="absolute -left-32 -top-32 w-64 h-64 rounded-full bg-black opacity-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Left column with logo and social */}
          <div className="md:mr-8">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-black font-bold text-2xl">TED</span>
              <span className="text-black text-xl">x</span>
              <span className="text-black font-bold text-2xl">PVGCOET</span>
            </div>
            <p className="text-black text-opacity-80 text-sm mb-4">
              This independent TEDx event is operated under license from TED
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-black hover:text-black transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-black hover:text-black transition-colors">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Grouped right columns with increased spacing */}
          <div className="md:col-span-3 flex justify-between space-x-8 md:space-x-12 lg:space-x-16 ml-auto">
            {/* Events column */}
            <div className="min-w-[120px]">
              <h4 className="text-black font-semibold mb-3 text-lg">Events</h4>
              <ul className="text-black font-semibold text-opacity-80 text-lg space-y-2">
                <li><a href="#" className="hover:text-black transition-colors">Partners</a></li>
              </ul>
            </div>

            {/* Speaker Nomination column */}
            <div className="min-w-[120px]">
              <h4 className="text-black font-semibold mb-3 text-lg">Speaker Nomination</h4>
              <ul className="text-black font-semibold text-opacity-80 text-lg space-y-2">
                <li><a href="#" className="hover:text-black transition-colors">Partner With Us</a></li>
              </ul>
            </div>

            {/* About column */}
            <div className="min-w-[120px]">
              <h4 className="text-black font-semibold mb-3 text-lg">About</h4>
              <ul className="text-black font-semibold text-opacity-80 text-lg space-y-2">
                <li><a href="#" className="hover:text-black transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
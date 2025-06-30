import React from 'react';

const Team = () => {
  const tedxLeads = [
    {
      name: 'TEDx Lead',
      lead: 'Rahul Sharma',
      image: '/assets/phoniex.jpg',
      role: 'Event Curator & Organizer'
    },
    {
      name: 'TEDx Co-Lead',
      lead: 'Priya Patel',
      image: '/assets/phoniex.jpg',
      role: 'Co-Organizer'
    }
  ];

  const teams = [
    {
      name: 'Editorial',
      lead: 'Jane Smith',
      members: ['Amit Kumar', 'Neha Gupta', 'Rohan Desai'],
      image: '/assets/phoniex.jpg'
    },
    {
      name: 'Technical',
      lead: 'John Doe',
      members: ['Sanjay Verma', 'Ananya Iyer', 'Vikram Joshi'],
      image: '/assets/phoniex.jpg'
    },
    {
      name: 'Marketing',
      lead: 'Alex Johnson',
      members: ['Meera Choudhary', 'Arjun Nair', 'Pooja Mehta'],
      image: '/assets/phoniex.jpg'
    },
    {
      name: 'Sponsorship',
      lead: 'Sarah Williams',
      members: ['Karan Malhotra', 'Divya Rao', 'Rajiv Chawla'],
      image: '/assets/phoniex.jpg'
    },
    {
      name: 'Curation',
      lead: 'Michael Brown',
      members: ['Nisha Agarwal', 'Rahul Khanna', 'Shreya Bose'],
      image: '/assets/phoniex.jpg'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-red-500">
          Our Team
        </h2>

        {/* TEDx Leads */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-semibold mb-12 text-white text-center">
            TEDx Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {tedxLeads.map((lead, index) => (
              <div key={index} className="group relative h-96 border-2 border-red-500 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(239,68,68,0.3)]">
                <img
                  src={lead.image}
                  alt={lead.lead}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-end p-8">
                  <h3 className="text-3xl font-bold text-white text-center mb-1">
                    {lead.lead}
                  </h3>
                  <p className="text-xl text-red-500 font-semibold text-center mb-2">
                    {lead.name}
                  </p>
                  <p className="text-gray-300 text-center">
                    {lead.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Sections */}
        {teams.map((team, index) => (
          <div key={index} className="mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-white text-center">
              {team.name} Team
            </h3>
            
            {/* Team Lead */}
            <div className="max-w-md mx-auto mb-10">
              <div className="group relative h-80 border-2 border-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.2)]">
                <img
                  src={team.image}
                  alt={team.lead}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-end p-6">
                  <h4 className="text-2xl font-bold text-white text-center mb-1">
                    {team.lead}
                  </h4>
                  <p className="text-lg text-red-500 font-semibold text-center">
                    {team.name} Lead
                  </p>
                </div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {team.members.map((member, memberIndex) => (
                <div 
                  key={memberIndex} 
                  className="group relative h-60 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_10px_2px_rgba(239,68,68,0.3)]"
                >
                  <img
                    src="/assets/phoniex.jpg"
                    alt={member}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
                    <span className="text-white font-medium">
                      {member}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
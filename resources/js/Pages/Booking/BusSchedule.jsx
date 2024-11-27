import React from 'react';

// Journey Dot Component
const JourneyDot = () => (
  <div className="flex flex-col items-center">
    <div className="w-2.5 h-2.5 rounded-full bg-black" />
    <div className="w-0.5 h-16 bg-black" />
    <div className="w-2.5 h-2.5 rounded-full bg-black" />
  </div>
);

// Journey Details Component
const JourneyDetails = ({ bus }) => (
  <div className="flex items-center space-x-4 ml-20">
    <JourneyDot/>
    <div className="flex-grow">
      <div className="items-center mt-4">
        <div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-semibold">{bus.from}</span>
          </div>
          <p className="text-xs text-gray-500">{bus.time}</p>
        </div>
        <span className='text-xs'>{bus.journey}</span>
        <div className='mt-4'>
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-semibold">{bus.to}</span>
          </div>
          <p className="text-xs text-gray-500">{bus.arrival}</p>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          
        </div>
        <p className="text-blue-600 font-semibold">
          Rp{bus.price.toLocaleString('id-ID')}/pax
        </p>
      </div>
    </div>
  </div>
);

const Schedule = () => {
  const busSchedules = [
    {
      id: 1,
      time: "10:00",
      from: "Jakarta",
      to: "Bandung",
      journey: "2 h 45 m",
      arrival: "12:45",
      price: 120000,
      seats: 16,
      img: "http://127.0.0.1:8000/shuttle_icon.svg",
    },
    {
      id: 2,
      time: "11:30",
      from: "Jakarta",
      to: "Bandung",
      journey: "2 h 30 m",
      arrival: "14:00",
      price: 110000,
      seats: 12,
      img: "http://127.0.0.1:8000/shuttle_icon.svg",
    },
    {
      id: 3,
      time: "13:00",
      from: "Jakarta",
      to: "Bandung",
      journey: "2 h 45 m",
      arrival: "15:45",
      price: 125000,
      seats: 10,
      img: "http://127.0.0.1:8000/shuttle_icon.svg",
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Jakarta - Bandung</h1>
            <div className="flex items-center space-x-2 mt-2 text-sm">
              <span>Sat, 10 Nov 2024 • 1 Seat • {busSchedules.length} Buses</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 space-y-4">
        {busSchedules.map((bus) => (
          <div 
            key={bus.id} 
            className="bg-white rounded-lg shadow-md p-4 relative"
          >
            {/* Available Seats Badge */}
            <div className="absolute top-4 right-4 text-blue-600 px-2 py-1 rounded-full text-xs">
              {bus.seats} Seats Available
            </div>

            {/* Bus Details */}
            <div className="flex items-center space-x-4">
              <img 
                src={bus.img} 
                alt="Bus" 
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-grow">
                <h2 className="font-semibold text-sm">Shuttle Bus TripIn</h2>
                <p className="text-xs text-gray-500">Plat Nomor</p>
              </div>
            </div>

            {/* Journey Details */}
            <div className="mt-4">
              <JourneyDetails bus={bus} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Schedule;
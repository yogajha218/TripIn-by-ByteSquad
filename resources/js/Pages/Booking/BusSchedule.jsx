import React from 'react';
import { useState } from 'react';
import JourneyDetail from '@/Components/JourneyDetail';

const Schedule = ({booking, routes}) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  console.log("Booking Data", booking);
  console.log("Rute", routes);

  if (!routes || routes.length === 0) {
    return <div>No routes available</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Jakarta - Bandung</h1>
            <div className="flex items-center space-x-2 mt-2 text-sm">
              <span>Sat, 10 Nov 2024 • 1 Seat • {routes.length} Buses</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 space-y-4">
        <JourneyDetail routes={routes} booking={booking} />
      </main>
    </div>
  );
};

export default Schedule;
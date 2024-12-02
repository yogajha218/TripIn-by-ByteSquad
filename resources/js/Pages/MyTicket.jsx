import React from 'react';
import { Ticket, CircleDot } from 'lucide-react';

const MyTicket = () => {
  const tickets = [
    {
      id: 1,
      plateNumber: 'B 1234 XYZ',
      bookingCode: '728VAML',
      isPaid: false,
      departure: {
        time: '10.00',
        date: 'Sat, 10 Nov 2024',
        city: 'Jakarta',
        terminal: 'Kampung Rambutan'
      },
      arrival: {
        time: '12.45',
        date: 'Sat, 10 Nov 2024',
        city: 'Bandung',
        terminal: 'Cileunyi'
      }
    },
    {
      id: 2,
      plateNumber: 'D 5678 ABC',
      bookingCode: '729VAML',
      isPaid: true,
      departure: {
        time: '14.00',
        date: 'Sat, 10 Nov 2024',
        city: 'Bandung',
        terminal: 'Cileunyi'
      },
      arrival: {
        time: '16.45',
        date: 'Sat, 10 Nov 2024',
        city: 'Jakarta',
        terminal: 'Kampung Rambutan'
      }
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Header */}
      <div className="bg-primary p-6 rounded-b-3xl">
        <div className="flex justify-between items-center mt-4 text-white">
          <h1 className="text-2xl font-semibold">My Ticket</h1>
          <Ticket className="w-8 h-8" />
        </div>
        <p className="text-sm opacity-80 mt-1 text-white">
          All shuttle tickets that are already active and waiting for payment
        </p>
      </div>

      {/* Ticket Cards */}
      {tickets.map((ticket) => (
        <div key={ticket.id} className="mt-6 mx-6 mb-4 bg-gray-100 rounded-lg overflow-hidden">
          {/* Ticket Details */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-black">Shuttle Bus Tripin</h2>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded text-gray-600">
                  {ticket.plateNumber}
                </span>
              </div>
              <button className="text-blue-400 bg-transparent text-sm">
                View Details
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Booking code: {ticket.bookingCode}
            </p>

            {/* Journey Details in Two Sections */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Departure Section */}
              <div className="bg-white p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CircleDot className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-600">Departure</span>
                </div>
                <div className="text-black">
                  <div className="text-xl font-semibold">{ticket.departure.time}</div>
                  <div className="text-sm text-gray-500">{ticket.departure.date}</div>
                  <div className="mt-2">
                    <div className="font-medium">{ticket.departure.city}</div>
                    <div className="text-sm text-gray-500">{ticket.departure.terminal}</div>
                  </div>
                </div>
              </div>

              {/* Arrival Section */}
              <div className="bg-white p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CircleDot className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-600">Arrival</span>
                </div>
                <div className="text-black">
                  <div className="text-xl font-semibold">{ticket.arrival.time}</div>
                  <div className="text-sm text-gray-500">{ticket.arrival.date}</div>
                  <div className="mt-2">
                    <div className="font-medium">{ticket.arrival.city}</div>
                    <div className="text-sm text-gray-500">{ticket.arrival.terminal}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button - Payment or Boarding based on status */}
          {ticket.isPaid ? (
            <button className="w-full py-3 bg-primary2 text-white font-medium">
              BOARDING TICKET
            </button>
          ) : (
            <button className="w-full py-3 bg-red-500 text-white font-medium">
              PAY NOW
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyTicket;
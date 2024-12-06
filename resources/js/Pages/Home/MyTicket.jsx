import React from 'react';
import { Ticket, CircleDot } from 'lucide-react';

const MyTicket = ({bookings}) => {
  console.log("Bookings : ", bookings);

  const tickets = bookings.map((booking) => ({
    id: booking.booking_id,
    plateNumber: booking.trips[0]?.schedule.vehicle.license_plate,
    bookingCode: booking.booking_code,
    isPaid: true,
    departure: {
      time: booking.trips[0]?.schedule.departure_time,
      date: booking.trips[0]?.selected_day,
      city: booking.trips[0]?.city,
      place: booking.trips[0]?.origin,
    },
    arrival: {
      time: booking.trips[0]?.schedule.arrival_time,
      date: booking.trips[0]?.selected_day,
      city: booking.trips[0]?.schedule.location.city,
      place: booking.trips[0]?.schedule.location.name,
    },
  }));

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
              <button onClick={() => window.location.href = route('boarding')} className="text-blue-400 bg-transparent text-sm">
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
                    <div className="text-sm text-gray-500">{ticket.departure.place}</div>
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
                    <div className="text-sm text-gray-500">{ticket.arrival.place}</div>
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
import React from 'react';
// import { Car, ChevronLeft, CreditCard, Users, Armchair } from 'lucide-react'; // TODO : harus import


const HistoryDetail = ({log}) => {
  console.log('Log data: ', log);

  const ticketInfo = {
      date: log.departure_date,
      bookingCode: log.trip.booking.booking_code,
      bus: {
        name: "Shuttle Bus Tripin",
        plateNumber: log.trip.schedule.vehicle.license_plate,
      },
      payment: {
        method: "Gopay",
        total: 240000
      },
      passengers: {
        count: log.trip.booking.seat_total,
        seats: `Seat ${log.trip.booking.seat_number.join(", ")}`
      },
      journey: {
        duration: "2 h 45 m",
        from: {
          city: log.trip.origin,
          time: log.trip.schedule.departure_time,
        },
        to: {
          city: log.trip.schedule.location.name,
          time: log.trip.schedule.arrival_time
        }
      }
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      {/* Header */}
      <div className="flex items-center p-7 text-white">
        <img src='/backArrow.svg' className="w-6 h-6" />
        <span className="flex-1 text-center text-xl font-bold">{ticketInfo.date}</span>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-t-3xl p-6">
        {/* Booking Code */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-black font-semibold">Booking Code</span>
          <span className="font-semibold">{ticketInfo.bookingCode}</span>
        </div>

        {/* Bus Info Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center gap-4 border border-gray-100">
          <div className="bg-primary2 p-2 rounded-lg">
            <img src='/shuttle_icon.svg' className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-medium">{ticketInfo.bus.name}</h2>
            <p className="text-gray-600 text-sm">{ticketInfo.bus.plateNumber}</p>
          </div>
        </div>

        {/* Detail Order */}
        <h3 className="font-medium p-1 mb-2">Detail Order</h3>
        <div className="bg-white rounded-lg shadow-md border border-gray-100 mb-6">
          {/* Payment Method */}
          <div className="flex items-center p-4 border-b border-gray-100">
            <img src='/Gopay.svg' className="h-7 mr-3" />
            <span>{ticketInfo.payment.method}</span>
          </div>

          {/* Passengers */}
          <div className="flex items-center p-4 border-b border-gray-100">
            <img src='/Passenger.svg' className="w-6 h-6 text-blue-400 mr-3 ml-1" />
            <span>{ticketInfo.passengers.count} Passenger</span>
          </div>

          {/* Seats */}
          <div className="flex items-center p-4 border-b border-gray-100">
            < img src='/Seat.svg' className="w-6 h-6 text-blue-400 mr-3 ml-1" />
            <span>{ticketInfo.passengers.seats}</span>
          </div>

          {/* Total Payment */}
          <div className="flex justify-between items-center p-4">
            <span className="font-medium">Total Payment</span>
            <span className="font-bold">Rp{ticketInfo.payment.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Journey Info - Updated Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Travel Itinerary</h3>
          </div>

          <div className="space-y-6">
            {/* Departure Container */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-2">Departure</div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">{ticketInfo.journey.from.city}</div>
                  <div className="text-sm text-gray-600">{ticketInfo.bus.name}</div>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {ticketInfo.journey.from.time}
                </div>
              </div>
            </div>

            {/* Arrival Container */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-2">Arrival</div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">{ticketInfo.journey.to.city}</div>
                  <div className="text-sm text-gray-600">{ticketInfo.bus.name}</div>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {ticketInfo.journey.to.time}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Boarding Button */}
        <button className="w-full bg-primary2 text-white py-4 rounded-lg font-medium">
          Boarding Ticket
        </button>
      </div>
    </div>
  );
};

export default HistoryDetail;

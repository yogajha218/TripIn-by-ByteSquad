import React from "react";
// import { QRCodeSVG } from "qrcode.react";

const BoardingTicket = ({booking, user}) => {
  console.log('bookings : ', booking);

  const tickets = {
    status : booking.status,
    busName : "Shuttle Bus Tripin",
    plateNumber : booking.trips[0]?.schedule.vehicle.license_plate,
    bookingCode : booking.booking_code,
    departureTime : booking.trips[0].schedule.departure_time,
    departureDate : booking.trips[0].selected_day,
    departureCity : booking.trips[0].city,
    departureStation : booking.trips[0].origin,
    arrivalTime : booking.trips[0].schedule.departure_time,
    arrivalDate : booking.trips[0].selected_day,
    arrivalCity : booking.trips[0].schedule.location.city,
    arrivalStation : booking.trips[0].schedule.location.name,
    passenger : user ?? "user",
    seatNumber : booking.trips[0]?.schedule.vehicle.seat_booking.seat_number,
  };

  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "valid":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header with centered title */}
      <div className="relative h-16 flex items-center justify-center mb-8">
        <button className="absolute left-4 text-white mt-4">
          <img src="/backArrow.svg" className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold mt-4">Boarding Ticket</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 mx-6 shadow-lg">
        {/* Logo and Status */}
        <div className="mb-6">
          <img src="/TripInLogo.svg" alt="logo TripIn" className="h-16" />
          <div className="flex items-center mt-2">
            <span className="text-gray-600">Status: </span>
            <span
              className={`${getBadgeColor(tickets.status)} px-2 py-0.5 rounded ml-1`}
            >
              {tickets.status}
            </span>
          </div>
        </div>

        {/* Bus Info */}
        <div className="mb-6">
          <div className="text-lg font-medium">
            {tickets.busName} ({tickets.plateNumber})
          </div>
          <div className="text-gray-600 text-sm">
            Booking code : {tickets.bookingCode}
          </div>
        </div>

        <div className="border-t border-gray-400" />

        {/* Journey Section */}
        <div className="relative py-6">
          {/* Departure */}
          <div className="flex items-start mb-16 relative">
            {/* Time and Date */}
            <div className="w-36">
              <div className="text-xl font-bold">{tickets.departureTime}</div>
              <div className="text-sm text-gray-500">{tickets.departureDate}</div>
            </div>

            {/* Journey Line - Top Dot */}
            <div className="mx-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>

            {/* City and Station */}
            <div className="flex-1 ml-9">
              <div className="font-medium">{tickets.departureCity}</div>
              <div className="text-sm text-gray-500">{tickets.departureStation}</div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="absolute left-[9.7rem] top-8 w-0.5 h-28 bg-black" />

          {/* Arrival */}
          <div className="flex items-start relative">
            {/* Time and Date */}
            <div className="w-32">
              <div className="text-xl font-bold">{tickets.arrivalTime}</div>
              <div className="text-sm text-gray-500">{tickets.arrivalDate}</div>
            </div>

            {/* Journey Line - Bottom Dot */}
            <div className="mx-6 mt-2">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>

            {/* City and Station */}
            <div className="flex-1 ml-5">
              <div className="font-medium">{tickets.arrivalCity}</div>
              <div className="text-sm text-gray-500">{tickets.arrivalStation}</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-400" />

        {/* Passenger Info */}
        <div className="py-6">
          <div className="flex justify-between">
            <div>
              <div className="text-sm text-gray-500">Passenger</div>
              <div className="font-medium mt-1">{tickets.passenger}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Seat Number:
              </div>
              <div className="font-medium mt-1">
                {tickets.seatNumber}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400" />

         {/* TODO : QR Code Usage? */}
         
        {/* QR Code */}
        {/* <div className="pt-6 text-center">
          <div className="text-sm mb-4">Scan this code</div>
          <div className="flex justify-center mb-6">
            <QRCodeSVG
              value={`TRIPIN-${tickets.bookingCode}-${tickets.seatNumber}`}
              size={160}
              level="H"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BoardingTicket;

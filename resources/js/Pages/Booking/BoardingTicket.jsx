import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeft } from "lucide-react";
import tripinlogo from "/TripInLogo.svg";

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

const BoardingTicket = ({
  status = "valid",
  busName = "Shuttle Bus Tripin",
  plateNumber = "B 1234 CD",
  bookingCode = "728VAML",
  departureTime = "10.00",
  departureDate = "Sat, 10 Nov 2024",
  departureCity = "Jakarta",
  departureStation = "Kampung Rambutan",
  arrivalTime = "12.45",
  arrivalDate = "Sat, 10 Nov 2024",
  arrivalCity = "Bandung",
  arrivalStation = "Cileunyi",
  passenger = "Jennifer Kim",
  seatNumber = "5",
}) => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header with centered title */}
      <div className="relative h-16 flex items-center justify-center mb-8">
        <button className="absolute left-4 text-white mt-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold mt-4">Boarding Ticket</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 mx-6 shadow-lg">
        {/* Logo and Status */}
        <div className="mb-6">
          <img src={tripinlogo} alt="logo TripIn" className="h-16" />
          <div className="flex items-center mt-2">
            <span className="text-gray-600">Status: </span>
            <span
              className={`${getBadgeColor(status)} px-2 py-0.5 rounded ml-1`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Bus Info */}
        <div className="mb-6">
          <div className="text-lg font-medium">
            {busName} ({plateNumber})
          </div>
          <div className="text-gray-600 text-sm">
            Booking code : {bookingCode}
          </div>
        </div>

        <div className="border-t border-gray-400" />

        {/* Journey Section */}
        <div className="relative py-6">
          {/* Departure */}
          <div className="flex items-start mb-16 relative">
            {/* Time and Date */}
            <div className="w-36">
              <div className="text-xl font-bold">{departureTime}</div>
              <div className="text-sm text-gray-500">{departureDate}</div>
            </div>

            {/* Journey Line - Top Dot */}
            <div className="mx-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>

            {/* City and Station */}
            <div className="flex-1 ml-9">
              <div className="font-medium">{departureCity}</div>
              <div className="text-sm text-gray-500">{departureStation}</div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="absolute left-[9.7rem] top-8 w-0.5 h-28 bg-black" />

          {/* Arrival */}
          <div className="flex items-start relative">
            {/* Time and Date */}
            <div className="w-32">
              <div className="text-xl font-bold">{arrivalTime}</div>
              <div className="text-sm text-gray-500">{arrivalDate}</div>
            </div>

            {/* Journey Line - Bottom Dot */}
            <div className="mx-6 mt-2">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>

            {/* City and Station */}
            <div className="flex-1 ml-5">
              <div className="font-medium">{arrivalCity}</div>
              <div className="text-sm text-gray-500">{arrivalStation}</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-400" />

        {/* Passenger Info */}
        <div className="py-6">
          <div className="flex justify-between">
            <div>
              <div className="text-sm text-gray-500">Passenger</div>
              <div className="font-medium mt-1">{passenger}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Seat Number: {seatNumber}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400" />

        {/* QR Code */}
        <div className="pt-6 text-center">
          <div className="text-sm mb-4">Scan this code</div>
          <div className="flex justify-center mb-6">
            <QRCodeSVG
              value={`TRIPIN-${bookingCode}-${seatNumber}`}
              size={160}
              level="H"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingTicket;
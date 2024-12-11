import React from "react";
import { Ticket, CircleDot } from "lucide-react";
import NavbarTripin from "@/Components/NavbarTripin";
import { format } from "date-fns";

const MyTicket = ({ bookings }) => {
    console.log("Bookings : ", bookings);

    // Check if bookings is null or empty
    // if (!bookings || bookings.length === 0) {
    //     return (
    //         <>
    //             <div className="lg:flex lg:justify-center">
    //                 <div className="bg-white min-h-screen pb-16 lg:w-[400px] flex items-center justify-center">
    //                     <h1 className="text-xl font-semibold text-gray-600">
    //                         No tickets available.
    //                     </h1>
    //                 </div>
    //             </div>
    //             <NavbarTripin pageInfo="TicketPage"></NavbarTripin>
    //         </>
    //     );
    // }

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

    const onClick = async (e, ticket_id) => {
        e.preventDefault();
        // console.log('selected booking_id', ticket_id);
        window.location.href = `/ticket/${ticket_id}/boarding-ticket`;
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="bg-white min-h-screen pb-16 lg:w-[400px]">
                    {/* Header */}
                    <div className="bg-primary p-6 rounded-b-3xl">
                        <div className="flex justify-between items-center mt-4 text-white">
                            <h1 className="text-2xl font-semibold">
                                My Ticket
                            </h1>
                            <Ticket className="w-8 h-8" />
                        </div>
                        <p className="text-sm opacity-80 mt-1 text-white">
                            All shuttle tickets that are already active and
                            waiting for payment
                        </p>
                    </div>

                    {/* Ticket Cards */}
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="mt-6 mx-6 mb-4 bg-gray-100 rounded-lg overflow-hidden"
                        >
                            {/* Ticket Details */}
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center justify-between w-full">
                                        <h2 className="font-semibold text-sm sm:text-base text-black">
                                            Shuttle Bus Tripin
                                        </h2>
                                        <span className="text-xs bg-gray-200 px-1 py-1 rounded text-gray-600">
                                            {ticket.plateNumber}
                                        </span>
                                    </div>
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
                                            <span className="text-sm font-medium text-gray-600">
                                                Departure
                                            </span>
                                        </div>
                                        <div className="text-black">
                                            <div className="text-xl font-semibold">
                                                {ticket.departure.time
                                                    .split(":")
                                                    .slice(0, 2)
                                                    .join(":")}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {format(
                                                    new Date(
                                                        ticket.departure.date
                                                    ),
                                                    "dd MMM yyyy"
                                                )}
                                            </div>
                                            <div className="mt-2">
                                                <div className="font-medium text-[12px]">
                                                    {ticket.departure.city}
                                                </div>
                                                <div className="text-[12px] text-gray-500">
                                                    {ticket.departure.place}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrival Section */}
                                    <div className="bg-white p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CircleDot className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium text-gray-600">
                                                Arrival
                                            </span>
                                        </div>
                                        <div className="text-black">
                                            <div className="text-xl font-semibold">
                                                {ticket.arrival.time
                                                    .split(":")
                                                    .slice(0, 2)
                                                    .join(":")}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {format(
                                                    new Date(
                                                        ticket.arrival.date
                                                    ),
                                                    "dd MMM yyyy"
                                                )}
                                            </div>
                                            <div className="mt-2">
                                                <div className="font-medium  text-xs">
                                                    {ticket.arrival.city}
                                                </div>
                                                <div className=" text-gray-500 text-xs">
                                                    {ticket.arrival.place}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button - Payment or Boarding based on status */}
                            {ticket.isPaid ? (
                                <button
                                    className="w-full py-3 bg-primary2 text-white font-medium"
                                    onClick={(e) => onClick(e, ticket.id)}
                                >
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
            </div>
            <NavbarTripin pageInfo="TicketPage"></NavbarTripin>
        </>
    );
};

export default MyTicket;

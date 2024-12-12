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
                <div className="min-h-screen bg-white pb-16 lg:w-[400px]">
                    {/* Header */}
                    <div className="rounded-b-3xl bg-primary p-6">
                        <div className="mt-4 flex items-center justify-between text-white">
                            <h1 className="text-2xl font-semibold">
                                My Ticket
                            </h1>
                            <Ticket className="h-8 w-8" />
                        </div>
                        <p className="mt-1 text-sm text-white opacity-80">
                            All shuttle tickets that are already active and
                            waiting for payment
                        </p>
                    </div>

                    {/* Ticket Cards */}
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="mx-6 mb-4 mt-6 overflow-hidden rounded-lg bg-gray-100"
                        >
                            {/* Ticket Details */}
                            <div className="p-4">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex w-full items-center justify-between">
                                        <h2 className="text-sm font-semibold text-black sm:text-base">
                                            Shuttle Bus Tripin
                                        </h2>
                                        <span className="rounded bg-gray-200 px-1 py-1 text-xs text-gray-600">
                                            {ticket.plateNumber}
                                        </span>
                                    </div>
                                </div>

                                <p className="mb-2 text-sm text-gray-600">
                                    Booking code: {ticket.bookingCode}
                                </p>
                                <div className="text-sm text-gray-500">
                                    {`${ticket.arrival.city},
                                    ${format(
                                        new Date(ticket.departure.date),
                                        "dd MMM yyyy",
                                    )}`}
                                </div>

                                {/* Journey Details in Two Sections */}
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    {/* Departure Section */}
                                    <div className="rounded-lg bg-white p-3">
                                        <div className="mb-2 flex items-center gap-2">
                                            <CircleDot className="h-4 w-4 text-primary" />
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
                                            <div className="mt-2">
                                                <div className="text-[12px] font-medium">
                                                    {ticket.departure.city}
                                                </div>
                                                <div className="text-[12px] text-gray-500">
                                                    {ticket.departure.place}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrival Section */}
                                    <div className="rounded-lg bg-white p-3">
                                        <div className="mb-2 flex items-center gap-2">
                                            <CircleDot className="h-4 w-4 text-primary" />
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
                                                        ticket.arrival.date,
                                                    ),
                                                    "dd MMM yyyy",
                                                )}
                                            </div>
                                            <div className="mt-2">
                                                <div className="text-xs text-gray-500">
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
                                    className="w-full bg-primary2 py-3 font-medium text-white"
                                    onClick={(e) => onClick(e, ticket.id)}
                                >
                                    BOARDING TICKET
                                </button>
                            ) : (
                                <button className="w-full bg-red-500 py-3 font-medium text-white">
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

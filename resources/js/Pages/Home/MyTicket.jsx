import React from "react";
import { Ticket, CircleDot } from "lucide-react";
import NavbarTripin from "@/Components/NavbarTripin";
import { format } from "date-fns";

const MyTicket = ({ bookings }) => {

    const tickets = bookings.map((booking) => ({
        id: booking.booking_id,
        plateNumber: booking.trips[0]?.schedule.vehicle.license_plate,
        bookingCode: booking.booking_code,

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
        window.location.href = `/ticket/${ticket_id}/boarding-ticket`;
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="relative min-h-screen bg-white pb-16 lg:w-[400px]">
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
                    {tickets.length !== 0 ? (
                        tickets.map((ticket) => (
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

                                <button
                                    className="w-full bg-primary2 py-3 font-medium text-white"
                                    onClick={(e) => onClick(e, ticket.id)}
                                >
                                    BOARDING TICKET
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="absolute top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center">
                            <svg
                                width="191"
                                height="156"
                                viewBox="0 0 191 156"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="relative -left-2"
                            >
                                <path
                                    d="M138 2V19M138 53V70M138 104V121M53 2H172C176.509 2 180.833 3.79107 184.021 6.97918C187.209 10.1673 189 14.4913 189 19V44.5C184.491 44.5 180.167 46.2911 176.979 49.4792C173.791 52.6673 172 56.9913 172 61.5C172 66.0087 173.791 70.3327 176.979 73.5208C180.167 76.7089 184.491 78.5 189 78.5V104C189 108.509 187.209 112.833 184.021 116.021C180.833 119.209 176.509 121 172 121H53C48.4913 121 44.1673 119.209 40.9792 116.021C37.7911 112.833 36 108.509 36 104V78.5C40.5087 78.5 44.8327 76.7089 48.0208 73.5208C51.2089 70.3327 53 66.0087 53 61.5C53 56.9913 51.2089 52.6673 48.0208 49.4792C44.8327 46.2911 40.5087 44.5 36 44.5V19C36 14.4913 37.7911 10.1673 40.9792 6.97918C44.1673 3.79107 48.4913 2 53 2Z"
                                    stroke="black"
                                    strokeWidth="2.91667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M81.5832 111.5C81.5832 131.979 64.9791 148.583 44.4998 148.583C24.0206 148.583 7.4165 131.979 7.4165 111.5C7.4165 91.0207 24.0206 74.4166 44.4998 74.4166C64.9791 74.4166 81.5832 91.0207 81.5832 111.5Z"
                                    fill="#F44336"
                                />
                                <path
                                    d="M54.987 95.7693L60.2305 101.013L34.0126 127.231L28.769 121.987L54.987 95.7693Z"
                                    fill="white"
                                />
                                <path
                                    d="M60.2305 121.987L54.987 127.231L28.769 101.013L34.0126 95.7693L60.2305 121.987Z"
                                    fill="white"
                                />
                            </svg>
                            <p>You don't have any ticket</p>
                        </div>
                    )}
                </div>
            </div>
            <NavbarTripin pageInfo="TicketPage"></NavbarTripin>
        </>
    );
};

export default MyTicket;

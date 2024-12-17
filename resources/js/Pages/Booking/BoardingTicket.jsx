import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

const BoardingTicket = ({ booking, user }) => {
    const tickets = {
        status: booking.status,
        busName: "Shuttle Bus Tripin",
        plateNumber: booking.trips[0]?.schedule.vehicle.license_plate,
        bookingCode: booking.booking_code,
        departureTime: booking.trips[0].schedule.departure_time,
        departureDate: booking.trips[0].selected_day,
        departureCity: booking.trips[0].city,
        departureStation: booking.trips[0].origin,
        arrivalTime: booking.trips[0].schedule.arrival_time,
        arrivalDate: booking.trips[0].selected_day,
        arrivalCity: booking.trips[0].schedule.location.city,
        arrivalStation: booking.trips[0].schedule.location.name,
        passenger: user ?? "user",
        seatNumber: booking.seat_number.join(", "),
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
        <>
            <div className="lg:flex lg:justify-center">
                <div className="min-h-screen bg-primary lg:w-[400px]">
                    {/* Header with centered title */}
                    <div className="relative mb-8 flex h-16 items-center justify-center">
                        <ChevronLeftIcon
                            className="absolute left-4 top-6 size-8 cursor-pointer text-white"
                            onClick={() => {
                                history.back();
                            }}
                        ></ChevronLeftIcon>
                        <h1 className="mt-4 text-2xl font-medium text-white">
                            Boarding Ticket
                        </h1>
                    </div>

                    <div className="flex justify-center">
                        <div className="mx-6 mb-5 max-w-[400px] rounded-xl bg-white p-6 shadow-lg">
                            {/* Logo and Status */}
                            <div className="mb-6">
                                <img
                                    src="/TripInLogo.svg"
                                    alt="logo TripIn"
                                    className="h-16"
                                />
                                <div className="mt-2 flex items-center">
                                    <span className="text-gray-600">
                                        Status:{" "}
                                    </span>
                                    <span
                                        className={`${getBadgeColor(
                                            tickets.status,
                                        )} ml-1 rounded px-2 py-0.5`}
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
                                <div className="text-sm text-gray-600">
                                    Booking code : {tickets.bookingCode}
                                </div>
                            </div>

                            <div className="relative border-t border-dashed border-gray-400">
                                <div className="absolute -left-8 -top-3 size-5 rounded-full bg-primary"></div>
                                <div className="absolute -right-8 -top-3 size-5 rounded-full bg-primary"></div>
                            </div>

                            {/* Journey Section */}
                            <div className="relative grid grid-cols-2 px-4 py-2">
                                {/* Departure */}
                                <div className="relative flex flex-col justify-between gap-24">
                                    {/* Time and Date */}
                                    <div className="w-36">
                                        <div className="text-lg font-bold text-primary">
                                            {tickets.departureTime
                                                .split(":")
                                                .slice(0, 2)
                                                .join(":")}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {format(
                                                new Date(tickets.departureDate),
                                                "dd MMM yyyy",
                                            )}
                                        </div>
                                    </div>

                                    {/* Journey Line - Top Dot */}

                                    {/* City and Station */}
                                    <div className="w-36">
                                        <div className="text-sm font-bold text-primary2">
                                            {tickets.arrivalTime
                                                .split(":")
                                                .slice(0, 2)
                                                .join(":")}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {format(
                                                new Date(tickets.arrivalDate),
                                                "dd MMM yyyy",
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical Line */}

                                {/* Arrival */}
                                <div className="relative flex flex-col items-start gap-24">
                                    <div className="absolute -left-[3px] top-3 size-2 rounded-full bg-grey"></div>

                                    <div className="absolute top-3 h-4/5 w-0.5 bg-grey">
                                        <div className="absolute -left-[3px] top-1/2 size-2 -translate-y-[45%] rounded-full bg-grey"></div>
                                    </div>
                                    <div className="absolute -left-[3px] bottom-7 size-2 rounded-full bg-grey"></div>
                                    {/* Time and Date */}
                                    <div className="w-32">
                                        <div className="text-end font-medium">
                                            {tickets.departureCity}
                                        </div>
                                        <div className="text-end text-sm text-gray-500">
                                            {tickets.departureStation}
                                        </div>
                                    </div>

                                    {/* Journey Line - Bottom Dot */}

                                    {/* City and Station */}
                                    <div className="w-32">
                                        <div className="text-end font-medium">
                                            {tickets.arrivalCity}
                                        </div>
                                        <div className="text-end text-sm text-gray-500">
                                            {tickets.arrivalStation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-400" />

                            {/* Passenger Info */}
                            <div className="py-6">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Passenger
                                        </div>
                                        <div className="mt-1 font-medium">
                                            {tickets.passenger}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            Seat Number:
                                        </div>
                                        <div className="mt-1 font-medium">
                                            {tickets.seatNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative border-t border-dashed border-gray-400">
                                <div className="absolute -left-8 -top-3 size-5 rounded-full bg-primary"></div>
                                <div className="absolute -right-8 -top-3 size-5 rounded-full bg-primary"></div>
                            </div>

                            {/* TODO : QR Code Usage? */}

                            {/* QR Code */}
                            <div className="pt-6 text-center">
                                <div className="mb-4 text-sm">
                                    Scan this code
                                </div>
                                <div className="mb-6 flex justify-center">
                                    <QRCodeSVG
                                        value={`TRIPIN-${tickets.bookingCode}-${tickets.seatNumber}`}
                                        size={160}
                                        level="H"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoardingTicket;

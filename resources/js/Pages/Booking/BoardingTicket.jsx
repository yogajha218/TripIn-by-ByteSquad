import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

const BoardingTicket = ({ booking, user }) => {
    console.log("bookings : ", booking);

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
                    <div className="relative h-16 flex items-center justify-center mb-8">
                        <ChevronLeftIcon
                            className="size-8 text-white cursor-pointer absolute left-4 top-6"
                            onClick={() => {
                                history.back();
                            }}
                        ></ChevronLeftIcon>
                        <h1 className="text-white text-2xl font-medium mt-4">
                            Boarding Ticket
                        </h1>
                    </div>

                    <div className="flex justify-center mb-5">
                        <div className="bg-white rounded-xl p-6 mx-6 shadow-lg max-w-[400px]">
                            {/* Logo and Status */}
                            <div className="mb-6">
                                <img
                                    src="/TripInLogo.svg"
                                    alt="logo TripIn"
                                    className="h-16"
                                />
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-600">
                                        Status:{" "}
                                    </span>
                                    <span
                                        className={`${getBadgeColor(
                                            tickets.status
                                        )} px-2 py-0.5 rounded ml-1`}
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

                            <div className="border-t border-dashed border-gray-400 relative">
                                <div className="size-5 rounded-full bg-primary absolute -top-3 -left-8"></div>
                                <div className="size-5 rounded-full bg-primary absolute -top-3 -right-8"></div>
                            </div>

                            {/* Journey Section */}
                            <div className="relative py-2 grid grid-cols-2 px-4  ">
                                {/* Departure */}
                                <div className="flex flex-col justify-between gap-24 relative">
                                    {/* Time and Date */}
                                    <div className="w-36">
                                        <div className="text-lg text-primary font-bold">
                                            {tickets.departureTime
                                                .split(":")
                                                .slice(0, 2)
                                                .join(":")}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {format(
                                                new Date(tickets.departureDate),
                                                "dd MMM yyyy"
                                            )}
                                        </div>
                                    </div>

                                    {/* Journey Line - Top Dot */}

                                    {/* City and Station */}
                                    <div className="w-36">
                                        <div className="text-sm text-primary2 font-bold">
                                            {tickets.arrivalTime
                                                .split(":")
                                                .slice(0, 2)
                                                .join(":")}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {format(
                                                new Date(tickets.arrivalDate),
                                                "dd MMM yyyy"
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical Line */}

                                {/* Arrival */}
                                <div className="flex flex-col items-start gap-24 relative">
                                    <div className="absolute rounded-full size-2 bg-grey -left-[3px] top-3"></div>

                                    <div className="absolute h-4/5 w-0.5 bg-grey  top-3">
                                        <div className="absolute rounded-full size-2 bg-grey -left-[3px] top-1/2 -translate-y-[45%] "></div>
                                    </div>
                                    <div className="absolute size-2 rounded-full bg-grey -left-[3px] bottom-7"></div>
                                    {/* Time and Date */}
                                    <div className="w-32 ">
                                        <div className="font-medium text-end">
                                            {tickets.departureCity}
                                        </div>
                                        <div className="text-sm text-gray-500 text-end">
                                            {tickets.departureStation}
                                        </div>
                                    </div>

                                    {/* Journey Line - Bottom Dot */}

                                    {/* City and Station */}
                                    <div className="w-32 ">
                                        <div className="font-medium text-end">
                                            {tickets.arrivalCity}
                                        </div>
                                        <div className="text-sm text-gray-500 text-end">
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
                                        <div className="font-medium mt-1">
                                            {tickets.passenger}
                                        </div>
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

                            <div className="border-t border-dashed border-gray-400 relative">
                                <div className="size-5 rounded-full bg-primary absolute -top-3 -left-8"></div>
                                <div className="size-5 rounded-full bg-primary absolute -top-3 -right-8"></div>
                            </div>

                            {/* TODO : QR Code Usage? */}

                            {/* QR Code */}
                            <div className="pt-6 text-center">
                                <div className="text-sm mb-4">
                                    Scan this code
                                </div>
                                <div className="flex justify-center mb-6">
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

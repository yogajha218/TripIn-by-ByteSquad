import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
// import { Car, ChevronLeft, CreditCard, Users, Armchair } from 'lucide-react'; // TODO : harus import

const HistoryDetail = ({ log }) => {

    const ticketInfo = {
        date: log.departure_date,
        bookingCode: log.trip.booking.booking_code,
        bus: {
            name: "Shuttle Bus Tripin",
            plateNumber: log.trip.schedule.vehicle.license_plate,
        },
        payment: {
            method: "Dana",
            total: new Intl.NumberFormat("id-ID").format(
                log.trip.booking.price,
            ),
        },
        passengers: {
            count: log.trip.booking.seat_total,
            seats: `Seat ${log.trip.booking.seat_number.join(", ")}`,
        },
        journey: {
            duration: "2 h 45 m",
            from: {
                city: log.trip.origin,
                time: log.trip.schedule.departure_time,
            },
            to: {
                city: log.trip.schedule.location.name,
                time: log.trip.schedule.arrival_time,
            },
        },
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="flex min-h-screen flex-col bg-primary lg:w-[400px]">
                    {/* Header */}
                    <div className="relative flex items-center p-7 text-white">
                        <ChevronLeftIcon
                            className="absolute left-3 top-1/2 size-6 -translate-y-1/2 cursor-pointer"
                            onClick={() => history.back()}
                        />
                        <span className="flex-1 text-center text-xl font-medium">
                            {format(new Date(ticketInfo.date), "dd MMM yyyy")}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 rounded-t-xl bg-white px-6 py-12">
                        {/* Booking Code */}
                        <div className="mb-2 flex items-center justify-between px-1">
                            <span className="font-medium text-black">
                                Booking Code :
                            </span>
                            <span className="font-semibold text-primary2">
                                {ticketInfo.bookingCode}
                            </span>
                        </div>

                        {/* Bus Info Card */}
                        <div className="mb-6 flex items-center gap-4 rounded-lg border bg-white p-4 shadow-md">
                            <div className="">
                                <img
                                    src="/shuttle_icon.svg"
                                    className="size-10 text-white"
                                />
                            </div>
                            <div>
                                <h2 className="font-medium">
                                    {ticketInfo.bus.name}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {ticketInfo.bus.plateNumber}
                                </p>
                            </div>
                        </div>

                        {/* Detail Order */}
                        <h3 className="mb-2 p-1 font-medium">Order Detail</h3>
                        <div className="mb-6 rounded-md border-2 bg-white shadow-md">
                            {/* Payment Method */}
                            <div className="flex items-center border-b border-gray-100 p-4">
                                <img
                                    src="/gopay_icon.svg"
                                    className="mr-3 h-7"
                                />
                                <span>{ticketInfo.payment.method}</span>
                            </div>

                            {/* Passengers */}
                            <div className="flex items-center border-b border-gray-100 p-4">
                                <img
                                    src="/Passenger.svg"
                                    className="ml-1 mr-3 h-6 w-6 text-blue-400"
                                />
                                <span>
                                    {ticketInfo.passengers.count} Passenger
                                </span>
                            </div>

                            {/* Seats */}
                            <div className="flex items-center border-b border-gray-100 p-4">
                                <img
                                    src="/Seat.svg"
                                    className="ml-1 mr-3 h-6 w-6 text-blue-400"
                                />
                                <span>{ticketInfo.passengers.seats}</span>
                            </div>

                            {/* Total Payment */}
                            <div className="flex items-center justify-between p-4">
                                <span className="font-bold">Total Payment</span>
                                <span className="font-bold">
                                    Rp
                                    {ticketInfo.payment.total.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Journey Info - Updated Section */}
                        <div className="mb-6 rounded-lg border-2 bg-white p-6 shadow-md">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-medium">
                                    TRAVEL ITINERARY
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {/* Departure Container */}
                                <div className="rounded-lg border-2 bg-gray-50 p-4">
                                    <div className="mb-2 border-b text-sm text-gray-500">
                                        Departure
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold">
                                                {ticketInfo.journey.from.city}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {ticketInfo.bus.name}
                                            </div>
                                        </div>
                                        <div className="text-lg font-medium text-primary">
                                            {ticketInfo.journey.from.time
                                                .split(":")
                                                .slice(0, 2)
                                                .join(":")}
                                        </div>
                                    </div>
                                </div>

                                {/* Arrival Container */}
                                <div className="rounded-lg border-2 bg-gray-50 p-4 shadow-sm">
                                    <div className="mb-2 border-b text-sm text-gray-500">
                                        Arrival
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold">
                                                {ticketInfo.journey.to.city}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {ticketInfo.bus.name}
                                            </div>
                                        </div>
                                        <div className="text-xl font-semibold text-primary2">
                                            {ticketInfo.journey.to.time
                                                .split(":")
                                                .slice(0, 2)
                                                .join(":")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Boarding Button */}
                        <button className="w-full rounded-lg bg-primary2 py-4 font-medium text-white">
                            Boarding Ticket
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryDetail;

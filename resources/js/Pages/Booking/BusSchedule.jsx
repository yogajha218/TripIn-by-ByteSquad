import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import JourneyDetail from "@/Components/JourneyDetail";

const Schedule = ({ booking, routes }) => {
    const [selectedRoute, setSelectedRoute] = useState(null);
    console.log("Booking Data", booking);
    console.log("Rute", routes);

    if (!routes || routes.length === 0) {
        return <div>No routes available</div>;
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="min-h-screen bg-blue-50 flex flex-col lg:w-[500px]">
                    {/* Header */}
                    <header className="bg-primary text-white p-6 shadow-md">
                        <div className="flex items-center justify-center relative">
                            <ChevronLeftIcon className="size-6 text-white font-bold absolute z-50 top-1/2 translate-y-[-50%] left-3 cursor-pointer"></ChevronLeftIcon>
                            <div>
                                <h1 className="text-xl font-bold text-center">
                                    {booking.cityValue}
                                </h1>
                                <div className="flex items-center space-x-2 mt-2 text-sm">
                                    <span>
                                        {format(
                                            booking.selectedDay,
                                            "MMMM d, yyyy"
                                        )}{" "}
                                        • {booking.seatsValue} Seat •{" "}
                                        {routes.length} Buses
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-grow p-4 space-y-4">
                        <JourneyDetail routes={routes} booking={booking} />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Schedule;

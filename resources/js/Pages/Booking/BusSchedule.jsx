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
                <div className="min-h-screen bg-white flex flex-col w-full lg:w-[400px]">
                    {/* Header */}
                    <header className="bg-primary  h-[108px] text-white py-6 shadow-md">
                        <div className="flex   relative justify-center">
                            <ChevronLeftIcon
                                className="size-6 text-white font-bold absolute z-50 top-1/2 translate-y-[-50%] left-3 cursor-pointer"
                                onClick={() => history.back()}
                            ></ChevronLeftIcon>
                            <div>
                                <h1 className="text-xl font-bold text-center w-full">
                                    {booking.cityValue}
                                </h1>
                                <div className="flex items-center space-x-2 mt-2 text-sm w-full">
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

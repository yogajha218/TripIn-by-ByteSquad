import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import JourneyDetail from "@/Components/JourneyDetail";

const Schedule = ({ booking, routes }) => {
    const [selectedRoute, setSelectedRoute] = useState(null);

    if (!routes || routes.length === 0) {
        return <div>No routes available</div>;
    }

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="flex min-h-screen flex-col bg-white lg:w-[400px]">
                    {/* Header */}
                    <header className="h-[108px] rounded-b-md bg-primary py-6 text-white shadow-md">
                        <div className="relative flex justify-center">
                            <ChevronLeftIcon
                                className="absolute left-3 top-1/2 z-50 size-6 translate-y-[-50%] cursor-pointer font-bold text-white"
                                onClick={() =>
                                    (window.location.href =
                                        route("booking.index"))
                                }
                            ></ChevronLeftIcon>
                            <div>
                                <h1 className="w-full text-center text-xl font-bold">
                                    {booking.cityValue}
                                </h1>
                                <div className="mt-2 flex w-full items-center space-x-2 text-sm">
                                    <span>
                                        {format(
                                            booking.selectedDay,
                                            "MMMM d, yyyy",
                                        )}{" "}
                                        • {booking.seatsValue} Seat •{" "}
                                        {routes.length} Buses
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-grow space-y-4 p-4">
                        <JourneyDetail routes={routes} booking={booking} />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Schedule;

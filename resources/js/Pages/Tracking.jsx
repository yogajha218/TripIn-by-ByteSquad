import React from "react";
import NavbarTripin from "@/Components/NavbarTripin";

const Tracking = ({
    shuttleInfo = {
        busName: "Shuttle Bus Tripin",
        plateNumber: "B 1234 CD",
        estimatedArrival: {
            start: "18.00",
            end: "18.15",
        },
        currentStopIndex: 2,
        stops: [
            {
                label: "Bandara Soekarno Hatta",
                time: "13.00",
            },
            {
                label: "On The Way",
                time: "",
            },
            {
                label: "Hotel Dude",
                time: "16.00",
            },
        ],
    },
}) => {
    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className=" h-screen bg-white lg:w-[400px] mb-14">
                    {/* Header */}
                    <div className="bg-primary p-6">
                        <h1 className="text-2xl font-bold text-white text-center">
                            Track Shuttle
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Shuttle Info Card */}
                        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h2 className="font-medium">
                                        {shuttleInfo.busName}
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        {shuttleInfo.plateNumber}
                                    </p>
                                </div>
                                <div className="bg-gray-700 p-2 rounded-lg">
                                    <img src="shuttle_icon.svg" alt="shuttle" />
                                </div>
                            </div>

                            <p className="mb-4">
                                Estimated arrived:{" "}
                                {shuttleInfo.estimatedArrival.start} -{" "}
                                {shuttleInfo.estimatedArrival.end}
                            </p>

                            {/* Journey Progress */}
                            <div className="bg-blue-50 rounded-lg p-6">
                                {shuttleInfo.stops.map((stop, index) => {
                                    const isPast =
                                        index > shuttleInfo.currentStopIndex;
                                    const isCurrent =
                                        index === shuttleInfo.currentStopIndex;
                                    const isCompleted =
                                        index < shuttleInfo.currentStopIndex;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4"
                                        >
                                            {/* Time Column */}
                                            <div className="flex flex-col items-end min-w-[60px]">
                                                <span
                                                    className={`font-medium ${
                                                        isCurrent
                                                            ? "text-blue-600"
                                                            : ""
                                                    }`}
                                                >
                                                    {stop.time}
                                                </span>
                                            </div>

                                            {/* Progress Line */}
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={`w-3 h-3 rounded-full  ${
                                                        isCurrent
                                                            ? "bg-blue-500 ring-4 ring-blue-100 animate-pulse"
                                                            : isCompleted
                                                            ? "bg-blue-500 "
                                                            : "bg-gray-300"
                                                    }`}
                                                />
                                                {index !==
                                                    shuttleInfo.stops.length -
                                                        1 && (
                                                    <div
                                                        className={`w-0.5 h-16 ${
                                                            isCompleted
                                                                ? "bg-blue-500"
                                                                : isCurrent
                                                                ? "bg-gradient-to-b from-blue-500 to-gray-300"
                                                                : "bg-gray-300"
                                                        }`}
                                                    />
                                                )}
                                            </div>

                                            {/* Location */}
                                            <div className="flex-1 pb-4 relative">
                                                <p
                                                    className={`font-medium ${
                                                        isCurrent
                                                            ? "text-blue-600"
                                                            : isCompleted
                                                            ? "text-gray-700"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    {stop.label}
                                                </p>
                                                {isCurrent ? (
                                                    <span className="inline-block mt-1 text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-sm absolute">
                                                        Current Position
                                                    </span>
                                                ) : isCompleted ? (
                                                    <span className="inline-block mt-1 text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-sm absolute">
                                                        Passed
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div> yellow</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavbarTripin pageInfo="TrackingPage" />
        </>
    );
};

export default Tracking;

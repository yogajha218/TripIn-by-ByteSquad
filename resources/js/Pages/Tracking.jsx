import React from "react";
import NavbarTripin from "@/Components/NavbarTripin";

const Tracking = ({ routes }) => {
    console.log("Route Data: ", routes);

    const shuttleInfo =
        routes === null
            ? null
            : {
                  busName: "Shuttle Bus Tripin",
                  plateNumber: routes.trips[0]?.schedule.vehicle.license_plate,
                  estimatedArrival: {
                      start: routes.trips[0]?.schedule.departure_time,
                      end: routes.trips[0]?.schedule.arrival_time,
                  },
                  currentStopIndex: 2,
                  stops: [
                      {
                          label: routes.trips[0]?.origin,
                          time: routes.trips[0]?.schedule.departure_time,
                      },
                      {
                          label: "On The Way",
                          time: "",
                      },
                      {
                          label: routes.trips[0]?.schedule.location.name,
                          time: routes.trips[0]?.schedule.arrival_time,
                      },
                  ],
              };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="mb-14 h-screen bg-white lg:w-[400px]">
                    {/* Header */}
                    <div className="h-[108px] rounded-b-2xl bg-primary p-6">
                        <h1 className="pt-6 text-center text-2xl font-semibold text-white">
                            Track Shuttle
                        </h1>
                    </div>

                    {/* Content */}
                    {shuttleInfo !== null ? (
                        <div className="p-6">
                            {/* Shuttle Info Card */}
                            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-md">
                                <div className="mb-2 flex items-center justify-between">
                                    <div>
                                        <h2 className="fonfont-medium">
                                            {shuttleInfo.busName}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {shuttleInfo.plateNumber}
                                        </p>
                                    </div>
                                    <div className="rounded-lg">
                                        <img
                                            src="shuttle_icon.svg"
                                            alt="shuttle"
                                            className="size-30"
                                        />
                                    </div>
                                </div>

                                <p className="mb-4">
                                    Estimated arrived:{" "}
                                    {shuttleInfo.estimatedArrival.start
                                        .split(":")
                                        .slice(0, 2)
                                        .join(":")}{" "}
                                    {"-"}
                                    {shuttleInfo.estimatedArrival.end
                                        .split(":")
                                        .slice(0, 2)
                                        .join(":")}
                                </p>

                                {/* Journey Progress */}
                                <div className="rounded-lg bg-blue-50 p-6">
                                    {shuttleInfo.stops.map((stop, index) => {
                                        const isPast =
                                            index >
                                            shuttleInfo.currentStopIndex;
                                        const isCurrent =
                                            index ===
                                            shuttleInfo.currentStopIndex;
                                        const isCompleted =
                                            index <
                                            shuttleInfo.currentStopIndex;

                                        return (
                                            <div
                                                key={index}
                                                className="flex items-start gap-4"
                                            >
                                                {/* Time Column */}
                                                <div className="flex min-w-[60px] flex-col items-end">
                                                    <span
                                                        className={`font-medium ${
                                                            isCurrent
                                                                ? "text-blue-600"
                                                                : ""
                                                        }`}
                                                    >
                                                        {stop.time
                                                            .split(":")
                                                            .slice(0, 2)
                                                            .join(":")}
                                                    </span>
                                                </div>

                                                {/* Progress Line */}
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`h-3 w-3 rounded-full ${
                                                            isCurrent
                                                                ? "animate-pulse bg-blue-500 ring-4 ring-blue-100"
                                                                : isCompleted
                                                                  ? "bg-blue-500"
                                                                  : "bg-gray-300"
                                                        }`}
                                                    />
                                                    {index !==
                                                        shuttleInfo.stops
                                                            .length -
                                                            1 && (
                                                        <div
                                                            className={`h-16 w-0.5 ${
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
                                                <div className="relative flex-1 pb-4">
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
                                                        <span className="absolute mt-1 inline-block rounded-sm bg-blue-100 px-2 py-1 text-xs text-blue-600">
                                                            Current Position
                                                        </span>
                                                    ) : isCompleted ? (
                                                        <span className="absolute mt-1 inline-block rounded-sm bg-slate-100 px-2 py-1 text-xs text-slate-600">
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
                    ) : (
                        <div className="flex h-3/4 flex-col items-center justify-center">
                            <img src="/tayo-bus.svg" />
                            <p>there's no trip to track</p>
                        </div>
                    )}
                </div>
            </div>
            <NavbarTripin pageInfo="TrackingPage" />
        </>
    );
};

export default Tracking;

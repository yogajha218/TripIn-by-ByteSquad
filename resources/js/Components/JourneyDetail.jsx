import { format } from "date-fns";
import { useState } from "react";
import axios from "axios";

const JourneyDot = () => {
    return (
        <>
            <div className="flex flex-col items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-black" />
                <div className="h-24 w-0.5 bg-black" />
                <div className="h-2.5 w-2.5 rounded-full bg-black" />
            </div>
        </>
    );
};

const JourneyDetail = ({ routes, booking }) => {
    const [selectedRoute, setSelectedRoute] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    console.log("Routes : ", routes);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRoutes = routes.filter((bus) =>
        bus.vehicles.some(
            (vehicle) =>
                vehicle.license_plate
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                bus.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

    const onClickDetail = async (e, routeId, plate, departure) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;

        try {
            const response = await axios.post(
                route("route.store"),
                {
                    selectedRoute: { routeId, plate, departure },
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                },
            );

            if (response.status == 200) {
                window.location.href = "/booking/seat";
            }
        } catch (error) {
            if (error.response) {
                // The request was made, and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server Error:", error.response.data);
                alert(
                    error.response.data.message ||
                        "An error occurred on the server.",
                );
            } else if (error.request) {
                // The request was made, but no response was received
                console.error("Network Error:", error.request);
                alert(
                    "Network error. Please check your internet connection and try again.",
                );
            } else {
                // Something happened in setting up the request that triggered an error
                console.error("Error:", error.message);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <form className="">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg
                            className="h-4 w-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        required
                        onChange={handleSearchChange}
                        value={searchTerm}
                        type="search"
                        id="default-search"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Search routes"
                    />
                </div>
            </form>

            {filteredRoutes.length > 0 ? (
                filteredRoutes.map((bus) =>
                    bus.vehicles.map((vehicle) => (
                        <div
                            key={vehicle.pivot.route_id} // Use route_id from the pivot
                            className="relative cursor-pointer rounded-lg bg-white p-4 shadow-md"
                            onClick={(e) =>
                                onClickDetail(
                                    e,
                                    vehicle.pivot.route_id,
                                    vehicle.license_plate,
                                    vehicle.pivot.departure_time,
                                )
                            }
                        >
                            {/* Available Seats Badge */}
                            <div className="absolute right-4 top-4 rounded-full px-2 py-1 text-xs text-blue-600">
                                {vehicle.seats} Seats Available
                            </div>

                            {/* Bus Details */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src="/Shuttle_Icon.svg"
                                    alt="Bus"
                                    className="h-16 w-16 rounded-md object-cover"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-sm font-semibold">
                                        Shuttle Bus TripIn
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        {vehicle.license_plate}
                                    </p>
                                </div>
                            </div>

                            {/* Journey Details */}
                            <div className="mt-4">
                                <div className="ml-20 flex items-center space-x-4">
                                    <div className="flex h-full items-start">
                                        <JourneyDot />
                                    </div>
                                    <div className="flex-1">
                                        <div className="mt-6 items-center">
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    {format(
                                                        booking.selectedDay,
                                                        "MMMM d, yyyy",
                                                    )}
                                                </p>
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <span className="font-semibold">
                                                        from: {booking.origin}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-xs">
                                                {vehicle.pivot.departure_time
                                                    .split(":")
                                                    .slice(0, 2)
                                                    .join(":")}
                                            </span>
                                            <div className="mt-4">
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <span className="font-semibold">
                                                        to: {bus.name}
                                                    </span>
                                                </div>
                                                <span className="text-xs">
                                                    {vehicle.pivot.arrival_time
                                                        .split(":")
                                                        .slice(0, 2)
                                                        .join(":")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex justify-between">
                                            <div className="flex items-center space-x-2 text-xs text-gray-400"></div>
                                            <p className="font-semibold text-blue-600">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(
                                                    booking.seatsValue *
                                                        vehicle.pivot.price,
                                                )}
                                                /pax
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )),
                )
            ) : (
                <div>No buses found for the search term.</div>
            )}
        </>
    );
};

export default JourneyDetail;

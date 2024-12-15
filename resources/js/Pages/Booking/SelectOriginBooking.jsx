import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const SelectOriginBooking = ({ setIsSelectOrigin, setOrigin, locations }) => {
    const [searchTerm, setSearchTerm] = useState(""); // State for search input

    const goBack = () => {
        setIsSelectOrigin(false);
    };

    const handleSelectLocation = (location) => {
        let locationName = location.name;
        setOrigin("origin", locationName);
        goBack();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter locations based on type
    const filteredAirports = locations.filter(
        (location) => location.type === "Bandara" && location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredHotels = locations.filter(
        (location) => location.type === "Hotel" && location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="bg-white lg:w-[400px]">
                    <div className="relative flex h-[108px] items-center rounded-b-md bg-primary px-3">
                        <ChevronLeftIcon
                            className="absolute size-8 cursor-pointer text-white"
                            aria-hidden="true"
                            onClick={goBack}
                        />
                        <p className="w-full text-center text-2xl font-medium text-white">
                            Select origin
                        </p>
                    </div>
                    <div className="min-h-[100vh] w-full bg-white px-5 pt-4">
                        <form>
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

                        {/* Airplane Section */}
                        {filteredAirports.length > 0 && (
                            <div className="my-2">
                                <h2 className="text-lg font-semibold">Airports</h2>
                                {filteredAirports.map((loc, index) => (
                                    <div
                                        className="flex h-fit w-full cursor-pointer justify-between border-b px-1"
                                        key={index}
                                        onClick={() => handleSelectLocation(loc)}
                                    >
                                        <img
                                            className="size-[46px] self-start"
                                            src="/airplane.svg"
                                            alt="Airplane"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-end text-xs font-extralight">
                                                {loc.type} - {loc.city}
                                            </p>
                                            <p className="flex max-w-[240px] flex-wrap text-right text-sm font-semibold">
                                                {loc.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Hotel Section */}
                        {filteredHotels.length > 0 && (
                            <div className="mt-5">
                                <h2 className="text-lg font-semibold">Hotels</h2>
                                {filteredHotels.map((loc, index) => (
                                    <div
                                        className="flex h-fit w-full cursor-pointer justify-between border-b px-1"
                                        key={index}
                                        onClick={() => handleSelectLocation(loc)}
                                    >
                                        <img
                                            className="size-[46px] self-start"
                                            src="/bed.svg"
                                            alt="Hotel"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-end text-xs font-extralight">
                                                {loc.type} - {loc.city}
                                            </p>
                                            <p className="flex max-w-[240px] flex-wrap text-right text-sm font-semibold">
                                                {loc.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectOriginBooking;
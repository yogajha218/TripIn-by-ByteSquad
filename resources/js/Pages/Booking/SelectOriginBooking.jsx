import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const SelectOriginBooking = ({ setIsSelectOrigin, setOrigin, locations }) => {
    const goBack = () => {
        setIsSelectOrigin(false);
    };

    const handleSelectLocation = (location) => {
        let locationName = location.name;
        setOrigin(locationName);
        goBack();
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="lg:w-[400px] w-full bg-white ">
                    <div className="h-[108px] flex items-center  px-3 relative bg-primary rounded-b-md">
                        <ChevronLeftIcon
                            className="size-8 text-white cursor-pointer absolute"
                            aria-hidden="true"
                            onClick={() => {
                                goBack();
                            }}
                        />
                        <p className="w-full text-2xl font-medium text-center text-white">
                            Select origin
                        </p>
                    </div>
                    <div className=" bg-white min-h-[100vh] w-full pt-4 px-5 ">
                        <form
                            method="GET"
                            className="flex justify-center mt-2 mb-8"
                        >
                            <input
                                name="title"
                                type="text"
                                placeholder="Search for location..."
                                className="w-3/4 px-4 py-2 border rounded-s-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                id="searchInput"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#547592] text-white rounded-e-md hover:bg-[#415A71] focus:outline-none focus:ring-2 focus:ring-primary2"
                            >
                                Search
                            </button>
                        </form>
                        <div className="my-2">
                            {locations.map((loc, index) => (
                                <div
                                    className="w-full h-fit flex justify-between px-1 cursor-pointer border-b"
                                    key={index}
                                    onClick={() => handleSelectLocation(loc)}
                                >
                                    <img
                                        className="size-[46px] self-start"
                                        src={
                                            loc.type === "Bandara"
                                                ? "/airplane.svg"
                                                : "/bed.svg"
                                        }
                                    />
                                    <div className="flex flex-col ">
                                        <p className="text-xs font-extralight text-end">
                                            {loc.type} - {loc.city}
                                        </p>
                                        <p className="text-sm font-semibold flex flex-wrap max-w-[240px] text-right">
                                            {loc.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SelectOriginBooking;

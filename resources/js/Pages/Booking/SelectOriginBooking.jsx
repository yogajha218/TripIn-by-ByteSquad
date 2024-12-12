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
                <div className="w-full bg-white lg:w-[400px]">
                    <div className="relative flex h-[108px] items-center rounded-b-md bg-primary px-3">
                        <ChevronLeftIcon
                            className="absolute size-8 cursor-pointer text-white"
                            aria-hidden="true"
                            onClick={() => {
                                goBack();
                            }}
                        />
                        <p className="w-full text-center text-2xl font-medium text-white">
                            Select origin
                        </p>
                    </div>
                    <div className="min-h-[100vh] w-full bg-white px-5 pt-4">
                        <form
                            method="GET"
                            className="mb-8 mt-2 flex justify-center"
                        >
                            <input
                                name="title"
                                type="text"
                                placeholder="Search for location..."
                                className="w-3/4 rounded-s-md border px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="searchInput"
                            />
                            <button
                                type="submit"
                                className="rounded-e-md bg-[#547592] px-4 py-2 text-white hover:bg-[#415A71] focus:outline-none focus:ring-2 focus:ring-primary2"
                            >
                                Search
                            </button>
                        </form>
                        <div className="my-2">
                            {locations.map((loc, index) => (
                                <div
                                    className="flex h-fit w-full cursor-pointer justify-between border-b px-1"
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
                    </div>
                </div>
            </div>
        </>
    );
};
export default SelectOriginBooking;

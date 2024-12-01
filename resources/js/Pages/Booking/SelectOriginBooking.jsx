import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const SelectOriginBooking = ({
    isSelectOrigin,
    setIsSelectOrigin,
    setOrigin,
}) => {
    // data Mock
    const locations = [
        { id: 1, type: "Bandara", name: "Bandara Soekarno Hatta" },
        { id: 2, type: "Bandara", name: "Bandara Halim Perdana Kusuma" },
        { id: 3, type: "Hotel", name: "Hotel Aryaduta jakarta" },
        { id: 4, type: "Hotel", name: "Hotel Grand Hyatt Jakarta" },
        { id: 5, type: "Hotel", name: "Hotel The Ritz" },
        { id: 6, type: "Hotel", name: "Hotel Raffles Jakarta" },
    ];
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
                <div className="lg:w-[500px] w-full bg-primary">
                    <div className="h-[108px] flex items-center  px-3 relative">
                        <ChevronLeftIcon
                            strokeWidth={2}
                            className="size-6 text-white cursor-pointer absolute"
                            aria-hidden="true"
                            onClick={() => {
                                goBack();
                            }}
                        />
                        <p className="w-full text-2xl font-semibold text-center text-white">
                            Select origin
                        </p>
                    </div>
                    <div className=" bg-white min-h-[100vh] w-full pt-4 px-10">
                        <form method="GET" className="flex justify-center mb-6">
                            <input
                                name="title"
                                type="text"
                                placeholder="Search for location..."
                                className="w-3/4 px-4 py-2 border rounded-s-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                id="searchInput"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#547592] text-white rounded-e-lg hover:bg-[#415A71] focus:outline-none focus:ring-2 focus:ring-primary2"
                            >
                                Search
                            </button>
                        </form>
                        <div className="my-4">
                            {locations.map((location, index) => (
                                <div
                                    className="w-full h-fit flex justify-between px-1 cursor-pointer border-b"
                                    key={index}
                                    onClick={() =>
                                        handleSelectLocation(location)
                                    }
                                >
                                    <img
                                        className="size-[46px] self-start"
                                        src={
                                            location.type === "Bandara"
                                                ? "/airplane.svg"
                                                : "/bed.svg"
                                        }
                                    />
                                    <div className="flex flex-col ">
                                        <p className="text-xs font-thin text-end">
                                            {location.type}
                                        </p>
                                        <p className="text-2xl font-semibold">
                                            {location.name}
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

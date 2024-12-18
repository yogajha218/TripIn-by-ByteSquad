import React from "react";
import "./CarouselDashboard.css";
const popularDestinations = ["Jakarta", "Bali", "Bandung", "Yogyakarta"];
const CarouselDashboard = () => {
    return (
        <>
            <div className="hide-scrollbar flex h-[120px] flex-row flex-nowrap items-center gap-2 overflow-scroll scroll-smooth lg:w-full">
                {popularDestinations
                    .slice() // Create a copy of the array to avoid mutating the original
                    .sort((a, b) => a.localeCompare(b))
                    .map((destination, index) => (
                        <div
                            key={index}
                            className="relative h-[100px] w-[255px] flex-shrink-0 overflow-hidden rounded-lg"
                        >
                            <p className="absolute z-10 px-3 py-2 font-semibold tracking-tight text-white shadow-md">
                                {destination}
                            </p>
                            <div className="absolute size-full bg-primary2/30"></div>
                            <img
                                src={`/${destination}.png`}
                                alt=""
                                loading="lazy"
                                className="h-[100px] w-[255px]"
                            />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default CarouselDashboard;

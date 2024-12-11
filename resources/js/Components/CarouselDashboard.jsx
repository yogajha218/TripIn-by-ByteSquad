import React from "react";
import "./CarouselDashboard.css";
const popularDestinations = ["Jakarta", "Bali", "Bandung", "Yogyakarta"];
const CarouselDashboard = () => {
    return (
        <>
            <div className="flex lg:w-full h-[120px]   overflow-scroll flex-nowrap  gap-2 flex-row items-center hide-scrollbar scroll-smooth">
                {popularDestinations.map((destination, index) => (
                    <div
                        key={index}
                        className=" relative flex-shrink-0 w-[255px] h-[100px] rounded-lg overflow-hidden"
                    >
                        <p className="absolute text-white shadow-md px-3 py-2 font-semibold">
                            {destination}
                        </p>
                        <img
                            src={`/${destination}.png`}
                            alt=""
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default CarouselDashboard;

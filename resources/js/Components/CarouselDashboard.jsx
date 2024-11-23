import React from "react";
import "./CarouselDashboard.css";
const popularDestinations = ["Jakarta", "Bali", "Bandung", "Yogyakata"];
const CarouselDashboard = () => {
    return (
        <>
            <div className="flex lg:max-w-[400px] h-[120px]  overflow-scroll flex-nowrap  gap-2 flex-row items-center hide-scrollbar">
                {popularDestinations.map((destination, index) => (
                    <div
                        key={index}
                        className=" relative flex-shrink-0 w-[255px] h-[100px] rounded-lg overflow-hidden"
                    >
                        <p className="absolute px-3 py-2 font-semibold">
                            {destination}
                        </p>
                        <img src="https://placehold.co/255x100" alt="" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default CarouselDashboard;

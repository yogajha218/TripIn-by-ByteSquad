import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import JourneyDetail from "@/Components/JourneyDetail";

const Schedule = ({ booking, routes }) => {
    console.log("Routes: ", routes);

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="flex min-h-screen flex-col bg-white lg:w-[400px]">
                    {/* Header */}
                    <header className="h-[108px] rounded-b-md bg-primary py-6 text-white shadow-md">
                        <div className="relative flex justify-center">
                            <ChevronLeftIcon
                                className="absolute left-3 top-1/2 z-50 size-6 translate-y-[-50%] cursor-pointer font-bold text-white"
                                onClick={() =>
                                    (window.location.href =
                                        route("booking.index"))
                                }
                            ></ChevronLeftIcon>
                            <div>
                                <h1 className="w-full text-center text-xl font-bold">
                                    {booking.cityValue}
                                </h1>
                                <div className="mt-2 flex w-full items-center space-x-2 text-sm">
                                    <span>
                                        {format(
                                            booking.selectedDay,
                                            "MMMM d, yyyy",
                                        )}{" "}
                                        • {booking.seatsValue} Seat •{" "}
                                        {routes.length} Buses
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-grow space-y-4 p-4">
                        {!routes || routes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center">
                                <svg
                                    width="119"
                                    height="110"
                                    viewBox="0 0 119 110"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M37.6318 94.079C36.3625 94.079 35.2985 93.6497 34.4398 92.791C33.5812 91.9324 33.1518 90.8684 33.1518 89.5991V80.4152C31.8078 78.9218 30.7252 77.2605 29.9039 75.4312C29.0825 73.6019 28.6719 71.6046 28.6719 69.4393V26.8798C28.6719 20.6825 31.5465 16.1465 37.2958 13.2719C43.045 10.3973 52.1169 8.95996 64.5115 8.95996C77.354 8.95996 86.5379 10.3413 92.0632 13.1039C97.5884 15.8666 100.351 20.4585 100.351 26.8798V69.4393C100.351 71.6046 99.9404 73.6019 99.1191 75.4312C98.2978 77.2605 97.2151 78.9218 95.8711 80.4152V89.5991C95.8711 90.8684 95.4418 91.9324 94.5831 92.791C93.7245 93.6497 92.6605 94.079 91.3912 94.079H86.9112C85.6419 94.079 84.5779 93.6497 83.7193 92.791C82.8606 91.9324 82.4313 90.8684 82.4313 89.5991V85.1191H46.5917V89.5991C46.5917 90.8684 46.1623 91.9324 45.3037 92.791C44.445 93.6497 43.381 94.079 42.1117 94.079H37.6318ZM37.6318 44.7996H91.3912V31.3597H37.6318V44.7996ZM48.8316 71.6793C50.6983 71.6793 52.2849 71.0259 53.5916 69.7193C54.8982 68.4126 55.5516 66.826 55.5516 64.9593C55.5516 63.0927 54.8982 61.506 53.5916 60.1994C52.2849 58.8927 50.6983 58.2394 48.8316 58.2394C46.965 58.2394 45.3784 58.8927 44.0717 60.1994C42.7651 61.506 42.1117 63.0927 42.1117 64.9593C42.1117 66.826 42.7651 68.4126 44.0717 69.7193C45.3784 71.0259 46.965 71.6793 48.8316 71.6793ZM80.1913 71.6793C82.0579 71.6793 83.6446 71.0259 84.9512 69.7193C86.2579 68.4126 86.9112 66.826 86.9112 64.9593C86.9112 63.0927 86.2579 61.506 84.9512 60.1994C83.6446 58.8927 82.0579 58.2394 80.1913 58.2394C78.3247 58.2394 76.738 58.8927 75.4314 60.1994C74.1247 61.506 73.4714 63.0927 73.4714 64.9593C73.4714 66.826 74.1247 68.4126 75.4314 69.7193C76.738 71.0259 78.3247 71.6793 80.1913 71.6793ZM39.6478 22.3998H89.8232C88.7032 21.1305 86.2952 20.0665 82.5993 19.2078C78.9033 18.3492 72.9487 17.9199 64.7355 17.9199C56.7462 17.9199 50.9036 18.3865 47.2077 19.3198C43.5117 20.2532 40.9917 21.2798 39.6478 22.3998ZM46.5917 76.1592H82.4313C84.8952 76.1592 87.0046 75.2819 88.7592 73.5272C90.5139 71.7726 91.3912 69.6633 91.3912 67.1993V53.7595H37.6318V67.1993C37.6318 69.6633 38.5091 71.7726 40.2637 73.5272C42.0184 75.2819 44.1277 76.1592 46.5917 76.1592Z"
                                        fill="#1D1B20"
                                    />
                                    <path
                                        d="M51.5539 81.8796C51.5539 94.8208 41.0615 105.313 28.1203 105.313C15.1792 105.313 4.68677 94.8208 4.68677 81.8796C4.68677 68.9384 15.1792 58.446 28.1203 58.446C41.0615 58.446 51.5539 68.9384 51.5539 81.8796Z"
                                        fill="#F44336"
                                    />
                                    <path
                                        d="M34.7472 71.939L38.0607 75.2525L21.4932 91.82L18.1797 88.5065L34.7472 71.939Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M38.0607 88.5065L34.7472 91.82L18.1797 75.2525L21.4932 71.939L38.0607 88.5065Z"
                                        fill="white"
                                    />
                                </svg>
                                <p>No Routes Avalailable</p>
                            </div>
                        ) : (
                            <JourneyDetail routes={routes} booking={booking} />
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Schedule;

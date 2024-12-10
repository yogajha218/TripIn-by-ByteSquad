import React, { useState, useEffect } from "react";
import Seats from "@/Components/Seats";
import axios from "axios";
<<<<<<< HEAD
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
=======
>>>>>>> eed456d1502b28579def5666896c9d131765a934

const SelectSeat = ({ plate, seatLimit }) => {
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [selectedSeatCount, setSelectedSeatCount] = useState(0);
    const [bookedSeats, setBookedSeats] = useState([]);
    // console.log('Sended Plate : ', plate);
    console.log("Seat Limit : ", seatLimit);
    console.log("Get plate : ", plate.selectedRoute.plate);
    console.log("Get route_id : ", plate.selectedRoute.routeId);
    console.log("Departure : ", plate.selectedRoute.departure);

    // Example seat numbers
    const seats = [
        { number: 1 },
        { number: 2 },
        { type: "null" },
        { type: "steeringWheel" }, // Row 1
        { type: "null" },
        { number: 3 },
        { number: 4 },
        { number: 5 }, // Row 2
        { number: 6 },
        { number: 7 },
        { number: 8 },
        { number: 9 }, // Row 3
        { type: "null" },
        { number: 10 },
        { number: 11 },
        { number: 12 }, // Row 4
        { type: "null" },
        { number: 13 },
        { number: 14 },
        { number: 15 }, // Row 5
        { number: 16 },
        { number: 17 },
        { number: 18 },
        { number: 19 }, // Row 6
    ];

    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const response = await axios.get(
                    `/booking/seat/booked-seat/${plate.selectedRoute.plate}`
                );
                setBookedSeats(response.data.booked_seats);
            } catch (error) {
                console.error("Error fetching booked seats:", error);
                alert("Failed to fetch booked seats. Please try again.");
            }
        };

        if (plate) {
            fetchBookedSeats();
        }
    }, [plate]);

    // Selecting multiple seats and putting the selected seats into the state
    const handleSeatClick = (seatNumber) => {
        if (selectedSeat.includes(seatNumber)) {
            // Remove the seat from the selected seats array
            setSelectedSeat(selectedSeat.filter((seat) => seat !== seatNumber));
            setSelectedSeatCount(selectedSeatCount - 1);
        } else {
            if (selectedSeat.length < seatLimit) {
                // Add the seat to the selected seats array if within limit
                setSelectedSeat([...selectedSeat, seatNumber]);
                setSelectedSeatCount(selectedSeatCount + 1);
            } else {
                // Notify the user if they exceed the seat limit
                alert(`You can only select up to ${seatLimit} seats.`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]'
        ).content;

        try {
            const response = await fetch(
                route("seat.store", plate.selectedRoute.plate),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Ensure that the content-type is set to JSON
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({
                        seats: selectedSeat,
                        seatCount: selectedSeatCount,
                    }),
                }
            );

            console.log("Response Status: ", response.status); // Log the status code

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                window.location.href = "/booking/order-detail";
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            // Handle specific error scenarios
            if (error.response) {
                // The request was made, and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server Error:", error.response.data);
                alert(
                    error.response.data.message ||
                        "An error occurred on the server."
                );
            } else if (error.request) {
                // The request was made, but no response was received
                console.error("Network Error:", error.request);
                alert(
                    "Network error. Please check your internet connection and try again."
                );
            } else {
                // Something happened in setting up the request that triggered an error
                console.error("Error:", error.message);
                alert("An unexpected error occurred. Please try again.");
            }
        }

        console.log(selectedSeat);
    };

    return (
<<<<<<< HEAD
        <>
            <div className="lg:flex lg:justify-center">
                <div className="lg:max-w-[400px] md:min-w-[360px] mx-auto">
                    <div className="min-h-screen relative min-w-[360px] bg-white ">
                        {/* Header */}
                        <div className="h-[108px] bg-primary rounded-b-xl relative ">
                            <div className="mx-3 flex justify-center py-5  ">
                                {/* Back Arrow */}
                                <ChevronLeftIcon
                                    className="size-6 text-white absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={() =>
                                        (window.location.href =
                                            "/booking/bus-schedule")
                                    }
                                ></ChevronLeftIcon>

                                {/* Title */}
                                <div className=" flex justify-center text-white">
                                    {/* Title Page */}
                                    <p className="text-2xl w-full font-medium">
                                        Select Seat
                                    </p>
                                    {/* Destination */}
                                    <p className="text-lg font-semibold"></p>
                                </div>
=======
        <div>
            <div className="lg:max-w-[400px] md:min-w-[360px] mx-auto">
                <div className=" min-h-screen relative min-w-[360px] bg-white">
                    {/* Header */}
                    <div className="h-[205px] bg-primary">
                        <div className="mx-5 pt-14 flex">
                            {/* Back Arrow */}
                            <div className="ml-2">
                                <img
                                    src="/backArrow.svg"
                                    alt="Back Arrow"
                                    className="cursor-pointer"
                                />
>>>>>>> eed456d1502b28579def5666896c9d131765a934
                            </div>
                            {/* Seat Information */}
                            <div className="flex justify-center ">
                                <div className="flex flex-row gap-4 items-center">
                                    {/* Available */}
                                    <div className="flex items-center">
                                        <div className="size-3 bg-white border border-gray"></div>
                                        <p className="ml-1.5 text-white text-center text-sm font-semibold   ">
                                            Available
                                        </p>
                                    </div>

<<<<<<< HEAD
                                    {/* Filled */}
                                    <div className="flex items-center">
                                        <div className="size-3 bg-primary2 border border-gray"></div>
                                        <p className="ml-1.5 text-white text-center text-sm font-semibold">
                                            Filled
                                        </p>
                                    </div>

                                    {/* Selected */}
                                    <div className="flex items-center">
                                        <div className="size-3 bg-[#009EF7] border border-gray"></div>
                                        <p className="ml-1.5 text-white text-center text-sm font-semibold">
                                            Selected
                                        </p>
=======
                            {/* Title */}
                            <div className="ml-[85px] text-white">
                                {/* Title Page */}
                                <p className="text-3xl font-extrabold">
                                    Select Seat
                                </p>
                                {/* Destination */}
                                <p className="text-lg font-semibold"></p>
                            </div>
                        </div>
                        {/* Seat Information */}
                        <div className="flex justify-center mt-10">
                            <div className="flex flex-row gap-4 items-center">
                                {/* Available */}
                                <div className="flex">
                                    <div className="w-[20px] h-[20px] bg-white border border-gray"></div>
                                    <p className="ml-1.5 text-white text-center text-md font-bold">
                                        Available
                                    </p>
                                </div>

                                {/* Filled */}
                                <div className="flex">
                                    <div className="w-[20px] h-[20px] bg-[#394867] border border-gray"></div>
                                    <p className="ml-1.5 text-white text-center text-md font-bold">
                                        Filled
                                    </p>
                                </div>

                                {/* Selected */}
                                <div className="flex">
                                    <div className="w-[20px] h-[20px] bg-[#009EF7] border border-gray"></div>
                                    <p className="ml-1.5 text-white text-center text-md font-bold">
                                        Selected
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Seats */}
                        <div className="flex justify-center items-center">
                            <div className="mt-[20px]">
                                <div className="flex justify-center">
                                    <h1 className="font-bold text-lg">
                                        Seat Limit: {seatLimit}
                                    </h1>
                                </div>
                                <div className="mt-3 w-[300px] h-[430px] bg-[#8BAFCE] rounded-[15px]">
                                    <div className="flex flex-col items-center py-5">
                                        <div className="grid grid-cols-4 gap-4 p-4">
                                            {seats.map((seat, index) =>
                                                seat.type ===
                                                "steeringWheel" ? (
                                                    <div
                                                        key={index}
                                                        className="w-12 h-12 flex items-center justify-center"
                                                    >
                                                        <img
                                                            src="/steeringWheel.svg"
                                                            alt="Steering Wheel"
                                                            className="w-10 h-10"
                                                        />
                                                    </div>
                                                ) : seat.type === "null" ? (
                                                    <div
                                                        key={index}
                                                        className=""
                                                    ></div>
                                                ) : (
                                                    <Seats
                                                        key={index}
                                                        number={seat.number}
                                                        isBooked={
                                                            Array.isArray(
                                                                bookedSeats
                                                            ) &&
                                                            bookedSeats.includes(
                                                                seat.number
                                                            )
                                                        }
                                                        isSelected={selectedSeat.includes(
                                                            seat.number
                                                        )}
                                                        onClick={() =>
                                                            handleSeatClick(
                                                                seat.number
                                                            )
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
>>>>>>> eed456d1502b28579def5666896c9d131765a934
                                    </div>
                                </div>
                            </div>
                        </div>

<<<<<<< HEAD
                        <form onSubmit={handleSubmit}>
                            {/* Seats */}
                            <div className="flex justify-center items-center">
                                <div className="mt-[20px]">
                                    <div className="flex justify-center">
                                        <h1 className="font-medium text-md">
                                            Seat Limit: {seatLimit}
                                        </h1>
                                    </div>
                                    <div className="mt-3 w-[300px] h-[430px] bg-[#8BAFCE] rounded-[15px]">
                                        <div className="flex flex-col items-center py-5">
                                            <div className="grid grid-cols-4 gap-4 p-4">
                                                {seats.map((seat, index) =>
                                                    seat.type ===
                                                    "steeringWheel" ? (
                                                        <div
                                                            key={index}
                                                            className="w-12 h-12 flex items-center justify-center"
                                                        >
                                                            <img
                                                                src="/steeringWheel.svg"
                                                                alt="Steering Wheel"
                                                                className="w-10 h-10"
                                                            />
                                                        </div>
                                                    ) : seat.type === "null" ? (
                                                        <div
                                                            key={index}
                                                            className=""
                                                        ></div>
                                                    ) : (
                                                        <Seats
                                                            key={index}
                                                            number={seat.number}
                                                            isBooked={
                                                                Array.isArray(
                                                                    bookedSeats
                                                                ) &&
                                                                bookedSeats.includes(
                                                                    seat.number
                                                                )
                                                            }
                                                            isSelected={selectedSeat.includes(
                                                                seat.number
                                                            )}
                                                            onClick={() =>
                                                                handleSeatClick(
                                                                    seat.number
                                                                )
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="mt-2 py-3 flex justify-center px-3  w-full">
                                <button className=" w-full h-[45px] bg-primary2 text-white rounded-[10px]">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
=======
                        {/* Save Button */}
                        <div className="mt-10 flex justify-center">
                            <button className="w-[350px] h-[45px] bg-[#394867] text-white rounded-[10px]">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
>>>>>>> eed456d1502b28579def5666896c9d131765a934
    );
};

export default SelectSeat;

import React, { useState, useLayoutEffect } from "react";
import Seats from "@/Components/Seats";
import { ToastComponent } from "@/Components/ToastComponent";
import axios from "axios";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const SelectSeat = ({ plate, seatLimit }) => {
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [selectedSeatCount, setSelectedSeatCount] = useState(0);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [toastMessage, setToastMessage] = useState("");
    const [toaatType, setToaatType] = useState("");
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

    useLayoutEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const response = await axios.get(
                    `/booking/seat/booked-seat/${plate.selectedRoute.plate}`,
                );
                setBookedSeats(response.data.booked_seats);
            } catch (error) {
                console.error("Error fetching booked seats:", error);
                setToaatType("alert");
                setToastMessage(
                    "Failed to fetch booked seats. Please try again.",
                );
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
                setToaatType("alert");
                setToastMessage(
                    `You can only select up to ${seatLimit} seat(s).`,
                );
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedSeat.length !== seatLimit) {
            setToaatType("warning");
            setToastMessage(
                `you need to select ${seatLimit - selectedSeat.length} more seat(s)`,
            );
            return;
        }
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
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
                },
            );

            console.log("Response Status: ", response.status); // Log the status code

            if (response.ok) {
                const result = await response.json();
                setToaatType("success");
                setToastMessage(result.message);

                window.location.href = "/booking/order-detail";
            } else {
                const error = await response.json();
                setToaatType("alert");
                setToastMessage(error.message); 
            }
        } catch (error) {
            // Handle specific error scenarios
            if (error.response) {
                // The request was made, and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server Error:", error.response.data);
                setToaatType("alert");
                setToastMessage(
                    error.response.data.message ||
                        "An error occurred on the server.",
                );
            } else if (error.request) {
                // The request was made, but no response was received
                console.error("Network Error:", error.request);
                setToaatType("alert");
                setToastMessage(
                    "Network error. Please check your internet connection and try again.",
                );
            } else {
                // Something happened in setting up the request that triggered an error
                console.error("Error:", error.message);
                setToaatType("alert");
                setToastMessage(
                    "An unexpected  error occurred. Please try again.",
                );
            }
        }

        console.log(selectedSeat);
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="mx-auto md:min-w-[360px] lg:max-w-[400px]">
                    <div className="relative min-h-screen min-w-[360px] bg-white">
                        {/* Header */}
                        <div className="relative h-[108px] rounded-b-xl bg-primary">
                            <div className="mx-3 flex justify-center py-5">
                                {/* Back Arrow */}
                                <ChevronLeftIcon
                                    className="absolute left-3 top-6 size-6 cursor-pointer text-white"
                                    onClick={() =>
                                        (window.location.href =
                                            "/booking/bus-schedule")
                                    }
                                ></ChevronLeftIcon>

                                {/* Title */}
                                <div className="flex justify-center text-white">
                                    {/* Title Page */}
                                    <p className="w-full text-2xl font-medium">
                                        Select Seat
                                    </p>
                                    {/* Destination */}
                                    <p className="text-lg font-semibold"></p>
                                </div>
                            </div>
                            {/* Seat Information */}
                            <div className="flex justify-center">
                                <div className="flex flex-row items-center gap-4">
                                    {/* Available */}
                                    <div className="flex items-center">
                                        <div className="border-gray size-3 border bg-white"></div>
                                        <p className="ml-1.5 text-center text-sm font-semibold text-white">
                                            Available
                                        </p>
                                    </div>

                                    {/* Filled */}
                                    <div className="flex items-center">
                                        <div className="border-gray size-3 border bg-primary2"></div>
                                        <p className="ml-1.5 text-center text-sm font-semibold text-white">
                                            Filled
                                        </p>
                                    </div>

                                    {/* Selected */}
                                    <div className="flex items-center">
                                        <div className="border-gray size-3 border bg-[#009EF7]"></div>
                                        <p className="ml-1.5 text-center text-sm font-semibold text-white">
                                            Selected
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Seats */}
                            <div className="flex items-center justify-center">
                                <div className="mt-[20px]">
                                    <div className="flex justify-center">
                                        <h1 className="text-md font-medium">
                                            Seat Limit: {seatLimit}
                                        </h1>
                                    </div>
                                    <div className="mt-3 h-[430px] w-[300px] rounded-[15px] bg-[#8BAFCE]">
                                        <div className="flex flex-col items-center py-5">
                                            <div className="grid grid-cols-4 gap-4 p-4">
                                                {seats.map((seat, index) =>
                                                    seat.type ===
                                                    "steeringWheel" ? (
                                                        <div
                                                            key={index}
                                                            className="flex h-12 w-12 items-center justify-center"
                                                        >
                                                            <img
                                                                src="/steeringWheel.svg"
                                                                alt="Steering Wheel"
                                                                className="h-10 w-10"
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
                                                                    bookedSeats,
                                                                ) &&
                                                                bookedSeats.includes(
                                                                    seat.number,
                                                                )
                                                            }
                                                            isSelected={selectedSeat.includes(
                                                                seat.number,
                                                            )}
                                                            onClick={() =>
                                                                handleSeatClick(
                                                                    seat.number,
                                                                )
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="mt-2 flex w-full justify-center px-3 py-3">
                                <button className="h-[45px] w-full rounded-[10px] bg-primary2 text-white">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {toastMessage !== "" && (
                <div className="nowrap absolute left-1/2 top-5 flex h-fit w-fit items-center justify-center">
                    <ToastComponent
                        message={toastMessage}
                        onClose={() => setToastMessage("")}
                        type={toaatType}
                    />
                </div>
            )}
        </>
    );
};

export default SelectSeat;

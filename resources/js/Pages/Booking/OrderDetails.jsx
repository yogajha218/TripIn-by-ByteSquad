import React, { useState } from "react";
import { format, parse, parseISO, set } from "date-fns";
import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
// import Coins from '/Coins.svg';

const ConfirmationPage = ({
    user,
    routeData,
    bookingData,
    seatNumber,
    seatCount,
    credit,
}) => {
    const [snapToken, setSnapToken] = useState(null);
    console.log("Selected Day: ", format(bookingData.selectedDay, 'EEE, d MMM yyyy'));

    // Default data if props are not provided
    const defaultData = {
        busInfo: {
            name: "Shuttle Bus Tripin",
            plateNumber: routeData[0]?.vehicles[0]?.license_plate,
            duration: "2 h 45 m",
            departureTime: routeData[0]?.vehicles[0]?.pivot.departure_time,
            departureDate: format(
                bookingData.selectedDay,
                "EEE, d MMM yyyy"
            ),
            arrivalTime: routeData[0]?.vehicles[0]?.pivot.arrival_time,
            arrivalDate: format(
                bookingData.selectedDay,
                "EEE, d MMM yyyy"
            ),
            from: bookingData.origin,
            to: routeData[0]?.name,
        },
        orderDetails: {
            name: user?.username ?? "user1",
            seatNumber: seatNumber,
            totalSeats: bookingData.seatsValue,
            potentialPoints: null,
            exchangePoints: credit,
        },
        pricing: {
            seatPrice: parseFloat(routeData[0]?.vehicles[0]?.pivot.price),
            quantity: seatCount,
        },
    };

    // States
    const [isExchangeEnabled, setIsExchangeEnabled] = useState(false);
    const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

    // Using data from props or default data
    const data = defaultData;
    let totalPrice = data.pricing.seatPrice * data.pricing.quantity;
    defaultData.orderDetails.potentialPoints = totalPrice * 0.05;
    let creditStatus = false;

    if (isExchangeEnabled) {
        creditStatus = true;
        totalPrice = data.pricing.seatPrice * data.pricing.quantity - credit;
    }

    console.log(creditStatus);

    // Format currency
    const formatCurrency = (amount) => {
        return `Rp${amount.toLocaleString("id-ID")}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]'
        ).content;

        try {
            const response = await axios.post(
                "/booking/order-detail/store",
                {
                    amount: totalPrice,
                    credit: defaultData.orderDetails.potentialPoints,
                    credit_status: creditStatus,
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                }
            );

            const { snap_token } = response.data;
            console.log(snap_token);
            setSnapToken(snap_token);

            // Use Midtrans Snap to show the payment modal
            window.snap.pay(snap_token, {
                onSuccess: function (result) {
                    alert("Payment Success! " + JSON.stringify(result));
                },
                onPending: function (result) {
                    alert("Payment Pending! " + JSON.stringify(result));
                },
                onError: function (result) {
                    alert("Payment Error! " + JSON.stringify(result));
                },
                onClose: function () {
                    alert(
                        "You closed the popup without completing the payment."
                    );
                },
            });
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
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="min-h-screen bg-primary lg:max-w-[400px]">
                    {/* Header */}

                    <div className="px-4 py-3 flex items-center text-white">
                        <ChevronLeftIcon
                            className="size-8 text-white cursor-pointer"
                            onClick={() => (window.location.href = "/booking")}
                        ></ChevronLeftIcon>

                        <h1 className="text-2xl font-medium flex-1 text-center mr-6 mt-4 mb-4">
                            Confirmation
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="bg-white min-h-screen pt-4 px-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Order Details
                        </h2>

                        {/* Shuttle Info Card */}
                        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-4">
                            <h3 className="font-medium mb-1">
                                {data.busInfo.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {data.busInfo.plateNumber}
                            </p>

                            {/* Time and Route - Improved Journey Section */}
                            <div className="flex items-start gap-10">
                                <div className="flex flex-col gap-10">
                                    <div>
                                        <p className="font-semibold">
                                            {data.busInfo.departureTime
                                                .split(":")
                                                .slice(0, 2)
                                                .join(":")}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {data.busInfo.departureDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {data.busInfo.arrivalTime
                                                .split(":")
                                                .slice(0, 2)
                                                .join(":")}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {data.busInfo.arrivalDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative flex flex-col items-center">
                                    <div className="size-3 rounded-full bg-blue-500"></div>
                                    <div className="w-1 h-20 bg-blue-300"></div>
                                    <div className="size-2.5 rounded-full bg-blue-500 ring-4 ring-blue-200"></div>
                                </div>

                                <div className="flex flex-col gap-16">
                                    <p className="font-medium">
                                        {data.busInfo.from}
                                    </p>
                                    <p className="font-medium">
                                        {data.busInfo.to}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Name Card - Updated Layout */}
                        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h3 className="font-medium mb-1">
                                        {data.orderDetails.name}
                                    </h3>
                                    <p className="text-gray-700">
                                        Seat x{data.orderDetails.totalSeats}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">
                                        Seat Number
                                    </p>
                                    <p className="font-medium">
                                        {data.orderDetails.seatNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between bg-gray-50 rounded p-2 text-sm">
                                <p className="self-start">Potential gain </p>
                                <p className="text-orange-500 self-end">
                                    {`${data.orderDetails.potentialPoints} CP`}
                                </p>
                            </div>
                        </div>

                        {/* Exchange Points Toggle - With Functionality */}
                        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/credit.svg"
                                        alt="Credits"
                                        className="h-4"
                                    />
                                    <span>
                                        {`Exchange ${data.orderDetails.exchangePoints} CP`}
                                    </span>
                                </div>
                                <button
                                    onClick={() =>
                                        setIsExchangeEnabled(!isExchangeEnabled)
                                    }
                                    className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${
                                        isExchangeEnabled
                                            ? "bg-orange-500"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    <div
                                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out absolute top-0.5 ${
                                            isExchangeEnabled
                                                ? "translate-x-6"
                                                : "translate-x-0.5"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Payment Method - With Dropdown */}
                        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-4">
                            <h3 className="font-medium mb-2">Payment Method</h3>
                            <div
                                className="relative"
                                onClick={() =>
                                    setIsPaymentDropdownOpen(
                                        !isPaymentDropdownOpen
                                    )
                                }
                            >
                                <div className="flex items-center justify-between p-2 border rounded cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="/gopay_icon.svg"
                                            alt="GoPay"
                                            className="w-6 h-6"
                                        />
                                        <span>GoPay</span>
                                    </div>
                                    <ChevronDownIcon
                                        className={`size-5 text-black transition-transform duration-200 ${
                                            isPaymentDropdownOpen
                                                ? "transform rotate-180"
                                                : ""
                                        }`}
                                    />
                                </div>
                                {isPaymentDropdownOpen && (
                                    <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                                        <div className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                                            <img
                                                src="/gopay_icon.svg"
                                                alt="GoPay"
                                                className="w-6 h-6"
                                            />
                                            <span>GoPay</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price Details */}
                        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-20">
                            <h3 className="font-medium mb-2">Price Details</h3>
                            <div className="flex justify-between mb-2">
                                <p>Seat (x1)</p>
                                <p>{formatCurrency(data.pricing.seatPrice)}</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p>Total seat</p>
                                <p>(x{data.pricing.quantity})</p>
                            </div>
                            <div className="flex justify-between font-semibold pt-2 border-t">
                                <p>Total Price</p>
                                <p>{formatCurrency(totalPrice)}</p>
                            </div>
                        </div>

                        {/* Order Button */}
                        <div className="fixed bottom-0 left-0 lg:translate-x-[-50%] lg:left-1/2 right-0 p-4 bg-white lg:w-[400px]">
                            <button
                                className="w-full bg-primary2 text-white py-3 rounded-lg font-semibold"
                                onClick={handleSubmit}
                            >
                                ORDER NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationPage;

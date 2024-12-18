import React, { useState, useEffect } from "react";
import { CheckIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

const PaymentStatus = ({ user, booking }) => {
    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]',
    ).content;
    const [paymentData, setPaymentData] = useState({
        user: user.username,
        gopayAccount: user.phone_number ?? "+62xxxxxxxxxxx",
        date: format(booking.booking_time, "yyy-MM-dd"),
        time: format(booking.booking_time, "HH:mm "),
        transactionNo: booking.booking_code,
        paymentMethod: "Dana",
        totalPrice: booking.price,
    });

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="relative min-h-screen bg-white lg:w-[400px]">
                    {/* Header */}
                    <div className="bg-primary p-6">
                        <div className="relative flex items-center justify-center">
                            <h1 className="text-2xl font-bold text-white">
                                Dana
                            </h1>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="relative p-6">
                        {/* Success Icon */}
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-full border border-gray-200 bg-blue-500 p-3 shadow-black ring-2 ring-blue-100">
                                <CheckIcon className="size-8 text-white"></CheckIcon>
                            </div>
                        </div>

                        {/* Notification Text */}
                        <div className="mb-6 text-center text-black">
                            <h2 className="mb-2 text-xl font-semibold">
                                Payment Successfull
                            </h2>
                            <p className="text-sm">
                                You've successfully booked a shuttle
                            </p>
                        </div>

                        {/* Payment Details Card */}
                        <div className="relative mb-4 rounded-lg bg-gray-100 p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-black">Name</span>
                                    <span>{paymentData.user}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-black">
                                        phone number
                                    </span>
                                    <span>{paymentData.gopayAccount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-black">Date</span>
                                    <span>
                                        {format(
                                            paymentData.date,
                                            "MMM dd yyyy",
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-black">Time</span>
                                    <span>{paymentData.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-black">
                                        Transaction No
                                    </span>
                                    <span>{paymentData.transactionNo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-black">
                                        Payment Method
                                    </span>
                                    <span>{paymentData.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold text-black">
                                        Total Price
                                    </span>
                                    <span className="font-bold">
                                        {`Rp${formatPrice(paymentData.totalPrice)}`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Details Card */}
                    </div>
                    {/* Back Button */}
                    <div className="relative bottom-0 w-full p-5">
                        <button
                            onClick={() =>
                                (window.location.href = route("home"))
                            }
                            className="w-full rounded-lg bg-primary2 py-3 font-medium text-white active:bg-primary2/85"
                        >
                            BACK TO HOME
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentStatus;

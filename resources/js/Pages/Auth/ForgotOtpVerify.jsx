import axios from "axios";
import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
const ForgotOtpVerify = ({ email }) => {
    const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    console.log("Email received : ", email);

    const handleChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.querySelector(
                    `input[name="code-${index + 1}"]`
                );
                nextInput?.focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]'
        ).content;
        const otp = verificationCode.join("");

        try {
            const response = await axios.post(
                route("password.otp.verify"),
                {
                    email,
                    otp,
                },
                {
                    headers: { "X-CSRF-TOKEN": csrfToken },
                }
            );

            // Handle successful response
            if (response.status === 200) {
                // Redirect to the desired route after successful verification
                window.location.href = "/forgot-password"; // Assuming you return the redirect URL from the server
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            const prevInput = document.querySelector(
                `input[name="code-${index - 1}"]`
            );
            prevInput?.focus();
        }
    };

    const handleBack = () => {
        window.location.href = "/forgot-password/email";
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col min-h-screen bg-primary lg:w-[400px]">
                    {/* Top Section */}
                    <div className="relative w-full py-16">
                        {/* Back Button */}
                        <ChevronLeftIcon
                            className="size-8 absolute text-white top-4 left-5 cursor-pointer"
                            onClick={handleBack}
                        ></ChevronLeftIcon>
                        {/* Logo Section */}
                        <div className="flex-none flex justify-center px-4">
                            <img
                                src="/TripInLogo.svg"
                                className="w-24 object-contain"
                                alt="Logo of TripIn"
                            />
                        </div>
                    </div>

                    {/* Verification Content */}
                    <div className="flex-grow bg-white rounded-t-3xl p-6">
                        <div className="max-w-md mx-auto p-2">
                            <h1 className="text-2xl font-semibold text-black mb-2">
                                Let’s Verify Your Account!
                            </h1>
                            <p className="text-gray-500 mb-8">
                                We just sent an OTP code to your email. Check
                                your inbox and enter the code below to keep
                                going! 🚀
                            </p>

                            {/* Code Input Fields */}
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between gap-3 mb-8">
                                    {verificationCode.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            inputMode="numeric"
                                            name={`code-${index}`}
                                            value={digit}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(index, e)
                                            }
                                            className="w-16 h-16 border-2 border-gray-200 rounded-xl
                          text-center bg-transparent text-xl text-black
                          font-semibold focus:border-gray-400 focus:outline-none
                          transition-colors"
                                            maxLength={1}
                                        />
                                    ))}
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {error}
                                    </p>
                                )}

                                {/* Confirm Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-primary2 text-white py-4 rounded-xl
             font-semibold hover:opacity-90 transition-opacity
             active:scale-[0.99]"
                                    onClick={handleSubmit}
                                >
                                    Confirm
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotOtpVerify;

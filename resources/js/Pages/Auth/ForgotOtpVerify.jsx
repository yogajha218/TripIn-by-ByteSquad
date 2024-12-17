import axios from "axios";
import React, { useState } from "react";
import { ChevronLeftIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
const ForgotOtpVerify = ({ email }) => {
    const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
    const [error, setError] = useState("");

    const handleChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.querySelector(
                    `input[name="code-${index + 1}"]`,
                );
                nextInput?.focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;
        const otp = verificationCode.join("");

        try {
            const response = await axios.post(
                "/forgot-password/otp/verify",
                {
                    email,
                    otp,
                },
                {
                    headers: { "X-CSRF-TOKEN": csrfToken },
                },
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
                `input[name="code-${index - 1}"]`,
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
                <div className="flex min-h-screen flex-col bg-primary lg:w-[400px]">
                    {/* Top Section */}
                    <div className="relative w-full py-20">
                        {/* Back Button */}

                        {/* Logo Section */}
                        <div className="flex flex-none justify-center px-4">
                            <img
                                src="/TripInLogo.svg"
                                className="w-36 object-contain"
                                alt="Logo of TripIn"
                            />
                        </div>
                    </div>

                    {/* Verification Content */}
                    <div className="flex-grow rounded-t-lg bg-white p-6">
                        <div className="mx-auto max-w-md p-2">
                            <h1 className="mb-2 text-2xl font-semibold text-black">
                                Let’s Verify Your Account!
                            </h1>
                            <p className="mb-8 text-gray-500">
                                We just sent an OTP code to your email. Check
                                your inbox and enter the code below to keep
                                going! 🚀
                            </p>

                            {/* Code Input Fields */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-8 flex justify-between gap-3">
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
                                                    e.target.value,
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(index, e)
                                            }
                                            className="h-16 w-16 rounded-xl border-2 border-gray-200 bg-transparent text-center text-xl font-semibold text-black transition-colors focus:border-gray-400 focus:outline-none"
                                            maxLength={1}
                                        />
                                    ))}
                                </div>
                                {error && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {error}
                                    </p>
                                )}

                                {/* Confirm Button */}
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-primary2 py-4 font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
                                    onClick={handleSubmit}
                                >
                                    Confirm
                                </button>
                                <div
                                    className="flex cursor-pointer items-center justify-center gap-1 p-5"
                                    onClick={() => history.back()}
                                >
                                    <ArrowLeftIcon className="size-3 text-primary2"></ArrowLeftIcon>
                                    <p className="text-sm text-primary2">
                                        go back
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotOtpVerify;

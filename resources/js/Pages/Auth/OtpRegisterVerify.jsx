import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ButtonComponent from "@/Components/ButtonComponent";
import ModalComponent from "@/Components/ModalComponent";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const OtpRegistVerify = ({ email }) => {
    const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [isModalHidden, setIsModalHidden] = useState(true);
    const [modalMessage, setModalMessage] = useState("");
    const inputFocus = useRef([]);
    useEffect(() => {
        if (inputFocus.current[0]) {
            inputFocus.current[0].focus();
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;
        const otp = verificationCode.join("");

        try {
            const response = await axios.post(
                "/register/otp/verify",
                {
                    email,
                    otp,
                },
                {
                    headers: { "X-CSRF-TOKEN": csrfToken },
                },
            );

            // Show success modal
            setModalMessage("OTP Verified! You can sign in now");
            setIsModalHidden(false);

            // Redirect after a delay to allow the user to see the message
            setTimeout(() => {
                window.location.href = "/auth";
            }, 2000); // 2000 milliseconds = 2 seconds
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

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

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            const prevInput = document.querySelector(
                `input[name="code-${index - 1}"]`,
            );
            prevInput?.focus();
        }
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="flex min-h-screen flex-col bg-primary lg:w-[400px]">
                    {/* Logo Section */}
                    <div className="flex flex-none justify-center px-4 py-20">
                        <img
                            src="/TripInLogo.svg"
                            className="w-36 object-contain"
                            alt="Logo of TripIn"
                        />
                    </div>

                    {/* Verification Content */}
                    <div className="flex-grow rounded-t-md bg-white p-6">
                        <div className="mx-auto max-w-md p-2">
                            <h1 className="mb-2 text-2xl font-semibold text-black">
                                Verification Code
                            </h1>
                            <p className="mb-8 text-gray-500">
                                We have sent the verification code to your email
                                address, please check your email and enter the
                                verification code below.
                            </p>

                            {/* Code Input Fields */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-8 flex justify-between gap-3">
                                    {verificationCode.map((digit, index) => (
                                        <input
                                            ref={(el) =>
                                                (inputFocus.current[index] = el)
                                            }
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

                                <ButtonComponent buttonText="confirm" />
                                <div
                                    className="mt-5 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white p-2"
                                    onClick={() => history.back()}
                                >
                                    <ArrowLeftIcon className="size-4 cursor-pointer text-primary2"></ArrowLeftIcon>
                                    <p className="text-sm text-primary2">
                                        go back to sign up
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ModalComponent
                        isModalHidden={isModalHidden}
                        setIsModalHidden={setIsModalHidden}
                    >
                        <div className="flex h-[145px] w-[225px] flex-col items-center justify-center">
                            <img src="/success.svg" />
                            <p className="text-center text-sm font-normal">
                                {modalMessage}
                            </p>
                        </div>
                    </ModalComponent>
                </div>
            </div>
        </>
    );
};

export default OtpRegistVerify;

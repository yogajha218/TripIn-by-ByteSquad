import React, { useState } from "react";
import axios from "axios";
import ButtonComponent from "@/Components/ButtonComponent";
import ModalComponent from "@/Components/ModalComponent";

const Otp = ({ email }) => {
    const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [isModalHidden, setIsModalHidden] = useState(true);
    const [modalMessage, setModalMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]'
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
                }
            );

            // Show success modal
            setModalMessage("OTP verification successful! Redirecting...");
            setIsModalHidden(false);

            // Redirect after a delay to allow the user to see the message
            setTimeout(() => {
                window.location.href = route('auth');
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
                    `input[name="code-${index + 1}"]`
                );
                nextInput?.focus();
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

    return (
        <div className="flex flex-col min-h-screen bg-primary">
            {/* Top Section */}
            <div className="flex-none mt-4 ml-5">
                {/* Back Button */}
                <button className="text-white text-2xl bg-transparent hover:opacity-80 transition-opacity">
                    &lt;
                </button>
            </div>

            {/* Logo Section */}
            <div className=" h-14 flex-none flex justify-center px-4 my-7">
                <img
                    src="/TripInLogo.svg"
                    className="h-38 object-contain"
                    alt="Logo of TripIn"
                />
            </div>

            {/* Verification Content */}
            <div className="flex-grow bg-white rounded-t-3xl p-6">
                <div className="max-w-md mx-auto p-2">
                    <h1 className="text-2xl font-semibold text-black mb-2">
                        Verification Code
                    </h1>
                    <p className="text-gray-500 mb-8">
                        We have sent the verification code to your email address
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
                                        handleChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-16 h-16 border-2 border-gray-200 rounded-xl
                            text-center bg-transparent text-xl text-black
                            font-semibold focus:border-gray-400 focus:outline-none
                            transition-colors"
                                    maxLength={1}
                                />
                            ))}
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                        {/* Confirm Button */}

                        <ButtonComponent buttonText="confirm" />
                    </form>
                </div>
            </div>
            <ModalComponent isModalHidden={isModalHidden} setIsModalHidden={setIsModalHidden}>
                // TODO : Tambah isi modal
                <button onClick={() => setIsModalHidden(true)}>Close</button>
            </ModalComponent>
        </div>
    );
};

export default Otp;

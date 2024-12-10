import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { ChevronLeftIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const ForgotPassword = ({ email }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const { data, setData, post, processing, errors } = useForm({
        email: email,
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    console.log("New Pass Email : ", email);

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]'
        ).content;
        console.log("New Pass : ", data.password);
        console.log("New Pass : ", data.confirmPassword);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setIsPasswordMatch(false);
            return;
        }

        try {
            post("/forgot-password/new-password", data, {
                headers: { "X-CSRF-TOKEN": csrfToken },
            });
        } catch (err) {
            setError("Failed to reset password. Please try again.");
        }
    };

    const handleBack = () => {
        window.location.href = "/forgot-password/email";
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="min-h-screen bg-primary flex flex-col lg:w-[400px]">
                    <div className="flex justify-center py-20 bg-primary">
                        <div className="flex items-center">
                            <img
                                src="/TripInLogo.svg"
                                className="w-36 "
                                alt="Logo of TripIn"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-t-md pt-8 pb-4 flex-grow">
                        <div className="px-6 md:max-w-xl lg:max-w-2xl mx-auto">
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmitPassword}
                                className="w-full"
                            >
                                <h2 className="text-xl text-black font-semibold mb-4">
                                    Please enter a new password
                                </h2>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    disabled
                                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg mb-4 bg-gray-50"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="New Password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className={`w-full px-4 py-3 text-black bg-transparent border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent
                ${!isPasswordMatch ? "border-red-500" : "border-gray-300"}`}
                                    required
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-sm">
                                        {errors.password}
                                    </div>
                                )}

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm New Password"
                                    value={data.confirmPassword}
                                    onChange={(e) =>
                                        setData(
                                            "confirmPassword",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full px-4 py-3 text-black bg-transparent border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent
                ${!isPasswordMatch ? "border-red-500" : "border-gray-300"}`}
                                    required
                                />
                                {errors.confirmPassword && (
                                    <div className="text-red-500 text-sm">
                                        {errors.confirmPassword}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className={`w-full bg-primary2 text-white py-3 rounded-lg font-medium
                ${
                    !isPasswordMatch
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:opacity-90 transition-opacity"
                }
              `}
                                    disabled={!isPasswordMatch || processing}
                                >
                                    Reset Password
                                </button>
                                <div
                                    className="w-full h-fit cursor-pointer flex justify-center items-center p-5"
                                    onClick={handleBack}
                                >
                                    <ArrowLeftIcon className="size-4 text-primary2"></ArrowLeftIcon>
                                    <p className="text-sm text-primary2">
                                        {" "}
                                        go back to Sign In
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

export default ForgotPassword;

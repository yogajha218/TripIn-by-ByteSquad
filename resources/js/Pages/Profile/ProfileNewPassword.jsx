import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const ProfileNewPassword = ({ email }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const { data, setData, post, processing, errors } = useForm({
        password: "",
        confirmPassword: "",
    });

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setIsPasswordMatch(false);
            return;
        }

        try {
            post("/profile/edit/password/send", data, {
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
                <div className="flex min-h-screen flex-col bg-primary lg:w-[400px]">
                    <div className="flex justify-center">
                        <div className="flex items-center py-20">
                            <img
                                src="/TripInLogo.svg"
                                className="w-36 object-contain"
                                alt="Logo of TripIn"
                            />
                        </div>
                    </div>

                    <div className="flex-grow rounded-t-xl bg-white pb-4 pt-8">
                        <div className="mx-auto px-6 md:max-w-xl lg:max-w-2xl">
                            {error && (
                                <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <form className="w-full">
                                <h2 className="mb-4 text-xl font-semibold text-black">
                                    Please enter a new password
                                </h2>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    disabled
                                    className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-black"
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
                                    className={`mb-4 w-full rounded-lg border bg-transparent px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2 ${!isPasswordMatch ? "border-red-500" : "border-gray-300"}`}
                                    required
                                />
                                {errors.password && (
                                    <div className="text-sm text-red-500">
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
                                            e.target.value,
                                        )
                                    }
                                    className={`mb-6 w-full rounded-lg border bg-transparent px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2 ${!isPasswordMatch ? "border-red-500" : "border-gray-300"}`}
                                    required
                                />
                                {errors.confirmPassword && (
                                    <div className="text-sm text-red-500">
                                        {errors.confirmPassword}
                                    </div>
                                )}
                                <button
                                    onClick={handleSubmitPassword}
                                    className={`w-full rounded-lg bg-primary2 py-3 font-medium text-white ${!isPasswordMatch ? "cursor-not-allowed opacity-70" : "transition-opacity hover:opacity-90"} `}
                                    disabled={!isPasswordMatch || processing}
                                >
                                    Reset Password
                                </button>
                                <div
                                    className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white p-2"
                                    onClick={() => {
                                        window.location.href = "/profile/edit";
                                    }}
                                >
                                    <ArrowLeftIcon className="size-4 cursor-pointer text-primary2"></ArrowLeftIcon>
                                    <p className="text-sm text-primary2">
                                        go back to edit profile
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

export default ProfileNewPassword;

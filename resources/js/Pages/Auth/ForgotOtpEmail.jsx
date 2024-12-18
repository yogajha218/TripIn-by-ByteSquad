import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { ChevronLeftIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const ForgotOtpEmail = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;

        if (!validateEmail(data.email)) {
            setError("Please enter a valid email address");
            return;
        }

        post("/forgot-password/otp/send", data, {
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
        });
    };

    const handleBack = () => {
        window.location.href = "/auth";
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="relative min-h-screen bg-primary lg:w-[400px]">
                    <div className="relative w-full rounded-b-xl bg-primary py-20">
                        <div className="flex w-full justify-center">
                            <div className="flex items-center">
                                <img
                                    src="/TripInLogo.svg"
                                    className="w-36"
                                    alt="Logo of TripIn"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-full rounded-t-xl bg-white pb-4 pt-5">
                        <div className="mx-auto px-6 md:max-w-xl lg:max-w-2xl">
                            {error && (
                                <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmitEmail}>
                                <h2 className="mb-4 text-xl font-semibold text-black">
                                    Please enter your Email
                                </h2>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mb-6 w-full rounded-lg border border-gray-300 bg-transparent px-6 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2"
                                    required
                                />
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="w-full rounded-lg bg-primary2 py-3 font-medium text-white transition-opacity hover:opacity-90"
                                >
                                    {processing
                                        ? "Processing..."
                                        : "Send Email"}
                                </button>
                                <div
                                    className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white p-6"
                                    onClick={handleBack}
                                >
                                    <ArrowLeftIcon
                                        className="size-4 cursor-pointer text-primary2"
                                        onClick={handleBack}
                                    ></ArrowLeftIcon>
                                    <p className="text-sm text-primary2">
                                        go back to sign in
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

export default ForgotOtpEmail;

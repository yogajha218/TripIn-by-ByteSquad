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
            'meta[name="csrf-token"]'
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

        console.log("Email send : ", data.email);
    };

    const handleBack = () => {
        window.location.href = "/auth";
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="min-h-screen bg-primary  lg:w-[400px] relative">
                    <div className="relative w-full  py-20 bg-primary rounded-b-xl">
                        <div className="flex justify-center w-full">
                            <div className="flex items-center">
                                <img
                                    src="/TripInLogo.svg"
                                    className="w-36 "
                                    alt="Logo of TripIn"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-t-xl pt-5 pb-4 h-full">
                        <div className="px-6 md:max-w-xl lg:max-w-2xl mx-auto">
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmitEmail}>
                                <h2 className="text-xl font-semibold text-black mb-4">
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
                                    className="w-full px-6 py-3 border text-black border-gray-300 bg-transparent rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent"
                                    required
                                />
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="w-full bg-primary2 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    {processing
                                        ? "Processing..."
                                        : "Send Email"}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div
                        className="absolute cursor-pointer  p-2 w-fit bottom-44 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center gap-1 bg-white items-center  rounded-md"
                        onClick={handleBack}
                    >
                        <ArrowLeftIcon
                            className="size-4 cursor-pointer text-primary2"
                            onClick={handleBack}
                        ></ArrowLeftIcon>
                        <p className="text-primary2 text-sm">
                            go back to sign in
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotOtpEmail;

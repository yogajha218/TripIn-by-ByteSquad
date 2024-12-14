import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import ButtonComponent from "@/Components/ButtonComponent";

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [termsClicked, setTermsClicked] = useState(false);
    const [privacyClicked, setPrivacyClicked] = useState(false);
    const [termsCheckError, setTermsCheckError] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });
    const isFormValid =
        data.email &&
        data.password &&
        (isSignIn || (data.confirmPassword && data.termsAccepted));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data: ", data);
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;

        if (isSignIn) {
            post("/login");
        } else {
            post("/register", data, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            });
        }
    };

    const handleTermsLinkClick = (e) => {
        e.preventDefault();
        setTermsClicked(true);
        window.open("/terms-condition", "_blank");
    };

    const handlePrivacyLinkClick = (e) => {
        e.preventDefault();
        setPrivacyClicked(true);
        window.open("/privacy-policy", "_blank");
    };

    const handleTermsCheckboxChange = (e) => {
        if (!termsClicked || !privacyClicked) {
            setTermsCheckError(true);
            setData("termsAccepted", false);
        } else {
            setTermsCheckError(false);
            setData("termsAccepted", e.target.checked);
        }
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="flex min-h-screen flex-col bg-primary lg:w-[400px]">
                    {/* Logo Container */}
                    <div className="flex justify-center py-16">
                        <img
                            src="/TripInLogo.svg"
                            className="w-32"
                            alt="Logo of TripIn"
                        />
                    </div>

                    {/* Toggle Buttons */}
                    <div className="relative top-[24px] flex w-full">
                        <div
                            className={`top-4 h-[48px] flex-1 rounded-[30px] ${
                                isSignIn ? "bg-white" : "bg-primary"
                            }`}
                        >
                            <button
                                className={`w-full rounded-b-none rounded-t-[30px] bg-transparent py-3 text-center ${
                                    isSignIn ? "text-black" : "text-white"
                                }`}
                                onClick={() => setIsSignIn(true)}
                            >
                                Sign In
                            </button>
                        </div>
                        <div
                            className={`top-4 h-[48px] flex-1 rounded-[30px] ${
                                isSignIn ? "bg-primary" : "bg-white"
                            }`}
                        >
                            <button
                                className={`w-full rounded-b-none rounded-t-[30px] bg-transparent py-3 text-center ${
                                    !isSignIn ? "text-black" : "text-white"
                                }`}
                                onClick={() => setIsSignIn(false)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="min-h-[calc(100vh-240px)] flex-1 bg-white px-6 py-12">
                        <div className="mx-auto max-w-md">
                            <h2 className="texx-black mb-6 text-lg font-medium">
                                {isSignIn
                                    ? "Login to your Account"
                                    : "Create your Account"}
                            </h2>

                            {/* Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    autoComplete="email"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                {errors.password && (
                                    <div className="text-sm text-red-500">
                                        {errors.password}
                                    </div>
                                )}

                                {!isSignIn && (
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
                                        value={data.confirmPassword}
                                        onChange={(e) =>
                                            setData(
                                                "confirmPassword",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                )}
                                {errors.confirmPassword && (
                                    <div className="text-sm text-red-500">
                                        {errors.confirmPassword}
                                    </div>
                                )}

                                {isSignIn && (
                                    <div className="text-right">
                                        <Link
                                            href="/forgot-password/email"
                                            className="text-primary"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                )}

                                {!isSignIn && (
                                    <div>
                                        <div className="flex items-start space-x-2">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                className="mt-1"
                                                checked={data.termsAccepted}
                                                onChange={
                                                    handleTermsCheckboxChange
                                                }
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm text-black"
                                            >
                                                I understood the{" "}
                                                <Link
                                                    href="/terms-condition"
                                                    onClick={
                                                        handleTermsLinkClick
                                                    }
                                                    className={`${
                                                        termsClicked
                                                            ? "text-green-600"
                                                            : "text-sky-400"
                                                    }`}
                                                >
                                                    Terms & Conditions
                                                </Link>{" "}
                                                and{" "}
                                                <Link
                                                    href="/privacy-policy"
                                                    onClick={
                                                        handlePrivacyLinkClick
                                                    }
                                                    className={`${
                                                        privacyClicked
                                                            ? "text-green-600"
                                                            : "text-sky-400"
                                                    }`}
                                                >
                                                    Privacy Policy
                                                </Link>
                                            </label>
                                        </div>
                                        {termsCheckError && (
                                            <p className="mt-2 text-sm text-red-500">
                                                Please read the Terms &
                                                Conditions and Privacy Policy
                                                first
                                            </p>
                                        )}
                                    </div>
                                )}
                                <ButtonComponent
                                    buttonText={
                                        isSignIn ? "Sign In" : "Sign Up"
                                    }
                                    disabled={processing}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;

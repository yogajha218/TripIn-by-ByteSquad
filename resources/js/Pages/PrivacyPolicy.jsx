import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

const PrivacyPolicy = () => {
    return (
        <>
            <div className="flex justify-center">
                <div className="min-h-screen bg-primary lg:w-[400px] ">
                    {/* App Bar */}
                    <div className="flex items-center justify-between p-6"></div>

                    {/* Header */}
                    <div className="flex  items-center  mb-8 relative">
                        {/* Back Button */}
                        <ChevronLeftIcon
                            className="size-6 cursor-pointer absolute text-white left-5"
                            onClick={() => history.back()} // Using browser's history.back()
                        ></ChevronLeftIcon>
                        <h1 className="text-2xl font-semibold text-white w-full text-center">
                            Privacy Policy
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-t-3xl p-12 h-full">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            Privacy Policy
                        </h2>
                        <p className="text-gray-700 mb-6">
                            We are committed to protecting the privacy and
                            security of your personal data. This Privacy Policy
                            explains how we collect, use and protect your
                            information when using Tripin services. By using
                            this service, you consent to the collection and use
                            of information in accordance with this policy.
                        </p>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-black">
                                Here are the details of our Privacy Policy:
                            </h3>

                            <div className="space-y-4 text-black">
                                <div>
                                    <h4 className="font-semibold">
                                        1. Collection of Personal Data
                                    </h4>
                                    <p className="text-gray-700 ml-4">
                                        We collect personal data, such as your
                                        name, email, telephone number, and
                                        payment information, as well as travel
                                        data, such as selected routes,
                                        schedules, pick-up points, and drop-off
                                        points to improve our services.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        2. Use of Personal Data
                                    </h4>
                                    <p className="text-gray-700 ml-4">
                                        Your personal data is used for
                                        processing ticket orders, improving
                                        services, as well as notifications
                                        related to your trip. We keep your data
                                        confidential and do not share this data
                                        without your consent.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        3. Data Protection
                                    </h4>
                                    <p className="text-gray-700 ml-4">
                                        Tripin safeguards your data with
                                        adequate security measures to prevent
                                        unauthorized access or misuse of data.
                                        Data can only be accessed by authorized
                                        parties.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;

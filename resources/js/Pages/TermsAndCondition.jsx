import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
const TermsAndConditions = () => {
    return (
        <>
            <div className="flex justify-center">
                <div className="min-h-screen bg-primary lg:w-[400px]">
                    {/* App Bar */}
                    <div className="flex items-center justify-between p-6"></div>

                    {/* Header */}
                    <div className="flex items-center  mb-8 relative">
                        <ChevronLeftIcon
                            className="text-white absolute size-6 cursor-pointer left-5"
                            onClick={() => history.back()}
                        ></ChevronLeftIcon>
                        <h1 className="text-2xl font-semibold text-white w-full text-center">
                            Terms and Condition
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-t-3xl p-12 h-full">
                        <h1 className="text-2xl font-semibold mb-4 text-black">
                            Terms and Condition
                        </h1>
                        <p className="text-gray-700 mb-6">
                            Tripin is here as a shuttle bus transportation
                            solution for your trip that is more comfortable and
                            efficient. Before using our services, please take
                            the time to read and understand the following Terms
                            and Conditions. By continuing to use this
                            application, you are deemed to have agreed to the
                            applicable terms and conditions
                        </p>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-black">
                                Terms and Conditions for Using the Tripin
                                Application:
                            </h3>

                            <div className="space-y-2 text-black">
                                <div>
                                    <h4 className="font-semibold">
                                        1. Account Registration
                                    </h4>
                                    <p className="text-gray-700 ml-4">
                                        Users are required to register with
                                        valid data. Account security is the
                                        user's responsibility.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        2. Ticket Booker
                                    </h4>
                                    <p className="text-gray-700 ml-4">
                                        Tickets can be ordered via the Tripin
                                        application with the appropriate payment
                                        methods available.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        3. Use of Personal Data
                                    </h4>
                                    <p className="text-gray-700 ml-4">
                                        User personal data is used for ordering
                                        purposes and improving services. Data
                                        will be protected and will not be shared
                                        without user consent.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        4. Responsibility and Security
                                    </h4>
                                    <p className="text-gray-700 ml-4">
                                        Tripin is committed to keeping users'
                                        travel safe.
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

export default TermsAndConditions;

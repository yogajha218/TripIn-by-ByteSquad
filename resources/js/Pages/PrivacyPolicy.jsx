import React from "react";
import { Link } from "@inertiajs/react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* App Bar */}
      <div className="flex items-center justify-between p-6"></div>

      {/* Header */}
      <div className="flex items-center px-6 pb-4">
        {/* Back Button */}
        <button
          className="text-white mr-6 bg-transparent"
          onClick={() => history.back()} // Using browser's history.back()
          aria-label="Go back"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14 8-4 4 4 4"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-white">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl p-12">
        <h2 className="text-2xl font-semibold text-black mb-4">Privacy Policy</h2>
        <p className="text-gray-700 mb-6">
          We are committed to protecting the privacy and security of your
          personal data. This Privacy Policy explains how we collect, use, and
          protect your information when using Tripin services. By using this
          service, you consent to the collection and use of information in
          accordance with this policy.
        </p>

        <div className="space-y-4">
          <h3 className="font-semibold text-black">
            Here are the details of our Privacy Policy:
          </h3>

          <div className="space-y-4 text-black">
            <div>
              <h4 className="font-semibold">1. Collection of Personal Data</h4>
              <p className="text-gray-700 ml-4">
                We collect personal data, such as your name, email, telephone
                number, and payment information, as well as travel data, such as
                selected routes, schedules, pick-up points, and drop-off points
                to improve our services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">2. Use of Personal Data</h4>
              <p className="text-gray-700 ml-4">
                Your personal data is used for processing ticket orders,
                improving services, as well as notifications related to your
                trip. We keep your data confidential and do not share this data
                without your consent.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">3. Data Protection</h4>
              <p className="text-gray-700 ml-4">
                Tripin safeguards your data with adequate security measures to
                prevent unauthorized access or misuse of data. Data can only be
                accessed by authorized parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

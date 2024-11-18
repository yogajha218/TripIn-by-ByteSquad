import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary">
      {/* App Bar */}
      <div className="flex items-center justify-between p-6"></div>

      {/* Header */}
      <div className="flex items-center px-6 pb-4">
        <button className="text-white mr-6 bg-transparent" onClick={() => navigate(-1)}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
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
        <h1 className="text-2xl font-semibold text-white">Terms and Condition</h1>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl p-12">
        <h2 className="text-2xl font-semibold">Terms and Condition</h2>
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Terms and Condition
        </h1>
        <p className="text-gray-700 mb-6">
          Tripin is here as a shuttle bus transportation solution for your trip
          that is more comfortable and efficient. Before using our services,
          please take the time to read and understand the following Terms and
          Conditions. By continuing to use this application, you are deemed to
          have agreed to the applicable terms and conditions. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Earum eligendi quasi dolorum
          maiores expedita velit, ab quis ipsam natus placeat quam ut commodi
          laborum ex blanditiis perspiciatis dolore quo reprehenderit. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Deleniti inventore
          odit repellendus ad sunt, dolor dolorum eum illum quod magnam. Modi
          reiciendis tenetur voluptate quidem voluptatum, ratione, a adipisci,
          laborum recusandae voluptates dolorum? Cumque, odio nihil? Debitis
          placeat recusandae cum, ipsum excepturi, autem veniam veritatis
          mollitia, blanditiis ullam distinctio illo?
        </p>

        <div className="space-y-4">
          <h3 className="font-semibold text-black">
            Terms and Conditions for Using the Tripin Application:
          </h3>

          <div className="space-y-2 text-black">
            <div>
              <h4 className="font-semibold">1. Account Registration</h4>
              <p className="text-gray-700 ml-4">
                Users are required to register with valid data. Account security
                is the user's responsibility.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">2. Ticket Booker</h4>
              <p className="text-gray-700 ml-4">
                Tickets can be ordered via the Tripin application with the
                appropriate payment methods available.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">3. Use of Personal Data</h4>
              <p className="text-gray-700 ml-4">
                User personal data is used for ordering purposes and improving
                services. Data will be protected and will not be shared without
                user consent.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">4. Responsibility and Security</h4>
              <p className="text-gray-700 ml-4">
                Tripin is committed to keeping users' travel safe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
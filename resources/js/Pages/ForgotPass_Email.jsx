import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tripinLogo from "/TripInLogo.svg";

const ResetPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

  };

  const handleBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <div className="px-4 pt-10">
        <button
          onClick={handleBack}
          className="text-white bg-transparent text-2xl hover:opacity-80 transition-opacity"
        >
          &lt;
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center">
          <img
            src={tripinLogo}
            className="h-40 object-contain"
            alt="Logo of TripIn"
          />
        </div>
      </div>

      <div className="bg-white rounded-t-3xl pt-8 pb-4 flex-grow">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 border text-black border-gray-300 bg-transparent rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary2 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
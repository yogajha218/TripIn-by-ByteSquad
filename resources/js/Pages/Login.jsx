import React, { useState } from "react";
import tripinLogo from "/TripInLogo.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Logo Container */}
      <div className="flex justify-center pt-6">
        <img src={tripinLogo} className="h-40" alt="Logo of TripIn" />
      </div>

      {/* Toggle Buttons */}
      <div className="flex w-full">
        <button
          className={`flex-1 py-3 text-center rounded-t-[30px] rounded-b-none ${
            isSignIn ? "bg-white text-black" : "bg-transparent text-white"
          }`}
          onClick={() => setIsSignIn(true)}
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-3 text-center rounded-t-[30px] rounded-b-none ${
            !isSignIn ? "bg-white text-black" : "bg-transparent text-white"
          }`}
          onClick={() => setIsSignIn(false)}
        >
          Sign Up
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white flex-1 p-6 min-h-[calc(100vh-240px)]">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-medium mb-6 text-black">
            {isSignIn ? "Login to your Account" : "Create your Account"}
          </h2>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
            />

            {!isSignIn && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
              />
            )}

            {isSignIn && (
              <div className="text-right">
                <a href="#" className="text-primary">
                  Forgot Password?
                </a>
              </div>
            )}

            {!isSignIn && (
              <div className="flex items-start space-x-2">
                <input type="checkbox" id="terms" className="mt-1" />
                <label htmlFor="terms" className="text-sm text-black">
                  I understood the{" "}
                  <Link to="/TermsAndCondition" className="text-sky-400">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/PrivacyPolicy" className="text-sky-400">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary2 text-white rounded-lg font-medium"
            >
              {isSignIn ? "SIGN IN" : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
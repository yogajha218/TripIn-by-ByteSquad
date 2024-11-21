import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import tripinLogo from "/TripInLogo.svg";

const ResetPasswordNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(newPassword)) {
      setError("Password must be at least 8 characters with letters and numbers");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsPasswordMatch(false);
      return;
    }

    try {
      // TODO: Add actual password reset logic
      console.log("Password reset successful for:", email);
      navigate("/login"); // Redirect to login page after successful reset
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (confirmPassword) {
      setIsPasswordMatch(value === confirmPassword);
      if (value !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (newPassword) {
      setIsPasswordMatch(value === newPassword);
      if (value !== newPassword) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to email input page
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

          <form onSubmit={handleResetPassword} className="w-full">
            <h2 className="text-xl text-black font-semibold mb-4">
              Please enter a new password
            </h2>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg mb-4 bg-gray-50"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-3 text-black bg-transparent border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent
                ${!isPasswordMatch ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full px-4 py-3 text-black bg-transparent border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent
                ${!isPasswordMatch ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            <button
              type="submit"
              className={`w-full bg-primary2 text-white py-3 rounded-lg font-medium 
                ${!isPasswordMatch ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 transition-opacity'}
              `}
              disabled={!isPasswordMatch}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordNew;
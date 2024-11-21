import React, { useState } from 'react';

const OtpPassword = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[name="code-${index + 1}"]`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="code-${index - 1}"]`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      {/* Top Section */}
      <div className="flex-none mt-0">
        {/* Back Button */}
        <button className="text-white text-2xl bg-transparent hover:opacity-80 transition-opacity">
          &lt;
        </button>
      </div>

      {/* Logo Section */}
      <div className="flex-none flex justify-center px-4">
        <img 
          src='/TripInLogo.svg' 
          className="h-38 object-contain" 
          alt="Logo of TripIn" 
        />
      </div>

      {/* Verification Content */}
      <div className="flex-grow bg-white rounded-t-3xl p-6">
        <div className="max-w-md mx-auto p-2">
          <h1 className="text-2xl font-semibold text-black mb-2">
          Let’s Verify Your Account!
          </h1>
          <p className="text-gray-500 mb-8">
          We just sent an OTP code to your email. Check your inbox and enter the code below to keep going! 🚀
          </p>

          {/* Code Input Fields */}
          <div className="flex justify-between gap-3 mb-8">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                name={`code-${index}`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 border-2 border-gray-200 rounded-xl 
                          text-center bg-transparent text-xl text-black 
                          font-semibold focus:border-gray-400 focus:outline-none
                          transition-colors"
                maxLength={1}
              />
            ))}
          </div>

          {/* Confirm Button */}
          <button className="w-full bg-primary2 text-white py-4 rounded-xl 
                           font-semibold hover:opacity-90 transition-opacity 
                           active:scale-[0.99]">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPassword;